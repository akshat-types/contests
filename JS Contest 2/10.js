const transactions = [
  { user:"Aman", type:"credit", amount:1000 },
  { user:"Aman", type:"debit", amount:200 },
  { user:"Riya", type:"credit", amount:500 },
  { user:"Riya", type:"debit", amount:100 }
];

d={}
for(x of transactions){
    if(!(x.user in d))
        d[x.user]=0
    if(x.type=="credit"){
        d[x.user]+=x.amount
    }
    else if(x.type=="debit"){
        d[x.user]-=x.amount
    }
}
console.log(d)