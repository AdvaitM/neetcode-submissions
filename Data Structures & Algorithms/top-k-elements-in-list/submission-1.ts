class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    topKFrequent(nums: number[], k: number): number[] {
        const count: Map<number, number> = new Map<number, number>();
        const freq: number[][] = Array.from({ length: nums.length + 1 }, () => []);

        nums.forEach((n: number) => {
            count.set(n, (count.get(n) || 0) + 1);
        })
        count.forEach((value, key) => {
            freq[value].push(key);
        })
        const res: number[] = [];
    
    // 4. Collect elements starting from the highest frequency bucket
        for (let i = freq.length - 1; i >= 0; i--) {
            for (const num of freq[i]) {
                res.push(num);
                if (res.length === k) {
                    return res;
                }
            }
        }    
    return res;
    }
}
