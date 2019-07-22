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
            echo "Failed: Build url : "+err.getLocalizedMessage()
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
