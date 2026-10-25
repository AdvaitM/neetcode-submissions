class Solution {
    /**
     * @param {string} text1
     * @param {string} text2
     * @return {number}
     */
    longestCommonSubsequence(text1: string, text2: string): number {
        const memo = Array.from({length: text1.length}, ()=>Array(text2.length).fill(-1))
        const dfs = (i: number, j: number) => {
            if(i >= text1.length || j >= text2.length)
                return 0
            if(memo[i][j] !== -1) return memo[i][j]
            if(text1[i] === text2[j])
                return (memo[i][j] = 1 + dfs(i+1, j+1))
            
            return (memo[i][j] =Math.max(dfs(i, j+1), dfs(i+1,j)))
        }

        return dfs(0,0)
    }
}
