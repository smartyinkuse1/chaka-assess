// Got this simple helper from geek4geeks
// https://www.geeksforgeeks.org/maximum-and-minimum-in-an-array/
export default (arr:number[], length: number) =>
{
    let minmax :{min:number, max: number} = { min:0, max:0};
    let i;


    /*If there is only one element then return it as min and max both*/
    if (length == 1) {
        minmax.max = arr[0];
        minmax.min = arr[0];
        return minmax;
    }

    /* If there are more than one elements, then initialize min
and max*/
    if (arr[0] > arr[1]) {
        minmax.max = arr[0];
        minmax.min = arr[1];
    } else {
        minmax.max = arr[1];
        minmax.min = arr[0];
    }

    for (i = 2; i < length; i++) {
        if (arr[i] > minmax.max) {
            minmax.max = arr[i];
        } else if (arr[i] < minmax.min) {
            minmax.min = arr[i];
        }
    }

    return minmax;
}
