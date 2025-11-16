pipeline {
  agent any

  tools {
    nodejs 'Node_24'
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        bat 'npm install'
      }
    }

    stage('TypeScript Check') {
      steps {
        bat 'npm run check'
      }
    }

    stage('SonarQube Analysis') {
      steps {
      withSonarQubeEnv('SonarQube') {
        withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
          bat """
            ${tool 'SonarScanner'}\\bin\\sonar-scanner ^
              -Dsonar.projectKey=QuickCart ^
              -Dsonar.sources=. ^
              -Dsonar.host.url=http://localhost:9000 ^
              -Dsonar.login=%SONAR_TOKEN%
          """
          }
        }
      }
    }

    stage('Docker Build') {
      steps {
        bat """
          echo Building Docker image quickcart:latest
          docker build -t quickcart:latest .
        """
      }
    }

    stage('Docker Push to Hub') {
      steps {
          withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
              bat """
                  docker login -u %DOCKER_USER% -p %DOCKER_PASS%
                  docker tag quickcart:latest %DOCKER_USER%/quickcart:latest
                  docker push %DOCKER_USER%/quickcart:latest
                  docker logout
              """
          }
      }
    }


    stage('Archive Build') {
      steps {
        archiveArtifacts artifacts: 'dist/**'
      }
    }

    stage('Deploy to Docker Swarm') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
        bat """
            echo Pulling latest image...
            docker pull %DOCKER_USER%/quickcart:latest
 
            echo Updating Swarm service...
            docker service update --image %DOCKER_USER%/quickcart:latest quickcart
        """
    }
    }}

  }

  post {
    success {
      echo "🔥 Full CI/CD pipeline completed successfully!"
    }
    failure {
      echo "❌ Pipeline failed."
    }
  }
}