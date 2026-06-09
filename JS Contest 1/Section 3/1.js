const fs = require('fs');
data = fs.readFileSync('users.json','utf-8');
data=JSON.parse(data);
console.log(data);

for(let i=0;i<data.length;i++){
    fs.appendFileSync('emails.txt',data[i]['email']+'\n');
}
