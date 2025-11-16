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
        bat 'npm ci'
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