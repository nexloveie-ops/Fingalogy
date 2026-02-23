#!/bin/bash

# 图片上传脚本
# 使用方法：将图片拖放到 assets/images/ 目录，然后运行此脚本

echo "=== Fingalogy 图片上传脚本 ==="
echo ""

# 检查图片是否存在
echo "检查工作现场图片..."
if [ -f "assets/images/worker-bus.jpg" ]; then
    echo "✓ worker-bus.jpg 已找到"
else
    echo "✗ worker-bus.jpg 未找到"
    echo "  请将蓝色巴士工作图片重命名为 worker-bus.jpg 并放到 assets/images/ 目录"
fi

if [ -f "assets/images/worker-equipment.jpg" ]; then
    echo "✓ worker-equipment.jpg 已找到"
else
    echo "✗ worker-equipment.jpg 未找到"
    echo "  请将绿色设备工作图片重命名为 worker-equipment.jpg 并放到 assets/images/ 目录"
fi

echo ""
echo "检查合作伙伴 Logo..."

partners=("garda.png" "ucd.png" "international-airlines.png" "ryanair.png" "aer-lingus.png" "zellwood.png" "musgrave.png" "hendrick.png")

for partner in "${partners[@]}"; do
    if [ -f "assets/images/partners/$partner" ]; then
        echo "✓ $partner 已找到"
    else
        echo "✗ $partner 未找到"
    fi
done

echo ""
echo "=== 上传到 GitHub ==="
echo ""

# 添加所有图片
git add assets/images/

# 检查是否有新文件
if git diff --cached --quiet; then
    echo "没有新图片需要上传"
else
    echo "准备提交新图片..."
    git commit -m "Add images: worker photos and partner logos"
    echo "推送到 GitHub..."
    git push origin main
    echo "✓ 图片已成功上传到 GitHub！"
fi

echo ""
echo "完成！访问 https://github.com/nexloveie-ops/Fingalogy 查看"
