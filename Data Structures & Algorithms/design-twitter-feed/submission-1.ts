/**
 * import { PriorityQueue } from '@datastructures-js/priority-queue';
 */

class Twitter {
    private time: number;
    private followMap: Map<number, Set<number>>;
    private tweetMap: Map<number, number[][]>;
    constructor() {
        this.time = 0;
        this.followMap = new Map();
        this.tweetMap = new Map();
    }

    /**
     * @param {number} userId
     * @param {number} tweetId
     * @return {void}
     */
    postTweet(userId: number, tweetId: number): void {
        if(!this.tweetMap.has(userId)) {
            this.tweetMap.set(userId, []);
        }
        this.tweetMap.get(userId).push([this.time++, tweetId])
    }

    /**
     * @param {number} userId
     * @return {number[]}
     */
    getNewsFeed(userId: number): number[] {
        const res = [];
        if(!this.followMap.has(userId)) {
            this.followMap.set(userId, new Set());
        }

        this.followMap.get(userId).add(userId);
        const minHeap = new PriorityQueue((a: number, b: number) => b[0] - a[0]);

        for(const followeeId of this.followMap.get(userId)) {
            if(this.tweetMap.has(followeeId)) {
                const tweets: number[][] = this.tweetMap.get(followeeId);
                const index = tweets.length - 1;
                const [time, tweetId] = tweets[index]
                minHeap.enqueue([time, tweetId, followeeId, index - 1]);
            }
        }

        while(!minHeap.isEmpty() && res.length < 10) {
            const [time, tweetId, followeeId, nextIndex] = minHeap.dequeue();
            res.push(tweetId);
            if(nextIndex >= 0) {
                const [oldTime, olderTweetId] = this.tweetMap.get(followeeId)[nextIndex];
                minHeap.enqueue([oldTime, olderTweetId, followeeId, nextIndex - 1]);
            }
        }

        return res;

    }

    /**
     * @param {number} followerId
     * @param {number} followeeId
     * @return {void}
     */
    follow(followerId: number, followeeId: number): void {
        if(!this.followMap.has(followerId)) {
            this.followMap.set(followerId, new Set());
        }
        this.followMap.get(followerId).add(followeeId);
    }

    /**
     * @param {number} followerId
     * @param {number} followeeId
     * @return {void}
     */
    unfollow(followerId: number, followeeId: number): void {
        if(this.followMap.has(followerId)) {
            this.followMap.get(followerId).delete(followeeId);
        }
    }
}
