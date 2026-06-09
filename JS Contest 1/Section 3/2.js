const fs = require('fs');
data = fs.readFileSync('marks.json','utf-8');
data=JSON.parse(data);
console.log(data);
console.log()

high=0;
low=100;
sum=0;
for (let i=0;i<data.length;i++){
    k=data[i]['marks'];
    if(k>high){
        high=k;
    }
    if(k<low){
        low=k;
    }
    sum+=k
}
fs.appendFileSync('report.txt',"Highest: "+String(high)+'\n');
fs.appendFileSync('report.txt',"Lowest: "+String(low)+'\n');
fs.appendFileSync('report.txt',"Average: "+String(sum/data.length)+'\n');