/**
 * Definition of Interval:
 * class Interval  {
 *   constructor(start, end) {
 *     this.start = start;
 *     this.end = end;
 *   }
 * }
 */

class Solution {
    /**
     * @param {Interval[]} intervals
     * @returns {boolean}
     */
    canAttendMeetings(intervals: Interval[]): boolean {
        intervals.sort((a, b) =>  a.start - b.start);
        if(!intervals || intervals.length <= 1) {
            return true;
        }
        for(let i = 1; i < intervals.length; i++)
        {
            if(intervals[i].start < intervals[i-1].end) {
                return false
            }
        }
        return true;
    }
}
