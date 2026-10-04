# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    max: int = 0
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        self.dfs(root)
        return self.max
    
    def dfs(self, root: Optional[TreeNode]) -> int :
        if root == None:
            return 0
        leftMax: int = self.dfs(root.left)
        rightMax: int = self.dfs(root.right)
        self.max = max(self.max, leftMax + rightMax)
        return 1 + max(leftMax, rightMax)
        