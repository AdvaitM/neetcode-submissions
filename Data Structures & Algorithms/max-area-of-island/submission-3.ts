class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    maxAreaOfIsland(grid: number[][]): number {
        let maxArea: number = 0;
        for(let i = 0; i< grid.length; i++){
            for(let j = 0; j < grid[0].length; j++) {
                if(grid[i][j] === 1) {
                    maxArea = Math.max(maxArea, this.islandArea(i, j, grid));
                }
            }
        }
        return maxArea
    }

    private islandArea(r: number, c: number, grid: number[][]) {
        if(r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] === 0) {
            return 0
        }

        grid[r][c] = 0;
        return 1 + this.islandArea(r - 1, c , grid) + this.islandArea(r, c - 1 , grid) + this.islandArea(r + 1, c , grid) + this.islandArea(r, c + 1 , grid)
    }
}
