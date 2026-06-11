const fs = require('fs')
fs.readFile('a.txt','utf-8',function(err,data){
    d={'lines':1,'words':0,'characters':0}
    for(x of data){
        if(x == '\n')
            d['lines']+=1
        else if(x == " ")
            d['words']+=1
        else
            d['characters']+=1
    }
    d['words']+=d['lines']
    d['characters']+=(d['words']-d['lines'])
    console.log(d)
})
