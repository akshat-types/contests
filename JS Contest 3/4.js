const orders = [
  "Laptop", "Mouse", "Laptop", "Keyboard",
  "Laptop", "Mouse", "Keyboard", "Mouse", "Monitor"
];

data={}
for(x of orders){
    if(!(x in data))
        data[x]=0
    data[x]+=1
}
//incomplete