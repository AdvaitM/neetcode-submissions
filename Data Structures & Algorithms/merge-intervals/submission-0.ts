class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number[][]}
     */
    merge(intervals: number[][]): number[][] {
        intervals.sort((a, b) => a[0] - b[0]);
        const result: number[][] = [];
        result.push(intervals[0]);

        for(const interval of intervals){
            const start: number = interval[0];
            const end: number = interval[1];
            const last: number = result[result.length - 1][1];

            if(start <= last) {
                result[result.length - 1][1] = Math.max(end, last);
            }
            else {
                result.push([start, end]);
            }
        }
        return result;

    }
}
