class Solution {
    /**
     * @param {character[][]} grid
     * @return {number}
     */
    numIslands(grid: string[][]): number {
        let n: number = grid.length;
        let m: number = grid[0].length;
        let count: number = 0;

        for(let i = 0; i < n; i++) {
            for( let j = 0; j < m; j++) {
                if(grid[i][j] === '1') {
                    count++;
                    this.dfs(i, j, grid);
                }
            }
        }
        return count;
    }

    private dfs(r: number, c: number, grid: string[][]) {
        let n: number = grid.length;
        let m: number = grid[0].length;
        if(r < 0 || c < 0 || r >=n || c >= m || grid[r][c] != '1'){
            return;
        } 
        grid[r][c] = '0';
        this.dfs(r-1, c, grid)
        this.dfs(r, c-1, grid)
        this.dfs(r+1, c, grid)
        this.dfs(r, c+1, grid)
    }
}
