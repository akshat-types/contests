const users= [
  {
    name:"Aman",
    orders: ["Laptop","Mouse"]
  },
  {
    name:"Riya",
    orders: ["Keyboard"]
  }
];
l=[]
for(x of users){
    for(n of x.orders){
        l.push(n)
    }
}
console.log(l)

//Another method
result=users.flatMap((user) => user.orders)
console.log(result)