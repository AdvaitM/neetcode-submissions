class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    lengthOfLongestSubstring(s: string): number {
        let charSet: Set<string> = new Set();
        let l: number = 0;
        let result: number = 0;

        for(let r = 0; r< s.length; r++) {
            while(charSet.has(s[r])) {
                charSet.delete(s[l]);
                l++;
            }
            charSet.add(s[r]);
            result = Math.max(result, r-l + 1);
        }
        return result;
    }
}
