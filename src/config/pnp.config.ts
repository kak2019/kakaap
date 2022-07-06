
const pnpConfig = (url : string) => {
    return {    sp: {
      headers: {
        Accept: "application/json; odata=verbose",
        "Access-Control-Allow-Origin": "*"
      },
      baseUrl: document.location.hostname.indexOf("localhost") > -1
      ? "http://localhost:8080"
      : url,//document.location.protocol + "//" + document.location.hostname,
    }};
  };

  export { pnpConfig }; 