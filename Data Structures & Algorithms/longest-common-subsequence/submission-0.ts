class Solution {
    /**
     * @param {string} text1
     * @param {string} text2
     * @return {number}
     */
    longestCommonSubsequence(text1, text2) {
        if (text1.length < text2.length) {
            [text1, text2] = [text2, text1];
        }

        const dp = new Array(text2.length + 1).fill(0);

        for (let i = text1.length - 1; i >= 0; i--) {
            let prev = 0;
            for (let j = text2.length - 1; j >= 0; j--) {
                let temp = dp[j];
                if (text1[i] === text2[j]) {
                    dp[j] = 1 + prev;
                } else {
                    dp[j] = Math.max(dp[j], dp[j + 1]);
                }
                prev = temp;
            }
        }

        return dp[0];
    }
}