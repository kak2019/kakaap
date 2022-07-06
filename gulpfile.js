'use strict';

const gulp = require('gulp');

const build = require('@microsoft/sp-build-web');

const { merge } =  require('webpack-merge');

const webpack = require('webpack');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

build.configureWebpack.setConfig({
    additionalConfiguration: function (config) {
        
        let azureFunctionBaseUrl = process.env.AzureFunctionBaseUrl;
        let aadClientId = process.env.aadClientId;
        let isDev=process.env.isDev;
        console.log(process.env);
        let defineOptions = {};

        if (azureFunctionBaseUrl && azureFunctionBaseUrl && isDev !== "") {
            console.log('***********    Applying development settings to webpack *********************');
            defineOptions = {
                'azureFunctionBaseUrl': JSON.stringify(azureFunctionBaseUrl),
                'aadClientId': JSON.stringify(aadClientId),
                'isDev':JSON.stringify(isDev),
            }
        } else {
            // specify dev settings here
            defineOptions = {
                'azureFunctionBaseUrl': JSON.stringify('https://app-shared-svc-parma-dev.azurewebsites.net'),
                'aadClientId': JSON.stringify('6f441754-1997-4efd-9e60-7a02ceabd8f6'),
                'isDev':JSON.stringify(true),
            }
        }

        return merge(config, {
            plugins: [
                new webpack.DefinePlugin(defineOptions)
            ]
        });
    }
});

build.initialize(gulp);
