import * as React from 'react';
import { observer } from 'mobx-react';
import { HashRouter as Router, Route } from 'react-router-dom';
//import Menu from './Menu';
import { NewForm } from './NewForm';
import { DisplayForm } from './DisplayForm';
import { EditForm } from './EditForm';
// import Grid from "./grid/Grid";
// import ByBuyerReportGrid from "./grid/ByBuyerReportGrid";
// import ByRequestorReportGrid from "./grid/ByRequestorReportGrid";
// import ByManagerReportGrid from "./grid/ByManagerReportGrid";
// import AllReportGrid from "./grid/AllReportGrid";
import AgreementRequest from '../../../stores/AgreementRequest';
//import GridStore from '../../../stores/GridStore';
// import ReportStore from '../../../stores/ReportStore';
import { initializeIcons } from '@uifabric/icons';
interface IAppContentProps{
    store:any;
    //context:any;
    aadClient: any;
  token: any;
  isNewRequest:any;
  ItemID:any;
  Mode:any;
}
@observer
export default class AppContent extends React.Component<IAppContentProps,{}> {

    constructor(props:IAppContentProps) {
        super(props);
        this.state = {
            gridName: ''
        };
    }

    public componentWillMount() {
       // ReportStore.initialize();
    }

   public componentDidMount() {
        // get current path from URL bar
        // display appropriate content
        // var currentPath = window.location.hash.substr(1);
        // //GridStore.setUserId(this.props.store.CurrentUser.Id);
        // this.changePath(currentPath, "");
        // initializeIcons(undefined, { disableWarnings: true });
    }

    // changes content in the grid depending on URL
    public changePath = (path, name) => {
        //GridStore.changePath(this.props.history, path, name);
    }


    public render(): React.ReactElement{
        return ( 
            <div>
            {this.props.isNewRequest && <NewForm
            user={this.props.store.CurrentUser}
            //store={null}
            store={AgreementRequest}
            history={history}
            aadClient={this.props.aadClient}
            token={this.props.token} 
           // context={this.props.context}
            // requestDigest={this.props.store.RequestDigest}
        />
        }
        {!this.props.isNewRequest && this.props.Mode==="Display" &&
        <DisplayForm
        id={this.props.ItemID}
        user={this.props.store.CurrentUser}
        //store={null}
        store={AgreementRequest}
        history={history}
        aadClient={this.props.aadClient}
        token={this.props.token} 
       // context={this.props.context}
        // requestDigest={this.props.store.RequestDigest}
    />
        }
          {!this.props.isNewRequest && this.props.Mode!=="Display" &&
          <EditForm 
          id={this.props.ItemID}
          user={this.props.store.CurrentUser}
          //store={null}
          store={AgreementRequest}
          history={history}
          aadClient={this.props.aadClient}
          token={this.props.token} 
         // context={this.props.context}
          // requestDigest={this.props.store.RequestDigest}
          />
        }
        </div>
        );
    }
}



