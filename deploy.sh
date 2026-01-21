#!/bin/bash

# 切换到脚本所在目录
cd "$(dirname "$0")"

RETURN_CODE=0

echo "========================================"
echo "开始部署流程..."
echo "========================================"
echo ""

# 检查 Node.js 和 npm
echo "[1/4] 检查 Node.js 和 npm..."
if ! command -v node &> /dev/null; then
    echo "[错误] Node.js 未安装或未加入 PATH。"
    echo "请先安装 Node.js: https://nodejs.org/"
    RETURN_CODE=1
    exit $RETURN_CODE
fi

if ! command -v npm &> /dev/null; then
    echo "[错误] 未找到 npm。请确认安装了 Node.js 并重新打开终端。"
    RETURN_CODE=1
    exit $RETURN_CODE
fi

echo "[✓] Node.js 和 npm 检查通过"
echo ""

# 清理旧文件
echo "[2/4] 清理旧文件..."
npx hexo clean
if [ $? -ne 0 ]; then
    echo "[错误] hexo clean 执行失败！"
    RETURN_CODE=1
    exit $RETURN_CODE
fi
echo "[✓] 清理完成"
echo ""

# 生成静态文件
echo "[3/4] 生成静态文件..."
npx hexo generate
if [ $? -ne 0 ]; then
    echo "[错误] hexo generate 执行失败！"
    RETURN_CODE=1
    exit $RETURN_CODE
fi
echo "[✓] 静态文件生成完成"
echo ""

# 部署到远程仓库
echo "[4/4] 部署到远程仓库..."
npx hexo deploy
if [ $? -ne 0 ]; then
    echo "[错误] hexo deploy 执行失败！"
    RETURN_CODE=1
    exit $RETURN_CODE
fi
echo "[✓] 部署成功"
echo ""

echo ""
if [ $RETURN_CODE -ne 0 ]; then
    echo "出错代码：$RETURN_CODE"
else
    echo "部署脚本执行完成！"
fi
echo ""
echo "========================================"

exit $RETURN_CODE
