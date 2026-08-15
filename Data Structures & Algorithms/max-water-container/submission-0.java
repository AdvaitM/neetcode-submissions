class Solution {
    public int maxArea(int[] heights) {
        if(heights.length == 0)
        {
            return 0;
        }
        int l = 0;
        int r = heights.length - 1;
        int maxWater = 0;
        while(l < r)
        {
            int height = Math.min(heights[l], heights[r]);
            int width = r - l;
            int water = width * height;
            maxWater = Math.max(water, maxWater);
            if (heights[l] < heights[r]) l++; else r--;
        }
        return maxWater;
    }
}
