import * as MobiX from 'mobx';
class User{
    constructor(id, name, login){
      MobiX.extendObservable(this, {
        Id : id,
        Name : name,
        LoginName : login,
        IsPamAdmin : false,
        IsAgreementController : false,
        IsSourcingController : false,
        IsAdmin : false
      });
  }
}
  
  export default User;