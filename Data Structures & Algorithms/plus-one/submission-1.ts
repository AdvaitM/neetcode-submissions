class Solution {
    /**
     * @param {number[]} digits
     * @return {number[]}
     */
    plusOne(digits: number[]): number[] {
        let add = 0;
        for(let i = digits.length - 1; i >= 0; i--) {
            if(digits[i] === 9) {
                digits[i] = 0;
                add = 1;
            } else {
                digits[i]++;
                add = 0;
                break;
            }
        }
        if(add === 1) {
            digits.unshift(add);
        }
        return digits;
    }
}
