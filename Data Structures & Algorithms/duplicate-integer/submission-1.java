class Solution {
    public boolean hasDuplicate(int[] nums) {
        if(nums.length == 0)
        {
            return false;
        }
        Map<Integer, Integer> hash = new HashMap<Integer, Integer>(0);
        for(int num: nums)
        {
            if(hash.containsKey(num))
            {
                return true;
            }
            hash.put(num, num);
        
        }
        return false;
    }
}