class Solution {
    public int[][] kClosest(int[][] points, int k) {
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> b[0] - a[0]);

        for(int i=0; i<points.length; i++){
            int dist = points[i][0]*points[i][0] + points[i][1]*points[i][1];

            if(pq.size() < k){
                pq.offer(new int[]{dist, points[i][0], points[i][1]});
            }else{
                if(dist < pq.peek()[0]){
                pq.poll();
                pq.offer(new int[]{dist, points[i][0], points[i][1]});
            }
            }
        }
        int idx = 0;
        int[][] ans = new int[pq.size()][2];
        while(!pq.isEmpty()){
            int[] top = pq.poll();
            ans[idx][0] = top[1];
            ans[idx][1] = top[2];
            idx++;
        }
        return ans;

    }
}