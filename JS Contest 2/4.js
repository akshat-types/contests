const students= [
  { name:"A", branch:"CSE" },
  { name:"B", branch:"ECE" },
  { name:"C", branch:"CSE" },
  { name:"D", branch:"ME" }
];

result={}
for(x of students){
    if(!(x.branch in result)){
        result[x.branch]=[x.name]
    }
    else
        result[x.branch].push(x.name)
}
console.log(result)