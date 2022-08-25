declare var isDev: string;
export class HostSettings {
     public static get IsDev(): string {
        console.log(isDev);
        return isDev;
    }
}
const appConfig = {
    isDev: HostSettings.IsDev, 
    wfSubscriptionId: '03c1d443-ab11-47f6-a542-ef4edececee9',
    parmaApiFilter: 'https://app-shared-svc-ud-parma-dev.azurewebsites.net//api/getparma/?q=',//'https://sp-api.srv.volvo.com/parma/api/getid?idlength=5&$top=10&startswith=',
    parmaApi: 'https://app-shared-svc-ud-parma-dev.azurewebsites.net/api/getparma', 
    approvers: [
    // Test approvers
    // TODO 
    // Fetch this from SharePoint Settings List
        {"Id":"V0CN284","Name":"Content Services1","Email":"ContentServices.Mail@udtrucks.se"},
        {"Id":"V0CN284","Name":"Content Services2","Email":"ContentServices.Mail@udtrucks.se"},
        {"Id":"V0CN284","Name":"Content Services3","Email":"ContentServices.Mail@udtrucks.se"},
        {"Id":"V0CN284","Name":"Content Services4","Email":"ContentServices.Mail@udtrucks.se"}
    ],
    managerName : "Content Services Manager",
    managerLoginName: "ContentServices.Mail@udtrucks.se",
    sourcingFilePath: "https://udtrucks.sharepoint.com/sites/app-ap-agreements-test/Shared%20Documents/SOURCING%20OR%20NON%20SOURCING.DOCX"
};

export { appConfig };