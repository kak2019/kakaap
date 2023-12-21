import * as MobiX from 'mobx';

import { sp } from "@pnp/sp/presets/all";
// import Promise from 'promise';

import { agreementTypeOptions } from '../config/agreementTypeOptions';
import { CONST } from '../config/const';
import { appConfig } from '../config/app.config';
import { decisionTypeOptions } from '../config/decisionTypeOptions';
import helpers from '../config/Helpers';

class AgreementRequestClass {
  // region BASIC PROPERTIES
  @MobiX.observable private Title: any = '';
  @MobiX.observable private Status: any = '';
  @MobiX.observable private RequestorLoginName: any = '';
  @MobiX.observable private RequestorName: any = '';
  @MobiX.observable private ResponsibleBuyerLoginName: any = '';
  @MobiX.observable private ResponsibleBuyerName: any = '';
  @MobiX.observable private ManagerLoginName: any = '';
  @MobiX.observable private ManagerName: any = '';
  @MobiX.observable private ParmaNumber: any = '';
  @MobiX.observable private DecisionType: any = '';
  @MobiX.observable private SupplierName: any = '';
  @MobiX.observable private ConnectAgreementTo: any = '';
  @MobiX.observable private AgreementType: any = '';
  @MobiX.observable private AgreementDescription: any = '';
  @MobiX.observable private ProductDevelopmentLoginName: any = '';
  @MobiX.observable private ProductDevelopmentName: any = '';
  @MobiX.observable private AgmntControllersName: any = '';
  @MobiX.observable private MiscApproverLoginName: any = '';
  @MobiX.observable private MiscApproverName: any = '';
  @MobiX.observable private YearlySpend: any = '';
  //contract
  @MobiX.observable private contractSpend: any = '';
  @MobiX.observable private IsPrice: boolean = false;
  @MobiX.observable private IsPriceOrSoftware: boolean = false;
  @MobiX.observable private PriceDetails: any = '';
  @MobiX.observable private RawMaterialDetails: any = '';
  @MobiX.observable private IsAmendment: boolean = false;
  // new strategic
  @MobiX.observable private IsstrategicSegment: boolean = false;
  @MobiX.observable private strategicSegmentDetails: any = '';
  @MobiX.observable private AmendmentDetails: any = '';
  @MobiX.observable private MainSegmentCode: any = '';
  @MobiX.observable private IsDeviation: boolean = false;
  @MobiX.observable private DeviationDetails: any = '';
  @MobiX.observable private ApprovalLevel: any = '';
  @MobiX.observable private FunctionBy: any = '';
  // @MobiX.observable private  FunctionFor: any=[];
  @MobiX.observable private ValidDateFrom: any = null;
  @MobiX.observable private ValidDateTo: any = null;
  @MobiX.observable private ReminderDate: any = null;
  @MobiX.observable private ProjectCode: any = '';
  @MobiX.observable private SourcingCaseNumber: any = '';
  @MobiX.observable private IsHide: boolean = false;
  @MobiX.observable private HideDetails: any = '';
  @MobiX.observable private IsConfidential: boolean = false;
  @MobiX.observable private ExternalNotesVSIB: any = '';
  @MobiX.observable private PhysicalStorage: any = '';
  @MobiX.observable private ReturnTo: any = '';
  @MobiX.observable private NextApproverLoginName: any = '';
  @MobiX.observable private NextApproverName: any = '';
  // Below indicates if misc has been set already
  @MobiX.observable private IsMiscSet: boolean = false;
  //ContactAdress: '';
  @MobiX.observable private SignedAgreements: any = '';
  @MobiX.observable private ReturnToName: any = '';
  @MobiX.observable private ReturnToPhone: any = '';
  @MobiX.observable private ReturnToCompany: any = '';
  @MobiX.observable private ReturnToCountry: any = '';
  @MobiX.observable private ReturnToCity: any = '';
  @MobiX.observable private ReturnToZip: any = '';
  @MobiX.observable private ReturnToAddress: any = '';
  @MobiX.observable private ResponsibleBuyerPhone: any = '';
  @MobiX.observable private ResponsibleBuyerCompany: any = '';
  @MobiX.observable private ResponsibleBuyerCountry: any = '';
  @MobiX.observable private ResponsibleBuyerCity: any = '';
  @MobiX.observable private isHiddenFromCopy: boolean = true;

  /* JSON Objects */
  @MobiX.observable private ApproverChain: any = [];
  @MobiX.observable private ContactAdress: any = [];
  // endregion

  @MobiX.observable private token: any;
  @MobiX.observable private aadClient: any;

  constructor() {

  }

  // region ERROR HANDLING
  @MobiX.observable private isError: boolean = false;
  @MobiX.observable private errorTitle: any = '';
  @MobiX.observable private errorMessage: any = '';


  public triggerErrorModal(title, error) {
    MobiX.runInAction(() => {
      this.errorTitle = title;
      this.errorMessage = error ? error.message : '';
      this.isError = true;
      this.isLoading = false;
      this.infoMessage = '';
    });
  }

  public closeErrorModal() {
    MobiX.runInAction(() => {
      this.isError = false;
      this.errorTitle = '';
      this.errorMessage = '';
    });
  }

  public resetModal() {
    this.closeErrorModal();
    this.closeLoading();
  }
  // endregion


  // region LOADING BOXES
  @MobiX.observable private isLoading: boolean = false;
  @MobiX.observable private infoMessage: any = '';


  public triggerLoading(message) {
    MobiX.runInAction(() => {
      this.isLoading = true;
      this.infoMessage = message;
    });
  }

  public closeLoading() {
    MobiX.runInAction(() => {
      this.isLoading = false;
      this.infoMessage = '';
    });
  }
  // endregion


  // region CONFIRMATION BOXES
  @MobiX.observable private isConfirmation: boolean = false;
  @MobiX.observable private confirmationMessage: any = '';
  @MobiX.observable private confirmationYesCallback: any = null;
  @MobiX.observable private confirmationNoCallback: any = null;

  public triggerConfirmation(message, callback) {
    MobiX.runInAction(() => {
      this.isConfirmation = true;
      this.confirmationMessage = message;
      const _that = this;
      this.confirmationYesCallback = () => {
        _that.closeConfirmation();
        callback();
      };
      this.confirmationNoCallback = () => {
        _that.closeConfirmation();
      };
    });
  }

  public closeConfirmation() {
    MobiX.runInAction(() => {
      this.isConfirmation = false;
      this.confirmationMessage = '';
      this.confirmationYesCallback = null;
      this.confirmationNoCallback = null;
    });
  }
  // endregion

  // region next approver picker
  @MobiX.observable private isPicker: boolean = false;
  @MobiX.observable private approverCancelCallback: any = null;
  @MobiX.observable private approverSaveCallback: any = null;

  public showApproverPicker(callback) {
    MobiX.runInAction(() => {
      this.isPicker = true;
      const _that = this;

      this.approverSaveCallback = () => {
        _that.closeApproverPicker();
        callback();
      };

      this.approverCancelCallback = () => {
        _that.closeApproverPicker();
      };

    });
  }

  public closeApproverPicker() {
    MobiX.runInAction(() => {
      this.isPicker = false;
      this.approverSaveCallback = null;
      this.approverCancelCallback = null;
    });
  }
  // endregion


  // region reassignment picker
  @MobiX.observable private isReassignment: boolean = false;
  @MobiX.observable private reassignmentSaveCallback: any = null;
  @MobiX.observable private reassignmentCancelCallback: any = null;

  public showReassignmentPicker() {
    MobiX.runInAction(() => {
      this.isReassignment = true;
      const _that = this;

      this.reassignmentSaveCallback = function (taskId, itemId, history) {
        sp.web.ensureUser(this.NextApproverLoginName)

          .then(result => {
            const { Id: userId/*, Email: userEmail*/ } = result.data;
            // 1. Save new approver for task
            sp.web.lists.getByTitle(CONST.taskListName).items.getById(taskId).update({
              AssignedToId: userId
            })
              .then(() => {
                // 2. Update 'Next approver' field with new person
                sp.web.lists.getByTitle(CONST.listName).items.getById(itemId).update({
                  am_nextApproverId: userId
                })
                  .then(() => {
                    // 3. Send an email to the new approver
                    // This step is probably not needed, emails are being sent automatically by SharePoint
                    /* const emailProps = {
                      To: [userEmail],
                      //To: ['jakub.jemieljanczuk@volvo.com'],
                      Subject: "Task Assigned - GTP Purchasing - Request for approval",
                      Body: `<div style='font-family: Segoe UI'>Hello, <br /><br />
                            ${this.ResponsibleBuyerName} has submitted an agreement for review.<br/>
                            Open the <a href='${pnpConfig.sp.baseUrl}/form/display/${itemId}'>${this.Title}</a> to approve/reject.<br/><br/>
                            Thank you!
                            <div>`
                    } */
                    //pnp.sp.utility.sendEmail(emailProps)
                    //.then(()=>{
                    // 4. Add new approver to Approvers group
                    sp.web.siteGroups.getByName(CONST.approversGroup).users.add(
                      this.NextApproverLoginName
                    )
                      .then(() => {
                        this.closeReassignmentPicker();
                        //this.goBack(history);
                        this.redirectToSourcePage();
                      });
                    //});
                  });
              });
          });
      };

      this.reassignmentCancelCallback = () => {
        _that.closeReassignmentPicker();
      };

    });
  }

  public closeReassignmentPicker() {
    MobiX.runInAction(() => {
      this.isReassignment = false;
      this.reassignmentSaveCallback = null;
      this.reassignmentCancelCallback = null;
    });
  }
  // endregion


  // region COMPUTED VALUES
  public get ValidDateFromAsDate() {
    if (this.ValidDateFrom !== null) {
      return new Date(this.ValidDateFrom);
    }
    else return null;
  }


  public get ValidDateToAsDate() {
    if (this.ValidDateTo !== null) {
      return new Date(this.ValidDateTo);
    }
    else return null;
  }

  public get ReminderDateAsDate() {
    if (this.ReminderDate !== null) {
      return new Date(this.ReminderDate);
    }
    else return null;
  }
// this.DecisionType === 'Non Sourcing Decision'
  public get showYearlySpend() {
    return (!(this.AgreementType === 'Confidentiality Agreement' || this.AgreementType === 'Parental Guarantee Agreement')
      && this.DecisionType === 'Sourcing Decision'
    );
  }
  public get showStrategic() {
    return (!(this.AgreementType === 'Confidentiality Agreement' || this.AgreementType === 'Parental Guarantee Agreement')
      && this.DecisionType === 'Sourcing Decision'
    );
  }
  public get showDeviation() {
    return (this.AgreementType === 'Confidentiality Agreement');
  }

  public get showContractSpend() { 
    return (!(this.AgreementType === 'Confidentiality Agreement' || this.AgreementType === 'Parental Guarantee Agreement')
      && this.DecisionType === 'Non Sourcing Decision'
    );
  }


  public get contactDetailsRequired() {
    return this.ReturnTo === 'Supplier';
  }

  public get editableByBuyer() {
    return this.Status === 'Draft' || this.Status === 'Rejected';
  }

  public get removableByBuyer() {
    return this.Status === 'Draft' || this.Status === 'Rejected' || this.Status === 'Sent for approval';
  }

  public get agreementTypeOptions() {
    const AgreementTypeOptions = agreementTypeOptions;
    let exclusion = 'Software License';

    if (this.DecisionType === 'Sourcing Decision') {
      exclusion = 'Software Development';
    }

    return AgreementTypeOptions.filter((element) => element.key !== exclusion);
  }


  public get approvalLevel() {
    //let approvalLvl = 'Senior Vice President';
    let approvalLvl = 'Manager';
    console.log("看见就要开心一点哦6!");
    //pass
    if(this.DecisionType ==="Sourcing Decision"){
      switch(this.AgreementType){
        case 'Confidentiality Agreement': this.IsDeviation?  approvalLvl = 'Manager' : approvalLvl = 'Agreement Controller';break;
        case 'Parental Guarantee Agreement' : approvalLvl = 'Manager';break;
      }
      if(!(this.AgreementType == "Confidentiality Agreement" || this.AgreementType === "Parental Guarantee Agreement") ){
        this.IsstrategicSegment? approvalLvl = "Senior Vice President" : this.YearlySpend==="< 25M JPY (B3-VP)" ? approvalLvl = "Vice President" :approvalLvl = "Senior Vice President";
        }
    }else if( this.DecisionType === "Non Sourcing Decision"){
      switch(this.AgreementType){
        case 'Confidentiality Agreement': this.IsDeviation?  approvalLvl = 'Manager' : approvalLvl = 'Agreement Controller';break;
        case 'Parental Guarantee Agreement' : approvalLvl = 'Manager';break;
      }
      if(!(this.AgreementType == "Confidentiality Agreement" || this.AgreementType === "Parental Guarantee Agreement") ){
        switch(this.contractSpend){
          case '< 75m JPY (B4-Manager)' : approvalLvl = 'Manager';break;
          case '< 350M JPY (B3-VP)' : approvalLvl = "Vice President";break;
          case 'Unlimted (B2-SVP)' : approvalLvl = "Senior Vice President";break;
        }
        }
    }
  //   if(this.IsstrategicSegment){
  //     approvalLvl = 'Senior Vice President'
  //   }else{
  //   switch(this.YearlySpend){
  //     //case  '< 500 000 SEK Manager': approvalLvl = 'Manager'; break;
  //     case '< 25M JPY (B3-VP)': approvalLvl = 'Vice President'; break;
  //     case '>= 25M JPY (B2-SVP)': approvalLvl = 'Senior Vice President'; break;
  //   }
  // }
    return approvalLvl;
  }
  // endregion


  // region STORE VALIDATION
  public get decisionTypeInvalid() {
    return this.DecisionType === '' ? true : false;
  }

  public get parmaNumberInvalid() {
    return this.ParmaNumber === '' ? true : false;
  }

  public get agreementTypeInvalid() {
    return this.AgreementType === '' ? true : false;
  }

  public get yearlySpendInvalid() {
    return this.showYearlySpend === true && this.YearlySpend === '' ? true : false;
  }
  public get contractSpendInvalid() {
    return this.showContractSpend === true && this.contractSpend === '' ? true : false;
  }

  public get amendmentInvalid() {
    return this.IsAmendment === true && this.AmendmentDetails === '' ? true : false;
  }
  public get strategicSegmentInvalid() {
    return this.IsstrategicSegment === true && this.strategicSegmentDetails === '' ? true : false;
  }
  public get rawMaterialInvalid() {
    return this.AgreementType === 'Raw Material Agreement' && this.RawMaterialDetails === '' ? true : false;
  }

  public get priceInvalid() {
    return (this.AgreementType === 'Price Agreement'
      && this.IsPrice === true)
      && this.PriceDetails === '' ? true : false;
  }

  public get mainSegmentCodeInvalid() {
    return this.MainSegmentCode === '' ? true : false;
  }

  public get deviationInvalid() {
    return this.IsDeviation === true && this.DeviationDetails === '' ? true : false;
  }

  public get hideInvalid() {
    return this.IsHide === true && this.HideDetails === '' ? true : false;
  }

  public get responsibleBuyerInvalid() {
    return this.ResponsibleBuyerLoginName === '' ? true : false;
  }

  public get nextApproverInvalid() {
    return this.NextApproverLoginName === '' ? true : false;
  }

  get managerInvalid() {
    return this.ManagerLoginName === '' ? true : false;
  }

  get pdDevelopmentInvalid() {
    return this.AgreementType === 'Development Agreement' && this.DecisionType === decisionTypeOptions[1].key && this.ProductDevelopmentLoginName === '' ? true : false;
  }

  get miscApproverInvalid() {
    return this.AgreementType === 'Miscellaneous Agreement' && this.MiscApproverLoginName === '' ? true : false;
  }
  public get validDateFromInvalid() {
    return this.ValidDateFrom === null ? true : false;
  }

  public get validDateToInvalid() {
    return (this.ValidDateTo === null && this.IsPriceOrSoftware === true) ? true : false;
  }

  //Reminder Date picker was added to New and Display views, but not to Edit form. The logic below relies on Title property for making ReminderDate not mandatory in Edit view
  public get validReminderDateInvalid() {
    return (this.ReminderDate === null && this.IsPrice === true && this.Title === '') ? true : false;
  }
  public get sourcingCaseNumberInvalid() {
    return (this.DecisionType === 'Sourcing Decision'
      && this.SourcingCaseNumber === '')
      ? true : false;
  }

  public get signedAgreementInvalid() {
    return this.SignedAgreements === '' ? true : false;
  }


  public get physicalStorageInvalid() {
    return this.PhysicalStorage === '' ? true : false;
  }


  public get returnAgreementToInvalid() {
    return this.ReturnTo === '' ? true : false;
  }


  public get contactDetailsInvalid() {
    return this.ReturnTo === 'Supplier'
      &&
      (
        this.ReturnToName === '' || this.ReturnToPhone === ''
        || this.ReturnToCompany === '' || this.ReturnToCountry === ''
        || this.ReturnToCity === '' || this.ReturnToZip === ''
        || this.ReturnToAddress === ''
      )
      ? true : false;
  }


  public get formInvalid() {
    return this.decisionTypeInvalid
      || this.parmaNumberInvalid
      || this.agreementTypeInvalid
      || this.yearlySpendInvalid
      || this.amendmentInvalid
      || this.rawMaterialInvalid
      || this.priceInvalid
      || this.mainSegmentCodeInvalid
      || this.deviationInvalid
      || this.hideInvalid
      || this.responsibleBuyerInvalid
      || this.managerInvalid
      || this.pdDevelopmentInvalid
      || this.miscApproverInvalid
      || this.validDateFromInvalid
      || this.sourcingCaseNumberInvalid
      || this.physicalStorageInvalid
      || this.returnAgreementToInvalid
      || this.contactDetailsInvalid
      || this.signedAgreementInvalid
      || this.validDateToInvalid
      || this.validReminderDateInvalid;
  }
  // endregion


  // region ACTIONS
  public resetValues() {
    MobiX.runInAction(() => {
      this.Title = '';
      this.Status = '';
      this.RequestorLoginName = '';
      this.ResponsibleBuyerLoginName = '';
      this.ResponsibleBuyerName = '';
      this.ManagerLoginName = '';
      this.ManagerName = '';
      this.ParmaNumber = '';
      this.DecisionType = '';
      this.SupplierName = '';
      this.ConnectAgreementTo = '';
      this.AgreementType = '';
      this.AgreementDescription = '';
      this.ProductDevelopmentLoginName = '';
      this.ProductDevelopmentName = '';
      this.AgmntControllersName= '';
      this.MiscApproverLoginName = '';
      this.MiscApproverName = '';
      this.YearlySpend = '';
      this.contractSpend = '';
      this.IsPrice = false;
      this.PriceDetails = '';
      this.RawMaterialDetails = '';
      this.IsAmendment = false;
      this.AmendmentDetails = '';
      // new item strategicSegment
      this.IsstrategicSegment=false;
      this.strategicSegmentDetails='';
      this.MainSegmentCode = '';
      this.IsDeviation = false;
      this.DeviationDetails = '';
      this.ApprovalLevel = '';
      this.FunctionBy = '';
      // this.FunctionFor = [];
      this.ValidDateFrom = null;
      this.ValidDateTo = null;
      this.ProjectCode = '';
      this.SourcingCaseNumber = '';
      this.IsHide = false;
      this.HideDetails = '';
      this.IsConfidential = false;
      this.ExternalNotesVSIB = '';
      this.PhysicalStorage = '';
      this.ReturnTo = '';
      this.ContactAdress = '';
      this.SignedAgreements = '';
      this.ReturnToName = '';
      this.ReturnToPhone = '';
      this.ReturnToCompany = '';
      this.ReturnToCountry = '';
      this.ReturnToCity = '';
      this.ReturnToZip = '';
      this.ReturnToAddress = '';
      this.ReminderDate = null;

      /* JSON Objects */
      this.ApproverChain = [];
    });
  }

  public setCurrentUser(title, login) {
    MobiX.runInAction(() => {
      this.RequestorLoginName = login;
      this.RequestorName = title;
    });

  }
  // endregion


  // region EVENT HANDLERS
  // public onFunctionSelected(item) {
  //   const array = this.FunctionFor.slice();
  //   if (item.selected) {
  //     array.push(item.key);
  //   }
  //   else {
  //     const index = array.indexOf(item.key);
  //     array.splice(index, 1);
  //   }
  //   this.FunctionFor = array;
  // }

  public onBuyerDeselected() {
    MobiX.runInAction(() => {
      this.ResponsibleBuyerLoginName = '';
      this.ResponsibleBuyerName = '';
      this.ManagerLoginName = '';
      this.ManagerName = '';
    });
  }


  public onBuyerSelected(item) {
    MobiX.runInAction(() => {
      this.ResponsibleBuyerLoginName = item.LoginName;
      this.ResponsibleBuyerName = item.DisplayName;
    });

    sp.profiles.getPropertiesFor(this.ResponsibleBuyerLoginName)
      .then(result => {
        const props = result.UserProfileProperties.results;
        for (const prop of props) {
          if (prop.Key === "WorkPhone") this.ResponsibleBuyerPhone = prop.Value;
          if (prop.Key === "DepartmentTitle") this.ResponsibleBuyerCompany = prop.Value;
          if (prop.Key === "Country") this.ResponsibleBuyerCountry = prop.Value;
          if (prop.Key === "City") this.ResponsibleBuyerCity = prop.Value;
        }
      });

    this.updateManagersChain();
  }

  public onApproverSelected(item) {
    MobiX.runInAction(() => {
      this.NextApproverLoginName = item.LoginName;
      this.NextApproverName = item.DisplayName;
    });
  }

  public onApproverDeselected() {
    MobiX.runInAction(() => {
      this.NextApproverLoginName = '';
      this.NextApproverName = '';
    });
  }

  public onFilesLoaded(files) {
    let array = [];
    if (this.SignedAgreements !== '') {
      array = this.SignedAgreements.split('#');
    }
    for (let i = 0; i < files.length; ++i) {
      array.push(files[i].Name);
    }
    MobiX.runInAction(() => {
      this.SignedAgreements = array.join('#');
    });
  }

  public onSelectReturnTo(value) {
    this.ReturnTo = value;
    if (this.ReturnTo === 'Buyer') {
      this.ReturnToName = this.ResponsibleBuyerName;
      this.ReturnToPhone = this.ResponsibleBuyerPhone;
      this.ReturnToCompany = this.ResponsibleBuyerCompany;
      this.ReturnToCountry = this.ResponsibleBuyerCountry;
      this.ReturnToCity = this.ResponsibleBuyerCity;

    }
    else {
      this.ReturnToName = '';
      this.ReturnToPhone = '';
      this.ReturnToCompany = '';
      this.ReturnToCountry = '';
      this.ReturnToCity = '';

    }
  }

  public onDecisionTypeSelected(value) {
    MobiX.runInAction(() => {
      this.DecisionType = value;

      if (value !== decisionTypeOptions[1].key) {
        this.ProductDevelopmentLoginName = '';
        this.ProductDevelopmentName = '';
      }
    });
  }

  public onAgreementTypeSelected(value) {
    MobiX.runInAction(() => {
      this.IsPriceOrSoftware = false;
      this.IsPrice = false;
      this.AgreementType = value;

      if (value === 'Price Agreement') {
        this.IsPrice = true;
      }

      if (value === 'Price Agreement' || value === 'Software Development') {
        this.IsPriceOrSoftware = true;
      }

      if (value !== 'Development Agreement' || this.DecisionType !== decisionTypeOptions[1].key) {
        this.ProductDevelopmentLoginName = '';
        this.ProductDevelopmentName = '';
      }

      if (value !== 'Miscellaneous Agreement') {
        this.MiscApproverLoginName = '';
        this.MiscApproverName = '';
      }
    });
  }


  public onPdDeselected() {
    MobiX.runInAction(() => {
      this.ProductDevelopmentLoginName = '';
      this.ProductDevelopmentName = '';
    });
  }

  public onMADeselected() {
    MobiX.runInAction(() => {
      this.MiscApproverLoginName = '';
      this.MiscApproverName = '';
    });
  }

  public onPdSelected(item) {
    MobiX.runInAction(() => {
      this.ProductDevelopmentLoginName = item.LoginName;
      this.ProductDevelopmentName = item.DisplayName;
    });
  }

  public onMASelected(item) {
    MobiX.runInAction(() => {
      this.MiscApproverLoginName = item.LoginName;
      this.MiscApproverName = item.DisplayName;
    });
  }

  public copyParmaData() {
    var dataItem = this.ParmaNumber;
    var parmaURLValue = `${CONST.azureFunctionBaseUrl}/api/getparma/${dataItem}`;
    return helpers.getResponseFromAzureFunction(parmaURLValue, this.aadClient)
      .then(data => {
        if (data !== []) {
          if (data.internationalVersion !== null && typeof data.internationalVersion !== 'undefined') {
            this.ReturnToCompany = data.internationalVersion.englishName !== null ? data.internationalVersion.englishName : '';
            if (data.internationalVersion.address !== null && typeof data.internationalVersion.address !== 'undefined') {
              var addr = data.internationalVersion.address[0];
              this.ReturnToPhone = addr.phoneNumber !== null ? addr.phoneNumber : '';
              this.ReturnToCountry = addr.countryName !== null ? addr.countryName : '';
              this.ReturnToCity = addr.city !== null ? addr.city : '';
              this.ReturnToAddress = addr.addressLine !== null ? addr.addressLine : '';
              this.ReturnToZip = addr.postalCode !== null ? addr.postalCode : '';
            }
          }

        }
      });
  }


  public onParmaSelected(data) {
    MobiX.runInAction(() => {
      this.ParmaNumber = data.parmaID;
      if (data.internationalVersion !== null && typeof data.internationalVersion !== 'undefined') {
        var parmaCompanyName = data.internationalVersion.englishName;
        this.SupplierName = parmaCompanyName;
      }
    });
  }


  public onParmaDeselected() {
    MobiX.runInAction(() => {
      this.ParmaNumber = '';
      this.SupplierName = '';
    });
  }


  public onSegmentSelected(value) {
    MobiX.runInAction(() => {
      this.MainSegmentCode = value;
    });
  }


  public onSegmentDeselected() {
    MobiX.runInAction(() => {
      this.MainSegmentCode = '';
    });
  }


  public onSignedAgreementAdded(e) {
    if (e.files.length > 0) {
      let array = [];
      if (this.SignedAgreements !== '') {
        array = this.SignedAgreements.split('#');
      }
      for (let i = 0; i < e.files.length; ++i) {
        array.push(e.files[i].name);
      }
      MobiX.runInAction(() => {
        this.SignedAgreements = array.join('#');
      });
    }
  }


  public onSignedAgreementRemoved(e) {
    let array = this.SignedAgreements.split('#');
    for (let i = 0; i < e.files.length; ++i) {
      array = array.filter((element) => {
        return element !== e.files[i].name;
      });
    }
    MobiX.runInAction(() => {
      this.SignedAgreements = array.join('#');
    });
  }
  // endregion


  public getValue(input) {
    if (input === null) {
      return '';
    }
    return input;
  }


  // region SHAREPOINT CRUD OPERATIONS
  public deleteRequest(id, history) {
    this.triggerLoading("Removing request");

    const removalPromises = [];
    removalPromises.push(
      sp.web.lists.getByTitle(CONST.listName).items.getById(id).recycle()
    );

    removalPromises.push(
      sp.web.lists.getByTitle(CONST.libraryTitle).rootFolder.folders.getByName(id).recycle()
    );

    Promise.all(removalPromises)
      .then(() => {
        this.closeLoading();
        //this.goBack(history);
        this.redirectToSourcePage();
      })
      .catch(error => {
        this.triggerErrorModal('Issue with removing the request of ID: ' + id, error);
      });
  }
  public getGroupUsers():  Promise<any>{
    try {
    return sp.web.siteGroups.getByName(CONST.agreementControllersGroup).users.get().
    then(response => {
      if(response.length>0)
          {
              let r = response.map(item => (
                                      {
                                          key: item,
                                          name: item.Title,
                                          email: item.Email
                                      }
                                  ));
                  this.AgmntControllersName=r;
                                  return r;
          }
  });}catch (error) {
    console.log(error); 
}
    // then(result => {
    //   if (result.length>0) {
    //     this.AgmntControllersName = result[0].Title;
    //   }
    // });
  }

  public getRequest(id) {
    this.resetValues();
    this.triggerLoading("Loading request details");
    sp.web.lists.getByTitle(CONST.listName).items.getById(id)
      .select('Title', 'am_status', 'am_agreementDescription', 'am_agreementType', 'am_amendmentDetails', 'am_requestor/Title', 'am_requestor/Name',
        'am_buyer/Title', 'am_buyer/Name', 'am_manager/Title', 'am_manager/Name', 'am_decisionType', 'am_parmaNumber', 'am_supplierName', 'am_connectAgreementTo', 'am_isAmendment',
        'am_productDevelopment/Name', 'am_productDevelopment/Title',
        'am_miscApprover/Name', 'am_miscApprover/Title',
        'am_mainSegmentCode', 'am_isDeviation', 'am_deviationDetailsMultiline', 'am_rawMaterialDetails', 'am_isPrice', 'am_priceDetails', 'am_yearlySpend',
        'am_agreementSignedBy', 'am_agreementSignedFor', 'am_validFrom', 'am_validTo', 'am_projectCode', 'am_sourcingCaseNumber',
        'am_isHide', 'am_hideDetails', 'am_isConfidential', 'am_externalNotesVsib', 'am_physicalStorage', 'am_returnAgreementTo', 'am_contactAddress',
        'am_buyersManagersChain', 'am_isMiscApproverSet', 'am_reminderDate'
      )
      .expand('am_requestor', 'am_buyer', 'am_manager', 'am_productDevelopment', 'am_miscApprover')
      .get()
      .then(result => {
        MobiX.runInAction(() => {
          const approvers = JSON.parse(result.am_buyersManagersChain);
          this.ApproverChain = approvers;
          const contactAdress = this.parseContactAddressJson(this.getValue(result.am_contactAddress));
          this.Title = this.getValue(result.Title);
          this.Status = this.getValue(result.am_status);
          this.AgreementDescription = this.getValue(result.am_agreementDescription);
          this.AgreementType = this.getValue(result.am_agreementType);
          this.AmendmentDetails = this.getValue(result.am_amendmentDetails);
          this.RequestorName = this.getValue(result.am_requestor.Title);
          this.RequestorLoginName = this.getValue(result.am_requestor.Name);
          this.ResponsibleBuyerName = this.getValue(result.am_buyer.Title);
          this.ResponsibleBuyerLoginName = this.getValue(result.am_buyer.Name);
          this.ManagerName = this.getValue(result.am_manager.Title);
          this.ManagerLoginName = this.getValue(result.am_manager.Name);
          this.DecisionType = this.getValue(result.am_decisionType);
          this.ParmaNumber = this.getValue(result.am_parmaNumber);
          this.SupplierName = this.getValue(result.am_supplierName);
          this.ConnectAgreementTo = this.getValue(result.am_connectAgreementTo);
          this.IsAmendment = result.am_isAmendment;
          this.MainSegmentCode = this.getValue(result.am_mainSegmentCode);
          this.IsDeviation = result.am_isDeviation;
          this.DeviationDetails = this.getValue(result.am_deviationDetailsMultiline);
          this.RawMaterialDetails = this.getValue(result.am_rawMaterialDetails);
          this.IsPrice = result.am_isPrice;
          this.YearlySpend = this.getValue(result.am_yearlySpend);
          this.PriceDetails = this.getValue(result.am_priceDetails);
          this.FunctionBy = this.getValue(result.am_agreementSignedBy);
          // this.FunctionFor = result.am_agreementSignedFor ? result.am_agreementSignedFor.results : [];
          this.ValidDateFrom = result.am_validFrom;
          this.ValidDateTo = result.am_validTo;
          this.ReminderDate = result.am_reminderDate;
          this.ProjectCode = this.getValue(result.am_projectCode);
          this.SourcingCaseNumber = this.getValue(result.am_sourcingCaseNumber);
          this.IsHide = result.am_isHide;
          this.HideDetails = this.getValue(result.am_hideDetails);
          this.IsConfidential = result.am_isConfidential;
          this.ExternalNotesVSIB = this.getValue(result.am_externalNotesVsib);
          this.PhysicalStorage = this.getValue(result.am_physicalStorage);
          this.ReturnTo = this.getValue(result.am_returnAgreementTo);
          this.ReturnToName = contactAdress.Name;
          this.ReturnToPhone = contactAdress.Phone;
          this.ReturnToCompany = contactAdress.Company;
          this.ReturnToAddress = contactAdress.Address;
          this.ReturnToCity = contactAdress.City;
          this.ReturnToCountry = contactAdress.Country;
          this.ReturnToZip = contactAdress.ZipCode;
          // Below indicates if Misc approver has been set
          this.IsMiscSet = result.am_isMiscApproverSet;

          if (result.am_productDevelopment.Title) {
            this.ProductDevelopmentName = result.am_productDevelopment.Title;
          }
          if (result.am_productDevelopment.Name) {
            this.ProductDevelopmentLoginName = result.am_productDevelopment.Name;
          }
          if (result.am_miscApprover.Title) {
            this.MiscApproverName = result.am_miscApprover.Title;
          }
          if (result.am_miscApprover.Name) {
            this.MiscApproverLoginName = result.am_miscApprover.Name;
          }
          // this.updateManagersChain();
        });
      }).catch(error => {
        if (error.status === 404) {
          this.triggerErrorModal('Request was not found. It was probably deleted by other user.', error);
        } else {
          this.triggerErrorModal('Issue with getting request details, please contact support with screenshot of error.', error);
        }
      }).then(() => {
        this.closeLoading();
      });
  }

  public saveDraft(history) {
    this.saveWithStatus('Draft', history);
  }


  public sendForApproval(history) {
    this.saveWithStatus('Sent for approval', history);
  }


  public updateDraft(itemId, history) {
    let status = 'Draft';
    if (this.Status !== 'Rejected' && this.Status !== 'Draft') {
      status = this.Status;
    }
    this.updateWithStatus(itemId, status, history);
  }


  public updateForApproval(itemId, history) {
    this.updateWithStatus(itemId, 'Sent for approval', history);
  }


  public close(itemId, history) {
    sp.web.lists.getByTitle(CONST.listName).items.getById(itemId).update(
      {
        am_status: 'Closed',
        am_closedDate: new Date()
      }
    )
      .then(() => {
        //this.goBack(history);
        this.redirectToSourcePage();
      });
  }



  public saveApprover(itemId, history) {
    // Get user info
    this.triggerLoading("Setting approver...");
    sp.web.ensureUser(this.NextApproverLoginName)
      .then(result => {
        const approverId = result.data.Id;

        //Save user info as next approver
        // We have two consecutive calls to update list items, however they are by purpose.
        // We need to make sure that Next Approver is set properly before changin Misc approver flag
        sp.web.lists.getByTitle(CONST.listName).items.getById(itemId).update(
          {
            am_nextApproverId: approverId
          }
        )
          .then(() => {
            sp.web.lists.getByTitle(CONST.listName).items.getById(itemId).update(
              {
                am_isMiscApproverSet: true
              }
            )
              .then(() => {
                sp.web.siteGroups.getByName(CONST.approversGroup).users.add(this.NextApproverLoginName)
                  .then(() => {
                    this.closeLoading();
                    // this.goBack(history);
                    this.redirectToSourcePage();
                  });
              });
          });
      });
  }

  public goToRequestorView(history) {
    history.push('/requestor');
  }

  //For redirecting to List Page.
  public redirectToSourcePage = () => {
    try {
      let sourcePage = this.getParameter('Source');
      document.location.href = decodeURIComponent(sourcePage);
    }
    catch (e) { console.log(e); }
  }


  //For redirecting to List Page.
  public redirectToEditPage = () => {
    try {
      let currentUrl = document.location.href;
      var editUrl = currentUrl.replace('Mode=Display&', '');
      document.location.href = decodeURIComponent(editUrl);
    }
    catch (e) { console.log(e); }
  }


  public getParameter = (name) => {
    let queryString = document.location.search.substring(1);
    let params = queryString.split('&');
    for (let param of params) {
      let keyValue = param.split('=');
      if (keyValue[0].toLowerCase() === name.toLowerCase()) {
        return keyValue[1];
      }
    }
  }
  public goBack(history) {
    if (history.length > 0) {
      history.goBack();
    }
    else {
      history.push('', 'Overview');
    }
  }

  public generateContactAddressJson() {
    this.ContactAdress = {
      Name: this.ReturnToName,
      Phone: this.ReturnToPhone,
      Company: this.ReturnToCompany,
      Address: this.ReturnToAddress,
      City: this.ReturnToCity,
      ZipCode: this.ReturnToZip,
      Country: this.ReturnToCountry
    };
  }

  public parseContactAddressJson(item) {
    return JSON.parse(item);
  }

  public generateItem(status) {
    this.generateContactAddressJson();
    const item = {
      am_agreementType: this.AgreementType,
      am_status: status,
      am_approvalLevel: this.approvalLevel,
      am_parmaNumber: this.ParmaNumber,
      am_supplierName: this.SupplierName,
      am_decisionType: this.DecisionType,
      am_agreementDescription: this.AgreementDescription,
      am_connectAgreementTo: this.ConnectAgreementTo,
      am_isPrice: this.IsPrice,
      am_priceDetails: this.PriceDetails,
      am_rawMaterialDetails: this.RawMaterialDetails,
      am_yearlySpend: this.YearlySpend,
      am_isAmendment: this.IsAmendment,
      am_amendmentDetails: this.AmendmentDetails,
      am_mainSegmentCode: this.MainSegmentCode,
      am_isDeviation: this.IsDeviation,
      am_deviationDetailsMultiline: this.DeviationDetails,
      am_agreementSignedBy: this.FunctionBy,
      // am_agreementSignedFor: {
      //   results:
      //     this.FunctionFor
      // },
      am_validFrom: this.ValidDateFrom,
      am_validTo: this.ValidDateTo,
      am_reminderDate: this.ReminderDate,
      am_projectCode: this.ProjectCode,
      am_sourcingCaseNumber: this.SourcingCaseNumber,
      am_isHide: this.IsHide,
      am_hideDetails: this.HideDetails,
      am_isConfidential: this.IsConfidential,
      am_externalNotesVsib: this.ExternalNotesVSIB,
      am_physicalStorage: this.PhysicalStorage,
      am_returnAgreementTo: this.ReturnTo,
      am_contactAddress: JSON.stringify(this.ContactAdress),
      am_buyersManagersChain: JSON.stringify(this.ApproverChain),
      am_isStrategicSegment:this.IsstrategicSegment,
      am_contractSpending:this.contractSpend
    };
    return item;
  }


  public saveWithStatus(status, history) {
    if (!this.formInvalid) {
      this.triggerLoading("Saving your requests");
      const userResolvePromises = [];
      let isProdDevlopment: boolean = false;
      let isMiscApprover: boolean = false;
      userResolvePromises.push(sp.web.ensureUser(this.RequestorLoginName));
      userResolvePromises.push(sp.web.ensureUser(this.ResponsibleBuyerLoginName));
      userResolvePromises.push(sp.web.ensureUser(this.ManagerLoginName));
      if (this.ProductDevelopmentLoginName !== '') {
        userResolvePromises.push(sp.web.ensureUser(this.ProductDevelopmentLoginName));
        isProdDevlopment = true;
      }
      if (this.MiscApproverLoginName !== '') {
        userResolvePromises.push(sp.web.ensureUser(this.MiscApproverLoginName));
        isMiscApprover = true;
      }
      Promise.all(userResolvePromises)
        .then(results => {
          const RequestorId = results[0].data.Id;
          const ResponsibleBuyerId = results[1].data.Id;
          const ManagerId = results[2].data.Id;
          const ProductDevelopmentId = isProdDevlopment && results.length === 4 ? results[3].data.Id : null;
          const MiscApproverId = isMiscApprover && results.length === 4 ? results[3].data.Id : null;
          const newItem = this.generateItem(status);

          if (ProductDevelopmentId !== null) {
            newItem['am_productDevelopmentId'] = ProductDevelopmentId;
          }
          if (MiscApproverId !== null) {
            newItem['am_miscApproverId'] = MiscApproverId;
            newItem['am_isMiscApproverSet'] = true;
          }
          newItem['am_requestorId'] = RequestorId;
          newItem['am_buyerId'] = ResponsibleBuyerId;
          newItem['am_managerId'] = ManagerId;
          newItem['Title'] = this.AgreementType + ' - ' + this.ParmaNumber;

          // Adding new item
          sp.web.lists.getByTitle(CONST.listName).items.add(newItem)
            .then(result => {
              const itemId = result.data.Id;

              sp.web.lists.getByTitle(CONST.listName).items.getById(itemId).update(
                {
                  Title: this.AgreementType + ' - Parma' + this.ParmaNumber + ' - ID' + itemId
                }
              ).then(() => {
                this.triggerLoading("Creating folder for your files");
                this.createFolder(itemId)
                  .then(_result => {
                    console.log("inside folder creation");
                    this.triggerLoading("Folder created");
                    console.log("result: ", _result);
                    const folderUrl = _result.data.ServerRelativeUrl;
                    console.log("folder url: ", folderUrl);
                    this.triggerLoading("Uploading files");
                    this.uploadFiles(folderUrl)
                      .then(() => {
                        console.log("after files upload");
                        this.triggerLoading("Files uploaded");
                        if (status === 'Sent for approval') {
                          this.triggerLoading("Starting workflow");
                          sp.web.lists.getByTitle(CONST.listName).items.getById(itemId).update(
                            {
                              am_isSendForApproval: true
                            }
                          )
                            //this.startWorkflow(itemId, appConfig.wfSubscriptionId)
                            .then(() => {
                              this.triggerLoading("Workflow started");
                              // this.goToRequestorView(history);
                              this.redirectToSourcePage();
                            });
                        }
                        else {
                          //this.goToRequestorView(history);
                          this.redirectToSourcePage();
                        }
                      });
                  })
                  .catch(error => {
                    this.triggerErrorModal('Issue with creating the attachments folder, please contact support with screenshot of error.', error);
                  });
              });
            });
        });
    }
  }


  public updateWithStatus(itemId, status, history) {
    if (!this.formInvalid) {
      this.triggerLoading("Updating request");
      const userResolvePromises = [];
      let isProdDevlopment: boolean = false;
      let isMiscApprover: boolean = false;
      userResolvePromises.push(sp.web.ensureUser(this.ResponsibleBuyerLoginName));
      userResolvePromises.push(sp.web.ensureUser(this.ManagerLoginName));
      if (this.ProductDevelopmentLoginName !== '') {
        userResolvePromises.push(sp.web.ensureUser(this.ProductDevelopmentLoginName));
        isProdDevlopment = true;
      }
      if (this.MiscApproverLoginName !== '') {
        userResolvePromises.push(sp.web.ensureUser(this.MiscApproverLoginName));
        isMiscApprover = true;
      }
      Promise.all(userResolvePromises)
        .then(results => {
          const ResponsibleBuyerId = results[0].data.Id;
          const ManagerId = results[1].data.Id;
          const ProductDevelopmentId = isProdDevlopment && results.length === 3 ? results[2].data.Id : null;
          const MiscApproverId = isMiscApprover && results.length === 3 ? results[2].data.Id : null;
          const updatedItem = this.generateItem(status);

          if (ProductDevelopmentId !== null) {
            updatedItem['am_productDevelopmentId'] = ProductDevelopmentId;
          }
          if (MiscApproverId !== null) {
            updatedItem['am_miscApproverId'] = MiscApproverId;
          }
          updatedItem['am_buyerId'] = ResponsibleBuyerId;
          updatedItem['am_managerId'] = ManagerId;

          // updating item
          sp.web.lists.getByTitle(CONST.listName).items.getById(itemId).update(
            updatedItem
          )
            .then(() => {
              this.triggerLoading("Request updated");
              this.triggerLoading("Uploading files");
              const folderUrl = CONST.libraryPath + '/' + itemId;//'/' +
              this.uploadFiles(folderUrl)
                .then(() => {
                  this.triggerLoading("Files uploaded");
                  if (status === 'Sent for approval') {
                    this.triggerLoading("Starting workflow");
                    sp.web.lists.getByTitle(CONST.listName).items.getById(itemId).update(
                      {
                        am_isSendForApproval: true
                      }
                    )
                      //this.startWorkflow(itemId, appConfig.wfSubscriptionId)
                      .then(() => {
                        this.triggerLoading("Workflow started");
                        //this.goBack(history);
                        this.redirectToSourcePage();
                      });
                  }
                  else {
                    //this.goBack(history);
                    this.redirectToSourcePage();
                  }
                });
            });
        });
    }
  }


  public createFolder(itemId: string) {
    const folderName = itemId;
    return sp.web.lists.getByTitle(CONST.libraryTitle).rootFolder.folders.add(itemId.toString());
  }


  public uploadFiles(folderUrl) {
    const promise = new Promise((resolve) => {
      // Retrieving available content types
      sp.web.lists.getByTitle(CONST.libraryTitle).contentTypes.get()
        .then(result => {
          const SignedAgreementContentTypeId = result.filter((contenType) => {
            return contenType.Name === CONST.SignedAgreementCT;
          })[0].StringId;

          const DeviationContentTypeId = result.filter((contenType) => {
            return contenType.Name === CONST.DeviationCT;
          })[0].StringId;

          const signedAgreementInputElements = document.querySelectorAll('#SignedAgreements input');
          const deviationInputElements = document.querySelectorAll('#Deviations input');

          const uploadFilesOfContentTypePromises = [];
          uploadFilesOfContentTypePromises.push(
            this.uploadFilesOfContentType(folderUrl, signedAgreementInputElements, SignedAgreementContentTypeId)
          );
          uploadFilesOfContentTypePromises.push(
            this.uploadFilesOfContentType(folderUrl, deviationInputElements, DeviationContentTypeId)
          );

          Promise.all(uploadFilesOfContentTypePromises)
            .then(() => {
              resolve("Success");
            });
        });
    });

    return promise;
  }


  public sanitize(input) {
    // based on https://support.microsoft.com/en-us/help/905231/information-about-the-characters-that-you-cannot-use-in-site-names--fo
    // replace invalid characters
    let sanitizedInput = input.replace(/['~"#%&*:<>?/{|}]/g, "_");
    // replace consecutive periods
    sanitizedInput = sanitizedInput.replace(/\.+/g, ".");
    // replace leading period
    sanitizedInput = sanitizedInput.replace(/^\./, "");
    // replace leading underscore
    sanitizedInput = sanitizedInput.replace(/^_/, "");
    return sanitizedInput;
  }

  public uploadFilesOfContentType(folderUrl, inputElements, contentTypeId) {
    console.log("Uploadig files for conetnt type", folderUrl);
    const promise = new Promise((resolve) => {
      const fileUploadPromises = [];
      for (let i = 0; i < inputElements.length; ++i) {
        const files = inputElements[i].files;
        for (let j = 0; j < files.length; ++j) {
          const file = files[j];
          fileUploadPromises.push(
            sp.web.getFolderByServerRelativeUrl(folderUrl).files.add(this.sanitize(file.name), file, true)
          );
        }
      }

      if (fileUploadPromises.length === 0) {
        resolve("Success");
      }

      else {
        // Uploading all attachments
        Promise.all(fileUploadPromises).then((files) => {
          const getRelatedItemPromises = [];
          for (let i = 0; i < files.length; ++i) {
            getRelatedItemPromises.push(
              files[i].file.getItem()
            );
          }

          // Updating Content Type Id
          Promise.all(getRelatedItemPromises).then((items) => {
            const setContentTypePromises = [];
            for (let i = 0; i < items.length; ++i) {
              const item = items[i];
              const itemId = item.Id;
              setContentTypePromises.push(
                sp.web.lists.getByTitle(CONST.libraryTitle).items.getById(itemId).update({
                  ContentTypeId: contentTypeId
                })
              );
            }
            Promise.all(setContentTypePromises).then(() => {
              resolve("Success");
            });
          });
        })
          .catch(error => {
            this.triggerErrorModal('Issue with uploading file, please contact support with screenshot of error.', error);
          });
      }
    });

    return promise;
  }


  public updateManagersChain() {
    this.triggerLoading("Loading managers hierarchy");

    if (appConfig.isDev) { 
      this.ApproverChain = appConfig.approvers;
      this.ManagerName = appConfig.managerName;
      this.ManagerLoginName = appConfig.managerLoginName;

      this.closeLoading();
      // Dummy, need to investigate how to mock these things
    } else {
      sp.profiles.getPropertiesFor(this.ResponsibleBuyerLoginName)
        .then(buyerProperties => {
          const hierarchy = buyerProperties.ExtendedManagers.results;

          const hierarchyPropsPromises = [];
          for (let i = 0; i < hierarchy.length; ++i) {
            hierarchyPropsPromises.push(
              sp.profiles.getPropertiesFor(hierarchy[i])
            );
          }

          const findManagerAtGivenLevel = (users: any[], managerLevel: number) => {
            if(managerLevel<0)
            {
              return null;
            }
            
            if(managerLevel>=users.length)
            {
              return buyerProperties;
            }

            return users[managerLevel];
          };

          Promise.all(hierarchyPropsPromises)
            .then(managersProps => {
              const tmpApprovers = new Array(4);
              tmpApprovers[0] = findManagerAtGivenLevel(managersProps, managersProps.length-1>2?managersProps.length-1:3);
              tmpApprovers[1] = findManagerAtGivenLevel(managersProps, 2);
              tmpApprovers[2] = findManagerAtGivenLevel(managersProps, 1);
              tmpApprovers[3] = findManagerAtGivenLevel(managersProps, 0);

              const approvers = tmpApprovers.filter(x => x !== null);

              const manager = managersProps.length !== 0 ? managersProps[managersProps.length - 1] : buyerProperties; //buyerProperties for EVP without CEO

              const ensurePromises = [];
              for (let i = 0; i < approvers.length; ++i) {
                if (approvers[i] !== null) {
                  ensurePromises.push(
                    sp.web.ensureUser(approvers[i].AccountName)
                  );
                }
              }

              if (ensurePromises.length === 0) {
                this.triggerErrorModal('Could not find any approver.', null);
                return;
              }

              Promise.all(ensurePromises)
                .then(() => {
                  MobiX.runInAction(() => {
                    this.ManagerName = manager.DisplayName;
                    this.ManagerLoginName = manager.AccountName;
                    this.ApproverChain = [];
                    for (let i = 0; i < approvers.length; ++i) {
                      if (approvers[i] !== null) {
                        this.ApproverChain.push({
                          Id: approvers[i].AccountName,
                          Name: approvers[i].DisplayName,
                          Email: approvers[i].Email,
                          IsBuyer: buyerProperties.AccountName === approvers[i].AccountName
                        });
                      } else {
                        this.ApproverChain.push(null);
                      }
                    }

                    this.closeLoading();
                  });
                })
                .catch(error => {
                  this.triggerErrorModal('Issue with retrieving manager from your profile, please contact support with screenshot of error.', error);
                });
            })
            .catch(error => {
              this.triggerErrorModal('Issue with retrieving manager from your profile, please contact support with screenshot of error.', error);
            });
        })
        .catch(error => {
          this.triggerErrorModal('Issue with retrieving your profile information, please contact support with screenshot of error.', error);
        });
    }
  }
}

const AgreementRequest = new AgreementRequestClass();


export default AgreementRequest;
