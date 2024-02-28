import * as React from 'react';

/* Office UI Fabric */
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import ListItemPicker from './forms/ListItemPicker';

/* Kendo */
import '@progress/kendo-ui';
import '@progress/kendo-theme-default/dist/all.css';
import { Upload } from '@progress/kendo-upload-react-wrapper';

/* Mobx */
import { observer } from 'mobx-react';

import { CONST } from '../../../config/const';
import HeaderRow from './forms/HeaderRow';
import FormRow from './forms/FormRow';
import CheckboxWithTextField from './forms/CheckboxWithTextField';
import ValidationMessage from './forms/ValidationMessage';
import PeoplePicker from './forms/PeoplePicker';
import SegmentPicker from './forms/SegmentPicker';
// import ParmaNumberPicker from './forms/parmaNumberPicker';
import ApproversTable from './forms/ApproversTable';
import FilesList from './forms/FilesList';
import ErrorMessageBox from './forms/ErrorMessageBox';
import LoadingBox from './forms/LoadingBox';
import ConfirmationBox from './forms/ConfirmationBox';


/* Configuration for controls */
import { decisionTypeOptions } from '../../../config/decisionTypeOptions';
import { yearlySpendOptions } from '../../../config/yearlySpendOptions';
import { functionByOptions } from '../../../config/functionOptions';
import { physicalStorageOptions } from '../../../config/physicalStorageOptions';
import { contactOptions } from '../../../config/contactOptions';
import { appConfig } from "../../../config/app.config";
import { contractSpendOptions } from '../../../config/contractSpending';
import { devationOptions } from '../../../config/deviationOptions'; // this is for changing checkbox to chioce group 
import { strategicSegmentOptions } from '../../../config/strategicSegment';
interface IEditFormProps {
    store: any;
    user: any;
    history: any;
    aadClient: any;
    token: any;
    id: any;
}
interface IEditFormState {
    dirty: any;
}
const EditForm = observer(class EditFormClass extends React.Component<IEditFormProps, IEditFormState> {
    public store: any;
    constructor(props: IEditFormProps) {
        super(props);
        this.store = this.props.store;
        this.store.aadClient = this.props.aadClient;
        this.store.token = this.props.token;
        this.state = { dirty: false };
    }

    public componentWillMount() {
        this.props.store.getRequest(this.props.id);
        this.props.store.getGroupUsers();

    }



    // public makeDirty() {
    //     this.setState({ dirty: true });
    // }
    public makeDirty(cb?: () => void) {
        this.setState({ dirty: true }, cb);
    }
    public render() {
        return (
            <div className='ms-Grid pad-left'>
                <HeaderRow text={this.props.store.Title} />

                <FormRow label='Status'>
                    <Label>{this.props.store.Status}</Label>
                </FormRow>

                <FormRow label='Requestor'>
                    {this.props.store.RequestorName !== '' &&
                        <Label>{this.props.store.RequestorName}</Label>
                    }
                </FormRow>

                <FormRow label='Responsible Buyer'
                    required={true}
                    tooltip='Buyer who negotiated Agreement'
                >
                    {this.props.store.ApproverChain.length === 4 &&
                        <PeoplePicker
                            store={this.props.store}
                            onPersonDeselected={this.props.store.onBuyerDeselected}
                            onPersonSelected={this.props.store.onBuyerSelected}
                            defaultText={this.props.store.ResponsibleBuyerName}
                            defaultValue={this.props.store.ResponsibleBuyerLoginName}
                        />
                    }
                    <ValidationMessage
                        message='Responsible Buyer is required'
                        dirty={this.state.dirty}
                        condition={this.props.store.responsibleBuyerInvalid === true}
                    />
                </FormRow>

                <FormRow label='Manager' required={false}>
                    <Label>{this.props.store.ManagerName}</Label>
                    <ValidationMessage
                        message='Manager for the buyer must be defined'
                        dirty={this.state.dirty}
                        condition={this.props.store.managerInvalid === true}
                    />
                </FormRow>
                <FormRow label='Parma Number'
                    required={true}
                    tooltip='Parma code that corresponds to the name of the supplier legal entity stated in the agreement. The name and Parma code can be checked by clicking the link below the text box.'
                >

                    {this.props.store.ApproverChain.length === 4 &&
                        <ListItemPicker
                            onSelected={this.props.store.onParmaSelected}
                            onDeselected={this.props.store.onParmaDeselected}
                            resolveDelay={300}
                            aadClient={this.props.aadClient}
                            store={this.props.store}
                            defaultValue={this.props.store.ParmaNumber}
                        />
                        // <ParmaNumberPicker
                        //     required={true}
                        //     defaultValue={this.props.store.ParmaNumber}
                        //     onDeselected={this.props.store.onParmaDeselected}
                        //     onSelected={this.props.store.onParmaSelected}
                        //     store={this.props.store} />
                    }
                    <ValidationMessage
                        message='Parma Number is required'
                        dirty={this.state.dirty}
                        condition={this.props.store.parmaNumberInvalid === true}
                    />
                </FormRow>
                <FormRow label='Supplier Name'
                    tooltip='Supplier legal name in the agreement, and corresponding to the Parma code.'
                >
                    <TextField
                        value={this.props.store.SupplierName}
                        disabled={true} />
                </FormRow>

                {/* <FormRow label='Connect Agreement To'
                    tooltip='This agreement can be connected as well to other Parma codes (other SALES, PARENT codes).'
                >
                    <TextField
                        value={this.props.store.ConnectAgreementTo}
                        onChanged={(value) => this.props.store.ConnectAgreementTo = value}
                    />
                </FormRow> */}

                <FormRow label='Agreement'
                >
                    <div className='ms-Grid-row pad-top'>
                        <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                            Type
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                            <Dropdown
                                selectedKey={this.props.store.AgreementType}
                                required={true}
                                placeHolder='Select type'
                                id='drop'
                                options={this.props.store.agreementTypeOptions}
                                onChanged={(item) => this.props.store.onAgreementTypeSelected(item.key)}
                            />
                            <ValidationMessage
                                message='Agreement Type is required'
                                dirty={this.state.dirty}
                                condition={this.props.store.agreementTypeInvalid === true}
                            />
                        </div>
                    </div>
                    <div className='ms-Grid-row pad-top'>
                        <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                            Description
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                            <TextField
                                multiline
                                value={this.props.store.AgreementDescription}
                                onChanged={(value) => this.props.store.AgreementDescription = value}
                            />
                        </div>
                    </div>
                </FormRow>
                <FormRow label='Valid From'
                    required={true}
                >
                    {this.props.store.ValidDateFromAsDate &&      //the below is a fix/workaround for DatePicker not displaying date if the date is today
                        <DatePicker
                            value={this.props.store.ValidDateFromAsDate}
                            onSelectDate={(date) => {
                                this.props.store.ValidDateFrom = date;
                            }}
                        />}
                    {this.props.store.ValidDateFromAsDate === null &&
                        <DatePicker
                            value={this.props.store.ValidDateFromAsDate}
                            onSelectDate={(date) => {
                                this.props.store.ValidDateFrom = date;
                            }}
                        />}
                    <ValidationMessage
                        message='Valid Date from is required'
                        dirty={this.state.dirty}
                        condition={this.props.store.validDateFromInvalid === true}
                    />
                </FormRow>

                {
                    ['Confidentiality Agreement', 'Parental Guarantee Agreement', 'Price Agreement', 'Price Agreement Amendment', 'Raw Material Agreement'].some(val => val === this.props.store.AgreementType)
                    && <FormRow label='Valid To' required={this.props.store.IsPriceOrSoftware === true}>
                        {this.props.store.ValidDateToAsDate &&      //the below is a fix/workaround for DatePicker not displaying date if the date is today
                            <DatePicker
                                value={this.props.store.ValidDateToAsDate}
                                onSelectDate={(date) => {
                                    this.props.store.ValidDateTo = date;
                                }}
                            />}
                        {this.props.store.ValidDateToAsDate === null &&
                            <DatePicker
                                value={this.props.store.ValidDateToAsDate}
                                onSelectDate={(date) => {
                                    this.props.store.ValidDateTo = date;
                                }}
                            />}
                        <ValidationMessage
                            message='Valid To Date from is required'
                            dirty={this.state.dirty}
                            condition={this.props.store.validDateToInvalid === true}
                        />
                    </FormRow>}

                {
                    ['Development Agreement', 'Framework Agreement', 'Miscellaneous Agreement', 'Price Agreement', 'Price Agreement Amendment', 'Raw Material Agreement'].some(val => val === this.props.store.AgreementType)
                    && <FormRow label='Decision Type'
                        required={true}
                        tooltip={
                            <div>
                                <p>
                                    <u>Sourcing Decision:</u>  Agreements that will be presented to the Sourcing Board/Commitee<br />
                                    <u>Non Sourcing Decision:</u> NDA’s, supplements, amendments and appendixes to an already existing agreement<br />
                                    For more information check this document:
                                </p>
                                <IconButton
                                    iconProps={{ iconName: 'WordDocument' }}
                                    //href={appConfig.sourcingFilePath}
                                    href={document.location.href.slice(0, document.location.href.indexOf("/SitePages")) + "/Shared%20Documents/SOURCING%20OR%20NON%20SOURCING.DOCX"}

                                />
                            </div>
                        }
                    >
                        <ChoiceGroup
                            selectedKey={this.props.store.DecisionType}
                            required={true}
                            options={decisionTypeOptions}
                            onChange={(event, option) => this.props.store.DecisionType = option.key}
                        />
                        <ValidationMessage
                            message='Decision Type is required'
                            dirty={this.state.dirty}
                            condition={this.props.store.decisionTypeInvalid === true}
                        />
                    </FormRow>

                }






                {/* {this.props.store.AgreementType === 'Development Agreement' &&
                this.props.store.DecisionType === decisionTypeOptions[1].key &&   //Non Sourcing Decision */}
                {(this.store.AgreementType === 'Development Agreement' || this.store.AgreementType === 'Framework Agreement' || this.store.AgreementType === 'Miscellaneous Agreement' || this.store.AgreementType === 'Price Agreement' || this.store.AgreementType === 'Price Agreement Amendment' || this.store.AgreementType === 'Raw Material Agreement') &&
                    this.store.DecisionType === decisionTypeOptions[1].key && <FormRow label='Please provide the id or name of the VP for the concerned Engineering department'
                        required={true}
                    >
                        <div style={{paddingTop:30}}>
                        <PeoplePicker
                            store={this.props.store}
                            onPersonDeselected={this.props.store.onPdDeselected}
                            onPersonSelected={this.props.store.onPdSelected}
                            defaultText={this.props.store.ProductDevelopmentName}
                            defaultValue={this.props.store.ProductDevelopmentLoginName}
                        />
                        <ValidationMessage
                            message='PD Development is required'
                            dirty={this.state.dirty}
                            condition={this.props.store.pdDevelopmentInvalid === true}
                        />
                        </div>
                    </FormRow>
                }
                {this.props.store.AgreementType !== 'Confidentiality Agreement' && this.props.store.AgreementType !== 'Parental Guarantee Agreement' && <FormRow label='Main Segment Code'
                    required={true}
                >
                    {this.props.store.ApproverChain.length === 4 &&
                        <SegmentPicker
                            defaultValue={this.props.store.MainSegmentCode}// || this.props.store.onSegmentSelected } //{this.props.store.mainSegmentCodeInvalid === true ? this.props.store.onSegmentSelected : this.props.store.MainSegmentCode }
                            store={this.props.store}
                            onDeselected={this.props.store.onSegmentDeselected}
                            onSelected={this.props.store.onSegmentSelected}
                        />
                    }
                    <ValidationMessage
                        message='Main segment code is required'
                        dirty={this.state.dirty}
                        condition={this.props.store.mainSegmentCodeInvalid === true}
                    />
                </FormRow>}
                {/* {this.props.store.AgreementType === 'Miscellaneous Agreement' && 
                    <FormRow label='Please provide the email id or name of the Misc Approver'
                        required={true} 
                    >
                        <PeoplePicker
                        store={this.props.store}
                        onPersonDeselected={this.props.store.onMADeselected}
                        onPersonSelected={this.props.store.onMASelected}
                        defaultText={this.props.store.MiscApproverName}
                        defaultValue={this.props.store.MiscApproverLoginName}
                        /> 
                    
                        <ValidationMessage
                        message='Misc Approver is required'
                        dirty={this.state.dirty}
                        condition={this.props.store.miscApproverInvalid === true}
                        />
                    </FormRow>
                    } */}
                {/* {this.props.store.showStrategic&&<FormRow label='Strategic segment' required={false} */}
                {(this.store.AgreementType === 'Development Agreement' || this.store.AgreementType === 'Framework Agreement' || this.store.AgreementType === 'Miscellaneous Agreement' || this.store.AgreementType === 'Price Agreement' || this.store.AgreementType === 'Price Agreement Amendment' || this.store.AgreementType === 'Raw Material Agreement') &&
                    this.store.DecisionType === decisionTypeOptions[0].key && <FormRow label='Strategic segment' required={false}
                    // tooltip='Provide Parma number and valid date of the agreement in VSIB which this amendment belongs to.'
                    >
                        {/* <div className='ms-Grid-row pad-top'> */}
                        {/* <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel"> */}
                        {/* <Checkbox
            checked={this.props.store.IsstrategicSegment}
            onChange={(event, isChecked) => this.props.store.IsstrategicSegment = isChecked}
          /> */}
                        <ChoiceGroup
                            required={true}
                            options={strategicSegmentOptions} //pass
                            selectedKey={this.props.store.IsstrategicSegment === true ? 'Strategic segment' : 'Non strategic segment'}
                            onChange={(event, option) => {
                                this.props.store.onStrategicTypeSelected(option.key);
                            }}
                            styles={{
                                root: {
                                    // marginRight: 15, // 在选项之间添加右边距，根据需要调整
                                    width: 500
                                },

                                flexContainer: {
                                    display: 'flex',
                                    flexDirection: 'row', // 确保选项横向排列
                                    flexWrap: 'nowrap', // 防止选项换行
                                    overflowX: 'auto', // 允许水平滚动
                                    width: '100%', // 或者更具体的宽度，根据需要调整
                                },
                            }}
                        />
                        {/* </div> */}
                        {/* </div> */}
                        <ValidationMessage
                            message='Strategic Type required'
                            dirty={this.state.dirty}
                            condition={this.props.store.strategicSegmentInvalid === true}
                        />
                    </FormRow>}
                {
                    this.props.store.showYearlySpend &&
                    <FormRow label='Yearly spend'
                        required={true}
                    >
                        <ChoiceGroup
                            selectedKey={this.props.store.YearlySpend}
                            required={true}
                            options={yearlySpendOptions}
                            onChange={(event, option) => this.props.store.YearlySpend = option.key}
                        />
                        <ValidationMessage
                            message='Yearly Spent is required'
                            dirty={this.state.dirty}
                            condition={this.props.store.yearlySpendInvalid === true}
                        />
                    </FormRow>
                }
                {
                    this.props.store.showContractSpend &&
                    <FormRow label='Contract Spending'
                        required={true} tooltip=''
                    >
                        <ChoiceGroup
                            selectedKey={this.props.store.contractSpend}
                            required={true}
                            options={contractSpendOptions}
                            onChange={(event, option) => this.props.store.contractSpend = option.key}
                        />
                        <ValidationMessage
                            message='Contract Spent is required'
                            dirty={this.state.dirty}
                            condition={this.props.store.contractSpendInvalid === true}
                        />
                    </FormRow>
                }

                {(this.props.store.AgreementType === 'Price Agreement' || this.props.store.AgreementType === 'Price Agreement Amendment') &&
                    <FormRow
                        label='In case the Price Agreement includes Raw Material Clause , please provide the validation/approval from the RM Team'
                        tooltip='In case the Price Agreement includes Raw Material Clause , please provide the validation/approval from the RM Team'
                    >
                        <CheckboxWithTextField checked={this.props.store.IsPrice}
                            store={this.props.store}
                            checkboxName={'IsPrice'}
                            textfieldName={'PriceDetails'}
                        />
                        <ValidationMessage
                            message='Price details are required when checkbox checked'
                            dirty={this.state.dirty}
                            condition={this.props.store.priceInvalid === true}
                        />
                        {this.props.store.priceInvalid}
                    </FormRow>
                }
                {
                    (this.props.store.AgreementType === 'Raw Material Agreement') &&
                    <FormRow label='Please provide the validation/approval from the RM Team'
                        required={true}
                        tooltip='Please provide the validation/approval from the RM Team'
                    >
                        <div className='ms-Grid-row pad-top'>
                            <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                                <Checkbox checked={this.props.store.RawMaterialDetails}
                                    onChange={(event, isChecked) => this.props.store.RawMaterialDetails = isChecked}
                                />
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                                <FilesList
                                    libraryPath={CONST.libraryPath}
                                    libraryTitle={CONST.libraryTitle}
                                    folder={this.props.id}
                                    contentType={CONST.RMTeamCT}
                                />
                                {this.props.store.RawMaterialDetails === true &&
                                    <div id="RMTeam">
                                        <Upload />
                                    </div>
                                }
                            </div>
                        </div>
                        <ValidationMessage
                            message='Raw material details required'
                            dirty={this.state.dirty}
                            condition={!this.props.store.RawMaterialDetails}
                        />
                    </FormRow>
                }
                {
                    this.props.store.AgreementType !== 'Confidentiality Agreement' && this.props.store.AgreementType !== 'Parental Guarantee Agreement'
                    && <FormRow label='Project Code'>
                        <TextField
                            value={this.props.store.ProjectCode}
                            onChanged={(value) => this.props.store.ProjectCode = value}
                        />
                    </FormRow>
                }
                {
                    this.props.store.AgreementType !== 'Confidentiality Agreement' && this.props.store.AgreementType !== 'Parental Guarantee Agreement' &&
                    <FormRow label='Sourcing Case Number'
                        required={this.props.store.DecisionType === 'Sourcing Decision'}
                    >
                        <TextField
                            required={this.props.store.DecisionType === 'Sourcing Decision'}
                            value={this.props.store.SourcingCaseNumber}
                            onChanged={(value) => this.props.store.SourcingCaseNumber = value}
                        />
                        <ValidationMessage
                            message='Sourcing Case number is required for Sourcing Decision'
                            dirty={this.state.dirty}
                            condition={this.props.store.sourcingCaseNumberInvalid === true}
                        />
                    </FormRow>
                }










                {/* <FormRow label='Amendment'
                    required={true}
                    tooltip='Provide Parma number and valid date of the agreement in VSIB which this amendment belongs to.'
                >
                    {this.props.store.IsAmendment}
                    <CheckboxWithTextField
                        checked={this.props.store.IsAmendment}
                        store={this.props.store}
                        checkboxName={'IsAmendment'}
                        textfieldName={'AmendmentDetails'}
                    />
                    <ValidationMessage
                        message='Amendment required when checkbox checked'
                        dirty={this.state.dirty}
                        condition={this.props.store.amendmentInvalid === true}
                    />
                </FormRow> */}





                {
                    this.props.store.AgreementType !== 'Parental Guarantee Agreement' && <FormRow label='Deviation for Agreement Template'
                        tooltip='Deviation from agreements template, If yes tick the box and attach deviation approvals'
                    >
                        {/* <div className='ms-Grid-row pad-top'> */}
                        {/* <div className="ms-Grid-col ms-sm12 ms-lg12 ms-formlabel"> */}
                        {/* <Checkbox
                                checked={this.props.store.IsDeviation}
                                onChange={(event, isChecked) => this.props.store.IsDeviation = isChecked}
                            /> */}
                        <ChoiceGroup
                            required={true}
                            options={devationOptions} //pass
                            selectedKey={this.props.store.IsDeviation === true ? "Deviated from standard template" : 'No any deviation'}
                            onChange={(event, option) => {
                                this.props.store.onDeviationTypeSelected(option.key);
                            }}
                            styles={{
                                root: {
                                    // marginRight: 15, // 在选项之间添加右边距，根据需要调整
                                    width: 500
                                },

                                flexContainer: {
                                    display: 'flex',
                                    flexDirection: 'row', // 确保选项横向排列
                                    flexWrap: 'nowrap', // 防止选项换行
                                    overflowX: 'auto', // 允许水平滚动
                                    width: '100%', // 或者更具体的宽度，根据需要调整
                                },
                            }}
                        />
                        {/* </div> */}

                        {this.props.store.IsDeviation === true &&
                            <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                                <TextField
                                    required={true}
                                    onChanged={(value) => this.props.store.DeviationDetails = value}
                                    value={this.props.store.DeviationDetails}
                                    placeholder='Input or upload the deviation clauses summary'
                                />
                                {/* <ValidationMessage
                                    message='Deviation Details are required'
                                    dirty={this.state.dirty}
                                    condition={this.props.store.deviationInvalid === true}
                                /> */}

                                <FilesList
                                    libraryPath={CONST.libraryPath}
                                    libraryTitle={CONST.libraryTitle}
                                    folder={this.props.id}
                                    contentType={CONST.DeviationCT}
                                />
                                <div id="Deviations">
                                    <Upload
                                        enabled={this.props.user.IsAgreementController === false}
                                    />
                                </div>
                                {/* <div style={{ paddingLeft: 8 }}> */}
                                <ValidationMessage
                                    message='Deviation for Agreement Template are required'
                                    dirty={this.state.dirty}
                                    condition={!this.props.store.DevationType}

                                />
                                {/* </div> */}
                            </div>
                        }
                        {/* </div> */}
                    </FormRow>
                }
                {
                    this.props.store.AgreementType !== 'Parental Guarantee Agreement' && this.props.store.IsDeviation &&
                    <FormRow label='Legal approval on deviated items' required={true}
                        tooltip=''>
                        <FilesList
                            libraryPath={CONST.libraryPath}
                            libraryTitle={CONST.libraryTitle}
                            folder={this.props.id}
                            contentType={CONST.LegalApproval}
                        />
                        <div id="LegalApproval">
                            <Upload
                                select={(event) => this.props.store.onLegalFileAdded(event)}
                                remove={(event) => this.props.store.onLegalFileRemoved(event)}
                                enabled={this.props.user.IsAgreementController === false}
                            />
                        </div>
                        <ValidationMessage
                            message='Legal approval file are required'
                            dirty={this.state.dirty}
                            condition={this.props.store.LegalFileInvalid === true}
                        />
                    </FormRow>
                }


                {/* <FormRow label='Agreement Signed'
                    tooltip='Tick the brand this agreement is covering. "All" for most global agreements. For price agreements it can be 1 or several brands.'
                >
                    <div className='ms-Grid-row pad-top'>
                        <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                            By
            </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                            <Dropdown
                                selectedKey={this.props.store.FunctionBy}
                                placeHolder='Select'
                                options={functionByOptions}
                                onChanged={(item) => this.props.store.FunctionBy = item.key}
                            />
                        </div>
                    </div> */}
                {/* <div className='ms-Grid-row pad-top'>
                        <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                            For
            </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                            <Dropdown
                                multiSelect
                                placeHolder='Select'
                                selectedKeys={this.props.store.FunctionFor.slice()}
                                options={functionByOptions}
                                onChanged={(item) => { this.props.store.onFunctionSelected(item); }}
                            />
                        </div>
                    </div> */}
                {/* </FormRow> */}
                < FormRow label='Required Approval' >
                    <Label>{this.props.store.approvalLevel}</Label>
                </FormRow >





                {/* <FormRow label='Hide'
                    tooltip='This option is used in order to hide old agreements from VSIB'>
                    <CheckboxWithTextField
                        checked={this.props.store.IsHide}
                        store={this.props.store}
                        checkboxName={'IsHide'}
                        textfieldName={'HideDetails'}
                    />
                    <ValidationMessage
                        message='Details are required when checkbox is checked'
                        dirty={this.state.dirty}
                        condition={this.props.store.hideInvalid === true}
                    />
                </FormRow> */}

                {/* <FormRow label='Confidential'
                    tooltip='In order to use this option your request must be approved by legal by email'
                >
                    <Checkbox
                        checked={this.props.store.IsConfidential}
                        onChange={(event, isChecked) => this.props.store.IsConfidential = isChecked}
                    />
                </FormRow> */}

                {/* <FormRow label='External Notes VSIB'
                    tooltip='Information  visible in VSIB under note, e.g Project code, Product description'
                >
                    <TextField
                        value={this.props.store.ExternalNotesVSIB}
                        onChanged={(value) => this.props.store.ExternalNotesVSIB = value}
                    />
                </FormRow> */}

                <FormRow
                    label='Physical Storage'
                    required={true}
                >
                    <Dropdown
                        selectedKey={this.props.store.PhysicalStorage}
                        placeHolder='Select physical storage'
                        id='drop'
                        options={physicalStorageOptions}
                        onChanged={(item) => this.props.store.PhysicalStorage = item.key}
                    />
                    <ValidationMessage
                        message='Physical Storage is required'
                        dirty={this.state.dirty}
                        condition={this.props.store.physicalStorageInvalid === true}
                    />
                </FormRow>

                <FormRow
                    label='Return Signed Agreement To'
                    required={true}
                >
                    <Dropdown
                        selectedKey={this.props.store.ReturnTo}
                        placeHolder='Select'
                        options={contactOptions}
                        onChanged={(item) => this.props.store.onSelectReturnTo(item.key)}
                    />
                    <ValidationMessage
                        message='Return Agreement To is required'
                        dirty={this.state.dirty}
                        condition={this.props.store.returnAgreementToInvalid === true}
                    />
                    {(this.props.store.ReturnTo === 'Supplier' &&
                        this.props.store.ParmaNumber !== '') &&
                        <DefaultButton
                            onClick={() => {
                                this.props.store.copyParmaData();
                            }}
                            text={"Copy From Parma"}
                        />
                    }
                    <div className='ms-Grid-row pad-top'>
                        <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                            Name
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                            <TextField
                                required={this.props.store.contactDetailsRequired}
                                value={this.props.store.ReturnToName}
                                onChanged={(value) => this.props.store.ReturnToName = value}
                            />
                        </div>
                    </div>
                    <div className='ms-Grid-row pad-top'>
                        <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                            Phone Number
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                            <TextField
                                required={this.props.store.contactDetailsRequired}
                                value={this.props.store.ReturnToPhone}
                                onChanged={(value) => this.props.store.ReturnToPhone = value}
                            />
                        </div>
                    </div>
                    <div className='ms-Grid-row pad-top'>
                        <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                            Company Name
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                            <TextField
                                required={this.props.store.contactDetailsRequired}
                                value={this.props.store.ReturnToCompany}
                                onChanged={(value) => this.props.store.ReturnToCompany = value}
                            />
                        </div>
                    </div>
                    <div className='ms-Grid-row pad-top'>
                        <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                            Address
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                            <TextField
                                required={this.props.store.contactDetailsRequired}
                                value={this.props.store.ReturnToAddress}
                                onChanged={(value) => this.props.store.ReturnToAddress = value}
                            />
                        </div>
                    </div>
                    <div className='ms-Grid-row pad-top'>
                        <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                            City
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg4 ms-formlabel">
                            <TextField
                                required={this.props.store.contactDetailsRequired}
                                value={this.props.store.ReturnToCity}
                                onChanged={(value) => this.props.store.ReturnToCity = value}
                            />
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg2 ms-formlabel">
                            Zip Code
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                            <TextField
                                required={this.props.store.contactDetailsRequired}
                                value={this.props.store.ReturnToZip}
                                onChanged={(value) => this.props.store.ReturnToZip = value}
                            />
                        </div>
                    </div>
                    <div className='ms-Grid-row pad-top'>
                        <div className="ms-Grid-col ms-sm12 ms-lg3 ms-formlabel">
                            Country
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-lg9 ms-formlabel">
                            <TextField
                                required={this.props.store.contactDetailsRequired}
                                value={this.props.store.ReturnToCountry}
                                onChanged={(value) => this.props.store.ReturnToCountry = value}
                            />
                        </div>
                    </div>
                    <ValidationMessage
                        message='All contacts details of supplier are required'
                        dirty={this.state.dirty}
                        condition={this.props.store.contactDetailsInvalid === true}
                    />
                </FormRow>



                <FormRow label='Signed Agreement'
                    required={true}
                >
                    <FilesList
                        libraryPath={CONST.libraryPath}
                        libraryTitle={CONST.libraryTitle}
                        folder={this.props.id}
                        contentType={CONST.SignedAgreementCT}
                        onFilesLoaded={(files) => {
                            this.props.store.onFilesLoaded(files);
                        }}
                    />
                    <div id="SignedAgreements">
                        <Upload
                            enabled={this.props.user.IsAgreementController === false}
                            select={(event) => this.props.store.onSignedAgreementAdded(event)}
                            remove={(event) => this.props.store.onSignedAgreementRemoved(event)}
                        />
                    </div>
                    <ValidationMessage
                        message='Signed Agreement document(s) must be enclosed'
                        dirty={this.state.dirty}
                        condition={this.props.store.signedAgreementInvalid === true}
                    />
                </FormRow>

                {
                    this.state.dirty === true && this.props.store.formInvalid &&
                    <FormRow>
                        <MessageBar
                            messageBarType={MessageBarType.error}
                            isMultiline={false}
                        >
                            Some required fields are still not provided
                        </MessageBar>
                    </FormRow>
                }

                <FormRow>
                    <div>
                        <DefaultButton
                            text='Cancel'
                            className='right-aligned'
                            onClick={() => this.props.store.redirectToSourcePage()}
                        />
                        {this.props.user !== null
                            && this.props.store.Status !== 'Sent for approval'
                            &&
                            ((this.props.store.editableByBuyer === true && (this.props.user.LoginName === this.props.store.ResponsibleBuyerLoginName
                                || this.props.user.LoginName === this.props.store.RequestorLoginName))
                                || this.props.user.IsAgreementController)
                            &&
                            <DefaultButton
                                text='Send for Approval'
                                className='right-aligned'
                                primary={true}
                                onClick={() => {
                                    this.makeDirty(() => {
                                        const requiredEl = document.querySelectorAll('span.required');
                                        let isInValid = false;
                                        requiredEl.forEach(val => {
                                            if (val.innerHTML) {
                                                isInValid = true;
                                            }
                                        });
                                        if (!isInValid) {
                                            const that = this;
                                            const callback = () => {
                                                that.props.store.sendForApproval(that.props.history);
                                            };
                                            this.props.store.triggerConfirmation(
                                                "Are you sure you want to send this request for approval?",
                                                callback
                                            );
                                        }
                                    });

                                }
                                }
                            // onClick={() => {
                            //     this.makeDirty();
                            //     if (!this.props.store.formInvalid) {
                            //         let that = this;
                            //         let callback =  ()=> {
                            //             that.props.store.updateForApproval(that.props.id, that.props.history);
                            //         };
                            //         this.props.store.triggerConfirmation(
                            //             "Are you sure you want to send this request for approval?",
                            //             callback
                            //         );
                            //     }
                            // }
                            // }

                            />
                        }
                        {this.props.user !== null &&
                            ((this.props.store.editableByBuyer === true && (this.props.user.LoginName === this.props.store.ResponsibleBuyerLoginName
                                || this.props.user.LoginName === this.props.store.RequestorLoginName))
                                || this.props.user.IsAgreementController)
                            &&
                            <DefaultButton
                                text='Save'
                                className='right-aligned'
                                // onClick={() => {
                                //     this.makeDirty();
                                //     this.props.store.updateDraft(this.props.id, this.props.history);
                                // }}
                                onClick={() => {

                                    this.makeDirty(() => {
                                        const requiredEl = document.querySelectorAll('span.required');
                                        let isInValid = false;
                                        requiredEl.forEach(val => {
                                            if (val.innerHTML) {
                                                isInValid = true;
                                            }
                                        });
                                        if (!isInValid) {
                                            const that = this;
                                            const callback = () => {
                                                that.props.store.saveDraft(that.props.history);
                                            };

                                        }
                                    })
                                }}
                            />
                        }
                    </div>
                </FormRow>

                <FormRow label='Approvers Chain'>
                    {this.props.store.ApproverChain.length === 4
                        &&
                        <ApproversTable
                            decisionType={this.props.store.AgreementType}
                            pdRepresentative={this.props.store.ProductDevelopmentName}
                            level={this.props.store.approvalLevel}
                            approvers={this.props.store.ApproverChain}
                            agmntControllersName={this.props.store.AgmntControllersName}
                        />
                    }
                </FormRow>

                <ErrorMessageBox
                    store={this.props.store}
                    isOpen={this.props.store.isError}
                    warningTitle={this.props.store.errorTitle}
                    warningDetails={this.props.store.errorMessage}
                    closeModal={this.props.store.closeErrorModal}
                    history={this.props.history}
                />

                <LoadingBox
                    isOpen={this.props.store.isLoading}
                    infoDetails={this.props.store.infoMessage}
                />

                <ConfirmationBox
                    isOpen={this.props.store.isConfirmation}
                    confirmationDetails={this.props.store.confirmationMessage}
                    confirmationYesCallback={this.props.store.confirmationYesCallback}
                    confirmationNoCallback={this.props.store.confirmationNoCallback}
                    store={this.props.store}
                />
            </div >
        );
    }
});

export { EditForm };
