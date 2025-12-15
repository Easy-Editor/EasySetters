# EasySetters

官方设置器库 for EasyEditor - 可视化低代码编辑器的属性设置器组件集合

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ 特性

- 🎨 **现代化 UI** - 基于 shadcn/ui + Tailwind CSS v4
- 📦 **统一打包** - 所有设置器在一个包中，支持按需导入
- 🌗 **暗色模式** - 完整的明暗主题支持
- 🔧 **TypeScript** - 完整的类型定义
- 🚀 **多格式支持** - UMD、ESM、CJS
- 📡 **CDN 就绪** - 支持 unpkg 和 jsdelivr
- 🎯 **零配置** - 开箱即用

## 📦 包含的设置器

### @easy-editor/setters (统一包)

**基础设置器 (7个)**：
- 🔤 `StringSetter` - 字符串输入（带后缀支持）
- 🔢 `NumberSetter` - 数字输入（带后缀支持）
- 🎨 `ColorSetter` - 颜色选择器（支持透明度）
- 🆔 `NodeIdSetter` - 节点 ID 显示
- 📐 `RectSetter` - 矩形位置/尺寸（X, Y, W, H）
- 🔘 `SwitchSetter` - 开关切换
- 📤 `UploadSetter` - 文件上传（图片预览）

**分组设置器 (2个)**：
- 📁 `CollapseSetter` - 可折叠分组容器
- 📑 `TabSetter` - 选项卡分组容器

**工具导出**：
- `SetterGroup` - 设置器分组枚举
- `SetterMetadata` - 设置器元数据类型
- `customFieldItem` - 自定义字段渲染器

## 🚀 快速开始

### 安装依赖

```bash
# 安装根依赖
pnpm install

# 安装 setters 包依赖
cd packages/setters
pnpm install
```

### 构建

```bash
# 在 packages/setters 目录下
pnpm build

# 或者完整构建（包括类型检查）
pnpm build        # 清理 + 打包 + 类型生成
pnpm build:js     # 仅打包 JS
pnpm types        # 仅生成类型
```

### 开发

```bash
# 代码格式化
pnpm format

# Lint 检查
pnpm lint
```

## 📖 使用方式

### NPM 安装

```bash
npm install @easy-editor/setters @easy-editor/core
# 或
pnpm add @easy-editor/setters @easy-editor/core
```

### 方式1：全量导入（推荐）

```typescript
import { setterMap } from '@easy-editor/setters'

// 注册所有设置器
Object.entries(setterMap).forEach(([name, setter]) => {
  editor.setters.register(name, setter)
})
```

### 方式2：按需导入

```typescript
import {
  StringSetter,
  NumberSetter,
  ColorSetter,
  type StringSetterProps,
  type NumberSetterProps
} from '@easy-editor/setters'

// 注册单个设置器
editor.setters.register('StringSetter', StringSetter)
editor.setters.register('NumberSetter', NumberSetter)
```

### 方式3：导入工具

```typescript
import {
  SetterGroup,
  type SetterMetadata,
  customFieldItem
} from '@easy-editor/setters'

// 使用设置器分组
const basicGroup = SetterGroup.BASIC

// 使用自定义字段渲染器
const fieldRenderer = customFieldItem(field, setter)
```

### 方式4：CDN 加载

```html
<!-- 加载依赖 -->
<script crossorigin src="https://unpkg.com/react@19/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@19/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@easy-editor/core@latest/dist/index.min.js"></script>

<!-- 加载设置器 -->
<script src="https://unpkg.com/@easy-editor/setters@latest/dist/index.min.js"></script>

<script>
  // 从 window.$EasyEditor.setters 访问
  const { setterMap } = window.$EasyEditor.setters.EasyEditorSetters

  // 使用设置器
  console.log(setterMap) // { StringSetter, NumberSetter, ... }
</script>
```

### 使用示例

```typescript
import { StringSetter, NumberSetter, ColorSetter } from '@easy-editor/setters'
import type { SettingField } from '@easy-editor/core'

// 在 EasyEditor 中配置
const settings: SettingField[] = [
  {
    id: 'text',
    title: '文本',
    setter: StringSetter,
    config: {
      key: 'text',
      extraProps: {
        placeholder: '请输入文本',
        suffix: 'px'
      }
    }
  },
  {
    id: 'fontSize',
    title: '字号',
    setter: NumberSetter,
    config: {
      key: 'fontSize',
      extraProps: {
        suffix: 'px'
      }
    }
  },
  {
    id: 'color',
    title: '颜色',
    setter: ColorSetter,
    config: {
      key: 'color',
      extraProps: {
        disableAlpha: false
      }
    }
  }
]
```

## 🏗️ 项目结构

```
EasySetters/
└── packages/
    └── setters/                    # 统一包：包含所有设置器
        ├── src/
        │   ├── basic/              # 基础设置器（7个）
        │   │   ├── string-setter/
        │   │   │   └── index.tsx
        │   │   ├── number-setter/
        │   │   │   └── index.tsx
        │   │   ├── color-setter/
        │   │   │   └── index.tsx
        │   │   ├── node-id-setter/
        │   │   │   └── index.tsx
        │   │   ├── rect-setter/
        │   │   │   └── index.tsx
        │   │   ├── switch-setter/
        │   │   │   └── index.tsx
        │   │   └── upload-setter/
        │   │       └── index.tsx
        │   │
        │   ├── group/              # 分组设置器（2个）
        │   │   ├── collapse-setter/
        │   │   │   └── index.tsx
        │   │   └── tab-setter/
        │   │       └── index.tsx
        │   │
        │   ├── components/         # UI 组件（shadcn/ui）
        │   │   └── ui/
        │   │       ├── button.tsx
        │   │       ├── input.tsx
        │   │       ├── label.tsx
        │   │       ├── popover.tsx
        │   │       ├── switch.tsx
        │   │       ├── tabs.tsx
        │   │       └── collapsible.tsx
        │   │
        │   ├── lib/
        │   │   └── utils.ts        # 工具函数（cn）
        │   │
        │   ├── types.ts            # 类型定义
        │   ├── custom-field-item.tsx # 字段渲染器
        │   ├── styles.css          # Tailwind CSS
        │   └── index.ts            # 统一导出
        │
        ├── dist/                   # 构建产物
        │   ├── index.js            # UMD
        │   ├── index.esm.js        # ESM
        │   ├── index.cjs           # CommonJS
        │   ├── index.min.js        # UMD (minified)
        │   └── index.d.ts          # TypeScript 类型
        │
        ├── components.json         # shadcn/ui 配置
        ├── tailwind.config.js      # Tailwind 配置
        ├── postcss.config.cjs      # PostCSS 配置
        ├── rollup.config.js        # Rollup 配置
        ├── tsconfig.json           # TypeScript 配置
        ├── package.json
        └── README.md
```

## 🎨 技术栈

### 核心依赖

- **React** 18 | 19
- **TypeScript** 5.7+
- **@easy-editor/core** - 核心类型定义

### UI 框架

- **Tailwind CSS** v4.0.6 - 新一代语法
- **shadcn/ui** - 高质量 UI 组件
- **Radix UI** - 无障碍原语组件
- **Lucide React** - 图标库

### 构建工具

- **Rollup** - 多格式打包（UMD/ESM/CJS）
- **Babel** - JSX/TypeScript 转译
- **PostCSS** - CSS 处理
- **Terser** - 代码压缩

### 样式特色

```css
/* Tailwind v4 新语法 */
@import "tailwindcss";
@plugin "tailwindcss-animate";
@custom-variant dark (&:is(.dark *));

/* 自定义主题变量 */
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* ... 更多变量 */
}
```

## 🎯 设计理念

### 与 EasyMaterials 的区别

| 特性 | EasyMaterials | EasySetters |
|------|---------------|-------------|
| 组织方式 | 每个物料一个包 | 所有设置器在一个包 |
| 包数量 | 多个独立包 | 1 个统一包 |
| 文件结构 | 物料名/src/ | setter-name/index.tsx |
| 导入方式 | 按包导入 | 全量或按需导入 |
| UI 框架 | 原生样式 | Tailwind + shadcn/ui |
| 适用场景 | 大型组件库 | 小型工具集 |

### 为什么统一打包？

1. ✅ **设置器数量少** - 仅 9 个设置器，统一管理更高效
2. ✅ **频繁协同使用** - 大多数项目需要多个设置器
3. ✅ **简化依赖管理** - 一个包，一个版本号
4. ✅ **Tree-shaking 友好** - 支持按需导入，不增加包体积
5. ✅ **更好的 DX** - 开发者体验优先，一次安装全部搞定
6. ✅ **统一设计语言** - 所有设置器共享同一套 UI 组件

## 🔧 开发指南

### 添加新设置器

#### 1. 创建设置器文件夹

```bash
cd packages/setters/src/basic
mkdir new-setter
cd new-setter
```

#### 2. 创建 index.tsx

```typescript
// packages/setters/src/basic/new-setter/index.tsx
import { Input } from '../../components/ui/input'
import { cn } from '../../lib/utils'
import type { SetterProps } from '@easy-editor/core'

export interface NewSetterProps extends SetterProps<string> {
  placeholder?: string
}

const NewSetter = (props: NewSetterProps) => {
  const { value, initialValue, placeholder, onChange } = props

  return (
    <div className='w-full'>
      <Input
        value={value || initialValue || ''}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className='h-8 px-2 py-[5px] text-xs'
      />
    </div>
  )
}

export default NewSetter
```

#### 3. 更新 index.ts

```typescript
// packages/setters/src/index.ts

// 添加导出
export { default as NewSetter } from './basic/new-setter'

// 添加类型导出
export type { NewSetterProps } from './basic/new-setter'

// 添加到 setterMap
import NewSetter from './basic/new-setter'

export const setterMap = {
  // ... 现有设置器
  NewSetter,
}
```

#### 4. 构建和测试

```bash
pnpm build
pnpm test-types
```

### 添加新 UI 组件

使用 shadcn/ui CLI：

```bash
cd packages/setters
npx shadcn@latest add [component-name]
```

示例：
```bash
npx shadcn@latest add select     # 添加 Select 组件
npx shadcn@latest add slider     # 添加 Slider 组件
npx shadcn@latest add checkbox   # 添加 Checkbox 组件
```

### 样式开发

使用 Tailwind CSS：

```tsx
// ✅ 推荐：使用 Tailwind 类
<div className='flex items-center gap-2 rounded-md border p-2'>
  <Input className='h-8 text-xs' />
</div>

// ✅ 推荐：使用 cn 工具合并类名
<Input className={cn('h-8 text-xs', error && 'border-destructive')} />

// ❌ 避免：内联样式
<div style={{ display: 'flex', gap: '8px' }}>
```

### 类型安全

```typescript
// ✅ 导出 Props 类型
export interface NewSetterProps extends SetterProps<string> {
  placeholder?: string
}

// ✅ 使用泛型
const NewSetter = (props: NewSetterProps) => { ... }

// ✅ 导出类型
export type { NewSetterProps } from './basic/new-setter'
```

## 📦 构建产物

构建后会生成多种格式：

```
dist/
├── index.js          # UMD (浏览器/CDN)
├── index.esm.js      # ESM (现代打包工具)
├── index.cjs         # CommonJS (Node.js)
├── index.min.js      # UMD 压缩版 (生产环境)
├── index.d.ts        # TypeScript 类型定义
└── *.map             # Source Maps
```

### 各格式说明

| 格式 | 用途 | 导入方式 |
|------|------|----------|
| **UMD** | 浏览器直接引入 | `<script src="...">` |
| **ESM** | Vite/Webpack/Rollup | `import { ... } from '...'` |
| **CJS** | Node.js/旧版工具 | `const { ... } = require('...')` |
| **Minified** | 生产环境 CDN | 自动使用（unpkg/jsdelivr） |

## 🌐 CDN 使用

### unpkg (推荐)

```html
<!-- 最新版本 -->
<script src="https://unpkg.com/@easy-editor/setters@latest/dist/index.min.js"></script>

<!-- 指定版本 -->
<script src="https://unpkg.com/@easy-editor/setters@0.0.1/dist/index.min.js"></script>
```

### jsdelivr (备用)

```html
<!-- 最新版本 -->
<script src="https://cdn.jsdelivr.net/npm/@easy-editor/setters@latest/dist/index.min.js"></script>

<!-- 指定版本 -->
<script src="https://cdn.jsdelivr.net/npm/@easy-editor/setters@0.0.1/dist/index.min.js"></script>
```

### 完整示例

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>EasyEditor Setters Demo</title>
</head>
<body>
  <!-- React -->
  <script crossorigin src="https://unpkg.com/react@19/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@19/umd/react-dom.production.min.js"></script>

  <!-- EasyEditor Core -->
  <script src="https://unpkg.com/@easy-editor/core@latest/dist/index.min.js"></script>

  <!-- EasySetters -->
  <script src="https://unpkg.com/@easy-editor/setters@latest/dist/index.min.js"></script>

  <script>
    // 访问设置器
    const { setterMap } = window.$EasyEditor.setters.EasyEditorSetters
    console.log('Loaded setters:', Object.keys(setterMap))
  </script>
</body>
</html>
```

## 📦 发布流程

```bash
# 1. 更新版本号
cd packages/setters
npm version patch  # 或 minor / major

# 2. 构建
pnpm build

# 3. 验证构建产物
ls -lh dist/

# 4. 测试类型
pnpm test-types

# 5. 发布到 NPM
npm publish

# 6. 验证发布
npm view @easy-editor/setters
```

### 版本管理

遵循 [语义化版本](https://semver.org/lang/zh-CN/)：

- `patch` (0.0.x) - Bug 修复
- `minor` (0.x.0) - 新增功能（向后兼容）
- `major` (x.0.0) - 破坏性变更

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范

- 使用 **Biome** 进行格式化和 Lint
- 遵循 **TypeScript** 严格模式
- 使用 **Tailwind CSS** 进行样式开发
- 为新功能添加类型定义
- 保持组件简洁和可复用

## 📊 包信息

### 依赖关系

```json
{
  "peerDependencies": {
    "@easy-editor/core": "*",
    "react": "^18 || ^19",
    "react-dom": "^18 || ^19"
  },
  "dependencies": {
    "@radix-ui/*": "^1.x",
    "@uiw/react-color-sketch": "^2.9.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.561.0",
    "tailwind-merge": "^3.4.0"
  }
}
```

### 包大小

| 格式 | 大小 (gzip) | 说明 |
|------|-------------|------|
| ESM | ~XX KB | 现代打包工具 |
| CJS | ~XX KB | Node.js |
| UMD | ~XX KB | 浏览器 |
| UMD (min) | ~XX KB | 生产环境 |

*实际大小取决于构建产物，上表为估算值*

## 🔗 相关链接

### 官方项目

- 📝 [EasyEditor](https://github.com/Easy-Editor/EasyEditor) - 核心编辑器
- 🧩 [EasyMaterials](https://github.com/Easy-Editor/EasyMaterials) - 官方物料库
- ⚙️ [EasySetters](https://github.com/Easy-Editor/EasySetters) - 官方设置器库（本项目）

### 技术文档

- [React 文档](https://react.dev/)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

### 工具

- [Biome](https://biomejs.dev/) - 格式化和 Lint
- [Rollup](https://rollupjs.org/) - 打包工具
- [pnpm](https://pnpm.io/) - 包管理器

## 📄 许可证

MIT © JinSo

---

## 💬 支持与反馈

如有问题、建议或需要帮助，欢迎：

- 🐛 [提交 Issue](https://github.com/Easy-Editor/EasySetters/issues)
- 💡 [功能建议](https://github.com/Easy-Editor/EasySetters/discussions)
- 📧 联系作者：kimjinso@qq.com

**感谢使用 EasySetters！** ⭐

如果这个项目对你有帮助，请给我们一个 Star ⭐️
