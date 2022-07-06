const yearlySpends = [
  '< 500 000 Manager',
  '< 3 000 000 VP',
  '< 10 000 000 SVP',
  '>= 10 000 000 EVP'
];

const yearlySpendOptions = yearlySpends.map((item)=>
(
   {
      key: item, 
      text: item
  }
));

export { yearlySpendOptions };