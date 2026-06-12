const fs = require('fs')
fs.readFile('message.txt',"utf-8",function(err,data){
    data=data.toUpperCase()
    fs.writeFile('uppercase.txt',data,function(err,data){
        fs.readFile('uppercase.txt',"utf-8",function(err,data){
            count=1
            for(x of data){
                if(x==' ')
                    count+=1
            }
            s =`Total Words: ${count}`
            fs.writeFile('summary.txt',s,(err) => console.log(err))
        })
    })
})