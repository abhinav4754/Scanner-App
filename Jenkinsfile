pipeline {
    agent any

    tools {
        nodejs "node18"
        sonarQubeScanner "sonar-scanner"
    }

    environment {
        OPENSSL_CONF = "C:\\ProgramData\\Jenkins\\.jenkins\\openssl.cnf"
    }

    stages {

        stage('Build') {
            steps {
                bat 'cd backend && npm install'
                bat 'docker build -t scanner-app .'
            }
        }

        stage('Test') {
            steps {
                bat 'cd backend && npm test'
            }
        }

        stage('Code Quality') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    bat "\"${tool 'sonar-scanner'}\\bin\\sonar-scanner.bat\""
                }
            }
        }

        stage('Security') {
            steps {
                bat 'cd backend && npm audit'
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker rm -f scanner-container || exit 0'
                bat 'docker run -d -p 3000:3000 --name scanner-container scanner-app'
            }
        }

        stage('Release') {
            steps {
                bat 'echo Release completed'
            }
        }

        stage('Monitoring') {
            steps {
                bat 'curl http://localhost:3000/health'
            }
        }
    }
}