class Solution:
    def hasDuplicate(self, nums: List[int]) -> bool:
        unique: Set[int] = set()

        for num in nums:
            if num in unique:
                return True
            else:
                unique.add(num)

        return False;

        
        