# 部署说明

## 上传到 GitHub

### 方法 1: 使用命令行

```bash
# 1. 初始化 Git 仓库（如果还没有）
git init

# 2. 添加所有文件
git add .

# 3. 提交
git commit -m "Initial commit: Fingalogy website with modern tech design"

# 4. 添加远程仓库
git remote add origin https://github.com/nexloveie-ops/Fingalogy.git

# 5. 推送到 GitHub
git branch -M main
git push -u origin main
```

### 方法 2: 使用 GitHub Desktop

1. 打开 GitHub Desktop
2. 选择 "Add Existing Repository"
3. 选择项目文件夹
4. 点击 "Publish repository"
5. 选择账户 nexloveie-ops
6. 仓库名称: Fingalogy
7. 点击 "Publish Repository"

### 方法 3: 直接在 GitHub 网站上传

1. 访问 https://github.com/nexloveie-ops/Fingalogy
2. 如果仓库不存在，先创建新仓库
3. 点击 "uploading an existing file"
4. 拖拽所有文件到页面
5. 填写提交信息
6. 点击 "Commit changes"

## 使用 Docker 部署

### 构建镜像

```bash
docker build -t fingalogy-website .
```

### 运行容器

```bash
docker run -d -p 8080:80 --name fingalogy fingalogy-website
```

### 访问网站

打开浏览器访问: http://localhost:8080

## 添加图片

请将以下图片放置到对应目录：

1. **工作现场图片**:
   - `assets/images/worker-bus.jpg` - 工人在蓝色巴士上工作的图片
   - `assets/images/worker-equipment.jpg` - 工人在绿色设备上工作的图片

2. **合作伙伴 Logo** (放在 `assets/images/partners/` 目录):
   - `garda.png` - An Garda Síochána
   - `ucd.png` - University College Dublin
   - `international-airlines.png` - International Airlines
   - `ryanair.png` - Ryanair
   - `aer-lingus.png` - Aer Lingus
   - `zellwood.png` - Zellwood Limited
   - `musgrave.png` - Musgrave MarketPlace
   - `hendrick.png` - Hendrick European

## 项目文件清单

```
Fingalogy/
├── Dockerfile                 # Docker 配置文件
├── nginx.conf                # Nginx 服务器配置
├── index.html                # 主页面
├── README.md                 # 项目说明
├── DEPLOYMENT.md            # 部署说明（本文件）
├── .gitignore               # Git 忽略文件
├── .dockerignore            # Docker 忽略文件
├── assets/
│   ├── css/
│   │   └── styles.css       # 样式文件
│   ├── js/
│   │   └── main.js          # JavaScript 文件
│   └── images/              # 图片目录
│       ├── worker-bus.jpg
│       ├── worker-equipment.jpg
│       └── partners/        # 合作伙伴 Logo
└── .kiro/
    └── specs/               # 项目规格文档
```

## 注意事项

1. 确保所有图片都已添加到正确的目录
2. 图片格式建议使用 JPG 或 PNG
3. 建议优化图片大小以提高加载速度
4. 合作伙伴 Logo 建议使用透明背景的 PNG 格式

## 技术支持

如有问题，请查看：
- README.md - 项目概述和功能说明
- .kiro/specs/ - 完整的技术规格文档
