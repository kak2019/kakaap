import * as React from 'react';

/* Office UI Fabric */
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

/* Mobx */
import { observer } from 'mobx-react';

/* Kendo */
import '@progress/kendo-ui';

import { CONST } from '../../../config/const';
import HeaderRow from './forms/HeaderRow';
import FormRow from './forms/FormRow';
import FilesList from './forms/FilesList';
import ApprovalSection from './forms/ApprovalSection';
import LoadingBox from './forms/LoadingBox';
import ErrorMessageBox from './forms/ErrorMessageBox';
import ConfirmationBox from './forms/ConfirmationBox';
// import NextApproverPicker from './forms/NextApproverPicker';
import ApproversTable from './forms/ApproversTable';
import { decisionTypeOptions } from '../../../config/decisionTypeOptions';
import ConfirmationBoxWithUpload from './forms/ConfirmationBoxWithUploadfile';
interface IDisplayFormProps
{
  store:any;
  user:any;
  history:any;
  aadClient: any;
  token: any;
  id:any;
}
interface INewFormState{
    dirty:any;
  }
const DisplayForm = observer(class DisplayFormClass extends React.Component<IDisplayFormProps,{}> {

    public componentWillMount() {
        this.props.store.getRequest(this.props.id);
        this.props.store.getGroupUsers();
    }

    public render() {
        return (
            <div className='ms-Grid pad-left'>
                <FormRow  label=''>
                    <div className='row-commands'>
                        {this.props.user.IsPamAdmin === true && this.props.store.Status === 'Approved'
                            &&
                            <DefaultButton
                                text='Close Request'
                                iconProps={
                                    { iconName: 'ClosePane' }
                                }
                                className='right-aligned'
                                primary={true}
                                onClick={() => {
                                    let that = this;
                                    let callback =  ()=> {
                                        that.props.store.close(that.props.id, that.props.history);
                                    };
                                    this.props.store.triggerConfirmationWithUpload(
                                        //"Are you sure you want to close this request " + this.props.store.Title + "?",
                                        "Please ensure that the final signed agreement is upload into AP agreement tool before closing the case",
                                        callback
                                    );
                                }}
                            />
                        }
                        {this.props.user !== null &&
                            ((this.props.store.removableByBuyer === true && (this.props.user.LoginName === this.props.store.ResposnisbleBuyerLoginName
                                || this.props.user.LoginName === this.props.store.RequestorLoginName))
                            )
                            &&

                            <DefaultButton
                                text='Delete'
                                iconProps={
                                    { iconName: 'Delete' }
                                }
                                className='right-aligned'
                                onClick={() => {
                                    let that = this;
                                    let callback =  ()=> {
                                        that.props.store.deleteRequest(that.props.id, that.props.history);
                                    };
                                    this.props.store.triggerConfirmation(
                                        "Are you sure you want to delete your request " + this.props.store.Title + "?",
                                        callback
                                    );
                                }}
                            />

                        }
                        {this.props.user !== null &&
                            ((this.props.store.editableByBuyer === true && (this.props.user.LoginName === this.props.store.ResposnisbleBuyerLoginName
                                || this.props.user.LoginName === this.props.store.RequestorLoginName))
                                || this.props.user.IsAgreementController)
                            &&

                            <DefaultButton
                                text='Edit'
                                iconProps={
                                    { iconName: 'Edit' }
                                }
                                className='right-aligned'
                                onClick={() => this.props.store.redirectToEditPage()}
                            />

                        }
                        <DefaultButton
                            text='Print'
                            iconProps={
                                { iconName: 'Print' }
                            }
                            className='right-aligned'
                            onClick={() => {
                                window.print();
                            }}
                        />
                    </div>
                </FormRow>
                <HeaderRow text={this.props.store.Title} />

                <FormRow label='Status'>
                    <Label>{this.props.store.Status}</Label>
                </FormRow>

                <FormRow label='Requestor'>
                    <Label>{this.props.store.RequestorName}</Label>
                </FormRow>

                <FormRow label='Responsible Buyer'>
                    <Label>{this.props.store.ResponsibleBuyerName}</Label>
                </FormRow>

                <FormRow label='Manager'>
                    <Label>{this.props.store.ManagerName}</Label>
                </FormRow>

                <FormRow label='Decision Type' >
                    <Label>{this.props.store.DecisionType}</Label>
                </FormRow>

                <FormRow label='Parma Number'>
                    <Label>{this.props.store.ParmaNumber}</Label>
                </FormRow>

                <FormRow label='Supplier Name'>
                    <Label>{this.props.store.SupplierName}</Label>
                </FormRow>

                <FormRow label='Connect Agreement To'>
                    <Label>{this.props.store.ConnectAgreementTo}</Label>
                </FormRow>

                <FormRow label='Agreement Type'>
                    <Label>{this.props.store.AgreementType}</Label>
                </FormRow>

                <FormRow label='Agreement Description'>
                    <Label>{this.props.store.AgreementDescription}</Label>
                </FormRow>


                {this.props.store.AgreementType === 'Development Agreement' &&
                this.props.store.DecisionType === decisionTypeOptions[1].key &&   //Non Sourcing Decision
                    <FormRow label='Please provide the id of the VP for the concerned Engineering department'>
                        <Label>{this.props.store.ProductDevelopmentName}</Label>
                    </FormRow>
                }

                {this.props.store.AgreementType === 'Miscellaneous Agreement' &&
                    <FormRow label='Please provide the email id or name of the Misc Approver'>
                        <Label>{this.props.store.MiscApproverName}</Label>
                    </FormRow>
                }
  
                    {this.props.store.showContractSpend &&
                    <FormRow label='Contract Spending'>
                        <Label>{this.props.store.contractSpend}</Label>
                    </FormRow>
                }
                
                    
                    <FormRow label='Yearly spend'>
                        <Label>{this.props.store.YearlySpend}</Label>
                    </FormRow>
                
                

                {
                    this.props.store.AgreementType === 'Price Agreement' &&
                    <FormRow
                        label='Price agreement'
                    >
                        <Checkbox
                            //defaultChecked={this.props.store.IsPrice}
                            checked={this.props.store.IsPrice}
                            disabled={true}
                        />
                        <Label>{this.props.store.PriceDetails}</Label>
                    </FormRow>
                }

                {
                    this.props.store.AgreementType === 'Raw Material Agreement' &&
                    <FormRow label='Raw material agreement'>
                        <Label>{this.props.store.RawMaterialDetails}</Label>
                    </FormRow>
                }

                <FormRow label='Amendment'>
                    <Checkbox
                        //defaultChecked={this.props.store.IsAmendment}
                        checked={this.props.store.IsAmendment}
                        disabled={true}
                    />
                    {/* <Label>{this.props.store.AmendmentDetails}</Label> */}
                </FormRow>

                <FormRow label='Main Segment Code'>
                    <Label>{this.props.store.MainSegmentCode}</Label>
                </FormRow>
                {this.props.store.showStrategic && 
                <FormRow label='Strategic segment'>
                <Checkbox
                        // defaultChecked={this.props.store.IsstrategicSegment}
                        checked={this.props.store.IsstrategicSegment}
                        disabled={true}
                    />
                    </FormRow>
                    } 
                <FormRow label='Deviation for Agreement Template'>
                    <div className='ms-Grid-row pad-top'>
                        <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                            <Checkbox
                                //defaultChecked={this.props.store.IsDeviation}
                                checked={this.props.store.IsDeviation}
                                disabled={true}
                            />
                        </div>

                        {this.props.store.IsDeviation === true &&
                            <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                                <Label>{this.props.store.DeviationDetails}</Label>
                                <FilesList
                                    libraryPath={CONST.libraryPath}
                                    libraryTitle={CONST.libraryTitle}
                                    folder={this.props.id}
                                    contentType={CONST.DeviationCT}
                                />
                            </div>
                        }
                    </div>
                </FormRow>

                <FormRow label='Required Approval'>
                    <Label>{this.props.store.approvalLevel}</Label>
                </FormRow>

                <FormRow label='Agreement Signed'>
                    <div className='ms-Grid-row pad-top'>
                        <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                            By
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                            <Label>{this.props.store.FunctionBy}</Label>
                        </div>
                    </div>
                    {/* <div className='ms-Grid-row pad-top'>
                        <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                            For
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                        <Label>{this.props.store.FunctionFor.slice().join(', ')}</Label>
                        </div>
                    </div> */}
                </FormRow>

                <FormRow label='Valid From'>
                    <Label>{kendo.toString(this.props.store.ValidDateFromAsDate,"yyyy-MM-dd")}</Label>
                </FormRow>

                <FormRow label='Valid To' >
                    <Label>
                        {this.props.store.ValidDateToAsDate!==null
                        &&
                            <span>
                                {kendo.toString(this.props.store.ValidDateToAsDate,"yyyy-MM-dd")}
                            </span>
                        }

                    </Label>
                </FormRow>
                
                <FormRow label='Reminder Date' >
                    <Label>
                        {this.props.store.ReminderDateAsDate!==null
                        &&
                            <span>
                                {kendo.toString(this.props.store.ReminderDateAsDate,"yyyy-MM-dd")}
                            </span>
                        }

                    </Label>
                </FormRow>

                <FormRow label='Project Code'>
                    <Label>{this.props.store.ProjectCode}</Label>
                </FormRow>

                <FormRow label='Sourcing Case Number'>
                    <Label>{this.props.store.SourcingCaseNumber}</Label>
                </FormRow>

                <FormRow label='Hide'>
                    <Checkbox
                        //defaultChecked={this.props.store.IsHide}
                        checked={this.props.store.IsHide}
                        disabled={true}
                    />
                    <Label>{this.props.store.HideDetails}</Label>

                </FormRow>

                <FormRow label='Confidential' >
                    <Checkbox
                        //defaultChecked={this.props.store.IsConfidential}
                        checked = {this.props.store.IsConfidential}
                        disabled={true}
                    />
                </FormRow>

                <FormRow label='External Notes VSIB'>
                    <Label>{this.props.store.ExternalNotesVSIB}</Label>
                </FormRow>

                <FormRow label='Physical Storage'>
                    <Label>{this.props.store.PhysicalStorage}</Label>
                </FormRow>

                <FormRow label='Return Signed Agreement To'>
                    <Label>{this.props.store.ReturnTo}</Label>
                    <div className='ms-Grid-row pad-top'>
                        <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                            Name
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                            <Label>{this.props.store.ReturnToName}</Label>
                        </div>
                    </div>
                    <div className='ms-Grid-row pad-top'>
                        <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                            Phone
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                            <Label>{this.props.store.ReturnToPhone}</Label>
                        </div>
                    </div>
                    <div className='ms-Grid-row pad-top'>
                        <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                            Company
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                            <Label>{this.props.store.ReturnToCompany}</Label>
                        </div>
                    </div>
                    <div className='ms-Grid-row pad-top'>
                        <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                            Address
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                            <Label>{this.props.store.ReturnToAddress}</Label>
                        </div>
                    </div>
                    <div className='ms-Grid-row pad-top'>
                        <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                            City
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                            <Label>{this.props.store.ReturnToCity}</Label>
                        </div>
                    </div>
                    <div className='ms-Grid-row pad-top'>
                        <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                            Zip Code
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                            <Label>{this.props.store.ReturnToZip}</Label>
                        </div>
                    </div>
                    <div className='ms-Grid-row pad-top'>
                        <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                            Country
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                            <Label>{this.props.store.ReturnToCountry}</Label>
                        </div>
                    </div>
                </FormRow>

                <FormRow label='Signed Agreement'
                    required={true}
                >
                    <FilesList
                        libraryPath={CONST.libraryPath}
                        libraryTitle={CONST.libraryTitle}
                        folder={this.props.id}
                        contentType={CONST.SignedAgreementCT}
                    />

                </FormRow>
                <FormRow label='Final Signed Agreement'
                    required={true}
                >
                    <FilesList
                        libraryPath={CONST.libraryPath}
                        libraryTitle={CONST.libraryTitle}
                        folder={this.props.id}
                        contentType={CONST.FinalFileCT}
                        //contentType="Document"
                    />

                </FormRow>
                <FormRow>
                    <div className="row-commands">
                        <DefaultButton
                            text='Cancel'
                            className='right-aligned'
                            onClick={() => this.props.store.redirectToSourcePage()}
                        />
                        {this.props.user.IsPamAdmin === true && this.props.store.Status === 'Approved'
                            &&
                            <DefaultButton
                                text='Close Request'
                                className='right-aligned'
                                iconProps={
                                    { iconName: 'ClosePane' }
                                }
                                primary={true}
                                onClick={() => {
                                    let that = this;
                                    let callback =  ()=> {
                                        that.props.store.close(that.props.id, that.props.history);
                                    };
                                    this.props.store.triggerConfirmationWithUpload(
                                        //"Are you sure you want to close this request 1" + this.props.store.Title + "?",
                                        "Please ensure that the final signed agreement is upload into AP agreement tool before closing the case",
                                        callback
                                    );
                                }}
                            />
                        }

                    </div>
                </FormRow>
                {this.props.store.Status !== 'Draft' && 
                    <ApprovalSection
                        id={this.props.id}
                        user={this.props.user}
                        store = {this.props.store}
                    />
                }
               
                {this.props.store.ApproverChain.length === 4
                &&
                <ApproversTable
                    decisionType={this.props.store.AgreementType}
                    pdRepresentative = {this.props.store.ProductDevelopmentName}
                    level={this.props.store.approvalLevel}
                    approvers={this.props.store.ApproverChain}
                    agmntControllersName={this.props.store.AgmntControllersName}
                />
                }
              
                <LoadingBox
                    isOpen={this.props.store.isLoading}
                    infoDetails={this.props.store.infoMessage}
                />
                
                <ErrorMessageBox
                    store={this.props.store}
                    isOpen={this.props.store.isError}
                    warningTitle={this.props.store.errorTitle}
                    warningDetails={this.props.store.errorMessage}
                    closeModal={this.props.store.closeErrorModal}
                    history={this.props.history}
                />

                 <ConfirmationBox
                    isOpen={this.props.store.isConfirmation}
                    confirmationDetails={this.props.store.confirmationMessage}
                    confirmationYesCallback={this.props.store.confirmationYesCallback}
                    confirmationNoCallback={this.props.store.confirmationNoCallback}
                    store={this.props.store}
                />
                <ConfirmationBoxWithUpload
                    isOpen={this.props.store.isConfirmationWithUpload}
                    confirmationDetails={this.props.store.confirmationMessageWithUpload}
                    confirmationYesCallback={() => this.props.store.confirmationYesCallbackWithUpload(this.props.id, this.props.history)}
                    confirmationNoCallback={this.props.store.confirmationNoCallbackWithUpload}
                    store={this.props.store}
                />
                {/*
                <NextApproverPicker
                    isOpen={this.props.store.isPicker}
                    store={this.props.store}
                    approverCancelCallback = {this.props.store.approverCancelCallback}
                    approverSaveCallback = {this.props.store.approverSaveCallback}
                /> */}
                
            </div >
        );
    }
});

export { DisplayForm };