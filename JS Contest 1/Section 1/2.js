function sec_lar(arr){
    return arr.sort((a,b) => b-a)[1]
}
console.log(sec_lar([10, 25, 8, 99, 67]))