class Solution 
{
    public boolean isPalindrome(String s) {
        if(s.length() == 0)
        {
            return true;
        }

        int l = 0;
        int r = s.length() - 1;
        while(l <= r)
        {
            char c = s.charAt(l);
            char e = s.charAt(r);
            if (!((c >= 'a' && c<= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')))
                {
                    l++;
                    continue;
                }
            if (!((e >= 'a' && e<= 'z') || (e >= 'A' && e <= 'Z') || (e >= '0' && e <= '9')))
                {
                    r--;
                    continue;
                }
            if(Character.toLowerCase(c) != Character.toLowerCase(e))
                {
                    return false;
                }
            l++;
            r--;
        }
        return true;
    }
}
