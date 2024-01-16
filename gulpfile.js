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

        if (azureFunctionBaseUrl && azureFunctionBaseUrl && !isDev == "") {
            console.log('***********    Applying development settings to webpack *********************');
            defineOptions = {
                'azureFunctionBaseUrl': JSON.stringify(azureFunctionBaseUrl),
                'aadClientId': JSON.stringify(aadClientId),
                'isDev':JSON.stringify(isDev),
            }
        } else {
            // specify dev settings here
            defineOptions = {
                'azureFunctionBaseUrl': JSON.stringify('https://app-shared-svc-ud-parma-dev.azurewebsites.net'),
                'aadClientId': JSON.stringify('b407b2b3-b500-4ea9-92f1-ca4c28558347'),
                'isDev':JSON.stringify(false),
            }
        }

        return merge(config, {
            plugins: [
                new webpack.DefinePlugin(defineOptions)
            ]
        });
    }
});

// /* fast-serve */
// const { addFastServe } = require("spfx-fast-serve-helpers");
// addFastServe(build);
// /* end of fast-serve */

build.initialize(require('gulp'));

