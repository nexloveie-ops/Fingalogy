# 设计文档

## 概述

本设计文档描述了 Fingalogy Limited 网站重新设计的技术实现方案。该网站将采用现代化、以科技为重点的设计美学，包含动态视觉效果、响应式布局和优化的性能。

### 设计目标

1. 创建具有现代科技感的视觉体验
2. 实现流畅的动画和交互效果
3. 确保在所有设备上的响应式显示
4. 保持快速的加载速度和优秀的性能
5. 提供无障碍访问支持

### 技术栈

- **HTML5**: 语义化标记
- **CSS3**: 现代样式特性（Grid、Flexbox、CSS Variables、Animations）
- **JavaScript (ES6+)**: 交互逻辑和动画控制
- **Intersection Observer API**: 滚动触发动画
- **CSS Backdrop Filter**: 玻璃态效果
- **WebP 图像格式**: 优化的图像加载（带 JPEG/PNG 回退）

## 架构

### 整体架构

网站采用单页应用（SPA）架构，所有内容部分在同一页面中通过滚动访问。架构分为以下层次：

```
┌─────────────────────────────────────┐
│         表现层 (Presentation)        │
│  - HTML 结构                         │
│  - CSS 样式和动画                    │
│  - 响应式布局                        │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│         交互层 (Interaction)         │
│  - 事件处理器                        │
│  - 动画控制器                        │
│  - 滚动监听器                        │
│  - 导航控制器                        │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│         工具层 (Utilities)           │
│  - 图像延迟加载                      │
│  - 性能监控                          │
│  - 浏览器兼容性检测                  │
└─────────────────────────────────────┘
```

### 页面结构

网站由以下主要部分组成：

1. **导航栏 (Navigation Bar)**: 固定在顶部，包含所有部分的链接
2. **英雄区 (Hero Section)**: 带有动画背景的欢迎区域
3. **关于我们 (About Us)**: 公司介绍和使命
4. **为什么选择 Fingalogy (Why Choose Fingalogy)**: 核心优势展示
5. **服务 (Services)**: IT/电子服务和 BESS 服务的详细说明
6. **合作伙伴 (Partners)**: 合作伙伴标识展示
7. **联系我们 (Contact)**: 联系信息和表单
8. **页脚 (Footer)**: 版权信息和额外链接

## 组件和接口

### 核心组件

#### 1. NavigationBar 组件

**职责**: 提供网站导航和响应式菜单

**接口**:
```javascript
class NavigationBar {
  constructor(element)
  
  // 初始化导航栏
  init()
  
  // 处理滚动时的导航栏样式变化
  handleScroll()
  
  // 切换移动菜单
  toggleMobileMenu()
  
  // 平滑滚动到指定部分
  scrollToSection(sectionId)
  
  // 更新活动导航项
  updateActiveNavItem(sectionId)
}
```

**属性**:
- `element`: 导航栏 DOM 元素
- `mobileMenuOpen`: 移动菜单状态（布尔值）
- `navLinks`: 导航链接数组
- `scrollThreshold`: 触发样式变化的滚动阈值（像素）

#### 2. ScrollAnimationController 组件

**职责**: 管理滚动触发的动画效果

**接口**:
```javascript
class ScrollAnimationController {
  constructor(options)
  
  // 初始化 Intersection Observer
  init()
  
  // 观察元素进入视口
  observe(elements)
  
  // 处理元素可见性变化
  handleIntersection(entries)
  
  // 应用动画类
  applyAnimation(element, animationType)
  
  // 清理观察器
  destroy()
}
```

**属性**:
- `observer`: IntersectionObserver 实例
- `options`: 观察器配置选项
- `animatedElements`: 已动画元素的集合
- `threshold`: 触发动画的可见度阈值

#### 3. ParallaxEffect 组件

**职责**: 实现视差滚动效果

**接口**:
```javascript
class ParallaxEffect {
  constructor(elements, speed)
  
  // 初始化视差效果
  init()
  
  // 更新元素位置
  updatePosition()
  
  // 处理滚动事件（节流）
  handleScroll()
  
  // 计算视差偏移
  calculateOffset(scrollPosition, speed)
}
```

**属性**:
- `elements`: 应用视差效果的元素数组
- `speed`: 视差速度系数
- `scrollPosition`: 当前滚动位置
- `rafId`: requestAnimationFrame ID

#### 4. ImageLazyLoader 组件

**职责**: 实现图像延迟加载以优化性能

**接口**:
```javascript
class ImageLazyLoader {
  constructor(options)
  
  // 初始化延迟加载
  init()
  
  // 观察图像元素
  observe(images)
  
  // 加载图像
  loadImage(imageElement)
  
  // 处理图像加载完成
  handleImageLoad(imageElement)
  
  // 处理图像加载错误
  handleImageError(imageElement)
}
```

**属性**:
- `observer`: IntersectionObserver 实例
- `options`: 加载配置选项
- `loadedImages`: 已加载图像的集合

#### 5. ParticleBackground 组件

**职责**: 创建动态粒子背景效果

**接口**:
```javascript
class ParticleBackground {
  constructor(canvas, options)
  
  // 初始化粒子系统
  init()
  
  // 创建粒子
  createParticles(count)
  
  // 更新粒子位置
  updateParticles()
  
  // 渲染粒子
  render()
  
  // 动画循环
  animate()
  
  // 调整画布大小
  resize()
  
  // 停止动画
  stop()
}
```

**属性**:
- `canvas`: Canvas 元素
- `ctx`: Canvas 2D 上下文
- `particles`: 粒子对象数组
- `options`: 粒子配置选项（颜色、大小、速度）
- `animationId`: requestAnimationFrame ID

#### 6. ResponsiveLayoutManager 组件

**职责**: 管理响应式布局和断点

**接口**:
```javascript
class ResponsiveLayoutManager {
  constructor()
  
  // 初始化响应式管理器
  init()
  
  // 获取当前设备类型
  getDeviceType()
  
  // 处理窗口大小变化
  handleResize()
  
  // 应用设备特定样式
  applyDeviceStyles(deviceType)
  
  // 检查是否为触摸设备
  isTouchDevice()
}
```

**属性**:
- `breakpoints`: 断点配置对象
- `currentDeviceType`: 当前设备类型（mobile/tablet/desktop）
- `resizeTimeout`: 防抖定时器

#### 7. PartnerLogoGallery 组件

**职责**: 展示合作伙伴标识并处理交互

**接口**:
```javascript
class PartnerLogoGallery {
  constructor(container, logos)
  
  // 初始化标识画廊
  init()
  
  // 渲染标识
  renderLogos()
  
  // 添加悬停效果
  addHoverEffects()
  
  // 确保标识宽高比
  maintainAspectRatio(logoElement)
}
```

**属性**:
- `container`: 容器 DOM 元素
- `logos`: 标识数据数组
- `logoElements`: 标识 DOM 元素数组

#### 8. ServiceCard 组件

**职责**: 展示服务信息卡片

**接口**:
```javascript
class ServiceCard {
  constructor(data)
  
  // 渲染服务卡片
  render()
  
  // 添加交互效果
  addInteractions()
  
  // 创建卡片 HTML
  createCardHTML()
}
```

**属性**:
- `title`: 服务标题
- `description`: 服务描述
- `icon`: 服务图标
- `details`: 服务详细信息数组

### 工具函数

#### 性能优化工具

```javascript
// 节流函数
function throttle(func, delay)

// 防抖函数
function debounce(func, delay)

// 检查元素是否在视口中
function isInViewport(element)

// 预加载关键资源
function preloadCriticalAssets(assets)
```

#### 动画工具

```javascript
// 平滑滚动到元素
function smoothScrollTo(element, duration)

// 应用淡入动画
function fadeIn(element, duration)

// 应用滑入动画
function slideIn(element, direction, duration)

// 检查是否偏好减少动画
function prefersReducedMotion()
```

#### 浏览器兼容性工具

```javascript
// 检查 CSS 特性支持
function supportsCSS(property, value)

// 检查 Intersection Observer 支持
function supportsIntersectionObserver()

// 检查 WebP 支持
function supportsWebP()

// 添加 polyfill
function loadPolyfills()
```

## 数据模型

### Partner 数据模型

```javascript
{
  id: String,              // 唯一标识符
  name: String,            // 合作伙伴名称
  logoUrl: String,         // 标识图像 URL
  logoAlt: String,         // 标识替代文本
  website: String          // 合作伙伴网站 URL（可选）
}
```

**示例**:
```javascript
{
  id: "garda",
  name: "An Garda Síochána",
  logoUrl: "/assets/logos/garda.png",
  logoAlt: "An Garda Síochána logo",
  website: "https://www.garda.ie"
}
```

### Service 数据模型

```javascript
{
  id: String,              // 唯一标识符
  title: String,           // 服务标题
  description: String,     // 服务描述
  icon: String,            // 图标类名或 URL
  details: Array<String>,  // 服务详细信息列表
  imageUrl: String         // 服务相关图像 URL（可选）
}
```

**示例**:
```javascript
{
  id: "it-services",
  title: "IT and Electronics Services",
  description: "Comprehensive IT solutions for businesses",
  icon: "icon-computer",
  details: [
    "Hardware maintenance and repair",
    "Software installation and support",
    "Network infrastructure setup"
  ],
  imageUrl: "/assets/images/it-service.jpg"
}
```

### AnimationConfig 数据模型

```javascript
{
  type: String,            // 动画类型（fade-in, slide-in, scale-up）
  duration: Number,        // 动画持续时间（毫秒）
  delay: Number,           // 动画延迟（毫秒）
  easing: String,          // 缓动函数（ease, ease-in-out, cubic-bezier）
  threshold: Number        // Intersection Observer 阈值（0-1）
}
```

**示例**:
```javascript
{
  type: "fade-in",
  duration: 600,
  delay: 100,
  easing: "ease-out",
  threshold: 0.2
}
```

### ParticleConfig 数据模型

```javascript
{
  count: Number,           // 粒子数量
  color: String,           // 粒子颜色（十六进制或 RGB）
  size: {
    min: Number,           // 最小尺寸
    max: Number            // 最大尺寸
  },
  speed: {
    min: Number,           // 最小速度
    max: Number            // 最大速度
  },
  opacity: {
    min: Number,           // 最小不透明度（0-1）
    max: Number            // 最大不透明度（0-1）
  },
  connections: Boolean     // 是否绘制粒子间连接线
}
```

**示例**:
```javascript
{
  count: 80,
  color: "#00d4ff",
  size: { min: 1, max: 3 },
  speed: { min: 0.1, max: 0.5 },
  opacity: { min: 0.3, max: 0.8 },
  connections: true
}
```

### ResponsiveBreakpoint 数据模型

```javascript
{
  name: String,            // 断点名称（mobile, tablet, desktop）
  minWidth: Number,        // 最小宽度（像素）
  maxWidth: Number,        // 最大宽度（像素，可选）
  columns: Number,         // 网格列数
  fontSize: {
    base: Number,          // 基础字体大小（像素）
    heading: Number        // 标题字体大小（像素）
  }
}
```

**示例**:
```javascript
{
  name: "mobile",
  minWidth: 0,
  maxWidth: 767,
  columns: 1,
  fontSize: {
    base: 14,
    heading: 24
  }
}
```

### ImageAsset 数据模型

```javascript
{
  id: String,              // 唯一标识符
  src: String,             // 图像源 URL
  srcset: String,          // 响应式图像源集
  alt: String,             // 替代文本
  width: Number,           // 原始宽度
  height: Number,          // 原始高度
  loading: String,         // 加载策略（lazy, eager）
  formats: {
    webp: String,          // WebP 格式 URL
    jpeg: String,          // JPEG 格式 URL
    png: String            // PNG 格式 URL
  }
}
```

**示例**:
```javascript
{
  id: "worker-bus",
  src: "/assets/images/worker-bus.jpg",
  srcset: "/assets/images/worker-bus-400.jpg 400w, /assets/images/worker-bus-800.jpg 800w",
  alt: "Worker in high-vis gear working on blue bus electrical panel",
  width: 1200,
  height: 800,
  loading: "lazy",
  formats: {
    webp: "/assets/images/worker-bus.webp",
    jpeg: "/assets/images/worker-bus.jpg",
    png: null
  }
}
```

## CSS 架构

### 设计令牌（CSS 变量）

```css
:root {
  /* 颜色 */
  --color-primary: #00d4ff;
  --color-secondary: #0066ff;
  --color-accent: #ff00ff;
  --color-dark: #0a0e27;
  --color-dark-secondary: #1a1f3a;
  --color-light: #ffffff;
  --color-text: #e0e0e0;
  --color-text-secondary: #a0a0a0;
  
  /* 渐变 */
  --gradient-primary: linear-gradient(135deg, #00d4ff 0%, #0066ff 100%);
  --gradient-dark: linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%);
  
  /* 间距 */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  --spacing-xl: 6rem;
  
  /* 字体 */
  --font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-base: 16px;
  --font-size-sm: 14px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
  --font-size-3xl: 48px;
  
  /* 动画 */
  --transition-fast: 200ms ease;
  --transition-normal: 400ms ease;
  --transition-slow: 600ms ease;
  --easing-smooth: cubic-bezier(0.4, 0.0, 0.2, 1);
  
  /* 阴影 */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.3);
  --shadow-glow: 0 0 20px rgba(0, 212, 255, 0.5);
  
  /* 边框半径 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;
  
  /* Z-index 层级 */
  --z-base: 1;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal: 400;
  --z-tooltip: 500;
}
```

### 响应式断点

```css
/* 移动设备 */
@media (max-width: 767px) { }

/* 平板设备 */
@media (min-width: 768px) and (max-width: 1024px) { }

/* 桌面设备 */
@media (min-width: 1025px) { }

/* 大屏幕 */
@media (min-width: 1440px) { }
```

### 动画类

```css
/* 淡入动画 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 从下方滑入 */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 从左侧滑入 */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 缩放进入 */
@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 发光脉冲 */
@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.8);
  }
}
```

## 性能优化策略

### 图像优化

1. **响应式图像**: 使用 `srcset` 和 `sizes` 属性为不同设备提供适当尺寸的图像
2. **现代格式**: 优先使用 WebP 格式，提供 JPEG/PNG 回退
3. **延迟加载**: 对非关键图像使用 `loading="lazy"` 属性
4. **压缩**: 所有图像应压缩至合理的质量级别（JPEG 质量 80-85）

### CSS 优化

1. **关键 CSS**: 内联首屏渲染所需的关键 CSS
2. **CSS 压缩**: 生产环境中压缩所有 CSS 文件
3. **避免阻塞**: 使用 `media` 属性异步加载非关键 CSS

### JavaScript 优化

1. **代码分割**: 将 JavaScript 分割为多个小文件，按需加载
2. **压缩和混淆**: 生产环境中压缩所有 JavaScript 文件
3. **延迟执行**: 非关键脚本使用 `defer` 或 `async` 属性
4. **事件节流**: 对滚动和调整大小事件使用节流函数

### 动画性能

1. **使用 transform 和 opacity**: 这些属性可以利用 GPU 加速
2. **避免布局抖动**: 批量读取和写入 DOM 属性
3. **requestAnimationFrame**: 使用 RAF 进行流畅的动画
4. **will-change**: 对频繁动画的元素使用 `will-change` 属性

### 缓存策略

1. **浏览器缓存**: 为静态资源设置适当的缓存头
2. **版本控制**: 使用文件哈希或版本号进行缓存破坏
3. **Service Worker**: 考虑使用 Service Worker 进行离线支持（可选）


## 正确性属性

属性是关于系统应该做什么的特征或行为，应该在系统的所有有效执行中保持为真。属性充当人类可读规范和机器可验证正确性保证之间的桥梁。

### 属性 1: 合作伙伴标识宽高比保持

*对于任何*合作伙伴标识图像，当渲染到页面上时，显示的宽高比应当与原始图像的宽高比相同（误差在 1% 以内）

**验证需求: 2.9**

### 属性 2: 移动设备响应式图像

*对于任何*图像资源，当在移动设备视口（宽度 < 768px）中查看时，系统应当提供宽度不超过 800px 的图像版本

**验证需求: 3.4**

### 属性 3: 响应式布局适配

*对于任何*视口宽度（320px 到 2560px），页面布局应当相应调整，并且不应出现水平滚动条（body 的 scrollWidth 应等于 clientWidth）

**验证需求: 4.1, 4.2, 4.3, 4.4**

### 属性 4: 最小字体大小

*对于任何*文本元素，计算后的字体大小应当至少为 14px

**验证需求: 4.5**

### 属性 5: 触摸目标最小尺寸

*对于任何*交互元素（按钮、链接、输入框），在触摸设备上的最小触摸目标尺寸应当至少为 44x44 像素

**验证需求: 4.6**

### 属性 6: 滚动动画触发

*对于任何*标记为可动画的内容元素，当该元素进入视口时（可见度 > 20%），应当应用相应的动画类（如 fade-in、slide-in-up）

**验证需求: 6.1**

### 属性 7: 视差效果响应

*对于任何*具有视差效果的背景元素，当页面滚动位置改变时，该元素的 transform translateY 值应当根据滚动位置和速度系数相应改变

**验证需求: 6.2**

### 属性 8: 动画持续时间范围

*对于任何*滚动触发的动画，CSS 动画持续时间应当在 300ms 到 800ms 之间

**验证需求: 6.3**

### 属性 9: 减少动画偏好支持

*对于任何*动画效果，如果用户的操作系统设置了 prefers-reduced-motion: reduce，系统应当禁用或显著减少动画效果（持续时间 < 100ms 或完全移除）

**验证需求: 6.5**

### 属性 10: 交互元素悬停反馈

*对于任何*交互元素（按钮、链接、卡片），应当定义 :hover 伪类样式，提供视觉反馈（颜色变化、transform、box-shadow 等）

**验证需求: 7.1**

### 属性 11: 悬停过渡平滑性

*对于任何*具有悬停效果的元素，CSS transition 持续时间应当在 200ms 到 400ms 之间

**验证需求: 7.4**

### 属性 12: 触摸设备视觉反馈

*对于任何*交互元素，在触摸设备上应当定义 :active 或 :focus 伪类样式，提供点击时的视觉反馈

**验证需求: 7.5**

### 属性 13: 动画背景对比度

*对于任何*具有动画背景的部分，前景文本与背景之间的对比度应当至少为 4.5:1，以确保可读性

**验证需求: 8.2**

### 属性 14: 图像 Alt 文本完整性

*对于任何*图像元素（img、picture），应当具有非空的 alt 属性，提供描述性的替代文本

**验证需求: 10.1**

### 属性 15: 文本对比度合规性

*对于任何*文本元素，文本颜色与背景颜色之间的对比度应当至少为 4.5:1（WCAG AA 标准）

**验证需求: 10.2**

### 属性 16: 键盘导航可访问性

*对于任何*交互元素（按钮、链接、表单控件），应当可以通过键盘 Tab 键访问（tabindex >= 0 或自然可聚焦元素）

**验证需求: 10.3**

### 属性 17: 焦点指示器可见性

*对于任何*可聚焦元素，应当定义 :focus 伪类样式，提供清晰的视觉焦点指示器（outline 或自定义样式）

**验证需求: 10.4**

### 属性 18: 语义化 HTML 使用

*对于任何*主要页面结构，应当使用语义化 HTML5 元素（header、nav、main、section、article、aside、footer）而不是通用的 div

**验证需求: 10.5**

### 属性 19: ARIA 标签完整性

*对于任何*动态内容区域或自定义交互组件，应当包含适当的 ARIA 属性（role、aria-label、aria-labelledby、aria-live 等）

**验证需求: 10.6**

### 属性 20: 服务描述完整性

*对于任何*服务项（IT 服务或 BESS 服务），应当包含描述性文本内容（至少 50 个字符）

**验证需求: 13.3**

### 属性 21: 服务视觉表示

*对于任何*服务项，应当包含图标元素或图像元素以提供视觉表示

**验证需求: 13.4**

## 错误处理

### 图像加载失败

**场景**: 图像资源无法加载（404、网络错误、CORS 问题）

**处理策略**:
1. 显示占位符图像或图标
2. 保持布局稳定，不出现布局偏移
3. 在控制台记录错误信息
4. 对于关键图像（如合作伙伴标识），显示文本回退

**实现**:
```javascript
imageElement.addEventListener('error', (e) => {
  console.error(`Failed to load image: ${e.target.src}`);
  e.target.src = '/assets/images/placeholder.png';
  e.target.alt = 'Image failed to load';
});
```

### 浏览器功能不支持

**场景**: 用户浏览器不支持某些现代 Web 功能（Intersection Observer、CSS Grid、backdrop-filter）

**处理策略**:
1. 功能检测：在使用前检查功能是否可用
2. 优雅降级：提供替代实现或简化版本
3. Polyfill：为关键功能加载 polyfill
4. 通知用户：对于严重不兼容，显示浏览器升级提示

**实现**:
```javascript
// Intersection Observer 功能检测
if ('IntersectionObserver' in window) {
  // 使用 Intersection Observer
  const observer = new IntersectionObserver(callback, options);
} else {
  // 回退到简单的滚动事件监听
  window.addEventListener('scroll', throttledScrollHandler);
}

// CSS 功能检测
if (CSS.supports('backdrop-filter', 'blur(10px)')) {
  element.classList.add('glassmorphism');
} else {
  element.classList.add('glassmorphism-fallback');
}
```

### 动画性能问题

**场景**: 在低性能设备上，复杂动画导致帧率下降

**处理策略**:
1. 性能监控：使用 Performance API 监控帧率
2. 自适应降级：检测到性能问题时自动禁用复杂动画
3. 用户控制：提供选项让用户禁用动画
4. 优化动画：使用 transform 和 opacity 而不是其他属性

**实现**:
```javascript
let frameCount = 0;
let lastTime = performance.now();

function monitorPerformance() {
  frameCount++;
  const currentTime = performance.now();
  
  if (currentTime - lastTime >= 1000) {
    const fps = frameCount;
    frameCount = 0;
    lastTime = currentTime;
    
    if (fps < 30) {
      // 性能不佳，禁用复杂动画
      document.body.classList.add('reduced-animations');
    }
  }
  
  requestAnimationFrame(monitorPerformance);
}
```

### 响应式布局断裂

**场景**: 在某些特定视口宽度下，布局出现问题

**处理策略**:
1. 全面测试：在多个断点测试布局
2. 流式布局：使用相对单位（%、vw、rem）而不是固定像素
3. 最小/最大约束：使用 min-width、max-width 防止极端情况
4. 媒体查询：为问题区域添加特定的媒体查询修复

**实现**:
```css
/* 防止内容溢出 */
* {
  box-sizing: border-box;
  max-width: 100%;
}

/* 流式容器 */
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

/* 响应式图像 */
img {
  max-width: 100%;
  height: auto;
}
```

### JavaScript 执行错误

**场景**: JavaScript 代码执行时出现运行时错误

**处理策略**:
1. Try-catch 包装：对关键代码使用 try-catch
2. 全局错误处理：设置 window.onerror 处理器
3. 错误日志：记录错误信息用于调试
4. 优雅降级：确保核心内容即使 JavaScript 失败也能访问

**实现**:
```javascript
// 全局错误处理
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // 可选：发送错误报告到服务器
});

// 关键功能的错误处理
try {
  initializeAnimations();
  initializeParticleBackground();
} catch (error) {
  console.error('Failed to initialize animations:', error);
  // 继续执行，不阻塞页面加载
}
```

### 网络连接问题

**场景**: 用户网络连接缓慢或不稳定

**处理策略**:
1. 加载指示器：显示加载状态
2. 渐进式加载：优先加载关键内容
3. 超时处理：设置合理的超时时间
4. 离线支持：考虑使用 Service Worker 缓存关键资源

**实现**:
```javascript
// 检测网络状态
if ('connection' in navigator) {
  const connection = navigator.connection;
  if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
    // 低速网络，禁用重型功能
    document.body.classList.add('low-bandwidth');
  }
}

// 监听在线/离线状态
window.addEventListener('online', () => {
  console.log('Connection restored');
});

window.addEventListener('offline', () => {
  console.log('Connection lost');
  // 显示离线提示
});
```

## 测试策略

### 双重测试方法

本项目采用单元测试和基于属性的测试相结合的综合测试策略：

- **单元测试**: 验证特定示例、边缘情况和错误条件
- **基于属性的测试**: 验证跨所有输入的通用属性
- 两者是互补的，对于全面覆盖都是必要的

### 单元测试

单元测试专注于：
- 特定示例：验证特定内容是否存在（公司名称、合作伙伴标识、页面部分）
- 边缘情况：极小/极大视口、空内容、特殊字符
- 错误条件：图像加载失败、不支持的浏览器功能、网络错误
- 集成点：组件之间的交互、事件处理、DOM 操作

**测试框架**: Jest + Testing Library

**示例单元测试**:
```javascript
describe('NavigationBar', () => {
  test('应当包含所有主要部分的链接', () => {
    const nav = render(<NavigationBar />);
    expect(nav.getByText('About Us')).toBeInTheDocument();
    expect(nav.getByText('Services')).toBeInTheDocument();
    expect(nav.getByText('Partners')).toBeInTheDocument();
    expect(nav.getByText('Contact')).toBeInTheDocument();
  });
  
  test('应当在移动视口显示汉堡菜单', () => {
    window.innerWidth = 375;
    const nav = render(<NavigationBar />);
    expect(nav.getByRole('button', { name: /menu/i })).toBeInTheDocument();
  });
  
  test('应当在点击链接时平滑滚动', () => {
    const scrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    
    const nav = render(<NavigationBar />);
    fireEvent.click(nav.getByText('Services'));
    
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});

describe('PartnerLogoGallery', () => {
  test('应当显示所有 8 个合作伙伴标识', () => {
    const gallery = render(<PartnerLogoGallery />);
    const logos = gallery.getAllByRole('img');
    expect(logos).toHaveLength(8);
  });
  
  test('应当为每个标识提供 alt 文本', () => {
    const gallery = render(<PartnerLogoGallery />);
    const logos = gallery.getAllByRole('img');
    logos.forEach(logo => {
      expect(logo).toHaveAttribute('alt');
      expect(logo.alt).not.toBe('');
    });
  });
});

describe('图像加载错误处理', () => {
  test('应当在图像加载失败时显示占位符', () => {
    const img = document.createElement('img');
    img.src = 'invalid-url.jpg';
    
    const errorHandler = jest.fn((e) => {
      e.target.src = '/assets/images/placeholder.png';
    });
    
    img.addEventListener('error', errorHandler);
    img.dispatchEvent(new Event('error'));
    
    expect(errorHandler).toHaveBeenCalled();
    expect(img.src).toContain('placeholder.png');
  });
});
```

### 基于属性的测试

基于属性的测试通过在许多生成的输入上测试通用属性来验证软件正确性。每个属性都是一个形式化规范，应该对所有有效输入保持为真。

**测试库**: fast-check (JavaScript 的基于属性测试库)

**配置**:
- 每个属性测试最少 100 次迭代
- 每个测试必须引用其设计文档属性
- 标签格式: **Feature: fingalogy-website-redesign, Property {number}: {property_text}**

**示例基于属性的测试**:
```javascript
const fc = require('fast-check');

describe('基于属性的测试', () => {
  // Feature: fingalogy-website-redesign, Property 1: 合作伙伴标识宽高比保持
  test('属性 1: 标识宽高比应当保持不变', () => {
    fc.assert(
      fc.property(
        fc.record({
          width: fc.integer({ min: 100, max: 1000 }),
          height: fc.integer({ min: 100, max: 1000 }),
          containerWidth: fc.integer({ min: 200, max: 500 })
        }),
        (logo) => {
          const originalRatio = logo.width / logo.height;
          const rendered = renderLogo(logo, logo.containerWidth);
          const renderedRatio = rendered.width / rendered.height;
          const difference = Math.abs(originalRatio - renderedRatio) / originalRatio;
          return difference < 0.01; // 误差小于 1%
        }
      ),
      { numRuns: 100 }
    );
  });
  
  // Feature: fingalogy-website-redesign, Property 3: 响应式布局适配
  test('属性 3: 任何视口宽度都不应出现水平滚动', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 2560 }),
        (viewportWidth) => {
          setViewportWidth(viewportWidth);
          const body = document.body;
          return body.scrollWidth === body.clientWidth;
        }
      ),
      { numRuns: 100 }
    );
  });
  
  // Feature: fingalogy-website-redesign, Property 4: 最小字体大小
  test('属性 4: 所有文本元素字体大小至少 14px', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('p', 'span', 'div', 'h1', 'h2', 'h3', 'li', 'a'),
        (tagName) => {
          const elements = document.querySelectorAll(tagName);
          return Array.from(elements).every(el => {
            const fontSize = parseFloat(window.getComputedStyle(el).fontSize);
            return fontSize >= 14;
          });
        }
      ),
      { numRuns: 100 }
    );
  });
  
  // Feature: fingalogy-website-redesign, Property 5: 触摸目标最小尺寸
  test('属性 5: 交互元素触摸目标至少 44x44px', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('button', 'a', 'input'),
        (selector) => {
          const elements = document.querySelectorAll(selector);
          return Array.from(elements).every(el => {
            const rect = el.getBoundingClientRect();
            return rect.width >= 44 && rect.height >= 44;
          });
        }
      ),
      { numRuns: 100 }
    );
  });
  
  // Feature: fingalogy-website-redesign, Property 8: 动画持续时间范围
  test('属性 8: 动画持续时间在 300-800ms 之间', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('.fade-in', '.slide-in-up', '.scale-up'),
        (animationClass) => {
          const elements = document.querySelectorAll(animationClass);
          return Array.from(elements).every(el => {
            const duration = parseFloat(window.getComputedStyle(el).animationDuration) * 1000;
            return duration >= 300 && duration <= 800;
          });
        }
      ),
      { numRuns: 100 }
    );
  });
  
  // Feature: fingalogy-website-redesign, Property 14: 图像 Alt 文本完整性
  test('属性 14: 所有图像都有非空 alt 文本', () => {
    fc.assert(
      fc.property(
        fc.constant(document),
        (doc) => {
          const images = doc.querySelectorAll('img');
          return Array.from(images).every(img => {
            return img.hasAttribute('alt') && img.alt.trim().length > 0;
          });
        }
      ),
      { numRuns: 100 }
    );
  });
  
  // Feature: fingalogy-website-redesign, Property 15: 文本对比度合规性
  test('属性 15: 文本对比度至少 4.5:1', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('p', 'h1', 'h2', 'h3', 'span', 'a'),
        (tagName) => {
          const elements = document.querySelectorAll(tagName);
          return Array.from(elements).every(el => {
            const textColor = window.getComputedStyle(el).color;
            const bgColor = getBackgroundColor(el);
            const ratio = calculateContrastRatio(textColor, bgColor);
            return ratio >= 4.5;
          });
        }
      ),
      { numRuns: 100 }
    );
  });
  
  // Feature: fingalogy-website-redesign, Property 16: 键盘导航可访问性
  test('属性 16: 所有交互元素可通过键盘访问', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('button', 'a', 'input', 'select', 'textarea'),
        (selector) => {
          const elements = document.querySelectorAll(selector);
          return Array.from(elements).every(el => {
            const tabIndex = el.tabIndex;
            const isFocusable = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName);
            return tabIndex >= 0 || isFocusable;
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### 视觉回归测试

使用视觉回归测试工具（如 Percy、Chromatic）捕获和比较 UI 快照：

- 在不同视口尺寸下捕获快照（mobile、tablet、desktop）
- 捕获交互状态（hover、focus、active）
- 捕获动画的关键帧
- 在 PR 中自动运行视觉回归测试

### 跨浏览器测试

使用 BrowserStack 或 Sauce Labs 在多个浏览器和设备上测试：

- Chrome（最新版本和前一版本）
- Firefox（最新版本和前一版本）
- Safari（最新版本和前一版本）
- Edge（最新版本）
- 移动浏览器（iOS Safari、Chrome Android）

### 性能测试

使用 Lighthouse 和 WebPageTest 进行性能测试：

- 首次内容绘制（FCP）< 1.5s
- 最大内容绘制（LCP）< 2.5s
- 首次输入延迟（FID）< 100ms
- 累积布局偏移（CLS）< 0.1
- 总阻塞时间（TBT）< 300ms

### 可访问性测试

使用自动化工具和手动测试：

- **自动化**: axe-core、WAVE、Lighthouse 可访问性审计
- **手动测试**:
  - 仅使用键盘导航整个网站
  - 使用屏幕阅读器（NVDA、JAWS、VoiceOver）测试
  - 测试颜色对比度
  - 测试 prefers-reduced-motion 支持

### 测试覆盖率目标

- 单元测试代码覆盖率 > 80%
- 所有正确性属性都有对应的基于属性测试
- 所有关键用户流程都有端到端测试
- 所有主要浏览器都通过跨浏览器测试
- Lighthouse 可访问性得分 > 95
