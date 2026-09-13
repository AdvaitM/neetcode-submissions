# Java Test Harness - Complete Guide

## Quick Start

### 1. Compile and Run
```bash
javac TestHarness.java
java TestHarness
```

You should see output like:
```
================================================================================
TEST RESULTS SUMMARY
================================================================================

✓ PASS | Climbing Stairs (6/6)
     Time: 4.309 ms

✓ PASS | Binary Search (7/7)
     Time: 0.029 ms

================================================================================
TOTAL: 25/25 tests passed (100.0%)
Total Time: 4.425 ms
================================================================================
```

## How to Add Tests for Your Algorithms

### Step 1: Add Your Solution Class

Copy your solution class into `TestHarness.java`:

```java
static class YourAlgorithmSolution {
    public ReturnType yourMethod(ParamType param1, ParamType param2) {
        // Your solution implementation
    }
}
```

### Step 2: Define Test Cases

Create a test case array:

```java
TestCase[] tests = new TestCase[] {
    new TestCase("description 1", inputValue1, expectedOutput1),
    new TestCase("description 2", inputValue2, expectedOutput2),
    new TestCase("edge case", inputEdge, expectedEdge),
};
```

### Step 3: Add Test Suite to Main

In the `main()` method, add your test suite:

```java
{
    YourAlgorithmSolution solution = new YourAlgorithmSolution();
    TestCase[] tests = new TestCase[] {
        // ... your test cases
    };
    
    harness.runSuite("Your Algorithm Name", tests, input -> {
        // Convert input and call your solution
        return solution.yourMethod((Type) input);
    });
}
```

## Common Input/Output Patterns

### Single Parameter → Single Output

```java
TestCase[] tests = new TestCase[] {
    new TestCase("square 5", 5, 25),
    new TestCase("square 10", 10, 100),
};

harness.runSuite("Square", tests, input -> {
    int n = (Integer) input;
    return n * n;
});
```

### Array Input → Number Output

```java
TestCase[] tests = new TestCase[] {
    new TestCase("sum array", new int[] {1, 2, 3}, 6),
};

harness.runSuite("Sum Array", tests, input -> {
    int[] arr = (int[]) input;
    int sum = 0;
    for (int x : arr) sum += x;
    return sum;
});
```

### String Input → Boolean Output

```java
TestCase[] tests = new TestCase[] {
    new TestCase("valid palindrome", "racecar", true),
};

harness.runSuite("Palindrome", tests, input -> {
    return isPalindrome((String) input);
});
```

### Multiple Parameters

Use an Object array to pass multiple parameters:

```java
TestCase[] tests = new TestCase[] {
    new TestCase("search target", 
        new Object[] { new int[] {1, 3, 5}, 3 }, 
        1),
};

harness.runSuite("Binary Search", tests, input -> {
    Object[] params = (Object[]) input;
    int[] nums = (int[]) params[0];
    int target = (Integer) params[1];
    return solution.search(nums, target);
});
```

### Array Return Type

```java
TestCase[] tests = new TestCase[] {
    new TestCase("two sum", 
        new Object[] { new int[] {1, 2, 3}, 3 }, 
        new int[] {1, 2}),
};

harness.runSuite("Two Sum", tests, input -> {
    Object[] params = (Object[]) input;
    int[] nums = (int[]) params[0];
    int target = (Integer) params[1];
    return solution.twoSum(nums, target);
});
```

## Framework Features

### Automatic Equality Checking

The framework automatically handles:
- `int[]` arrays
- `Integer[]` arrays
- `List` objects
- Basic Java objects via `.equals()`

### Performance Tracking

Each test suite shows execution time in milliseconds:
```
✓ PASS | Your Algorithm (10/10)
     Time: 2.543 ms
```

### Detailed Failure Information

When a test fails, you see:
```
✗ FAIL | Your Algorithm (8/10)
     └─ ✗ edge case: Assertion failed
        Expected: [1, 2, 3]
        Actual:   [1, 2]
```

## Example: Adding Coin Change Algorithm

Here's a complete example of adding the Coin Change algorithm:

```java
// Step 1: Add the solution class
static class CoinChangeSolution {
    public int change(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        for (int i = 1; i <= amount; i++) {
            dp[i] = Integer.MAX_VALUE;
        }
        dp[0] = 0;
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i && dp[i - coin] != Integer.MAX_VALUE) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        
        return dp[amount] == Integer.MAX_VALUE ? -1 : dp[amount];
    }
}

// Step 2: Define test cases
// In main() method, add:
{
    CoinChangeSolution solution = new CoinChangeSolution();
    TestCase[] tests = new TestCase[] {
        new TestCase("exact change", 
            new Object[] { new int[] {1, 2, 5}, 5 }, 1),
        new TestCase("multiple coins", 
            new Object[] { new int[] {2}, 3 }, -1),
        new TestCase("zero amount", 
            new Object[] { new int[] {1}, 0 }, 0),
        new TestCase("large amount", 
            new Object[] { new int[] {1, 3, 4}, 6 }, 2),
    };
    
    harness.runSuite("Coin Change", tests, input -> {
        Object[] params = (Object[]) input;
        int[] coins = (int[]) params[0];
        int amount = (Integer) params[1];
        return solution.change(coins, amount);
    });
}
```

## Tips for Writing Good Tests

### 1. Include Edge Cases
- Empty arrays/strings
- Single elements
- Minimum and maximum values
- Boundary values

### 2. Use Descriptive Names
```java
// Good
new TestCase("palindrome with mixed case and punctuation", ...)
new TestCase("empty array", ...)

// Bad
new TestCase("test 1", ...)
new TestCase("tc2", ...)
```

### 3. Test Common Mistakes
Think about what could go wrong:
- Off-by-one errors
- Null pointer exceptions
- Integer overflow
- Incorrect comparisons

### 4. Test Performance Cases
Include some larger inputs to catch performance issues:
```java
new TestCase("large array", new int[10000], expectedResult)
```

## Structure of TestHarness Class

```
TestHarness
├── Inner Classes
│   ├── TestResult (holds individual test outcome)
│   ├── SuiteResult (holds suite statistics)
│   ├── TestFunction (functional interface for test execution)
│   └── TestCase (simple container for name, input, expected)
│
├── Methods
│   ├── deepEqual() - compares objects
│   ├── objectToString() - formats output
│   ├── runTest() - executes single test
│   ├── runSuite() - runs multiple tests
│   └── printResults() - displays summary
│
└── Solution Classes (add your algorithms here)
    ├── ClimbingStairsSolution
    ├── BinarySearchSolution
    ├── IsPalindromeSolution
    └── TwoSumSolution
```

## Extending the Framework

### Adding Custom Equality for Complex Objects

If you have custom objects, override `equals()`:

```java
class Node {
    int val;
    Node next;
    
    public boolean equals(Object obj) {
        if (!(obj instanceof Node)) return false;
        Node other = (Node) obj;
        return val == other.val && 
               (next == null ? other.next == null : next.equals(other.next));
    }
}
```

### Handling TreeNode

For tree problems, create equality method:

```java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    
    public boolean equals(Object obj) {
        if (!(obj instanceof TreeNode)) return false;
        TreeNode other = (TreeNode) obj;
        return val == other.val &&
               (left == null ? other.left == null : left.equals(other.left)) &&
               (right == null ? other.right == null : right.equals(other.right));
    }
}
```

## Troubleshooting

### Compilation Errors
- Ensure Java 8+ is installed
- Check syntax of test cases
- Verify parameter types match your solution method

### All Tests Failing
- Check that solution implementation is correct
- Verify test case input format
- Add debug output to your solution

### Performance Issues
- Look at "Time" output for slow tests
- Consider optimizing your algorithm
- Test with larger inputs separately

## Next Steps

1. Copy all your solution files into `TestHarness.java`
2. Add test cases for each algorithm
3. Run `javac TestHarness.java && java TestHarness`
4. Fix any failing tests
5. Use this as your automated test suite going forward

Happy testing! 🎯
