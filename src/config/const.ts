declare var azureFunctionBaseUrl: string;
declare var aadClientId: string;

export class HostSettings {
    public static get AzureHost(): string {
        console.log(azureFunctionBaseUrl);
        return azureFunctionBaseUrl;
    }

    public static get AadClientId(): string {
        console.log(aadClientId);
        return aadClientId;
    }
}

const CONST = {
    libraryPath: 'AgreementDocuments',
    libraryTitle: 'Agreement Documents',
    listName: 'AM Requests',
    taskListName: 'Agreement Approval Tasks',
    SignedAgreementCT: 'Signed Agreement',
    DeviationCT: 'Deviation',
    FinalFileCT:'FinalFile',
    pamAdminGroup: 'Local PAM Admin',
    agreementControllersGroup: 'Agreement Controller',
    sourcingControllersGroup: 'Sourcing Controllers',
    approversGroup: 'Agreement Approvers',
    admins : 'Admins',
    azureFunctionBaseUrl: HostSettings.AzureHost, 
    aadClientId:HostSettings.AadClientId, 
};

export { CONST };