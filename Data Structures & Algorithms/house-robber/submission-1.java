class Solution {
    int[] memo;
    public int rob(int[] nums) {
        int n = nums.length;
        memo = new int[n+1];
        Arrays.fill(memo, -1);
        return dfs(nums, 0);
    }

    private int dfs(int[] nos, int i)
    {
        if(i >= nos.length)
        {
            return 0;
        }

        if(memo[i] != -1) return memo[i];

        memo[i] = Math.max(nos[i] + dfs(nos, i+2), dfs(nos, i+1));

        return memo[i];
    }
}
