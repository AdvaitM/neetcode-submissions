class Solution {
    public int largestRectangleArea(int[] heights) {

        Stack<Integer> st = new Stack<Integer>();
        int maxarea = 0;

        for (int i = 0; i <= heights.length; i++) {
            int currheight = (i == heights.length) ? 0 : heights[i];

            while (!st.isEmpty() && heights[st.peek()] >= currheight) {
                int index = st.pop();
                int height = heights[index];
                int width;

                if (st.isEmpty()) {
                    width = i;
                } else {
                    width = i - st.peek() - 1;
                }

                int area = height * width;
                maxarea = Math.max(area, maxarea);
            }
            if (i < heights.length) {
                st.push(i);
            }
        }
        return maxarea;
    }
}