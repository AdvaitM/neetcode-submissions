class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    rob(nums) {
        if (nums.length === 0) return 0;
        if (nums.length === 1) return nums[0];

        return Math.max(
            this.helper(nums.slice(1)),
            this.helper(nums.slice(0, -1)),
        );
    }

    /**
     * @param {number[]} nums
     * @return {number}
     */
    helper(nums) {
        if (nums.length === 0) return 0;
        if (nums.length === 1) return nums[0];

        const dp = new Array(nums.length);
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);

        for (let i = 2; i < nums.length; i++) {
            dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2]);
        }

        return dp[nums.length - 1];
    }
}