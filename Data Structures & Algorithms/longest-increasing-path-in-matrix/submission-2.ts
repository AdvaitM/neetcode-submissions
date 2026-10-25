class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number}
     */
    longestIncreasingPath(matrix) {
        const directions = [
             [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
        ]; //
        const m = matrix.length;
        const n = matrix[0].length;

        let dp = Array.from({ length: m }, () => Array(n).fill(-1));

        const dfs = (i, j, parent) => {
            if (i < 0 || i >= m || j < 0 || j >= n || matrix[i][j] <= parent) {
                return 0;
            }

            if (dp[i][j] !== -1) return dp[i][j];

            let res = 1;
            for (let d of directions) {
                res = Math.max(res, 1 + dfs(i+d[0], j+d[1], matrix[i][j]));
            }
            dp[i][j] = res;
            return res;
        };

        let max = 0;
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                max = Math.max(max, dfs(i, j, -Infinity));
            }
        }
        return max;
    }
}
