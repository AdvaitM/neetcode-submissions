class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    twoSum(nums: number[], target: number): number[] {
        let indexMap: Map<number, number> = new Map();

        for(let i = 0; i< nums.length; i++){
            let diff: number = target - nums[i];
            if(indexMap.has(diff)){
                return [indexMap.get(diff), i]
            }
            indexMap.set(nums[i], i)
        }
        return [];
    }
}
