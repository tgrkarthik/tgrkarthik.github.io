@echo off
cd /d "%~dp0"
git add -A
set /p msg="Commit message: "
git commit -m "%msg%"
git push origin main
pause
