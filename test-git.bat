@echo off
cd /d "%~dp0"
echo Testing Git Installation...
echo.
git --version
echo.
echo If you see a version number above, Git is installed.
echo.
echo Checking git status:
git status
echo.
pause
