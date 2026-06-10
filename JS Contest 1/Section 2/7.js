a={
  en: { hello: "Hello", bye: "Goodbye" },
  fr: { hello: "Bonjour", bye: "Au revoir" },
  es: { hello: "Hola" }
}

b={}
keys=Object.keys(a)
for(let i=0;i<keys.length;i++){
    keys2=Object.keys(a[keys[i]])
    for(let j=0;j<keys2.length;j++){
        if (! (keys2[j] in b))
            b[keys2[j]]={}
        b[keys2[j]][keys[i]]=a[keys[i]][keys2[j]]
    }

}
console.log(b)
