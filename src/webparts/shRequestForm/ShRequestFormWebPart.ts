import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'ShRequestFormWebPartStrings';
import ShRequestForm from './components/ShRequestForm';
import { IShRequestFormProps } from './components/IShRequestFormProps';
import { AadHttpClient } from '@microsoft/sp-http';
import {CONST} from "../../config/const";

export interface IShRequestFormWebPartProps {
  description: string;
}

export default class ShRequestFormWebPart extends BaseClientSideWebPart <IShRequestFormWebPartProps> {
  protected token: any = null;
  protected aadClient: any = null;
  public render(): void {
    const element: React.ReactElement<IShRequestFormProps> = React.createElement(
      ShRequestForm,
      {
        description: this.properties.description,
        url: this.context.pageContext.web.absoluteUrl,
       // context:this.context,
        token: this.token,
        aadClient: this.aadClient,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    this.context.aadTokenProviderFactory.getTokenProvider().then((provider): void => {
      provider.getToken(CONST.aadClientId).then((token): void => {
        this.token = token;
        console.log("tokenAAD:" + token);
      }, err => console.log("errorTokenAAD:" + err));
    }, err => console.log("errorGetProvider:" + err));

    return new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
      const clientPromises = [];
      // clientPromises.push(
      //   this.context.msGraphClientFactory
      //     .getClient()
      //     .then((gclient: MSGraphClient): void => {
      //       this.graphClient = gclient;
      //       //console.log("gClient:" + this.graphClient);
      //       return this.graphClient;
      //     }, err => console.log("errorGetGraphClient:" + err))
      // );

      clientPromises.push(
        this.context.aadHttpClientFactory
          .getClient(CONST.aadClientId)
          .then((client: AadHttpClient): void => {
            this.aadClient = client;
            //console.log("aadClient:" + this.aadClient);
            return this.aadClient;
          }, err => console.log("errorGetaadClient:" + err))
      );
          
      Promise.all(clientPromises).then(
        response => {
          // console.log(response[0]);
          // console.log(response[1]);
          resolve();
        }
      );

    });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
