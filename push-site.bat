@echo off
REM ============================================================
REM  push-site.bat
REM  One-click commit + push for Karthik's website repo
REM  Repo: https://github.com/tgrkarthik/tgrkarthik.github.io
REM ============================================================

setlocal enabledelayedexpansion

cd /d "%~dp0"

echo.
echo === Current status ===
git status
echo.

set /p msg="Enter commit message: "

echo.
echo === Staging changes ===
git add -A

echo === Committing ===
git commit -m "%msg%"

echo === Pushing to origin main ===
git push origin main

echo.
echo === Done ===
pause
