#!/bin/bash

# 下载 Fingalogy 网站的合作伙伴 Logo
# 使用方法: ./download-logos.sh

echo "=== 下载合作伙伴 Logo ==="
echo ""

# 创建目录
mkdir -p assets/images/partners

# 从 fingalogy.com 下载 logo
# 注意：这个脚本需要你手动检查网站上的实际图片 URL

echo "正在尝试下载 logo..."
echo ""

# 使用 wget 或 curl 下载图片
# 你需要先访问 https://fingalogy.com/ 并找到实际的图片 URL

# 示例（需要替换为实际 URL）:
# wget -O assets/images/partners/garda.png "https://fingalogy.com/path/to/garda-logo.png"
# wget -O assets/images/partners/ucd.png "https://fingalogy.com/path/to/ucd-logo.png"
# ... 等等

echo "请按照以下步骤手动下载 logo："
echo ""
echo "1. 访问 https://fingalogy.com/"
echo "2. 右键点击每个合作伙伴的 logo"
echo "3. 选择 '检查' 或 '查看元素'"
echo "4. 找到图片的 src URL"
echo "5. 使用以下命令下载："
echo ""
echo "   curl -o assets/images/partners/garda.png 'https://fingalogy.com/实际图片URL'"
echo ""
echo "或者："
echo ""
echo "1. 在浏览器中右键点击 logo"
echo "2. 选择 '图片另存为'"
echo "3. 保存到 assets/images/partners/ 目录"
echo "4. 重命名为对应的文件名"
echo ""
echo "需要的文件名："
echo "  - garda.png (An Garda Síochána)"
echo "  - ucd.png (University College Dublin)"
echo "  - international-airlines.png (International Airlines)"
echo "  - ryanair.png (Ryanair)"
echo "  - aer-lingus.png (Aer Lingus)"
echo "  - zellwood.png (Zellwood Limited)"
echo "  - musgrave.png (Musgrave MarketPlace)"
echo "  - hendrick.png (Hendrick European)"
