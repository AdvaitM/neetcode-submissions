class Solution {
    private nums: number[];
    private target: number;
    private res: number[][];
    /**
     * @param {number[]} nums
     * @param {number} target
     * @returns {number[][]}
     */
    combinationSum(nums, target) {
        this.nums = nums;
        this.target = target
        this.res = [];
        nums.sort((a, b) => a - b);
        this.dfs(0, [], 0);
        return this.res;
    }

    private dfs = (i: number, cur: number[], total: number) => {
            if (total === this.target) {
                this.res.push([...cur]);
                return;
            }

            for (let j = i; j < this.nums.length; j++) {
                if (total + this.nums[j] > this.target) {
                    return;
                }
                cur.push(this.nums[j]);
                this.dfs(j, cur, total + this.nums[j]);
                cur.pop();
            }
        };
}
