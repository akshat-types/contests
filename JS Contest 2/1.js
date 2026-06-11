const students= [
  { name:"Aman", marks:78 },
  { name:"Riya", marks:91 },
  { name:"Kabir", marks:65 }
];
/*
for(obj of students){
  if(obj.marks>=90)
    obj.grade='A'
  else if(obj.marks>=70)
    obj.grade='B'
  else
    obj.grade='C'
  delete obj.marks
}
*/

//Better Solution
result=students.map((obj) =>{
  grd=''
  if(obj.marks > 89)
    grd='A'
  else if(obj.marks > 70)
    grd='B'
  else
    grd='C'
  return {
    name:obj.name.toUpperCase(),
    grade:grd
  }
})

console.log(result)
