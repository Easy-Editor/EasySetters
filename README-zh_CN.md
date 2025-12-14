# EasySetters

[English](./README.md) | 简体中文

官方设置器库 for EasyEditor - 可视化低代码编辑器的设置器组件集合

## 📦 包含的设置器

一个统一的包 `@easy-editor/setters-basic` 包含：

### 基础设置器 (7个)
- **StringSetter** - 字符串输入设置器
- **NumberSetter** - 数字输入设置器
- **ColorSetter** - 颜色选择设置器
- **NodeIdSetter** - 节点 ID 显示设置器
- **RectSetter** - 矩形位置尺寸设置器
- **SwitchSetter** - 开关切换设置器
- **UploadSetter** - 文件上传设置器

### 分组设置器 (2个)
- **CollapseSetter** - 折叠面板设置器
- **TabSetter** - 标签页设置器

## 🚀 快速开始

### 安装

```bash
# 使用 npm
npm install @easy-editor/setters-basic

# 使用 pnpm
pnpm add @easy-editor/setters-basic
```

### 使用

#### 方式 1：全量导入（开发环境推荐）

```typescript
import {
  StringSetter,
  NumberSetter,
  ColorSetter,
  NodeIdSetter,
  RectSetter,
  SwitchSetter,
  UploadSetter,
  CollapseSetter,
  TabSetter,
} from '@easy-editor/setters-basic'

// 批量注册
const setters = {
  StringSetter,
  NumberSetter,
  ColorSetter,
  NodeIdSetter,
  RectSetter,
  SwitchSetter,
  UploadSetter,
  CollapseSetter,
  TabSetter,
}

Object.entries(setters).forEach(([name, component]) => {
  editor.setters.register(name, component)
})
```

#### 方式 2：按需导入（生产环境推荐）

```typescript
// 只导入需要的设置器
import StringSetter from '@easy-editor/setters-basic/StringSetter'
import NumberSetter from '@easy-editor/setters-basic/NumberSetter'
import ColorSetter from '@easy-editor/setters-basic/ColorSetter'

editor.setters.register('StringSetter', StringSetter)
editor.setters.register('NumberSetter', NumberSetter)
editor.setters.register('ColorSetter', ColorSetter)
```

#### 方式 3：通过 CDN

```html
<script src="https://unpkg.com/@easy-editor/setters-basic@latest/dist/index.min.js"></script>
<script>
  // 从全局变量访问所有 setter
  const { StringSetter, NumberSetter, ColorSetter } = window.EasyEditorSetters
</script>
```

#### 方式 4：动态加载（与 EasyEditor Dashboard 配合）

```typescript
import { RemoteSetterManager } from '@/editor/setter-loader'

// 配置要加载的设置器
const settersConfig = [
  {
    package: '@easy-editor/setters-basic',
    version: 'latest',
    globalName: 'EasyEditorSetters',
    enabled: true,
  },
]

// 批量加载所有 setter
await RemoteSetterManager.loadMultiple(settersConfig)
```

## 🏗️ 项目结构

```
EasySetters/
├── packages/
│   ├── shared/              # 共享类型和工具（内部包）
│   └── setters/             # 统一的设置器包
│       ├── src/
│       │   ├── basic/      # 7 个基础设置器
│       │   ├── group/      # 2 个分组设置器
│       │   └── index.tsx   # 统一导出
│       └── package.json
└── pnpm-workspace.yaml
```

## 🔧 开发

### 安装依赖

```bash
pnpm install
```

### 构建所有包

```bash
pnpm -r --filter "./packages/**" run build
```

### 构建设置器包

```bash
cd packages/setters
pnpm build
```

### 格式化代码

```bash
pnpm fix
```

### 检查代码

```bash
pnpm check
```

## 📖 文档

详细文档请查看：[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

## 🎯 设计理念

### 为什么是一个统一包？

与 `EasyMaterials`（物料库）不同，设置器采用统一包的方式有以下优势：

1. **更小的体积**：9 个 setter 打包在一起，去重共享代码，总体积更小
2. **简化依赖管理**：只需安装一个包，不需要管理多个包的版本
3. **更好的 Tree-shaking**：现代打包工具可以自动按需引入
4. **开发体验更好**：一次导入即可使用所有 setter
5. **CDN 加载更高效**：加载一次即可使用所有 setter

## 🤝 贡献

欢迎贡献新的设置器或改进现有设置器！请查看主 README 了解如何添加新设置器。

## 📄 许可证

MIT © JinSo

## 🔗 相关项目

- [EasyEditor](https://github.com/Easy-Editor/EasyEditor) - 核心编辑器
- [EasyMaterials](https://github.com/Easy-Editor/EasyMaterials) - 官方物料库

## 💬 支持

如有问题或建议，请提交 [Issue](https://github.com/Easy-Editor/EasySetters/issues)
