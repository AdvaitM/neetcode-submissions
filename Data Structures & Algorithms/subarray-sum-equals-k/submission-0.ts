class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    subarraySum(nums, k) {
        let res = 0,
            curSum = 0;
        const prefixSums = new Map();
        prefixSums.set(0, 1);

        for (let num of nums) {
            curSum += num;
            let diff = curSum - k;
            res += prefixSums.get(diff) || 0;
            prefixSums.set(curSum, (prefixSums.get(curSum) || 0) + 1);
        }

        return res;
    }
}