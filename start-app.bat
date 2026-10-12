@echo off
title CJ ASPER - Plant Specimen App
cd /d "D:\plant-app"
echo ========================================================
echo   Launching CJ ASPER Plant Specimen & Growth Journal
echo   Location: D:\plant-app
echo ========================================================
echo.
timeout /t 2 /nobreak >nul
start "" "http://localhost:5173"
call npm run dev -- --host --port 5173
pause
