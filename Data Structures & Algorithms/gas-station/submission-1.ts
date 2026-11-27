class Solution {
    /**
     * @param {number[]} gas
     * @param {number[]} cost
     * @return {number}
     */
    canCompleteCircuit(gas: number[], cost: number[]): number {
        let sum = 0
        for (let i =0; i < gas.length; i++) {
            sum += gas[i] - cost[i]
        }
        if (sum < 0) return -1;

        let start = 0;
        let current = 0;
        for (let i = 0; i < gas.length;i++) {
            current += gas[i] - cost[i]

            if (current < 0) {
                current = 0;
                start = i + 1
            }
        }
        return start
    }
}
