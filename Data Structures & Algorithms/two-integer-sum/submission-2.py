class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        diffs: dict[int, int] = dict()

        for i, num in enumerate(nums) :
            diff = target - num
            if diff in diffs.keys():
                return [diffs[diff], i]
            diffs[num] = i


        