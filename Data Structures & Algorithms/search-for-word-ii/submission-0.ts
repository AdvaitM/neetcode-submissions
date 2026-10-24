class TrieNode {
    readonly children: Map<string, TrieNode>
    public isWord: boolean;
    constructor() {
        this.children = new Map();
        this.isWord = false;
    }

    /**
     * @param {string} word
     * @return {void}
     */
    addWord(word) {
        let cur: TrieNode = this;
        for (const c of word) {
            if (!(cur.children.has(c))) {
                cur.children.set(c, new TrieNode());
            }
            cur = cur.children.get(c);
        }
        cur.isWord = true;
    }
}

class Solution {
    /**
     * @param {character[][]} board
     * @param {string[]} words
     * @return {string[]}
     */
    findWords(board, words) {
        const root = new TrieNode();
        for (const word of words) {
            root.addWord(word);
        }

        const ROWS = board.length,
            COLS = board[0].length;
        const res = new Set(),
            visit = new Set();

        const dfs = (r: number, c: number, node: TrieNode, word: string) => {
            if (
                r < 0 ||
                c < 0 ||
                r >= ROWS ||
                c >= COLS ||
                visit.has(`${r},${c}`) ||
                !(node.children.has(board[r][c]))
            ) {
                return;
            }

            visit.add(`${r},${c}`);
            node = node.children.get(board[r][c]);
            word += board[r][c];
            if (node.isWord) {
                res.add(word);
            }

            dfs(r + 1, c, node, word);
            dfs(r - 1, c, node, word);
            dfs(r, c + 1, node, word);
            dfs(r, c - 1, node, word);

            visit.delete(`${r},${c}`);
        };

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                dfs(r, c, root, '');
            }
        }

        return Array.from(res);
    }
}