const users= [
  {
    name:"Aman",
    posts: [
      { title:"JS", likes:50 },
      { title:"React", likes:10 }
    ]
  },
  {
    name:"Riya",
    posts: [
      { title:"Node", likes:80 }
    ]
  },
  {
    name:"Ramesh",
    posts: [
      { title:"Node", likes:20 }
    ]
  }
];

l=[]
for(x of users){
    for(y of x.posts){
        if(y.likes > 40){
            l.push(x.name)
            break
        }
    }
}
console.log(l)