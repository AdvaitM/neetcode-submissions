#!/bin/bash
# Test Harness Runner Script for Unix/Linux/Mac
# Usage: ./test.sh [command]
# Commands:
#   (no args) - compile and run
#   clean    - remove compiled class files
#   compile  - compile only
#   run      - run tests (requires compilation first)
#   help     - show this help message

if [ "$1" = "help" ] || [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    cat << EOF
Test Harness Helper Script

Usage: ./test.sh [command]

Commands:
  (no args)  - Compile and run all tests
  clean      - Remove compiled class files
  compile    - Compile only
  run        - Run tests (requires compilation first)
  help       - Show this help message

Examples:
  ./test.sh              # Compile and run
  ./test.sh compile      # Only compile
  ./test.sh run          # Run (if already compiled)
  ./test.sh clean        # Remove class files
EOF
    exit 0
fi

if [ "$1" = "clean" ]; then
    echo "Cleaning up compiled files..."
    rm -f TestHarness.class
    echo "Done."
    exit 0
fi

if [ "$1" = "compile" ]; then
    echo "Compiling TestHarness.java..."
    javac TestHarness.java
    if [ $? -eq 0 ]; then
        echo "Compilation successful."
    else
        echo "Compilation failed."
        exit 1
    fi
    exit 0
fi

if [ "$1" = "run" ]; then
    echo "Running tests..."
    echo ""
    java TestHarness
    exit 0
fi

# Default: compile and run
echo "Compiling TestHarness.java..."
javac TestHarness.java
if [ $? -ne 0 ]; then
    echo "Compilation failed."
    exit 1
fi

echo "Running tests..."
echo ""
java TestHarness
