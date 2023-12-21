// const yearlySpends = [
//   '< 500 000 SEK Manager',
//   '< 3 000 000 SEK VP',
//   '>= 3 000 000 SEK SVP'
// ];
const contractlySpends = [
  '< 75m JPY',
  '< 350M JPY',
  'Unlimted'
];

const contractSpendOptions = contractlySpends.map((item)=>
(
   {
      key: item, 
      text: item
  }
));

export { contractSpendOptions };