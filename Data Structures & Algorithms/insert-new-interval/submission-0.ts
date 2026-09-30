class Solution {
    /**
     * @param {number[][]} intervals
     * @param {number[]} newInterval
     * @return {number[][]}
     */
    insert(intervals, newInterval) {
        if (intervals.length === 0) {
            return [newInterval];
        }

        let n = intervals.length;
        let target = newInterval[0];
        let left = 0,
            right = n - 1;

        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (intervals[mid][0] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        intervals.splice(left, 0, newInterval);

        let res = [];
        for (let interval of intervals) {
            if (res.length === 0 || res[res.length - 1][1] < interval[0]) {
                res.push(interval);
            } else {
                res[res.length - 1][1] = Math.max(
                    res[res.length - 1][1],
                    interval[1],
                );
            }
        }

        return res;
    }
}