pipeline {
    agent any
    options {
        timestamps()
        disableConcurrentBuilds()
        skipDefaultCheckout(true)
    }
    environment {
        APP_DIR = '/opt/jenkins-cicd/express-frontend'
        SERVICE_NAME = 'express-frontend'
        HEALTH_URL = 'http://127.0.0.1:3000/health'
    }
    stages {
        stage('Checkout') { steps { checkout scm } }
        stage('Install dependencies') { steps { sh 'npm install' } }
        stage('Unit tests') { steps { sh 'npm test' } }
        stage('Deploy to EC2') {
            steps {
                sh '''
                    sudo mkdir -p "$APP_DIR"
                    sudo rsync -a --delete --exclude=.git --exclude=node_modules ./ "$APP_DIR"/
                    sudo npm --prefix "$APP_DIR" install --omit=dev
                    sudo systemctl restart "$SERVICE_NAME"
                    sudo systemctl is-active --quiet "$SERVICE_NAME"
                '''
            }
        }
        stage('Health verification') {
            steps {
                sh '''
                    for attempt in 1 2 3 4 5 6 7 8 9 10; do
                      if curl --fail --silent "$HEALTH_URL"; then exit 0; fi
                      sleep 3
                    done
                    echo "Express health endpoint did not become healthy"
                    sudo journalctl -u "$SERVICE_NAME" -n 80 --no-pager || true
                    exit 1
                '''
            }
        }
    }
    post {
        success { echo 'Express tests passed and EC2 service is healthy.' }
        failure { echo 'Express pipeline failed. Review the stage logs and systemd journal.' }
        always { cleanWs() }
    }
}
