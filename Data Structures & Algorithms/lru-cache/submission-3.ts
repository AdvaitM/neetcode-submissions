class ListNode {
    key: number;
    value: number;
    next: ListNode;
    prev: ListNode;

    constructor(key, value) {
        this.key= key;
        this.value= value;
        this.next = null;
        this.prev = null;
    }
}

class LRUCache {
    head: ListNode | null;
    tail: ListNode | null;
    itemsMap: Map<number, ListNode>;
    capacity: number;
    /**
     * @param {number} capacity
     */
    constructor(capacity: number) {
        this.itemsMap = new Map<number, ListNode>();
        this.capacity = capacity;
        this.head = new ListNode(-1, -1); // DUMMY
        this.tail = new ListNode(-1, -1); // DUMMY
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    // פונקציית עזר 1: הוצאת תא מהרשימה הדו-כיוונית ב-O(1)
    private remove(node: ListNode): void {
        const prev = node.prev!;
        const next = node.next!;
        prev.next = next;
        next.prev = prev;
    }

    // פונקציית עזר 2: הכנסת תא לראש הרשימה (מייד אחרי Dummy Head)
    private setHead(node: ListNode): void {
        const first = this.head.next!;
        node.next = first;
        node.prev = this.head;
        this.head.next = node;
        first.prev = node;
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key: number): number {
        const item = this.itemsMap.get(key);
        if (!item) {
            return -1; // cache miss
        }

        // cache hit
        this.remove(item);
        this.setHead(item);
        return item.value;
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key: number, value: number): void {
        if (this.itemsMap.has(key)) {
            this.remove(this.itemsMap.get(key)!);
        }
        const newNode = new ListNode(key, value);
        this.setHead(newNode);
        this.itemsMap.set(key, newNode);

        // אם חרגנו מהקיבולת - מוחקים את האיבר הכי פחות בשימוש (ממש לפני Dummy Tail)
        if (this.itemsMap.size > this.capacity) {
            const lru = this.tail.prev!;
            this.remove(lru);
            this.itemsMap.delete(lru.key);
        }        
    }
}
