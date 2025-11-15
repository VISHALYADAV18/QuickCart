pipeline {
  agent any

  tools {
    // use the NodeJS installation configured in Jenkins Global Tool Configuration
    nodejs 'Node_24'
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
        echo "Repository checkout completed."
      }
    }

    stage('Install Dependencies') {
      steps {
        bat '''
          echo Installing npm dependencies...
          npm ci
        '''
      }
    }

    stage('TypeScript Check') {
      steps {
        bat '''
          echo Running TypeScript type check...
          npm run check
        '''
      }
    }

    stage('Build Application') {
      steps {
        bat '''
          echo Building frontend + backend using Vite + esbuild...
          npm run build
        '''
      }
    }

    stage('Archive Build Artifacts') {
      steps {
        echo "Archiving dist folder..."
        archiveArtifacts artifacts: 'dist/**', fingerprint: true
      }
    }

    stage('Future: Tests') {
      when {
        expression { false }  // disabled for now (no tests)
      }
      steps {
        bat '''
          echo Running test suite...
          npm test
        '''
      }
    }

  }

  post {
    success {
      echo "🎉 Jenkins Pipeline completed successfully."
    }
    failure {
      echo "❌ Jenkins Pipeline failed."
    }
  }
}
