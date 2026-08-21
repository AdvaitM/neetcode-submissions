class Solution {
    public int[][] kClosest(int[][] points, int k) {
        PriorityQueue<int[]> pQ = new PriorityQueue<>((a, b)->b[0]-a[0]);

        for(int i=0; i<points.length; i++) {
            int length = points[i][0]*points[i][0] + points[i][1]*points[i][1];
            int[] element = {length, i};
            pQ.offer(element);
            while(pQ.size()>k) {
                pQ.poll();
            }
        }

        int[][] sol = new int[k][2];
        int j=0;
        while(pQ.size()!=0) {
            int[] element = pQ.poll();

            sol[j][0] = points[element[1]][0]; 
            sol[j][1] = points[element[1]][1];
            j++;
        }
        return sol;
    }
}