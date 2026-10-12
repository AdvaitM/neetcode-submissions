class Solution {
    /**
     * @param {number} x
     * @param {number} n
     * @return {number}
     */
    myPow(x: number, n: number): number {
        if(n === 0) {
            return 1;
        }
        if(n < 0) {
            x = 1/x;
            n = -n;
        }
        let temp: number = this.myPow(x, Math.trunc(n/2))
        if (n % 2 === 0) {
            return temp * temp;
        } else {
            return x * temp * temp;
        }
    }
}
