@echo off
REM ============================================================
REM  push-site.bat
REM  One-click commit + push for Karthik's website repo
REM  Repo: https://github.com/tgrkarthik/tgrkarthik.github.io
REM ============================================================

cd /d "C:\Users\tgrka\Karthik WEBSITE\tgrkarthik.github.io-main"

echo.
echo === Current status ===
git status
echo.

set /p msg="Enter commit message: "

git add -A
git commit -m "%msg%"
git push

echo.
echo === Done ===
pause
