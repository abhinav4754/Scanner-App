pipeline {
    agent any

    tools {
        nodejs "node18"
    }

    stages {

        stage('Build') {
            steps {
                sh 'cd backend && npm install'
                sh 'docker build -t scanner-app .'
            }
        }

        stage('Test') {
            steps {
                sh 'cd backend && npm test'
            }
        }

        stage('Code Quality') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'sonar-scanner'
                }
            }
        }

        stage('Security') {
            steps {
                sh 'cd backend && npm audit || true'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker rm -f scanner-container || true'
                sh 'docker run -d -p 3000:3000 --name scanner-container scanner-app'
            }
        }

        stage('Release') {
            steps {
                sh 'echo "Release completed"'
            }
        }

        stage('Monitoring') {
            steps {
                sh 'curl http://localhost:3000/health'
            }
        }
    }
}
