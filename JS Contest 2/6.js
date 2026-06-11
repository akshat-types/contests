const torders= [
"Laptop",
"Mouse",
"Laptop",
"Keyboard",
"Laptop",
"Mouse"
];
d={}
result={product:"",count:0}
for(x of torders){
    if(!(x in d)){
        d[x]=1
    }
    else{
        d[x]+=1
    }
    if(d[x]>result.count){
        result.count=d[x]
        result.product=x
    }
}
console.log(result)