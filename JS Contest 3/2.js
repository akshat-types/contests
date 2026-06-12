const branchStudents = {
  CSE: ["Aman", "Riya"],
  ECE: ["Kabir"],
  ME: ["Arjun", "Sneha"]
};

inverted={}
for(key in branchStudents){
    for(x of branchStudents[key]){
        inverted[x]=key
    }
}
console.log(inverted)