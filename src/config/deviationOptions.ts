const devation = [
    'Deviated from standard template',
    'No any deviation'
  ];
  const choiceGroupOptionStyles = {
    root: {
      marginRight: 8, // 根据需要调整
    },
  };
  const devationOptions = devation.map((item)=>
  (
     {
        key: item, 
        text: item,
        styles:choiceGroupOptionStyles
    }
  ));
  
  export { devationOptions };