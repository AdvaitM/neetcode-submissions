class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number[]}
     */
    spiralOrder(matrix) {
        const res = [];
        const directions = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
        ];
        const steps = [matrix[0].length, matrix.length - 1];

        let r = 0,
            c = -1,
            d = 0;
        while (steps[d % 2]) {
            for (let i = 0; i < steps[d % 2]; i++) {
                r += directions[d][0];
                c += directions[d][1];
                res.push(matrix[r][c]);
            }
            steps[d % 2]--;
            d = (d + 1) % 4;
        }
        return res;
    }
}