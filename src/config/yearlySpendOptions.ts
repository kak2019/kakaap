const yearlySpends = [
  '< 500 000 SEK Manager',
  '< 3 000 000 SEK VP',
  '>= 3 000 000 SEK SVP'
];

const yearlySpendOptions = yearlySpends.map((item)=>
(
   {
      key: item, 
      text: item
  }
));

export { yearlySpendOptions };