# Test Harness Visual Guide

## 📊 System Architecture

```
YOUR ALGORITHM SOLUTIONS
├── climbing-stairs/submission-0.java
├── binary-search/submission-0.ts
├── is-palindrome/submission-0.java
├── coin-change/submission-0.java
└── ... (40+ more algorithms)
            ↓
            ↓ (COPY & PASTE)
            ↓
    TEST HARNESS FRAMEWORK
    ┌─────────────────────────────────────────┐
    │          TestHarness.java               │
    │  ┌───────────────────────────────────┐  │
    │  │  Solution Classes                 │  │
    │  │  ├─ ClimbingStairsSolution        │  │
    │  │  ├─ BinarySearchSolution          │  │
    │  │  ├─ IsPalindromeSolution          │  │
    │  │  ├─ TwoSumSolution                │  │
    │  │  └─ YourAlgorithmSolution (add)   │  │
    │  └───────────────────────────────────┘  │
    │                                         │
    │  ┌───────────────────────────────────┐  │
    │  │  Test Cases                       │  │
    │  │  ├─ climbing stairs tests (6)    │  │
    │  │  ├─ binary search tests (7)      │  │
    │  │  ├─ is palindrome tests (8)      │  │
    │  │  ├─ two sum tests (4)            │  │
    │  │  └─ your test cases (add)        │  │
    │  └───────────────────────────────────┘  │
    │                                         │
    │  ┌───────────────────────────────────┐  │
    │  │  TestHarness Runner               │  │
    │  │  ├─ runTest()                     │  │
    │  │  ├─ runSuite()                    │  │
    │  │  ├─ deepEqual()                   │  │
    │  │  └─ printResults()                │  │
    │  └───────────────────────────────────┘  │
    └─────────────────────────────────────────┘
            ↓ (RUN)
            ↓
    TEST OUTPUT & RESULTS
    ┌─────────────────────────────────────────┐
    │  ✓ PASS | Algorithm Name (X/Y)          │
    │         Time: 0.123 ms                  │
    │                                         │
    │  ✗ FAIL | Another Algorithm (X/Y)       │
    │     └─ ✗ test case: Assertion failed    │
    │        Expected: [1,2,3]                │
    │        Actual:   [1,2]                  │
    │                                         │
    │  TOTAL: 25/25 tests passed (100%)       │
    └─────────────────────────────────────────┘
```

## 🔄 Workflow

```
START
  │
  ├─→ [Run: test.bat or ./test.sh]
  │
  ├─→ ✓ Tests Pass?
  │       ├─→ YES: Congratulations! 🎉
  │       │
  │       └─→ NO: Debug
  │           ├─ Check Expected vs Actual
  │           ├─ Review your algorithm
  │           └─ Fix and rerun
  │
  ├─→ [Add More Algorithms]
  │       ├─ Copy solution class
  │       ├─ Add test cases
  │       ├─ Add harness.runSuite()
  │       └─ Rerun tests
  │
  └─→ [Monitor Performance]
      └─ Look at Time column to optimize
```

## 📁 File Organization

```
workspace/
├── TestHarness.java                 ← Main test framework
├── test.bat                         ← Windows runner
├── test.sh                          ← Unix runner
│
├── README_TEST_HARNESS.md           ← Start here!
├── JAVA_TEST_HARNESS_GUIDE.md       ← Detailed guide
├── QUICK_REFERENCE.md               ← Quick lookup
├── TEMPLATE_ADD_ALGORITHM.md        ← Adding algorithms
├── SETUP_COMPLETE.md                ← Setup summary
└── VISUAL_GUIDE.md                  ← This file
│
├── Data Structures & Algorithms/    ← Your solutions
│   ├── climbing-stairs/
│   ├── binary-search/
│   ├── coin-change/
│   └── ... (40+ more)
│
└── README.md                        ← Original repo readme
```

## 🎯 Three Ways to Add Tests

### Way 1: Copy & Adapt (Recommended)
```
1. Find your algorithm file
   └─ Data Structures & Algorithms/[name]/submission-X.java

2. Open TestHarness.java

3. Copy this section (use existing as template):
   static class YourAlgorithmSolution { ... }

4. Add test cases:
   TestCase[] tests = new TestCase[] { ... }

5. Add to main():
   harness.runSuite("Name", tests, input -> ...)

6. Save and run
```

### Way 2: From Template
```
1. Read: TEMPLATE_ADD_ALGORITHM.md

2. Find matching pattern for your algorithm

3. Copy pattern code

4. Customize for your algorithm

5. Run tests
```

### Way 3: From Guide
```
1. Read: JAVA_TEST_HARNESS_GUIDE.md section "How to Add Tests"

2. Follow step-by-step instructions

3. Check examples provided

4. Add your test cases

5. Run
```

## 📊 Test Case Types

```
INPUT              EXPECTED          PATTERN
═════════════════════════════════════════════════════
int                int              → harness.runSuite("Name", tests, input ->
String             boolean             solution.method((int) input));
int[]              int              → harness.runSuite("Name", tests, input -> {
(multiple)         (multiple)           Object[] p = (Object[]) input;
                                        return solution.method(p[0], p[1]);
                                    });
```

## ⏱️ Performance Example

```
When you run tests, you see timing:

✓ PASS | Algorithm A (10/10)  Time: 0.045 ms   ← Very fast
✓ PASS | Algorithm B (5/5)    Time: 12.234 ms  ← Slower (maybe needs optimization)
✓ PASS | Algorithm C (8/8)    Time: 0.012 ms   ← Fastest

TOTAL: 23/23 tests passed (100.0%)
Total Time: 12.291 ms
```

**Use this to compare:**
- Different implementations of same algorithm
- Which approach is fastest
- Performance improvements over time

## 🔍 Test Output Explained

```
✓ PASS | Climbing Stairs (6/6)
│       │                   └─ All 6 tests passed
│       └─ Test suite name
└─ Pass indicator

     Time: 4.309 ms
     └─ Total time for this suite (milliseconds)

✗ FAIL | Two Sum (3/4)
│       │            └─ 3 out of 4 passed (1 failed)
│       └─ Test suite name
└─ Fail indicator

     └─ ✗ negative numbers: Assertion failed
        └─ Failed test name

        Expected: [1, 3]
        Actual:   [1, 4]
        └─ Shows the difference
```

## 🎓 Learning Progression

```
Level 1: BEGINNER (5 min)
├─ Run tests
├─ See results
└─ Understand output

Level 2: USER (15 min)
├─ Read documentation
├─ Understand structure
├─ Look at examples
└─ Recognize patterns

Level 3: DEVELOPER (30 min)
├─ Add one algorithm
├─ Write test cases
├─ Debug failures
└─ Optimize performance

Level 4: EXPERT (1-2 hours)
├─ Add all 40+ algorithms
├─ Comprehensive test suites
├─ Performance analysis
├─ Commit to GitHub
└─ Share with others
```

## ✅ Quick Checklist

When adding a new algorithm:

```
□ Copied solution class
□ Made methods public
□ Defined 4-8 test cases
□ Included at least 1 edge case
□ Added harness.runSuite() call
□ Saved TestHarness.java
□ Ran: javac TestHarness.java
□ Ran: java TestHarness
□ All tests pass ✓
□ Performance acceptable ✓
```

## 🚀 Speed Comparison

```
Method              Time to Setup    Difficulty
══════════════════════════════════════════════
Copy from template  2-3 minutes      Easy ✓
Use guide + example 5-7 minutes      Easy ✓
Read all docs       10-15 minutes    Medium
Build from scratch  20-30 minutes    Hard
```

**Recommended:** Use template or guide + example!

## 💡 Pro Tips

```
TIP 1: Use existing code as template
       → Copy ClimbingStairsSolution format
       → Adapt for your algorithm

TIP 2: Start with edge cases
       → Empty input
       → Single element
       → Boundary values
       → Normal cases

TIP 3: Name tests descriptively
       → "palindrome with spaces" ✓
       → "test1" ✗

TIP 4: Use QUICK_REFERENCE.md for patterns
       → Find your input/output type
       → Copy the pattern
       → Customize

TIP 5: Check performance
       → Times > 50ms might need optimization
       → Compare different approaches
       → Track improvements
```

## 🎯 Success Path

```
Week 1:
  └─ Day 1: Run existing tests (5 min)
  └─ Day 2: Add 2 algorithms (15 min)
  └─ Day 3: Add 3 more algorithms (15 min)
  └─ Day 4-7: Add 10+ more algorithms

Week 2:
  └─ Add remaining algorithms
  └─ Write comprehensive test cases
  └─ Identify slow algorithms
  └─ Optimize solutions

Week 3+:
  └─ Maintain full test suite
  └─ Use for interview preparation
  └─ Share on GitHub
  └─ Reference for learning
```

## 📞 Finding Help

```
Question                        Answer Location
════════════════════════════════════════════════════════════
How do I run tests?        → README_TEST_HARNESS.md
What are common patterns?  → QUICK_REFERENCE.md
How do I add an algorithm? → TEMPLATE_ADD_ALGORITHM.md
Detailed examples?         → JAVA_TEST_HARNESS_GUIDE.md
Setup complete?            → SETUP_COMPLETE.md
System overview?           → This file (VISUAL_GUIDE.md)
```

## 🏆 You're All Set!

You now have:
✅ Working test harness (100% tests pass)
✅ 4 pre-built algorithms with tests
✅ 4 documentation guides
✅ Helper scripts for easy running
✅ Visual guides and examples
✅ Everything you need to add your algorithms

**Next step:** Run `test.bat` (Windows) or `./test.sh` (Unix) now!

---

Ready to test your algorithms? Let's go! 🚀
