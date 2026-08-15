class Solution {
    public boolean isValidBST(TreeNode root) {
        return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    public boolean valid(TreeNode root, long left, long right) {
        if (root == null) {
            return true;
        }

        if (!(left < root.val && right > root.val)) {
            return false;
        }

        return valid(root.left, left, root.val) && valid(root.right, root.val, right);
    }
}