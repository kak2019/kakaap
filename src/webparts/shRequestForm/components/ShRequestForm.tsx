import * as React from 'react';
import styles from './ShRequestForm.module.scss';
import { IShRequestFormProps } from './IShRequestFormProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { pnpConfig } from '../../../config/pnp.config';
import { sp } from "@pnp/sp/presets/all";
import {Fabric} from 'office-ui-fabric-react/lib/Fabric'  ;
import AppContent from "./AppContent";
import AppStore from "../../../stores/AppStore";
import './App.css';
import { initializeIcons } from '@uifabric/icons';
import Helpers from '../../../config/Helpers';

interface IShRequestFormState{
  isLoading:boolean;
  isNewRequest: boolean;
  ItemID:any;
  Mode:any;
}

export default class ShRequestForm extends React.Component<IShRequestFormProps, IShRequestFormState> {

  constructor(props: IShRequestFormProps) {
    super(props);
    sp.setup((pnpConfig(this.props.url)));
    this.state = { isLoading: false,
      isNewRequest:Helpers.goingToCreateNewRequest(),
      ItemID:Helpers.getParameter('id'),
      Mode:Helpers.getParameter('mode') };
    // AppStore.initialize().then(response=>{
    //   console.log('appstore response:',response);
    //   console.log('appstore init:',AppStore.IsInit);
    // });
  }
  public componentWillMount() {
    initializeIcons(undefined, { disableWarnings: true });
  }
  public componentDidMount() {
    AppStore.initialize().then(response=>{
      console.log('appstore response:',response);
      console.log('appstore init:',AppStore.IsInit);
      this.setState({isLoading: AppStore.IsInit});
    });
  }
  public render(): React.ReactElement<IShRequestFormProps> {
    return (
      <div className={styles.rootWP}>
         {
        this.state.isLoading ?
      <AppContent {...this.props}
      store ={AppStore}
      isNewRequest={this.state.isNewRequest}
      ItemID={this.state.ItemID}
      Mode={this.state.Mode}/> : <div>Loading....</div>
        }
      </div>
    );
  }
}
