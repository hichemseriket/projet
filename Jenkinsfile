pipeline {

    agent { label 'master' }

    tools {
        nodejs "nodejs"
    }

    environment {
        project_name = 'alsace'
        registry = "dalidos/alsace"
        registryCredential = 'dockerhub'
        dockerImage = ''
        deployBranch = 'origin/pre-prod'
        appUrl = 'http://10.3.1.78'
    }

    stages {

        // BUILD AND UNIT TEST ================================================================
        stage('UNITY TEST and CODE QUALITY') {
            parallel{
                stage('[backend]') {
                    steps {
                        gitlabCommitStatus(name: '[backend] build') {
                            sh 'npm i'
                            sh 'cp default.jenkins.env .env'
                        }
                        gitlabCommitStatus(name: '[backend] test') {
                            sh 'npm run test:ci'
                        }
                        gitlabCommitStatus(name: '[backend] sonar') {
                            sh 'npm run sonar-scanner'
                        }
                    }
                }
                stage('[frontend]') {
                    steps {
                        gitlabCommitStatus(name: '[frontend] build') {
                            sh '''cd client
                                npm i @angular/cli@7.3.9 -g
                                npm install -g jest-cli
                                npm i'''
                        }
                        gitlabCommitStatus(name: '[frontend] test') {
                            sh '''cd client
                                npm run test:ci'''
                        }
                        gitlabCommitStatus(name: '[frontend] sonar') {
                            sh '''cd client
                                npm run sonar-scanner'''
                        }
                    }
                }
            }
        }
        // INTEGRATED TEST ===============================================================
        stage('INTEGRATE [deploy]') {
            when {
                expression {env.GIT_BRANCH == deployBranch}
            }
            steps {
                script{
                    gitlabCommitStatus(name: 'integrated deploy') {
                        sh 'docker-compose -f docker-compose.jenkins.yml build'
                        sh 'docker-compose -f docker-compose.jenkins.yml up -d'
                        sleep 30
                    }
                }
            }
        }
        stage('INTEGRATE [test]') {
            when {
                expression {env.GIT_BRANCH == deployBranch}
            }
            steps {
                script{
                    gitlabCommitStatus(name: '[backend] integrate test') {
                        sh '''
                            docker exec -i ${project_name}_server-jenkins npm run test:int
                            '''
                        sh 'docker-compose down'
                    }
                }
            }
        }
        stage('DELIVERY [build docker image]') {
            when {
                expression {env.GIT_BRANCH == deployBranch}
            }
            steps {
                script{
                    gitlabCommitStatus(name: 'delivery deploy') {
                        sh 'rm .env'
                        sh 'cp default.prod.env .env'
                        sh 'docker-compose -f docker-compose.jenkins.yml build'
                        sleep 30
                    }
                }
            }
        }
        stage('DELIVERY [push docker image]') {
            when {
                expression {env.GIT_BRANCH == deployBranch}
            }
            steps{
                script{
                    gitlabCommitStatus(name: '[backend] Push Image') {
                          sh 'docker login -u dalidos -p antroll-8'
                          sh 'docker-compose push'
                    }
                }
            }
        }
        stage('DELIVERY [push git prod]') {
            when {
                expression {env.GIT_BRANCH == deployBranch}
            }
            steps{
                script{
                    gitlabCommitStatus(name: '[backend] push to prod repository') {
                        sh 'rm -Rf alsace-prod'
                        sh 'git clone -b prod http://root:djeuha40@10.3.1.78:8000/root/alsace-mirror.git ./alsace-prod'
                        sh 'cp docker-compose.prod.yml alsace-prod/docker-compose.yml'
                        sh 'cp docker/osrm/Dockerfile alsace-prod/Dockerfile.osrm'
                        sh 'cp default.prod.env alsace-prod/.env'
                        sh '''
                            cd alsace-prod/
                            git add .
                            git config --global user.email "anthony.schwartz@uha.fr"
                            git config --global user.name "Anthony"
                            git diff --quiet && git diff --staged --quiet || git commit -a -m "message de commit"
                            git push http://root:djeuha40@10.3.1.78:8000/root/alsace-mirror.git
                        '''
                    }
                }
            }
        }

        stage('DELIVERY [restart app on server]') {
            when {
                expression {env.GIT_BRANCH == deployBranch}
            }
            steps{
            sh 'sh restartApp.sh'
            }
        }
    }
    // POST compose down and success message ============================================================
    post {
        always {
            script{
                if(env.GIT_BRANCH == deployBranch) {
//                     sh 'docker logs alsace_server'
                    sh 'docker-compose down'
                    sh 'docker logout'
                    sh 'rm -Rf alsace-prod'
                    sh 'rm -Rf alsace-mirror'
                    echo 'clean'
//                     sh 'docker system prune -f'
//                     sh 'docker image prune -f'
//                     sh 'docker volume prune -f'
                }
            }
        }
        success {
            script{
                if(env.GIT_BRANCH == deployBranch) {
                    slackSend channel: '#projet_alsace',
                              color: 'good',
                              message: "*${currentBuild.currentResult}:* The pipeline ${currentBuild.fullDisplayName} of branch *${env.GIT_BRANCH}* completed successful.:v: \n <${env.BUILD_URL}|Click Here> for more info. or <${appUrl}|Go to app>"
                }
            }
        }
        failure {
            script{
                if(env.GIT_BRANCH == deployBranch) {
                    slackSend channel: '#projet_alsace',
                              color: 'danger',
                              message: "*${currentBuild.currentResult}:* The pipeline ${currentBuild.fullDisplayName} of branch *${env.GIT_BRANCH}* failed. :x: \n <${env.BUILD_URL}|Click Here> for more info."
                }
            }
        }
    }
}
