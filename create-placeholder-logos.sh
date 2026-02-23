#!/bin/bash

# 创建占位符 Logo 的脚本
# 这将创建简单的 SVG 占位符，你可以稍后替换为真实的 logo

echo "=== 创建占位符 Logo ==="
echo ""

mkdir -p assets/images/partners

# 合作伙伴列表
declare -A partners=(
    ["garda"]="An Garda Síochána"
    ["ucd"]="University College Dublin"
    ["international-airlines"]="International Airlines"
    ["ryanair"]="Ryanair"
    ["aer-lingus"]="Aer Lingus"
    ["zellwood"]="Zellwood Limited"
    ["musgrave"]="Musgrave MarketPlace"
    ["hendrick"]="Hendrick European"
)

# 为每个合作伙伴创建 SVG 占位符
for key in "${!partners[@]}"; do
    name="${partners[$key]}"
    filename="assets/images/partners/${key}.svg"
    
    cat > "$filename" << EOF
<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="100" fill="#1a1f3a" rx="8"/>
  <text x="100" y="50" font-family="Arial, sans-serif" font-size="14" fill="#00d4ff" text-anchor="middle" dominant-baseline="middle">
    ${name}
  </text>
</svg>
EOF
    
    echo "✓ 创建 $filename"
done

echo ""
echo "占位符 Logo 已创建！"
echo ""
echo "下一步："
echo "1. 访问 https://fingalogy.com/"
echo "2. 右键保存每个合作伙伴的真实 logo"
echo "3. 替换 assets/images/partners/ 目录中的 SVG 文件"
echo "4. 运行 ./upload-images.sh 上传到 GitHub"
