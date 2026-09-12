class Solution {
    /**
     * @param {number} numCourses
     * @param {number[][]} prerequisites
     * @return {boolean}
     */
    canFinish(numCourses: number, prerequisites: number[][]): boolean {
        const adjArray = Array.from({ length: numCourses}, () => []);
        const indegrees = Array(numCourses).fill(0);

        for (const [course, prereq] of prerequisites) {
            adjArray[prereq].push(course);
            indegrees[course]++;
        }

        const q = [];
        for (let i=0;i<indegrees.length;i++) {
            const indegree = indegrees[i];
            if (indegree === 0) {
                q.push(i);
            }
        }

        let head = 0;
        let coursesTaken = 0;
        while (head < q.length) {
            const courseToTake = q[head++];
            coursesTaken++;
            for (const course of adjArray[courseToTake]) {
                indegrees[course]--;
                if (indegrees[course] === 0) {
                    q.push(course);
                }
            }
        }

        return coursesTaken === numCourses;
    }
}
