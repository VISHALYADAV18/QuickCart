// Jenkinsfile (minimal test pipeline)
pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        // Checkout current repo
        checkout scm
      }
    }
    stage('Sample Build Step') {
      steps {
        // basic sanity command to prove runner works
        sh '''
          echo "Hello from Jenkins - QuickCart"
          echo "Listing repo files:"
          ls -la
        '''
      }
    }
  }
  post {
    success {
      echo "Pipeline completed successfully."
    }
    failure {
      echo "Pipeline failed."
    }
  }
}
