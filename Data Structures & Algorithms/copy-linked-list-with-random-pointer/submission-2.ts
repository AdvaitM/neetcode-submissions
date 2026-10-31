// class Node {
//   constructor(val, next = null, random = null) {
//       this.val = val;
//       this.next = next;
//       this.random = random;
//   }
// }

class Solution {
    /**
     * @param {Node} head
     * @return {Node}
     */
    copyRandomList(head: Node | null): Node {
        if (!head) return null;

        const nodeMap = new Map<Node, Node>();
        let current: Node | null = head;

        while (current) {
            nodeMap.set(current, new Node(current.val));
            current = current.next;
        }

        current = head;

        while (current) {
            const node = nodeMap.get(current)!;

            node.next = current.next
                ? nodeMap.get(current.next)!
                : null;

            node.random = current.random
                ? nodeMap.get(current.random)!
                : null;

            current = current.next;
        }

        return nodeMap.get(head)!;
    }
}
