const fs = require('fs')
data1=JSON.parse(fs.readFileSync('students.json','utf-8'))
data2=JSON.parse(fs.readFileSync('marks2.json','utf-8'))
data3=[]
for(let i=0;i<data1.length;i++){
    data3.push(Object.assign(data1[i],data2[i]))
}
//Assign is used here since the data given is already sorted. But better method is find()
//for(let student of data1){
//    let markdata=marks.find(x => x.id==student.id)}
for(x of data3){
    s=`${x.name} - ${x.marks}\n`
    fs.appendFileSync('report2.txt',s)
}
