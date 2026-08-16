class Solution {
    int pre_idx = 0;
    HashMap<Integer, Integer> indices = new HashMap<>();
    
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        for (int i = 0; i < inorder.length; i++) {
            indices.put(inorder[i], i);
        }

        return dfs(preorder, 0, inorder.length - 1);
    }

    private TreeNode dfs(int[] preorder, int left, int right) {
        if (left > right) {
            return null;
        }

        int rootVal = preorder[pre_idx++];
        TreeNode root = new TreeNode(rootVal);

        int middleIdx = indices.get(rootVal);
        root.left = dfs(preorder, left, middleIdx - 1);
        root.right = dfs(preorder, middleIdx + 1, right);

        return root;
    }
}