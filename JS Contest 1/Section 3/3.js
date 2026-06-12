const fs = require('fs')
fs.readFile("events.txt","utf-8",function(err,data) {
    s=""
    d={}
    for(x of data){
        if(x!='\n'){
            s=s+x
        }
        else{
            s=s.trimEnd()
            if(!(s in d))
                d[s]=1
            else
                d[s]+=1
            s=''
        }
    }
    s=s.trimEnd()
    if(!(s in d))
        d[s]=1
    else
        d[s]+=1
    console.log(d)
    for(let i=0;i<Object.keys(d).length;i++){
        str=String(Object.keys(d)[i])+" : "+String(d[Object.keys(d)[i]])+"\n"
        console.log(str)
        fs.appendFileSync('analytics.txt',str)
    }
    }
)

//conversely, you can use split function data.trim().split("\n") to get an array

