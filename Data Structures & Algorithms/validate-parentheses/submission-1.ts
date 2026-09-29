class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isValid(s: string): boolean {
        if(s.length === 0) {
            return true;
        }

        const stack: string[] = [];

        for(let char of s){
            switch(char) {
                case '{' : {
                    stack.push('}');
                    break;
                }
                case '[' : {
                    stack.push(']');
                    break;
                }
                case '(' : {
                    stack.push(')');
                    break;
                }
                default:
                if(char != stack.pop())
                {
                    return false
                }
            }
        }
        return stack.length === 0;
    }
}
