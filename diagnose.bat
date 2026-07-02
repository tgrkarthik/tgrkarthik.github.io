@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0"

echo.
echo === DIAGNOSTIC REPORT ===
echo.
echo Current directory:
cd
echo.

echo === Git Status ===
git status

echo.
echo === Git Remote ===
git remote -v

echo.
echo === Git Log (Last 5 commits) ===
git log --oneline -5

echo.
echo === Checking for unstaged changes ===
git diff --stat

echo.
echo === Files not tracked ===
git ls-files --others --exclude-standard

echo.
pause
