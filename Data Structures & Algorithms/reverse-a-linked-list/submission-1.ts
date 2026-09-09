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
     * @return {ListNode}
     */
    reverseList(head: ListNode | null): ListNode {
        if(!head){
            return head;
        }

        let prev: ListNode = null;
        while(head !== null)
        {
            let temp: ListNode = head.next;
            head.next = prev;
            prev = head;
            head = temp;
        }
    return prev;
    }
}
