# NeetCode Algorithm Test Harness

A comprehensive testing framework for your NeetCode algorithm solutions. Easily add test cases, run automated tests, and track performance.

## 📁 Files in This Directory

### Core Test Framework
- **`TestHarness.java`** - Main test harness (4KB, fully self-contained)
  - Pre-built solution classes for 4 algorithms
  - 25 pre-written test cases (all passing ✓)
  - Easy to extend with your own solutions
  - Java 8+ compatible

### Documentation
- **`JAVA_TEST_HARNESS_GUIDE.md`** - Comprehensive guide for adding tests
  - Step-by-step examples
  - Common patterns for different input/output types
  - Troubleshooting tips
  - Framework architecture overview

- **`QUICK_REFERENCE.md`** - Quick lookup guide
  - Running tests
  - Test case template
  - Common input/output patterns
  - Tips and tricks

- **`TEST_HARNESS_GUIDE.md`** - Original TypeScript version (if Node.js available)
  - Alternative implementation in TypeScript
  - Requires Node.js and npm

### Helper Scripts
- **`test.bat`** - Windows batch script for easy testing
  - Just double-click or run `test.bat` to compile and run
  - Commands: `clean`, `compile`, `run`, `help`

- **`test.sh`** - Unix/Linux/Mac shell script
  - Run with `./test.sh` to compile and run
  - Commands: `clean`, `compile`, `run`, `help`

- **`package.json`** & **`tsconfig.json`** - Node.js configuration (optional)
  - Use if you have Node.js installed for TypeScript version

## 🚀 Quick Start

### On Windows
```bash
# Just run this:
test.bat
```

### On Linux/Mac
```bash
# Make script executable:
chmod +x test.sh

# Run tests:
./test.sh
```

### Manual (Any OS)
```bash
javac TestHarness.java
java TestHarness
```

## 📊 Example Output

```
================================================================================
TEST RESULTS SUMMARY
================================================================================

✓ PASS | Climbing Stairs (6/6)
     Time: 4.309 ms

✓ PASS | Binary Search (7/7)
     Time: 0.029 ms

✓ PASS | Is Palindrome (8/8)
     Time: 0.045 ms

✓ PASS | Two Sum (4/4)
     Time: 0.041 ms

================================================================================
TOTAL: 25/25 tests passed (100.0%)
Total Time: 4.425 ms
================================================================================
```

## 📝 What's Included

### Pre-built Solutions (Ready to Test)
1. **Climbing Stairs** - Dynamic programming
2. **Binary Search** - Array searching
3. **Is Palindrome** - String validation
4. **Two Sum** - Two-pointer technique

### Test Statistics
- ✅ 25 test cases pre-written
- ✅ 100% pass rate
- ✅ Edge cases covered (empty, single element, boundaries, etc.)
- ✅ Performance tracking included

## 📚 How to Add Your Own Tests

### Simple Example (Climbing Stairs)
```java
// 1. Your solution is already there!
class ClimbingStairsSolution {
    public int climbStairs(int n) { ... }
}

// 2. Test cases are already defined:
TestCase[] tests = new TestCase[] {
    new TestCase("n = 1", 1, 1),
    new TestCase("n = 2", 2, 2),
    ...
};

// 3. It's already running in main()!
harness.runSuite("Climbing Stairs", tests, input -> 
    new ClimbingStairsSolution().climbStairs((Integer) input)
);
```

### Adding Your Own Algorithm
```java
// 1. Add your solution class:
static class MyAlgorithmSolution {
    public int solve(int[] arr) {
        // Your implementation
        return result;
    }
}

// 2. Define test cases:
TestCase[] tests = new TestCase[] {
    new TestCase("test 1", new int[] {1, 2, 3}, 6),
    new TestCase("test 2", new int[] {}, 0),
    // ... more tests
};

// 3. Add to main():
harness.runSuite("My Algorithm", tests, input -> {
    int[] arr = (int[]) input;
    return new MyAlgorithmSolution().solve(arr);
});
```

See **JAVA_TEST_HARNESS_GUIDE.md** for detailed examples with all patterns.

## 🎯 Common Test Patterns

### Single Parameter
```java
harness.runSuite("Name", tests, input -> solution.method((int)input));
```

### Multiple Parameters
```java
Object[] params = (Object[]) input;
int param1 = (int) params[0];
String param2 = (String) params[1];
```

### Array Return
```java
new TestCase("name", inputValue, new int[] {1, 2, 3})
```

### Custom Objects
Implement `equals()` method on your class for automatic comparison.

## ⚙️ Requirements

- **Java 8 or higher** (for compilation)
- No external dependencies (fully self-contained)
- ~4KB total size

## 🔧 Features

✅ **Simple to Use** - Just add your code and test cases
✅ **Comprehensive Output** - See which tests pass/fail with details
✅ **Performance Tracking** - Millisecond precision execution times
✅ **Edge Case Coverage** - Framework supports all common patterns
✅ **Extensible** - Easy to add more test suites
✅ **Fast** - All tests run in milliseconds

## 📖 Documentation Structure

1. **Start here**: This README
2. **Quick lookup**: QUICK_REFERENCE.md
3. **Detailed guide**: JAVA_TEST_HARNESS_GUIDE.md
4. **Run tests**: Use test.bat or test.sh

## 💡 Tips

- Keep test names descriptive: `"valid palindrome"` not `"test1"`
- Include edge cases: empty, single element, boundary values
- Use the provided scripts (test.bat/test.sh) for convenience
- Check the "Time" column for performance-sensitive tests
- Look at existing test cases as examples

## 🐛 Troubleshooting

**"javac not found"** → Install Java Development Kit (JDK)

**All tests failing** → Check solution implementation and test case format

**Want specific algorithm tests?** → See JAVA_TEST_HARNESS_GUIDE.md for examples

## 📊 Next Steps

1. ✅ Run `test.bat` or `./test.sh` to see it working
2. ✅ Review existing test cases in TestHarness.java
3. ✅ Read QUICK_REFERENCE.md for your algorithm pattern
4. ✅ Add test cases for YOUR algorithms
5. ✅ Run again to verify they pass

## 🎓 Learning Resources

Each algorithm in the harness is paired with comments explaining:
- Problem description
- Solution approach
- Test case reasoning

Use these as templates when adding your own algorithms.

---

**Ready to start testing?** Run `test.bat` (Windows) or `./test.sh` (Unix) now!
