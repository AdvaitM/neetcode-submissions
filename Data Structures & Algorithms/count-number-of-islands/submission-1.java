class Solution {
    public int numIslands(char[][] grid) {
        int n = grid.length;
        int m = grid[0].length;
        int count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(i, j, grid);
                }
            }
        }
        return count;
    }

    private void dfs(int r, int c, char[][] grid) {
        int n = grid.length;
        int m = grid[0].length;
        if (r < 0 || c < 0 || r >= n || c >= m) {
            return;
        }
        if (grid[r][c] != '1') {
            return;
        }
        grid[r][c] = '0';
        dfs(r - 1, c, grid);
        dfs(r, c - 1, grid);
        dfs(r + 1, c, grid);
        dfs(r, c + 1, grid);
    }
}
