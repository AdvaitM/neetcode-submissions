/**
 * TEMPLATE: How to Add a New Algorithm to TestHarness.java
 * 
 * Copy and follow these sections to add your own algorithm tests
 */

// ============================================================================
// STEP 1: Add Your Solution Class
// ============================================================================

/*
static class YourAlgorithmSolution {
    // Copy your entire solution class here
    // Examples of where to find your code:
    // - Java: Data Structures & Algorithms/[problem-name]/submission-0.java
    // - Make sure all methods are public
    
    public ReturnType yourMethod(InputType param1, InputType param2) {
        // Your solution implementation here
        return result;
    }
}
*/

// ============================================================================
// STEP 2: Define Test Cases
// ============================================================================

/*
// For simple input types (int, String, etc):
TestCase[] yourAlgorithmTests = new TestCase[] {
    new TestCase("descriptive test name 1", inputValue1, expectedOutput1),
    new TestCase("descriptive test name 2", inputValue2, expectedOutput2),
    new TestCase("edge case - empty", emptyInput, expectedForEmpty),
    new TestCase("edge case - single", singleItem, expectedForSingle),
    new TestCase("edge case - boundary", maxValue, expectedForMax),
    // Add more tests as needed
};

// For multiple parameters, use Object array:
TestCase[] binarySearchTests = new TestCase[] {
    new TestCase("target found in middle", 
        new Object[] { new int[] {1,3,5,7,9}, 5 }, 2),
    new TestCase("target not found", 
        new Object[] { new int[] {1,3,5,7,9}, 6 }, -1),
};

// For array return types:
TestCase[] twoSumTests = new TestCase[] {
    new TestCase("two sum example", 
        new Object[] { new int[] {1,3,4,5}, 7 }, 
        new int[] {2, 3}),  // Note: 1-indexed
};
*/

// ============================================================================
// STEP 3: Add Test Suite to main() Method
// ============================================================================

/*
// Find the main() method and add a new block like this:

{
    YourAlgorithmSolution solution = new YourAlgorithmSolution();
    TestCase[] tests = new TestCase[] {
        new TestCase("test 1", input1, expected1),
        new TestCase("test 2", input2, expected2),
    };
    
    harness.runSuite("Your Algorithm Name", tests, input -> {
        // Convert input to correct type(s) and call your solution
        return solution.yourMethod((YourType) input);
    });
}
*/

// ============================================================================
// COMMON PATTERNS - Copy and Adapt These
// ============================================================================

// PATTERN 1: Single int parameter, int return
/*
static class SquaresSolution {
    public int square(int n) {
        return n * n;
    }
}

// In main():
{
    SquaresSolution solution = new SquaresSolution();
    TestCase[] tests = new TestCase[] {
        new TestCase("0", 0, 0),
        new TestCase("5", 5, 25),
        new TestCase("10", 10, 100),
    };
    harness.runSuite("Squares", tests, input -> 
        solution.square((Integer) input)
    );
}
*/

// PATTERN 2: String parameter, boolean return
/*
static class IsPalindromeSolution {
    public boolean isPalindrome(String s) {
        // Implementation here
        return true;
    }
}

// In main():
{
    IsPalindromeSolution solution = new IsPalindromeSolution();
    TestCase[] tests = new TestCase[] {
        new TestCase("palindrome", "racecar", true),
        new TestCase("not palindrome", "hello", false),
    };
    harness.runSuite("Is Palindrome", tests, input -> 
        solution.isPalindrome((String) input)
    );
}
*/

// PATTERN 3: int[] and int parameters, int return
/*
static class BinarySearchSolution {
    public int search(int[] nums, int target) {
        // Implementation here
        return -1;
    }
}

// In main():
{
    BinarySearchSolution solution = new BinarySearchSolution();
    TestCase[] tests = new TestCase[] {
        new TestCase("target found", 
            new Object[] { new int[] {1,3,5,7}, 5 }, 2),
        new TestCase("target not found", 
            new Object[] { new int[] {1,3,5,7}, 4 }, -1),
    };
    harness.runSuite("Binary Search", tests, input -> {
        Object[] params = (Object[]) input;
        int[] nums = (int[]) params[0];
        int target = (Integer) params[1];
        return solution.search(nums, target);
    });
}
*/

// PATTERN 4: int[] and int parameters, int[] return
/*
static class TwoSumSolution {
    public int[] twoSum(int[] numbers, int target) {
        // Implementation here
        return new int[] {1, 2};  // 1-indexed
    }
}

// In main():
{
    TwoSumSolution solution = new TwoSumSolution();
    TestCase[] tests = new TestCase[] {
        new TestCase("find pair", 
            new Object[] { new int[] {1,3,4,5}, 7 }, 
            new int[] {2, 3}),  // 1-indexed
    };
    harness.runSuite("Two Sum", tests, input -> {
        Object[] params = (Object[]) input;
        int[] numbers = (int[]) params[0];
        int target = (Integer) params[1];
        return solution.twoSum(numbers, target);
    });
}
*/

// PATTERN 5: List parameter and return
/*
static class ListSolution {
    public List<Integer> getNumbers(List<Integer> input) {
        // Implementation
        return input;
    }
}

// In main():
{
    ListSolution solution = new ListSolution();
    TestCase[] tests = new TestCase[] {
        new TestCase("normal list", 
            Arrays.asList(1, 2, 3), 
            Arrays.asList(1, 2, 3)),
    };
    harness.runSuite("List Operation", tests, input -> 
        solution.getNumbers((List<Integer>) input)
    );
}
*/

// ============================================================================
// ALGORITHM EXAMPLES FROM YOUR REPOSITORY
// ============================================================================

// Example 1: From climbing-stairs/submission-0.java
/*
static class ClimbingStairsSolution {
    public int climbStairs(int n) {
        if (n <= 2) {
            return n;
        }
        int[] dp = new int[n + 1];
        dp[1] = 1;
        dp[2] = 2;
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}

// Tests:
TestCase[] climbingStairsTests = new TestCase[] {
    new TestCase("n = 1", 1, 1),
    new TestCase("n = 2", 2, 2),
    new TestCase("n = 3", 3, 3),
    new TestCase("n = 4", 4, 5),
    new TestCase("n = 5", 5, 8),
};
*/

// Example 2: From is-palindrome/submission-0.java
/*
static class IsPalindromeSolution {
    public boolean isPalindrome(String s) {
        if(s.length() == 0) {
            return true;
        }

        int l = 0;
        int r = s.length() - 1;
        while(l <= r) {
            char c = s.charAt(l);
            char e = s.charAt(r);
            if (!((c >= 'a' && c<= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9'))) {
                l++;
                continue;
            }
            if (!((e >= 'a' && e<= 'z') || (e >= 'A' && e <= 'Z') || (e >= '0' && e <= '9'))) {
                r--;
                continue;
            }
            if(Character.toLowerCase(c) != Character.toLowerCase(e)) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
}

// Tests:
TestCase[] isPalindromeTests = new TestCase[] {
    new TestCase("simple", "a.", true),
    new TestCase("with spaces", "race car", true),
    new TestCase("case insensitive", "A man, a plan, a canal: Panama", true),
    new TestCase("not palindrome", "hello", false),
};
*/

// ============================================================================
// TESTING CHECKLIST - Verify Before Running Tests
// ============================================================================

/*
Before running tests, verify:

□ Solution class name: static class YourAlgorithmSolution
□ Method signature: public ReturnType methodName(params)
□ Test cases defined: TestCase[] array with name, input, expected
□ Test suite added: harness.runSuite(...) call in main()
□ Input conversion: Object cast to correct type
□ Test names: Descriptive names like "edge case - empty"
□ Edge cases included:
  □ Minimum values
  □ Maximum values
  □ Empty input (if applicable)
  □ Single element (if applicable)
  □ Boundary conditions

Then run: javac TestHarness.java && java TestHarness
*/

// ============================================================================
// QUICK CHECKLIST FOR COPY-PASTE
// ============================================================================

/*
When adding a new algorithm:

1. [ ] Copy solution class from your submission file
2. [ ] Paste into TestHarness.java as: static class YourNameSolution
3. [ ] Make sure methods are public
4. [ ] Create test case array with 4-8 test cases
5. [ ] Include at least one edge case
6. [ ] Add harness.runSuite() call to main()
7. [ ] Compile: javac TestHarness.java
8. [ ] Run: java TestHarness
9. [ ] Verify all tests pass ✓
*/
