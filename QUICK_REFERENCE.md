# Test Harness Quick Reference

## Running Tests

```bash
# Run tests once
npm test

# Watch mode (auto-rerun on changes)
npm run test:watch
```

## Test Case Template

```typescript
interface MyInput {
  param1: Type;
  param2: Type;
}

const myTests: TestCase<MyInput, ReturnType>[] = [
  { name: "description", input: { param1: value, param2: value }, expected: result },
];

// In main():
harness.runSuite("Suite Name", myTests, (input) => 
  new MyClass().myMethod(input.param1, input.param2)
);
```

## Common Input/Output Patterns

### Single Numeric Input → Number Output
```typescript
const tests: TestCase<number, number>[] = [
  { name: "small input", input: 5, expected: 25 }
];

harness.runSuite("Square", tests, n => n * n);
```

### Array Input → Number Output
```typescript
interface ArrayInput {
  arr: number[];
}

const tests: TestCase<ArrayInput, number>[] = [
  { name: "sum array", input: { arr: [1, 2, 3] }, expected: 6 }
];

harness.runSuite("Sum", tests, input => 
  input.arr.reduce((a, b) => a + b, 0)
);
```

### String Input → Boolean Output
```typescript
const tests: TestCase<string, boolean>[] = [
  { name: "is valid", input: "abc", expected: true }
];

harness.runSuite("Validate", tests, s => s.length > 0);
```

### Complex Object → Modified Object
```typescript
interface Node {
  val: number;
  next: Node | null;
}

const tests: TestCase<Node, Node>[] = [
  { name: "reverse list", input: createList([1,2,3]), expected: createList([3,2,1]) }
];

harness.runSuite("Reverse", tests, node => reverseList(node));
```

## Test Case Ideas by Category

### Arrays & Lists
- Empty array
- Single element
- All same elements
- Sorted vs unsorted
- Positive and negative numbers
- Large arrays (performance)

### Strings
- Empty string
- Single character
- Palindromes
- Special characters
- Case sensitivity
- Whitespace

### Trees & Graphs
- Empty tree
- Single node
- Balanced vs unbalanced
- Linear chains
- Cycles (if applicable)

### Dynamic Programming
- Base cases (n=0, n=1)
- Small values (n=2, n=3)
- Larger values
- Edge cases like negative numbers

## Debugging Failed Tests

The output shows:
```
✗ test name: Assertion failed
   Expected: value_here
   Actual:   different_value
```

**Fix steps:**
1. Check the input in the test case
2. Verify your solution logic handles that input
3. Add console.log() to your solution to debug
4. Add more granular test cases to narrow down the issue

## Tips & Tricks

### Test Multiple Implementations
Create multiple solution classes and test each:
```typescript
const approaches = [
  new BruteForce(),
  new Optimized(),
  new Linear()
];

approaches.forEach(impl => {
  harness.runSuite(`${impl.constructor.name}`, tests, 
    input => impl.solve(input)
  );
});
```

### Reuse Test Cases for Different Solutions
```typescript
const commonTests = [...];

harness.runSuite("Approach 1", commonTests, input => approach1(input));
harness.runSuite("Approach 2", commonTests, input => approach2(input));
harness.runSuite("Approach 3", commonTests, input => approach3(input));
```

### Performance Comparison
The execution time is shown for each suite. Use this to compare implementations:
```
Brute Force approach: 25.345ms
Optimized approach: 0.012ms
```

## Adding Tests for Your Algorithms

For each algorithm folder in your workspace:

1. Look at the submission files
2. Copy the solution code into a class
3. Define test cases based on the problem description
4. Add a `harness.runSuite()` call in `main()`
5. Run `npm test` to validate

Example algorithm paths:
- `climbing-stairs/` → `harness.runSuite("Climbing Stairs", ...)`
- `binary-search/` → `harness.runSuite("Binary Search", ...)`
- `coin-change/` → `harness.runSuite("Coin Change", ...)`

## Resources

- See TEST_HARNESS_GUIDE.md for detailed examples
- Check test-harness.ts for the full framework code
- NeetCode.io problem descriptions for test case ideas
