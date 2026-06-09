function transform(arr){
    c={};
    for(let i=0;i<arr.length;i++){
        c[arr[i].id]=arr[i].name
    }
    console.log(c)
}
transform([
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
]);