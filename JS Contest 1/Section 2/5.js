function transactions(arr){
    c={};
    for(let i=0;i<arr.length;i++){
        if(arr[i].category in c){
            c[arr[i].category]+=arr[i].price;
        }
        else{
             c[arr[i].category]=arr[i].price;
        }
    }
    console.log(c)
}

transactions([
  { id: 1, category: "electronics", price: 100 },
  { id: 2, category: "clothes", price: 50 },
  { id: 3, category: "electronics", price: 200 }
])