@echo off
setlocal enabledelayedexpansion
cd /d %~dp0

set RETURN_CODE=0

echo Checking Node.js and npm...
where node >nul 2>nul || (
  echo Error: Node.js 未安装或未加入 PATH。
  echo 请先安装 Node.js: https://nodejs.org/
  set RETURN_CODE=1
  goto end
)
where npm >nul 2>nul || (
  echo Error: 未找到 npm。请确认安装了 Node.js 并重新打开终端。
  set RETURN_CODE=1
  goto end
)
echo Running npm run deploy:all ...
npm run deploy:all
if ERRORLEVEL 1 (
  echo Error: npm run deploy:all failed!
  set RETURN_CODE=1
  goto end
) else (
  echo Deployment successful!
)

:end
echo.
if %RETURN_CODE% NEQ 0 (
  echo 出錯代碼：%RETURN_CODE%
)
echo 部署腳本已完成，窗口將保持打開；關閉請點右上角 X。
echo.
title Hexo Deploy - 完成 (關閉請點X)
:hold
timeout /t 86400 >nul
goto hold
