public class Solution {

    public int numDecodings(String s) {
        int[] dp = new int[s.length() + 1];
        Arrays.fill(dp , -1);
        dp[s.length()] = 1;

        return dfs(s, 0, dp);
    }

    private int dfs(String s, int i, int[] dp) {
        if (dp[i] != -1) {
            return dp[i];
        }
        if (s.charAt(i) == '0') {
            return 0;
        }

        int res = dfs(s, i + 1, dp);
        if (i + 1 < s.length() && (s.charAt(i) == '1' ||
           s.charAt(i) == '2' && s.charAt(i + 1) < '7')) {
            res += dfs(s, i + 2, dp);
        }
        dp[i] = res;
        return res;
    }
}