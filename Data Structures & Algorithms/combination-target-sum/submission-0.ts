class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @returns {number[][]}
     */
    combinationSum(nums, target) {
        const res = [];
        nums.sort((a, b) => a - b);

        const dfs = (i, cur, total) => {
            if (total === target) {
                res.push([...cur]);
                return;
            }

            for (let j = i; j < nums.length; j++) {
                if (total + nums[j] > target) {
                    return;
                }
                cur.push(nums[j]);
                dfs(j, cur, total + nums[j]);
                cur.pop();
            }
        };

        dfs(0, [], 0);
        return res;
    }
}
