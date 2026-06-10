a=[
  { id: 1, category: "fruit" },
  { id: 2, category: "veggie" },
  { id: 3, category: "fruit" }
]

b={}
for(let i=0;i<a.length;i++){
   if(!(a[i].category in b)){
    b[a[i].category]=[];
   }
   b[a[i].category].push(a[i].id)
}

console.log(b)