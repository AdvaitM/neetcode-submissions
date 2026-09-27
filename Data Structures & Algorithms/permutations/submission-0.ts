class Solution {
    private res = [];
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    permute(nums) {
        this.backtrack([], nums, new Array(nums.length).fill(false));
        return this.res;

       
    }

     private backtrack(perm, nums, pick) {
            if (perm.length === nums.length) {
                this.res.push([...perm]);
                return;
            }
            for (let i = 0; i < nums.length; i++) {
                if (!pick[i]) {
                    perm.push(nums[i]);
                    pick[i] = true;
                    this.backtrack(perm, nums, pick);
                    perm.pop();
                    pick[i] = false;
                }
            }
        }
}