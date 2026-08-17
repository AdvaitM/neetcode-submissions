public class Codec {
     // Encodes a tree to a single string.
    public String serialize(TreeNode root) {
        StringBuilder builder = new StringBuilder();
        dfs(root, builder);
        return builder.toString();
    }

    public void dfs(TreeNode node, StringBuilder builder) {
        if (node == null) {
            builder.append("#,");
            return;
        }

        builder.append(node.val).append(",");
        dfs(node.left, builder);
        dfs(node.right, builder);
    }

    public TreeNode deserialize(String data) {
        String[] values = data.split(",");
        int[] index = new int[1];

        return dfs_2(values, index);
    }

    public TreeNode dfs_2(String[] values, int[] index) {
        if (values[index[0]].equals("#")) {
            index[0]++;
            return null;
        }

        TreeNode node = new TreeNode(Integer.parseInt(values[index[0]]));
        index[0]++;

        node.left = dfs_2(values, index);
        node.right = dfs_2(values, index);

        return node;
    }

}