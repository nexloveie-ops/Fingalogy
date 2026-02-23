# 图片准备指南

## 需要的图片

### 1. 工作现场图片（2张）

你在对话中上传的两张图片需要保存到以下位置：

#### 图片 1: 蓝色巴士工作照
- **原始描述**: 穿着高可见度装备的工人在蓝色巴士/车辆电气面板上工作
- **保存位置**: `assets/images/worker-bus.jpg`
- **建议尺寸**: 1200x800 像素
- **格式**: JPG
- **操作步骤**:
  1. 右键点击对话中的第一张图片
  2. 选择"另存为"
  3. 保存到项目的 `assets/images/` 目录
  4. 重命名为 `worker-bus.jpg`

#### 图片 2: 绿色设备工作照
- **原始描述**: 穿着高可见度装备的工人在梯子上操作带有 Fingalogy 品牌的绿色设备
- **保存位置**: `assets/images/worker-equipment.jpg`
- **建议尺寸**: 1200x800 像素
- **格式**: JPG
- **操作步骤**:
  1. 右键点击对话中的第二张图片
  2. 选择"另存为"
  3. 保存到项目的 `assets/images/` 目录
  4. 重命名为 `worker-equipment.jpg`

### 2. 合作伙伴 Logo（8个）

需要从原网站 https://fingalogy.com/ 下载以下 Logo：

保存到 `assets/images/partners/` 目录：

1. **garda.png** - An Garda Síochána
2. **ucd.png** - University College Dublin
3. **international-airlines.png** - International Airlines
4. **ryanair.png** - Ryanair
5. **aer-lingus.png** - Aer Lingus
6. **zellwood.png** - Zellwood Limited
7. **musgrave.png** - Musgrave MarketPlace
8. **hendrick.png** - Hendrick European

**Logo 要求**:
- 格式: PNG（透明背景）
- 建议尺寸: 200x100 像素左右
- 保持原始宽高比

## 快速操作步骤

### 方法 1: 手动保存（推荐）

```bash
# 1. 在 Finder 中打开项目目录
open .

# 2. 导航到 assets/images/ 目录

# 3. 将两张工作照片拖放到此目录，并重命名为：
#    - worker-bus.jpg
#    - worker-equipment.jpg

# 4. 导航到 assets/images/partners/ 目录

# 5. 将 8 个合作伙伴 Logo 拖放到此目录

# 6. 运行上传脚本
./upload-images.sh
```

### 方法 2: 使用命令行

```bash
# 检查图片是否已添加
ls -la assets/images/
ls -la assets/images/partners/

# 添加图片到 Git
git add assets/images/

# 提交
git commit -m "Add images: worker photos and partner logos"

# 推送到 GitHub
git push origin main
```

### 方法 3: 使用 GitHub 网页界面

1. 访问 https://github.com/nexloveie-ops/Fingalogy
2. 导航到 `assets/images/` 目录
3. 点击 "Add file" > "Upload files"
4. 拖放图片文件
5. 填写提交信息
6. 点击 "Commit changes"

## 图片优化建议

为了提高网站加载速度，建议优化图片：

```bash
# 使用 ImageMagick 优化 JPG（如果已安装）
convert worker-bus.jpg -quality 85 -resize 1200x800 worker-bus.jpg
convert worker-equipment.jpg -quality 85 -resize 1200x800 worker-equipment.jpg

# 或使用在线工具：
# - TinyPNG: https://tinypng.com/
# - Squoosh: https://squoosh.app/
```

## 验证图片

上传后，访问以下 URL 验证图片是否正确显示：

- https://github.com/nexloveie-ops/Fingalogy/blob/main/assets/images/worker-bus.jpg
- https://github.com/nexloveie-ops/Fingalogy/blob/main/assets/images/worker-equipment.jpg
- https://github.com/nexloveie-ops/Fingalogy/tree/main/assets/images/partners

## 需要帮助？

如果遇到问题：
1. 确保图片文件名完全匹配（区分大小写）
2. 确保图片格式正确（JPG 或 PNG）
3. 检查文件大小（建议每张图片 < 500KB）
4. 运行 `./upload-images.sh` 查看详细状态
