# Test Harness Guide

## Overview

This test harness provides a comprehensive testing framework for your NeetCode algorithm solutions. It supports:

- ✅ Easy test case definition
- ✅ Detailed failure reporting with expected vs. actual values
- ✅ Execution time tracking
- ✅ Summary statistics
- ✅ Extensible design for adding more test suites

## Setup

### 1. Install Dependencies

```bash
npm install
```

This installs TypeScript and ts-node, which are needed to run the test harness.

### 2. Run Tests

```bash
npm test
```

Or with watch mode (re-runs on file changes):

```bash
npm run test:watch
```

## How to Add Tests

### Basic Template

1. **Create a Solution Class** in `test-harness.ts`:

```typescript
class MyAlgorithmSolution {
  myMethod(input: Type): OutputType {
    // Your solution implementation
  }
}
```

2. **Define Test Cases** - Create an array of test cases:

```typescript
interface MyInput {
  // Define your input shape
  value: number;
}

const myAlgorithmTests: TestCase<MyInput, OutputType>[] = [
  {
    name: "test case 1",
    input: { value: 5 },
    expected: 10
  },
  {
    name: "test case 2", 
    input: { value: 0 },
    expected: 0
  }
];
```

3. **Run the Test Suite** in the `main()` function:

```typescript
harness.runSuite(
  "My Algorithm Name",
  myAlgorithmTests,
  (input) => new MyAlgorithmSolution().myMethod(input.value)
);
```

## Example: Adding a Test Suite

Let's add tests for the "Coin Change" algorithm:

```typescript
class CoinChangeSolution {
  change(coins: number[], amount: number): number {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
      for (const coin of coins) {
        if (coin <= i) {
          dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
      }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
  }
}

interface CoinChangeInput {
  coins: number[];
  amount: number;
}

const coinChangeTests: TestCase<CoinChangeInput, number>[] = [
  {
    name: "exact change possible",
    input: { coins: [1, 2, 5], amount: 5 },
    expected: 1
  },
  {
    name: "multiple coins needed",
    input: { coins: [2], amount: 3 },
    expected: -1
  },
  {
    name: "zero amount",
    input: { coins: [1], amount: 0 },
    expected: 0
  }
];

// In main():
harness.runSuite(
  "Coin Change",
  coinChangeTests,
  (input) => new CoinChangeSolution().change(input.coins, input.amount)
);
```

## Test Output Format

The test harness produces detailed output:

```
================================================================================
TEST RESULTS SUMMARY
================================================================================

✓ PASS | Climbing Stairs (6/6)
     Time: 0.123ms

✓ PASS | Binary Search (7/7)
     Time: 0.087ms

✗ FAIL | Is Palindrome (7/8)
     └─ ✗ edge case: Assertion failed
        Expected: true
        Actual:   false
     Time: 0.045ms

================================================================================
TOTAL: 20/21 tests passed (95.2%)
Total Time: 0.255ms
================================================================================
```

## Built-in Test Suites

The harness currently includes test suites for:

1. **Climbing Stairs** - Dynamic programming basics
2. **Binary Search** - Sorted array searching
3. **Is Palindrome** - String manipulation with constraints
4. **Two Integer Sum** - Two-pointer technique

## Tips for Writing Good Test Cases

### 1. Cover Edge Cases
```typescript
const tests: TestCase<number, boolean>[] = [
  { name: "empty", input: 0, expected: false },
  { name: "single element", input: 1, expected: true },
  { name: "normal case", input: 5, expected: true },
  { name: "large number", input: 1000000, expected: false }
];
```

### 2. Use Descriptive Names
```typescript
// Good
{ name: "palindrome with spaces and punctuation", input: "A man, a plan, a canal: Panama", expected: true }

// Bad
{ name: "test 1", input: "abc", expected: true }
```

### 3. Test Boundary Conditions
- Minimum and maximum values
- Empty collections
- Single elements
- Duplicates

### 4. Test Common Mistakes
Think about what errors the algorithm might have and test for them.

## Advanced Features

### Custom Assertions

You can use the `deepEqual` method implicitly through the test runner, or add custom comparison logic:

```typescript
harness.runSuite(
  "Custom Test",
  testCases,
  (input) => {
    // Custom logic here
    return customSolution(input);
  }
);
```

### Performance Tracking

Each test automatically tracks execution time. Check the output for which tests are slow.

### Extending the Framework

To add new comparison logic, modify the `deepEqual` method in the `TestHarness` class:

```typescript
private deepEqual(a: any, b: any): boolean {
  // Add custom comparison logic here
  if (a instanceof MyCustomType && b instanceof MyCustomType) {
    return a.equals(b);
  }
  // ... rest of implementation
}
```

## Troubleshooting

### "Command not found: ts-node"
Make sure to run `npm install` first.

### Tests running but all failing
- Check that your solution class is properly implemented
- Verify test case input format matches what your function expects
- Look at the "Expected" vs "Actual" values in the output

### Want to test Java solutions?
You can either:
1. Port them to TypeScript in the harness
2. Create a separate Java test suite using JUnit
3. Create a Node.js wrapper that spawns Java processes

## Next Steps

1. Add test cases for all your algorithms
2. Run `npm test` to get a full report
3. Fix any failing tests
4. Add to CI/CD pipeline for continuous testing

Happy testing! 🚀
