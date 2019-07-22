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
            notifyBuild(getBuildLog(currentBuild.rawBuild.getLog(1000)))
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

    def notifyBuild(String message) {
        // Default values1
        def colorCode = '#FF0000'
        def channelName='#jenkins'
        def color='red'


        def buildState="Build Status : ${currentBuild.currentResult}"
        color='BLUE'
        colorCode = '#002366'
        slackSend(channel:channelName ,color: colorCode, message: buildState)

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
       // slackSend(channel:channelName ,color: colorCode, message: ${message})

    }

    @NonCPS // has to be NonCPS or the build breaks on the call to .each
    def getBuildLog(list) {
        def log=''
        list.each { item ->
            log=log+"${item}"+"\n"
        }
        return log
    }
