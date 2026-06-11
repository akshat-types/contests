const users= [
  { id:1, email:"a@test.com" },
  { id:2, email:"b@test.com" },
  { id:3, email:"a@test.com" },
  { id:4, email:"c@test.com" }
];
d={}
for(obj of users){
    if(!(obj.email in d)){
        d[obj.email]=1
    }
    else{
        d[obj.email]+=1
    }
}

result=users.filter((obj) => {
    return d[obj.email]>=2
})


console.log(result)