class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    eraseOverlapIntervals(intervals) : number {
        intervals.sort((a: number, b: number) => a[0] - b[0]);
        let res: number = 0;
        let prevEnd: number = intervals[0][1];

        for (let i = 1; i < intervals.length; i++) {
            const start: number = intervals[i][0];
            const end: number = intervals[i][1];
            if (start >= prevEnd) {
                prevEnd = end;
            } else {
                res++;
                prevEnd = Math.min(end, prevEnd);
            }
        }
        return res;
    }
}