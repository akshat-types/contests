function repeat_word(obj){
    d={}
    max=0
    maxword=""
    for(key in obj){
        arr=obj[key]
        for(word of arr){
            if(!d[word])
                d[word]=1
            else
                d[word]+=1
            if(d[word]>max){
                max=d[word]
                maxword=word
            }
        }
    }
    console.log(maxword)
}

repeat_word({ fruits: ["apple","apple","banana"], drinks: ["apple","tea"] })