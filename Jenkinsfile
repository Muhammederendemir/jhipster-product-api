#!/usr/bin/env groovy

node {
    stage('checkout') {
        checkout scm

    }

    stage('check java') {

        try {
            sh "java --version"
            currentBuild.result = 'SUCCESS'

        } catch (err) {
            currentBuild.result = 'FAILED'
            notifyBuild('ERROR'," Hata Mesajı "+echo_all(currentBuild.rawBuild.getLog(1000)))
            throw err

        } finally {
            echo "Result Build : ${currentBuild.result}"
        }



    }

    stage('clean') {
        sh "chmod +x mvnw"
        sh "./mvnw clean"
    }

    stage('install tools') {
        sh "./mvnw com.github.eirslett:frontend-maven-plugin:install-node-and-npm -DnodeVersion=v10.15.0 -DnpmVersion=6.4.1"
    }

    stage('npm install') {
        sh "./mvnw com.github.eirslett:frontend-maven-plugin:npm"
    }




    stage('packaging') {
        sh "./mvnw verify -Pdev -DskipTests"
        archiveArtifacts artifacts: '**/target/*.war', fingerprint: true
    }


}

    def notifyBuild(String buildStatus,String message) {
        // Default values
        def colorName = 'RED'
        def colorCode = '#FF0000'
        def subject = " Build Status : ${buildStatus}: Job Name : ${env.JOB_NAME} Build Number : ${env.BUILD_NUMBER}]"
        def buildUrl= "Build Url  : ${env.BUILD_URL}"
        def summary = "${subject} ${buildUrl} ${message}"

        // Override default values based on build status
        if (buildStatus == 'STARTED') {
            color = 'YELLOW'
            colorCode = '#FFFF00'
        } else if (buildStatus == 'SUCCESSFUL') {
            color = 'GREEN'
            colorCode = '#00FF00'
        } else {
            color = 'RED'
            colorCode = '#FF0000'
        }

        // Send notifications
        slackSend(channel: '#jenkins',color: colorCode, message: summary)
    }

    @NonCPS // has to be NonCPS or the build breaks on the call to .each
    def echo_all(list) {
        def log=''
        list.each { item ->
            log=log+"${item}"+"\n"
        }
        return log
    }
