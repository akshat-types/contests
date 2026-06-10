function eq(obj1,obj2){
    return JSON.stringify(obj1)==JSON.stringify(obj2)
}

console.log(eq({ a: { x: 1, y: 2 } }, { a: { x: 1, y: 2 } }))