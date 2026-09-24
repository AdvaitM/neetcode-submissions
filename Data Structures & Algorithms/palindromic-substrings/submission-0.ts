class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    countSubstrings(s) {
        let res = 0;
        for (let i = 0; i < s.length; i++) {
            res += this.countPali(s, i, i);
            res += this.countPali(s, i, i + 1);
        }
        return res;
    }

    /**
     * @param {string} s
     * @param {number} l
     * @param {number} r
     * @return {number}
     */
    countPali(s, l, r) {
        let res = 0;
        while (l >= 0 && r < s.length && s.charAt(l) === s.charAt(r)) {
            res++;
            l--;
            r++;
        }
        return res;
    }
}