/**
 * NeetCode Test Harness
 * A comprehensive testing framework for algorithm solutions
 * Supports both Java and TypeScript implementations
 */

import * as fs from "fs";
import * as path from "path";

// ============================================================================
// TEST FRAMEWORK
// ============================================================================

interface TestCase<Input, Expected> {
  name: string;
  input: Input;
  expected: Expected;
}

interface TestResult {
  passed: boolean;
  testName: string;
  error?: string;
  actual?: any;
  expected?: any;
  executionTime?: number;
}

interface SuiteResult {
  suiteName: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  results: TestResult[];
  totalTime: number;
}

class TestHarness {
  private suites: SuiteResult[] = [];

  /**
   * Run a single test case
   */
  private runTest<Input, Expected>(
    testCase: TestCase<Input, Expected>,
    fn: (input: Input) => Expected
  ): TestResult {
    const startTime = performance.now();
    try {
      const actual = fn(testCase.input);
      const passed = this.deepEqual(actual, testCase.expected);

      return {
        passed,
        testName: testCase.name,
        actual,
        expected: testCase.expected,
        executionTime: performance.now() - startTime,
      };
    } catch (error) {
      return {
        passed: false,
        testName: testCase.name,
        error: (error as Error).message,
        executionTime: performance.now() - startTime,
      };
    }
  }

  /**
   * Run a test suite
   */
  runSuite<Input, Expected>(
    suiteName: string,
    testCases: TestCase<Input, Expected>[],
    fn: (input: Input) => Expected
  ): SuiteResult {
    const results = testCases.map((tc) => this.runTest(tc, fn));
    const passedTests = results.filter((r) => r.passed).length;

    const suiteResult: SuiteResult = {
      suiteName,
      totalTests: testCases.length,
      passedTests,
      failedTests: testCases.length - passedTests,
      results,
      totalTime: results.reduce((sum, r) => sum + (r.executionTime || 0), 0),
    };

    this.suites.push(suiteResult);
    return suiteResult;
  }

  /**
   * Deep equality check
   */
  private deepEqual(a: any, b: any): boolean {
    if (a === b) return true;
    if (typeof a !== "object" || typeof b !== "object") return false;
    if (a === null || b === null) return false;

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => this.deepEqual(a[key], b[key]));
  }

  /**
   * Print results summary
   */
  printResults(): void {
    console.log("\n" + "=".repeat(80));
    console.log("TEST RESULTS SUMMARY");
    console.log("=".repeat(80) + "\n");

    let totalTests = 0;
    let totalPassed = 0;
    let totalTime = 0;

    this.suites.forEach((suite) => {
      const status = suite.failedTests === 0 ? "✓ PASS" : "✗ FAIL";
      console.log(
        `${status} | ${suite.suiteName} (${suite.passedTests}/${suite.totalTests})`
      );

      suite.results.forEach((result) => {
        if (!result.passed) {
          console.log(
            `     └─ ✗ ${result.testName}: ${result.error || "Assertion failed"}`
          );
          if (result.actual !== undefined && result.expected !== undefined) {
            console.log(
              `        Expected: ${JSON.stringify(result.expected)}`
            );
            console.log(`        Actual:   ${JSON.stringify(result.actual)}`);
          }
        }
      });

      console.log(
        `     Time: ${suite.totalTime.toFixed(3)}ms\n`
      );

      totalTests += suite.totalTests;
      totalPassed += suite.passedTests;
      totalTime += suite.totalTime;
    });

    console.log("=".repeat(80));
    console.log(
      `TOTAL: ${totalPassed}/${totalTests} tests passed (${((totalPassed / totalTests) * 100).toFixed(1)}%)`
    );
    console.log(`Total Time: ${totalTime.toFixed(3)}ms`);
    console.log("=".repeat(80) + "\n");
  }
}

// ============================================================================
// SOLUTION IMPORTS
// ============================================================================

// Import your solutions here
// Example: import { climbStairs } from "./solutions/climbing-stairs";

// ============================================================================
// TEST CASES
// ============================================================================

/**
 * Helper: Climbing Stairs
 * Problem: Climb n stairs, each time you can climb 1 or 2 stairs
 */
class ClimbingStairsSolution {
  climbStairs(n: number): number {
    if (n <= 2) {
      return n;
    }
    const dp: number[] = new Array(n + 1);
    dp[1] = 1;
    dp[2] = 2;
    for (let i = 3; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
  }
}

const climbingStairsTests: TestCase<number, number>[] = [
  { name: "n = 1", input: 1, expected: 1 },
  { name: "n = 2", input: 2, expected: 2 },
  { name: "n = 3", input: 3, expected: 3 },
  { name: "n = 4", input: 4, expected: 5 },
  { name: "n = 5", input: 5, expected: 8 },
  { name: "n = 10", input: 10, expected: 89 },
];

/**
 * Helper: Binary Search
 * Problem: Find target in sorted array
 */
class BinarySearchSolution {
  search(nums: number[], target: number): number {
    let l: number = 0;
    let r: number = nums.length - 1;

    while (l <= r) {
      const mid: number = l + Math.floor((r - l) / 2);
      if (nums[mid] > target) {
        r = mid - 1;
      } else if (nums[mid] < target) {
        l = mid + 1;
      } else {
        return mid;
      }
    }
    return -1;
  }
}

interface BinarySearchInput {
  nums: number[];
  target: number;
}

const binarySearchTests: TestCase<BinarySearchInput, number>[] = [
  {
    name: "target found in middle",
    input: { nums: [1, 3, 5, 7, 9], target: 5 },
    expected: 2,
  },
  {
    name: "target found at start",
    input: { nums: [1, 3, 5, 7, 9], target: 1 },
    expected: 0,
  },
  {
    name: "target found at end",
    input: { nums: [1, 3, 5, 7, 9], target: 9 },
    expected: 4,
  },
  {
    name: "target not found",
    input: { nums: [1, 3, 5, 7, 9], target: 6 },
    expected: -1,
  },
  {
    name: "empty array",
    input: { nums: [], target: 5 },
    expected: -1,
  },
  {
    name: "single element found",
    input: { nums: [5], target: 5 },
    expected: 0,
  },
  {
    name: "single element not found",
    input: { nums: [5], target: 3 },
    expected: -1,
  },
];

/**
 * Helper: Is Palindrome
 * Problem: Check if string is palindrome (alphanumeric only, case-insensitive)
 */
class IsPalindromeSolution {
  isPalindrome(s: string): boolean {
    if (s.length === 0) {
      return true;
    }

    const isAlphaNumeric = (c: string): boolean => {
      return (
        (c >= "a" && c <= "z") ||
        (c >= "A" && c <= "Z") ||
        (c >= "0" && c <= "9")
      );
    };

    let l: number = 0;
    let r: number = s.length - 1;

    while (l <= r) {
      const c = s.charAt(l);
      const e = s.charAt(r);

      if (!isAlphaNumeric(c)) {
        l++;
        continue;
      }
      if (!isAlphaNumeric(e)) {
        r--;
        continue;
      }

      if (c.toLowerCase() !== e.toLowerCase()) {
        return false;
      }

      l++;
      r--;
    }
    return true;
  }
}

const isPalindromeTests: TestCase<string, boolean>[] = [
  { name: "simple palindrome", input: "a.", expected: true },
  { name: "with spaces", input: "race car", expected: true },
  { name: "case insensitive", input: "A man, a plan, a canal: Panama", expected: true },
  { name: "not palindrome", input: "hello", expected: false },
  { name: "empty string", input: "", expected: true },
  { name: "single char", input: "a", expected: true },
  { name: "numbers only", input: "12321", expected: true },
  { name: "mixed case and numbers", input: "0P", expected: false },
];

/**
 * Helper: Two Integer Sum
 * Problem: Find two numbers that add up to target
 */
interface TwoSumInput {
  numbers: number[];
  target: number;
}

class TwoSumSolution {
  twoSum(numbers: number[], target: number): number[] {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
      const sum = numbers[left] + numbers[right];
      if (sum === target) {
        return [left + 1, right + 1]; // 1-indexed
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
    return [];
  }
}

const twoSumTests: TestCase<TwoSumInput, number[]>[] = [
  {
    name: "normal case",
    input: { numbers: [1, 3, 4, 5, 7, 11], target: 9 },
    expected: [3, 4],
  },
  {
    name: "at edges",
    input: { numbers: [2, 7, 11, 15], target: 9 },
    expected: [1, 2],
  },
  {
    name: "negative numbers",
    input: { numbers: [-1, 0, 1, 2], target: 1 },
    expected: [1, 3],
  },
  {
    name: "large numbers",
    input: { numbers: [1, 2, 3, 4, 5], target: 9 },
    expected: [4, 5],
  },
];

// ============================================================================
// RUN TESTS
// ============================================================================

async function main() {
  const harness = new TestHarness();

  // Run test suites
  harness.runSuite(
    "Climbing Stairs",
    climbingStairsTests,
    (n) => new ClimbingStairsSolution().climbStairs(n)
  );

  harness.runSuite(
    "Binary Search",
    binarySearchTests,
    (input) => new BinarySearchSolution().search(input.nums, input.target)
  );

  harness.runSuite(
    "Is Palindrome",
    isPalindromeTests,
    (s) => new IsPalindromeSolution().isPalindrome(s)
  );

  harness.runSuite(
    "Two Integer Sum",
    twoSumTests,
    (input) => new TwoSumSolution().twoSum(input.numbers, input.target)
  );

  // Print results
  harness.printResults();
}

main().catch(console.error);
