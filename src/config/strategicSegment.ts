const strategicSegment = [
    'Strategic segment',
    'Non strategic segment'
  ];
  const choiceGroupOptionStyles = {
    root: {
      marginRight: 8, // 根据需要调整
    },
  };
  const strategicSegmentOptions = strategicSegment.map((item)=>
  (
     {
        key: item, 
        text: item,
        styles:choiceGroupOptionStyles
    }
  ));
  
  export { strategicSegmentOptions};