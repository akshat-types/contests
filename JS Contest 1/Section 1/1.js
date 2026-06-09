//Program 1
function sum1(arr){
    for(let i=0;i<arr.length;i++)
    {
        sum=0;
        for(let j=0;j<arr[i].length;j++){
            sum=sum+arr[i][j];
        }
        if (sum<0){
            arr[i]=0;
        }
        else{
            arr[i]=sum;
        }
    }
    return arr;
}

console.log(sum1([[1,2,3,4], [5,6,7,8], [10,4,2,1], [1], [-10, 8]]));