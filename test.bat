@echo off
REM Test Harness Runner Script for Windows
REM Usage: test.bat [command]
REM Commands: 
REM   (no args) - compile and run
REM   clean    - remove compiled class files
REM   help     - show this help message

setlocal enabledelayedexpansion

if "%1"=="help" (
    echo Test Harness Helper Script
    echo.
    echo Usage: test.bat [command]
    echo.
    echo Commands:
    echo   (no args)  - Compile and run all tests
    echo   clean      - Remove compiled class files
    echo   compile    - Compile only
    echo   run        - Run tests (requires compilation first)
    echo   help       - Show this help message
    echo.
    goto :eof
)

if "%1"=="clean" (
    echo Cleaning up compiled files...
    del /Q TestHarness.class 2>nul
    echo Done.
    goto :eof
)

if "%1"=="compile" (
    echo Compiling TestHarness.java...
    javac TestHarness.java
    if errorlevel 1 (
        echo Compilation failed.
        exit /b 1
    ) else (
        echo Compilation successful.
    )
    goto :eof
)

if "%1"=="run" (
    echo Running tests...
    java TestHarness
    goto :eof
)

REM Default: compile and run
echo Compiling TestHarness.java...
javac TestHarness.java
if errorlevel 1 (
    echo Compilation failed.
    exit /b 1
)

echo Running tests...
echo.
java TestHarness
