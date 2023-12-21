const physicalStorages = [
     "Ageo",
    //"Bangalore"
    // "Curitiba",
    // "Gothenburg",
    // "Greensboro",
    // "Lyon",
    // "Moscow",
    // "Shanghai",
    // "Wacol"
];

const physicalStorageOptions = physicalStorages.map((item)=>
 (
     {
        key: item, 
        text: item
    }
));


export { physicalStorageOptions };