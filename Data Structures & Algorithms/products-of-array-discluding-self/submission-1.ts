class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    productExceptSelf(nums: number[]): number[] {
        const length: number = nums.length;
        let res: number[] = [length];
        res[0] = 1;
        for(let i: number = 1; i< length; i++) {
            res[i] = res[i-1] * nums[i-1];
        }
        
        let postfix: number = 1;
        for(let i:number = length - 1; i >= 0; i--){
            res[i] *= postfix;
            postfix *= nums[i];
        }
        return res

    }
}
