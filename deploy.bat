@echo off
setlocal enabledelayedexpansion
cd /d %~dp0
if not "%1"=="persist" (
  cmd /k "%~f0" persist
  exit /b
)

set RETURN_CODE=0

echo ========================================
echo 开始部署流程...
echo ========================================
echo.

echo [1/3] 检查 Node.js 和 npm...
where node >nul 2>nul || (
  echo [错误] Node.js 未安装或未加入 PATH。
  echo 请先安装 Node.js: https://nodejs.org/
  set RETURN_CODE=1
  goto end
)
where npm >nul 2>nul || (
  echo [错误] 未找到 npm。请确认安装了 Node.js 并重新打开终端。
  set RETURN_CODE=1
  goto end
)
echo [✓] Node.js 和 npm 检查通过
echo.

echo [2/3] 清理旧文件...
call hexo clean
if ERRORLEVEL 1 (
  echo [错误] hexo clean 执行失败！
  set RETURN_CODE=1
  goto end
)
echo [✓] 清理完成
echo.

echo [3/3] 生成静态文件...
call hexo generate
if ERRORLEVEL 1 (
  echo [错误] hexo generate 执行失败！
  set RETURN_CODE=1
  goto end
)
echo [✓] 静态文件生成完成
echo.

echo [4/4] 部署到远程仓库...
call hexo deploy
if ERRORLEVEL 1 (
  echo [错误] hexo deploy 执行失败！
  set RETURN_CODE=1
  goto end
)
echo [✓] 部署成功
echo.

:end
echo.
if %RETURN_CODE% NEQ 0 (
  echo 出錯代碼：%RETURN_CODE%
) else (
  echo 部署腳本執行完成！
)
echo.
echo ========================================
echo 按任意鍵退出...
echo ========================================
pause
endlocal
exit /b %RETURN_CODE%
