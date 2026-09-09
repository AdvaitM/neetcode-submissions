/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val = 0, left = null, right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

class Solution {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    private max: number = 0;
    diameterOfBinaryTree(root: TreeNode | null): number {
        this.dfs(root);
        return this.max;
    }

    dfs(root:TreeNode | null): number{
        if(root == null)
        {
            return 0;
        }
        const leftMax: number = this.dfs(root.left);
        const rightMax: number = this.dfs(root.right);
        this.max = Math.max(this.max, leftMax + rightMax);
        return 1 + Math.max(leftMax, rightMax);

    }
}
