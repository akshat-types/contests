obj1=[
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 1, name: "A" },
  {id:2,name:"hyuieaw"},
  {id:56,name:"heagfhaw"}
]
l=[]
obj2=obj1.filter(function (n){
    if(l.includes(n.id))
        return false
    else{
        l.push(n.id)
        return true
    }

})
console.log(obj2)
