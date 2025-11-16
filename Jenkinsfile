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

    stage('Build App') {
      steps {
        bat 'npm run build'
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

  }

  post {
    success {
      echo "Build + Docker Image created successfully!"
    }
    failure {
      echo "Pipeline failed."
    }
  }
}