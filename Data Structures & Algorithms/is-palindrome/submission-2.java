class Solution {
    public boolean isPalindrome(String s) {
        char[] words = s.toLowerCase().toCharArray();

        int left = 0;
        int right = words.length - 1;

        while(left < right) {

            while(left < right && !Character.isLetterOrDigit(words[left])) {
                left++;
            }

            while(right > left && !Character.isLetterOrDigit(words[right])) {
                right--;
            }

            if(words[left] != words[right]) {
                return false;
            }
            left++;
            right--;
        }

        return true;
        
    }
}
