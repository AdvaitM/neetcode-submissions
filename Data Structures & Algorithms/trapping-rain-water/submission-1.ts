class Solution {
    /**
     * @param {number[]} height
     * @return {number}
     */
    trap(height: number[]): number {
        if(!height || height.length === 0) {
            return 0;
        }

        let l: number = 0; 
        let r: number = height.length - 1;
        let leftMax: number = height[l];
        let rightMax: number = height[r];
        let result: number = 0;
        while(l < r) {
            if(leftMax < rightMax) {
                l++;
                leftMax = Math.max(leftMax, height[l]);
                result += Math.max(0, leftMax - height[l])
            } else {
                r--;
                rightMax = Math.max(rightMax, height[r])
                result += Math.max(0, rightMax - height[r]);
            }
        }
        return result;
    }
}
