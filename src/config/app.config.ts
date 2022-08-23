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
        {"Id":"VCN\\a282770","Name":"Babayev Elnur","Email":"ContentServices.Mail@udtrucks.se"},
        {"Id":"VCN\\A235757","Name":"Francisco Seidel Coitinho da Silva","Email":"ContentServices.Mail@udtrucks.se"},
        {"Id":"VCN\\A237029","Name":"Nesarikar Sagar","Email":"ContentServices.Mail@udtrucks.se"},
        {"Id":"VCN\\A305854","Name":"Skrzypek Krzysztof","Email":"ContentServices.Mail@udtrucks.se"}
    ],
    managerName : "Elnur Babayev",
    managerLoginName: "ContentServices.Mail@udtrucks.se",
    sourcingFilePath: "https://purchasingagreement-test.sp.srv.volvo.com/Shared%20Documents/SOURCING%20OR%20NON%20SOURCING.DOCX"
};

export { appConfig };