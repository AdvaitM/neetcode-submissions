class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    eraseOverlapIntervals(intervals) {
        intervals.sort((a, b) => a[1] - b[1]);
        let res = 0;
        let prevEnd = intervals[0][1];

        for (let i = 1; i < intervals.length; i++) {
            const start = intervals[i][0];
            const end = intervals[i][1];
            if (start < prevEnd) {
                res++;
            } else {
                prevEnd = end;
            }
        }
        return res;
    }
}