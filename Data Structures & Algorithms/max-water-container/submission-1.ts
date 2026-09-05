class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    maxArea(heights: number[]): number {
        if(heights.length === 0)
        {
            return 0;
        }
        let l: number = 0;
        let r: number = heights.length - 1;
        let maxWater:number = 0
        while(l < r)
        {
            let height: number = Math.min(heights[l], heights[r]);
            let width: number = r - l;
            let water: number = width * height;
            maxWater = Math.max(water, maxWater);
            if(heights[l] < heights[r])
            {
                l++;
            }
            else 
            {
                r--;
            }
        }
        return maxWater
    }
}
