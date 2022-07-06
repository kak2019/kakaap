import { sp } from "@pnp/sp/presets/all";
import * as MobiX from 'mobx';
import User from "../models/User";
import { CONST } from '../config/const';


class AppStoreClass {
   @MobiX.observable private AppName:any="AP Agreements";
   @MobiX.observable public IsInit:any=false;//TODO-need to fix
   @MobiX.observable private CurrentUser:any='';
   @MobiX.observable private Sidebar:any=[];
   @MobiX.observable private ShowSidebar:any=false;
  
   @MobiX.action
  public initialize=()=>{
  //  var that = this;   
  const promise = new Promise((resolve) =>{         
    this.getCurrentUser()
    .then(result=>{
        this.getUserPermissions(result);
    }).then(()=>{
        this.getSidebar();
    }).then(()=>{
        this.IsInit = true;
        resolve(this.IsInit);
    });
    });
    return promise;
}

private toggleSidebar(){
    MobiX.runInAction(() => {
        this.ShowSidebar = !this.ShowSidebar;
    });
}

private closeSidebar(){
    MobiX.runInAction(() => {
        this.ShowSidebar = false;
    });
}

@MobiX.action
private getCurrentUser=()=>{
   const promise = new Promise((resolve) => {
        sp.web.currentUser.get()
        .then(result => {
            MobiX.runInAction(() => {
                this.CurrentUser = new User(result.Id, result.Title, result.LoginName);
            });
           // return result.Id;
            resolve(result.Id);
        });
    });
    return promise;
   // return null;
}

@MobiX.action
private getUserPermissions=(userId:any)=>{
    const promise = new Promise((resolve) => {
        sp.web.siteUsers.getById(userId).groups.get().then(response => {
            response.forEach(securityGroup => {
                if (securityGroup.Title === CONST.pamAdminGroup) {
                    MobiX.runInAction(() => {
                        this.CurrentUser.IsPamAdmin = true;
                    });
                }
                if (securityGroup.Title === CONST.agreementControllersGroup) {
                    MobiX.runInAction(() => {
                        this.CurrentUser.IsAgreementController = true;
                    });
                }
                if (securityGroup.Title === CONST.sourcingControllersGroup) {
                    MobiX.runInAction(() => {
                        this.CurrentUser.IsSourcingController = true;
                    });
                }
                if (securityGroup.Title === CONST.admins){
                    MobiX.runInAction(() => {
                    this.CurrentUser.IsAdmin = true;
                    });
                }
            });

            resolve(response);
        });
    });
    return promise;
}

@MobiX.action
private getSidebar=()=>{
    const promise = new Promise((resolve) => {
        sp.web.navigation.quicklaunch
        .expand("Children")
        .select("Children", "Title", "Url", "Id")
        .get()
        .then(response => {
            const sidebar = [];
            response.forEach((item:any)=>{   
                var subItems = [];
                
                const menuItem = {
                    name : item.Title,
                    url : item.Url,
                    key : item.Id,
                    links : null
                };   
                
                if (item.Children.results.length !== 0){
                    item.Children.results.forEach((subItem)=>{
                        const subMenuItem = {
                            name : subItem.Title,
                            url : subItem.Url,
                            key : subItem.Id
                        };
                        subItems.push(subMenuItem);
                    });    
                    menuItem.links = subItems; 
                }
                sidebar.push(menuItem);
            });

            MobiX.runInAction(() => {
                this.Sidebar = sidebar;
            });

            resolve(response);        
        });
    });
    return promise;
}
  
  constructor() {
     // this.initialize();
    // MobiX.extendObservable(this, {
    //     AppName: this.AppName,
    //     CurrentUser: this.CurrentUser,
    //     Sidebar: this.Sidebar,
    //     ShowSidebar: this.ShowSidebar,
    //     IsInit:this.IsInit,
       
        
      
    // });
  }
}

const AppStore = new AppStoreClass();

export default AppStore;