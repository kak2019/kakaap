import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/sites";
import { IContextInfo } from "@pnp/sp/sites";
import * as React from 'react';
import { AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';


const getParameter = (name) => {
    let queryString = document.location.search.substring(1);
    let params = queryString.split('&');
    for (let param of params) {
        let keyValue = param.split('=');
        if (keyValue[0].toLowerCase() === name.toLowerCase()) {
            return keyValue[1];
        }
    }
};

const goingToCreateNewRequest = () => {
    let url = document.location.search.toLowerCase();
    if (url.indexOf('?id=') === -1 && url.indexOf('&id=') === -1){
        return true;
    }
    return false;
};



const redirectToSourcePage = () => {
    try {
       let sourcePage = getParameter('Source');
       document.location.href = decodeURIComponent(sourcePage);
    }
    catch(e){console.log(e);}
};

function getResponseFromAzureFunction(apiUri: string,aadClient:AadHttpClient): Promise<any> {
    return aadClient.get(apiUri, AadHttpClient.configurations.v1)
        .then((rawResponse: HttpClientResponse) => {
            return rawResponse.json();
        })
        .then((jsonResponse) => {
            return jsonResponse;
        }) as Promise<any>;
}



const helpers = {
    getParameter,
    goingToCreateNewRequest,
    redirectToSourcePage,
    getResponseFromAzureFunction,
};

export default helpers;