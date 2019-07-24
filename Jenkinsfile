def msg
node{

    stage('checkout') {
        def message=null
        try {
            checkout scmm
            currentBuild.result = 'SUCCESS'
            message='Build message : '+STAGE_NAME+' completed'
        } catch (err) {
            currentBuild.result = 'FAILURE'
            message=getBuildLog(currentBuild.rawBuild.getLog(1000))
            throw err

        } finally {
            notifyJob()

            notifyStage(message)

        }
    }

    stage('check java') {
        def message=null
        try {
            sh "java -version"
            currentBuild.result = 'SUCCESS'
            message='Build message : '+STAGE_NAME+' completed '
        } catch (err) {
            currentBuild.result = 'FAILURE'
            message=getBuildLog(currentBuild.rawBuild.getLog(1000))
            throw err

        } finally {

            notifyStage(message)

        }

    }

    stage('clean') {
        def message=null
        try {
            sh "chmod +x mvnw"
            sh "./mvnw clean"
            currentBuild.result = 'SUCCESS'
            message='Build message : '+STAGE_NAME+' completed'
        } catch (err) {
            currentBuild.result = 'FAILURE'
            message=getBuildLog(currentBuild.rawBuild.getLog(1000))

            throw err

        } finally {

            notifyStage(message)

        }

    }

    stage('install tools') {
        def message=null
        try {
            sh "./mvnw com.github.eirslett:frontend-maven-plugin:install-node-and-npm -DnodeVersion=v10.15.0 -DnpmVersion=6.4.1"
            currentBuild.result = 'SUCCESS'
            message='Build message : '+STAGE_NAME+' completed'
        } catch (err) {
            currentBuild.result = 'FAILURE'
            message=getBuildLog(currentBuild.rawBuild.getLog(1000))
            throw err

        } finally {

            notifyStage(message)
        }
    }

    stage('npm install') {
        def message=null
        try {
            sh "./mvnw com.github.eirslett:frontend-maven-plugin:npm"
            currentBuild.result = 'SUCCESS'
            message='Build message : '+STAGE_NAME+' completed'
        } catch (err) {
            currentBuild.result = 'FAILURE'
            message=getBuildLog(currentBuild.rawBuild.getLog(1000))
            throw err

        } finally {

            notifyStage(message)
        }

    }

    stage('packaging') {
        def message=null
        try {
            sh "./mvnw verify -Pdev -DskipTests"
            archiveArtifacts artifacts: '**/target/*.war', fingerprint: true
            currentBuild.result = 'SUCCESS'
            message='Build message : '+STAGE_NAME+' completed'
        } catch (err) {
            currentBuild.result = 'FAILURE'
            message=getBuildLog(currentBuild.rawBuild.getLog(1000))
            throw err

        } finally {

            notifyStage(message)
        }

    }

    stage('backend tests') {
        def message=null
        try {
            sh "./mvnw test"
            currentBuild.result = 'SUCCESS'
            message='Build message : '+STAGE_NAME+' completed'
        } catch (err) {
            currentBuild.result = 'FAILURE'
            message=getBuildLog(currentBuild.rawBuild.getLog(1000))
            throw err

        } finally {

            notifyStage(message)
            sendMail()
        }
    }
}

def notifyStage(String message){
    colorCode = '#FF0000'
    color='red'
    channelName='#jenkins'

    def stageName= "Stage Name  : ${STAGE_NAME}\n"
    color='ROSYBROWN'
    colorCode = '#BC8F8F'
    slackSend(channel:channelName ,color: colorCode, message: stageName)

    def buildState="Build Status : ${currentBuild.currentResult}"
    color='BLUE'
    colorCode = '#002366'
    slackSend(channel:channelName ,color: colorCode, message: buildState)

    // Override default values based on build status
    if (currentBuild.currentResult == 'SUCCESS') {
        color = 'GREEN'
        colorCode = '#00FF00'
    }
    else if (currentBuild.currentResult == 'UNSTABLE') {
        color = 'BROWN'
        colorCode = '#654321'
    }
    else if(currentBuild.currentResult == 'FAILURE'){
        color = 'RED'
        colorCode = '#FF0000'
    }
    slackSend(channel:channelName ,color: colorCode, message: message)
    slackSend(channel:channelName ,color: '#000000', message: '')

    msg+="\n"+stageName+"\n"+buildState+"\n\n"+message+"\n\n"
}


def notifyJob(){
    colorCode = '#FF0000'
    color='red'
    channelName='#jenkins'

    def jobName="Job Name : ${env.JOB_NAME}\n"
    color='PURPLE'
    colorCode = '#4e5180'
    slackSend(channel:channelName ,color: colorCode, message: jobName)

    def buildNumber="Build Number : ${env.BUILD_NUMBER}\n"
    color='ORANGE'
    colorCode = '#e86180'
    slackSend(channel:channelName ,color: colorCode, message: buildNumber)

    def buildUrl= "Build Url  : ${env.BUILD_URL}\n"
    color='GREY'
    colorCode = '#808080'
    slackSend(channel:channelName ,color: colorCode, message: buildUrl)
    slackSend(channel:channelName ,color: '#000000', message: '')
    slackSend(channel:channelName ,color: '#000000', message: '')
    msg=jobName+"\n"+buildNumber+"\n"+buildUrl+"\n\n\n"
}

@NonCPS // has to be NonCPS or the build breaks on the call to .each
def getBuildLog(list) {
    def log='Hata Mesajı : '
    list.each { item ->
        log=log+"${item}"+"\n"
    }
    return log
}

def sendMail(){
    mail to: 'mhmmderen2@gmail.com',
        subject: "Example Build: ${env.JOB_NAME} - Succees",
        body:"${msg}"
}
