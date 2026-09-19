class Solution:
    def search(self, nums: list[int], target: int) -> int:
        l: int = 0
        r: int = len(nums) - 1

        while l <= r:
            mid: int = l + (r - l) // 2
            if nums[mid] > target:
                r = mid - 1
            elif nums[mid] < target:
                l = mid + 1
            else:
                return mid
        return -1