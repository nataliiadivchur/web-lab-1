function MergeList(arr1, arr2){
    let result = [];
    while (arr1.length && arr2.length){
        const x = arr1[0] < arr2[0] ? arr1.shift() : arr2.shift();
        result.push(x);
    }
    return arr1.length ? result.concat(arr1) : result.concat(arr2);
}
function MergeSort(arr){
    const size = arr.length -1;
    if(size){
        const middle = Math.floor(size/2);
        const arr1 = MergeSort(arr.slice(0,middle+1));
        const arr2 = MergeSort(arr.slice(middle+1));
        return MergeList(arr1, arr2);
    }
    return arr;
}
let arr = [2, 8, 4, 12, 8, 1, 3];
console.log("Початковий масив: " + arr + "\nСортування...\nВідсортований масив: " + MergeSort(arr));