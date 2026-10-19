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
     * @param {number} k
     * @return {ListNode}
     */
    reverseKGroup(head: ListNode | null, k: number): ListNode {
        const dummy = new ListNode(0, head)
        let prevGroupTail = dummy
        while (true) {
            let kth = prevGroupTail
            for (let i = 0; i < k; i++) {
                kth = kth.next
                if (!kth) return dummy.next
            }
            const gNext = kth.next
            let prev = gNext
            let curr = prevGroupTail.next
            while (curr !== gNext) {
                let tmp = curr.next
                curr.next = prev
                prev = curr
                curr = tmp
            }
            let tmp = prevGroupTail.next
            prevGroupTail.next = kth
            prevGroupTail = tmp
        }

    }

}
