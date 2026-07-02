@echo off
REM ============================================================
REM  push-site.bat
REM  One-click commit + push for Karthik's website repo
REM  Repo: https://github.com/tgrkarthik/tgrkarthik.github.io
REM ============================================================

setlocal enabledelayedexpansion

REM Log file for debugging
set logfile=%~dp0push-log.txt

echo. >> %logfile%
echo ===== PUSH ATTEMPT at %date% %time% ===== >> %logfile%

cd /d "%~dp0" || (
    echo ERROR: Could not change directory to %~dp0 >> %logfile%
    pause
    exit /b 1
)

echo Current directory: %cd% >> %logfile%
echo Current directory: %cd%

echo. >> %logfile%
echo === Git Status === >> %logfile%
git status >> %logfile% 2>&1
git status

echo.
set /p msg="Enter commit message: "

echo. >> %logfile%
echo === Adding files === >> %logfile%
git add -A >> %logfile% 2>&1

echo === Committing === >> %logfile%
git commit -m "%msg%" >> %logfile% 2>&1

if errorlevel 1 (
    echo WARNING: Commit may have failed. Check push-log.txt >> %logfile%
    echo.
    echo WARNING: Commit may have failed (possibly no changes to commit)
    echo Check %logfile% for details
    echo.
)

echo === Pushing to origin main === >> %logfile%
git push origin main >> %logfile% 2>&1

if errorlevel 1 (
    echo ERROR: Push failed! Check push-log.txt >> %logfile%
    echo.
    echo ERROR: Push failed!
    echo Details saved to: %logfile%
    echo.
    type %logfile%
) else (
    echo SUCCESS: Push completed! >> %logfile%
    echo.
    echo SUCCESS: Changes pushed to GitHub!
    echo.
)

echo.
echo === Log saved to: push-log.txt ===
pause
