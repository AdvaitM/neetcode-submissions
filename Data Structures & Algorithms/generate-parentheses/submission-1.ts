class Solution {
    private result: string[] = []
    private stack = [];
    /**
     * @param {number} n
     * @return {string[]}
     */
    public generateParenthesis(n: number): string[] {
        this.parenthesis(0, 0, n);

        return this.result;
    }
    
    private parenthesis(open: number, close: number, n: number) {
            if (open == n && close == n) {
                this.result.push(this.stack.join(""))
                return;
            }

            if (open < n) {
                this.stack.push("(");
                this.parenthesis(open + 1, close, n);
                this.stack.pop();
            }

            if (close < open) {
                this.stack.push(")")
                this.parenthesis(open, close + 1, n);
                this.stack.pop();
            }
        }

}