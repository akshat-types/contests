function transactions(arr){
    c={};
    for(let i=0;i<arr.length;i++){
        if(arr[i].user in c){
            c[arr[i].user]+=arr[i].amount;
        }
        else{
             c[arr[i].user]=arr[i].amount;
        }
    }
    console.log(c)
}

transactions([
  { user: "A", amount: 100 },
  { user: "B", amount: 200 },
  { user: "A", amount: 50 }
]);
