import java.util.*;
import java.lang.reflect.Method;

/**
 * NeetCode Test Harness
 * A comprehensive testing framework for algorithm solutions
 * 
 * This harness provides:
 * - Easy test case definition
 * - Detailed failure reporting
 * - Execution time tracking
 * - Summary statistics
 */

public class TestHarness {
    
    // ========================================================================
    // TEST FRAMEWORK
    // ========================================================================
    
    public static class TestResult {
        public boolean passed;
        public String testName;
        public String error;
        public Object actual;
        public Object expected;
        public long executionTime;
        
        public TestResult(boolean passed, String testName) {
            this.passed = passed;
            this.testName = testName;
        }
    }
    
    public static class SuiteResult {
        public String suiteName;
        public int totalTests;
        public int passedTests;
        public int failedTests;
        public List<TestResult> results = new ArrayList<>();
        public long totalTime;
        
        public SuiteResult(String suiteName) {
            this.suiteName = suiteName;
        }
    }
    
    private List<SuiteResult> suites = new ArrayList<>();
    
    /**
     * Helper to repeat a string
     */
    private String repeat(String s, int count) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < count; i++) {
            sb.append(s);
        }
        return sb.toString();
    }
    
    /**
     * Deep equality check for objects
     */
    private boolean deepEqual(Object a, Object b) {
        if (a == b) return true;
        if (a == null || b == null) return false;
        
        if (a instanceof int[] && b instanceof int[]) {
            return Arrays.equals((int[]) a, (int[]) b);
        }
        if (a instanceof Integer[] && b instanceof Integer[]) {
            return Arrays.deepEquals((Integer[]) a, (Integer[]) b);
        }
        if (a instanceof List && b instanceof List) {
            return a.equals(b);
        }
        
        return a.equals(b);
    }
    
    /**
     * Convert object to string for display
     */
    private String objectToString(Object obj) {
        if (obj == null) return "null";
        if (obj instanceof int[]) return Arrays.toString((int[]) obj);
        if (obj instanceof Integer[]) return Arrays.toString((Integer[]) obj);
        if (obj instanceof List) return obj.toString();
        return obj.toString();
    }
    
    /**
     * Run a test case
     */
    private TestResult runTest(String testName, Object input, Object expected, 
                               TestFunction testFn) {
        long startTime = System.nanoTime();
        TestResult result = new TestResult(true, testName);
        
        try {
            Object actual = testFn.run(input);
            result.actual = actual;
            result.expected = expected;
            result.passed = deepEqual(actual, expected);
        } catch (Exception e) {
            result.passed = false;
            result.error = e.getMessage();
        }
        
        result.executionTime = System.nanoTime() - startTime;
        return result;
    }
    
    /**
     * Run a test suite
     */
    public SuiteResult runSuite(String suiteName, TestCase[] tests, 
                                 TestFunction testFn) {
        SuiteResult suite = new SuiteResult(suiteName);
        long suiteStartTime = System.nanoTime();
        
        for (TestCase test : tests) {
            TestResult result = runTest(test.name, test.input, test.expected, testFn);
            suite.results.add(result);
        }
        
        suite.totalTests = tests.length;
        suite.passedTests = (int) suite.results.stream()
            .filter(r -> r.passed).count();
        suite.failedTests = suite.totalTests - suite.passedTests;
        suite.totalTime = System.nanoTime() - suiteStartTime;
        
        suites.add(suite);
        return suite;
    }
    
    /**
     * Print results summary
     */
    public void printResults() {
        System.out.println("\n" + repeat("=", 80));
        System.out.println("TEST RESULTS SUMMARY");
        System.out.println(repeat("=", 80) + "\n");
        
        int totalTests = 0;
        int totalPassed = 0;
        long totalTime = 0;
        
        for (SuiteResult suite : suites) {
            String status = suite.failedTests == 0 ? "✓ PASS" : "✗ FAIL";
            System.out.printf("%s | %s (%d/%d)%n", status, suite.suiteName, 
                            suite.passedTests, suite.totalTests);
            
            for (TestResult result : suite.results) {
                if (!result.passed) {
                    System.out.printf("     └─ ✗ %s: %s%n", result.testName,
                        result.error != null ? result.error : "Assertion failed");
                    
                    if (result.actual != null && result.expected != null) {
                        System.out.printf("        Expected: %s%n", 
                            objectToString(result.expected));
                        System.out.printf("        Actual:   %s%n", 
                            objectToString(result.actual));
                    }
                }
            }
            
            System.out.printf("     Time: %.3f ms%n%n", suite.totalTime / 1_000_000.0);
            
            totalTests += suite.totalTests;
            totalPassed += suite.passedTests;
            totalTime += suite.totalTime;
        }
        
        System.out.println(repeat("=", 80));
        double passRate = totalTests > 0 ? (totalPassed * 100.0 / totalTests) : 0;
        System.out.printf("TOTAL: %d/%d tests passed (%.1f%%)%n", 
            totalPassed, totalTests, passRate);
        System.out.printf("Total Time: %.3f ms%n", totalTime / 1_000_000.0);
        System.out.println(repeat("=", 80) + "\n");
    }
    
    // ========================================================================
    // INTERFACES & TEST CASES
    // ========================================================================
    
    @FunctionalInterface
    public interface TestFunction {
        Object run(Object input) throws Exception;
    }
    
    public static class TestCase {
        public String name;
        public Object input;
        public Object expected;
        
        public TestCase(String name, Object input, Object expected) {
            this.name = name;
            this.input = input;
            this.expected = expected;
        }
    }
    
    // ========================================================================
    // SOLUTION IMPLEMENTATIONS
    // ========================================================================
    
    /**
     * Climbing Stairs Solution
     * Problem: Climb n stairs, each time you can climb 1 or 2 stairs
     */
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
    
    /**
     * Binary Search Solution
     * Problem: Find target in sorted array
     */
    static class BinarySearchSolution {
        public int search(int[] nums, int target) {
            int l = 0;
            int r = nums.length - 1;
            
            while (l <= r) {
                int mid = l + (r - l) / 2;
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
    
    /**
     * Is Palindrome Solution
     * Problem: Check if string is palindrome (alphanumeric only, case-insensitive)
     */
    static class IsPalindromeSolution {
        public boolean isPalindrome(String s) {
            if (s.length() == 0) {
                return true;
            }
            
            int l = 0;
            int r = s.length() - 1;
            
            while (l <= r) {
                char c = s.charAt(l);
                char e = s.charAt(r);
                
                if (!isAlphaNumeric(c)) {
                    l++;
                    continue;
                }
                if (!isAlphaNumeric(e)) {
                    r--;
                    continue;
                }
                
                if (Character.toLowerCase(c) != Character.toLowerCase(e)) {
                    return false;
                }
                
                l++;
                r--;
            }
            return true;
        }
        
        private boolean isAlphaNumeric(char c) {
            return (c >= 'a' && c <= 'z') || 
                   (c >= 'A' && c <= 'Z') || 
                   (c >= '0' && c <= '9');
        }
    }
    
    /**
     * Two Sum Solution
     * Problem: Find two numbers that add up to target
     */
    static class TwoSumSolution {
        public int[] twoSum(int[] numbers, int target) {
            int left = 0;
            int right = numbers.length - 1;
            
            while (left < right) {
                int sum = numbers[left] + numbers[right];
                if (sum == target) {
                    return new int[] { left + 1, right + 1 }; // 1-indexed
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
            return new int[] {};
        }
    }
    
    // ========================================================================
    // MAIN TEST RUNNER
    // ========================================================================
    
    public static void main(String[] args) {
        TestHarness harness = new TestHarness();
        
        // ====================================================================
        // Climbing Stairs Tests
        // ====================================================================
        {
            ClimbingStairsSolution solution = new ClimbingStairsSolution();
            TestCase[] tests = new TestCase[] {
                new TestCase("n = 1", 1, 1),
                new TestCase("n = 2", 2, 2),
                new TestCase("n = 3", 3, 3),
                new TestCase("n = 4", 4, 5),
                new TestCase("n = 5", 5, 8),
                new TestCase("n = 10", 10, 89),
            };
            
            harness.runSuite("Climbing Stairs", tests, input -> {
                return solution.climbStairs((Integer) input);
            });
        }
        
        // ====================================================================
        // Binary Search Tests
        // ====================================================================
        {
            BinarySearchSolution solution = new BinarySearchSolution();
            TestCase[] tests = new TestCase[] {
                new TestCase("target found in middle", 
                    new Object[] { new int[] {1,3,5,7,9}, 5 }, 2),
                new TestCase("target found at start", 
                    new Object[] { new int[] {1,3,5,7,9}, 1 }, 0),
                new TestCase("target found at end", 
                    new Object[] { new int[] {1,3,5,7,9}, 9 }, 4),
                new TestCase("target not found", 
                    new Object[] { new int[] {1,3,5,7,9}, 6 }, -1),
                new TestCase("empty array", 
                    new Object[] { new int[] {}, 5 }, -1),
                new TestCase("single element found", 
                    new Object[] { new int[] {5}, 5 }, 0),
                new TestCase("single element not found", 
                    new Object[] { new int[] {5}, 3 }, -1),
            };
            
            harness.runSuite("Binary Search", tests, input -> {
                Object[] params = (Object[]) input;
                int[] nums = (int[]) params[0];
                int target = (Integer) params[1];
                return solution.search(nums, target);
            });
        }
        
        // ====================================================================
        // Is Palindrome Tests
        // ====================================================================
        {
            IsPalindromeSolution solution = new IsPalindromeSolution();
            TestCase[] tests = new TestCase[] {
                new TestCase("simple palindrome", "a.", true),
                new TestCase("with spaces", "race car", true),
                new TestCase("case insensitive", "A man, a plan, a canal: Panama", true),
                new TestCase("not palindrome", "hello", false),
                new TestCase("empty string", "", true),
                new TestCase("single char", "a", true),
                new TestCase("numbers only", "12321", true),
                new TestCase("mixed case and numbers", "0P", false),
            };
            
            harness.runSuite("Is Palindrome", tests, input -> {
                return solution.isPalindrome((String) input);
            });
        }
        
        // ====================================================================
        // Two Sum Tests
        // ====================================================================
        {
            TwoSumSolution solution = new TwoSumSolution();
            TestCase[] tests = new TestCase[] {
                new TestCase("normal case", 
                    new Object[] { new int[] {1,3,4,5,7,11}, 9 }, 
                    new int[] {3, 4}),
                new TestCase("at edges", 
                    new Object[] { new int[] {2,7,11,15}, 9 }, 
                    new int[] {1, 2}),
                new TestCase("negative numbers", 
                    new Object[] { new int[] {-1,0,1,2}, 1 }, 
                    new int[] {1, 4}),
                new TestCase("large numbers", 
                    new Object[] { new int[] {1,2,3,4,5}, 9 }, 
                    new int[] {4, 5}),
            };
            
            harness.runSuite("Two Sum", tests, input -> {
                Object[] params = (Object[]) input;
                int[] numbers = (int[]) params[0];
                int target = (Integer) params[1];
                return solution.twoSum(numbers, target);
            });
        }
        
        // Print results
        harness.printResults();
    }
}
