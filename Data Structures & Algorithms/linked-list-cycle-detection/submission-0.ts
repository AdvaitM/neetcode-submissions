/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */

class Solution {
    /**
     * @param {ListNode} head
     * @return {boolean}
     */
    hasCycle(head: ListNode | null): boolean {
        let slow: ListNode = head;
        let fast: ListNode = head;
        while(fast != null && fast.next != null)
        {
            fast = fast.next.next;
            slow = slow.next;

            if(slow === fast)
            {
                return true;
            }
        }

        return false;
    }
}
