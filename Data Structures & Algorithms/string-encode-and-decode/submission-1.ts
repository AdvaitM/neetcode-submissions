class Solution {
    /**
     * @param {string[]} strs
     * @returns {string}
     */
    encode(strs: string[]): string {
        let encode: string = '';
        strs.forEach((str) => {
            encode = encode + `${str.length}` + `#` + str;
        })
        return encode;
    }

    /**
     * @param {string} str
     * @returns {string[]}
     */
    decode(str: string): string[] {
        let decode: string[] = [];
        let i: number = 0;
        
        while (i < str.length) {
            let j = i;
            while (str.charAt(j) !== '#') {
                j++;
            }
            
            const length: number = parseInt(str.substring(i, j));
            // The string starts right after the '#' character (j + 1)
            decode.push(str.substring(j + 1, j + 1 + length));
            
            // Move the pointer past the '#' character and the read string
            i = j + 1 + length;
        }
        return decode;
    }
}
