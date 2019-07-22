#!/usr/bin/env groovy

node {
    stage('checkout') {
        checkout scm

    }

    stage('check java') {

        try {
            // do something that doesn't fail
            sh "java --version"
            echo "Im not going to fail"
            currentBuild.result = 'SUCCESS'
        } catch (Exception err) {
            currentBuild.result = 'FAILURE'
            echo err.getMessage()
        }
        echo "RESULT: ${currentBuild.result}"
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
