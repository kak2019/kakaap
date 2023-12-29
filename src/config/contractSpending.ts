// const yearlySpends = [
//   '< 500 000 SEK Manager',
//   '< 3 000 000 SEK VP',
//   '>= 3 000 000 SEK SVP'
// ];
const contractlySpends = [
  '< 75M JPY (B4-Manager)',
  '< 350M JPY (B3-VP)',
  'Unlimted (B2-SVP)'
];

const contractSpendOptions = contractlySpends.map((item)=>
(
   {
      key: item, 
      text: item
  }
));

export { contractSpendOptions };