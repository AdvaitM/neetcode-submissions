class Solution {
    /**
     * @param {number} n
     * @param {number[][]} edges
     * @returns {boolean}
     */
    private visit: Set<number> = new Set();
    private adj: number[][];
    validTree(n, edges) {
        if (edges.length > n - 1) {
            return false;
        }

        this.adj = Array.from({ length: n }, () => []);
        for (const [u, v] of edges) {
            this.adj[u].push(v);
            this.adj[v].push(u);
        }

        return this.dfs(0, -1) && this.visit.size === n;
    }

    private dfs(node, parent): boolean {
            if (this.visit.has(node)) {
                return false;
            }

            this.visit.add(node);
            for (const nei of this.adj[node]) {
                if (nei === parent) {
                    continue;
                }
                if (!this.dfs(nei, node)) {
                    return false;
                }
            }
            return true;
        };
}