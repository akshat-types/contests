const products= [
  { name:"Laptop", price:80000 },
  { name:"Mouse", price:500 },
  { name:"Monitor", price:15000 },
  { name:"Keyboard", price:1200 }
];

result=products.filter((obj) => {
    if(obj.price > 5000)
        return obj
})

console.log(result)