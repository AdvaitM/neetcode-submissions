class TrieNode {
    public children: Map<string, TrieNode>;
    public endOfWord: boolean;
    constructor() {
        this.children = new Map();
        this.endOfWord = false;
    }
}

class PrefixTree {
    public root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * @param {string} word
     * @return {void}
     */
    insert(word) {
        let cur = this.root;
        for (let c of word) {
            if (!cur.children.has(c)) {
                cur.children.set(c, new TrieNode());
            }
            cur = cur.children.get(c);
        }
        cur.endOfWord = true;
    }

    /**
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        let cur = this.root;
        for (let letter of word) {
            if (!cur.children.has(letter)) {
                return false;
            }
            cur = cur.children.get(letter);
        }
        return cur.endOfWord;
    }

    /**
     * @param {string} prefix
     * @return {boolean}
     */
    startsWith(prefix) {
        let cur = this.root;
        for (let letter of prefix) {
            if (!cur.children.has(letter)) {
                return false;
            }
            cur = cur.children.get(letter);
        }
        return true;
    }
}