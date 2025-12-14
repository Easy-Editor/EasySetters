# EasySetters

官方设置器库 for EasyEditor - 可视化低代码编辑器的属性设置器组件集合

## 📦 包含的包

### @easy-editor/setters (唯一的包)
包含所有设置器的统一包，支持全量导入或按需导入：

**基础设置器 (7个)**：
- `StringSetter` - 字符串输入
- `NumberSetter` - 数字输入
- `ColorSetter` - 颜色选择
- `NodeIdSetter` - 节点 ID 显示
- `RectSetter` - 矩形位置尺寸
- `SwitchSetter` - 开关切换
- `UploadSetter` - 文件上传

**分组设置器 (2个)**：
- `CollapseSetter` - 可折叠分组
- `TabSetter` - 选项卡分组

## 🚀 快速开始

### 安装

```bash
pnpm install
```

### 构建所有包

```bash
pnpm -r --filter "./packages/**" run build
```

### 构建单个包

```bash
cd packages/setters
pnpm build
```

## 📖 使用方式

### 方式1：全量导入

```typescript
import { setterMap } from '@easy-editor/setters'

// 注册所有设置器
Object.entries(setterMap).forEach(([name, setter]) => {
  editor.setters.register(name, setter)
})
```

### 方式2：按需导入

```typescript
import { StringSetter, NumberSetter } from '@easy-editor/setters'

editor.setters.register('StringSetter', StringSetter)
editor.setters.register('NumberSetter', NumberSetter)
```

### 方式3：特定导入

```typescript
import StringSetter from '@easy-editor/setters/StringSetter'

editor.setters.register('StringSetter', StringSetter)
```

### 方式4：CDN 加载

```html
<script src="https://unpkg.com/@easy-editor/setters@latest/dist/index.min.js"></script>
<script>
  // 从 window.$EasyEditor.setters 访问所有设置器
  const { StringSetter, setterMap } = window.$EasyEditor.setters
</script>
```

## 🏗️ 项目结构

```
EasySetters/
└── packages/
    └── setters/             # 唯一的包：包含所有设置器和类型
        ├── src/
        │   ├── basic/       # 基础设置器（7个）
        │   │   ├── StringSetter.tsx
        │   │   ├── NumberSetter.tsx
        │   │   ├── ColorSetter.tsx
        │   │   ├── NodeIdSetter.tsx
        │   │   ├── RectSetter.tsx
        │   │   ├── SwitchSetter.tsx
        │   │   └── UploadSetter.tsx
        │   │
        │   ├── group/       # 分组设置器（2个）
        │   │   ├── CollapseSetter.tsx
        │   │   └── TabSetter.tsx
        │   │
        │   ├── types.ts     # 类型定义
        │   └── index.ts     # 统一导出
        │
        ├── rollup.config.js
        ├── package.json
        └── README.md
```

## 🎨 设计特点

### 与 EasyMaterials 的区别

| 特性 | EasyMaterials | EasySetters |
|------|---------------|-------------|
| 组织方式 | 每个物料一个包 | 所有设置器在一个包 |
| 包数量 | 多个独立包 | 1 个包 |
| 导入方式 | 按包导入 | 全量或按需 |
| 适用场景 | 大型组件库 | 小型工具集 |

### 为什么这样设计？

1. **设置器数量少**：只有 9 个设置器，不需要拆分成多个包
2. **频繁一起使用**：大多数项目会使用多个设置器
3. **减少依赖管理**：一个包更容易管理版本
4. **支持按需导入**：通过导出路径支持单个导入
5. **更好的 DX**：开发者体验更好，安装一个包即可

## 🔧 开发

### 添加新设置器

1. 在 `packages/setters/src/basic/` 或 `packages/setters/src/group/` 创建新文件
2. 实现设置器组件
3. 在 `packages/setters/src/index.ts` 中导出
4. 更新 `package.json` 的 `exports` 字段
5. 构建并测试

示例：

```typescript
// packages/setters/src/basic/NewSetter.tsx
import type { SetterProps } from '@easy-editor/core'
import type { FC } from 'react'

interface NewSetterProps extends SetterProps<string> {
  // your props
}

const NewSetter: FC<NewSetterProps> = (props) => {
  // your implementation
  return <div>...</div>
}

export default NewSetter
```

```typescript
// packages/setters/src/index.ts
export { default as NewSetter } from './basic/NewSetter'

export const setterMap = {
  // ... existing setters
  NewSetter,
}
```

## 📦 发布流程

```bash
# 1. 构建包
cd packages/setters
pnpm build

# 2. 测试类型
pnpm test-types

# 3. 发布到 NPM
npm publish
```

## 🌐 CDN 使用

发布后，设置器会自动同步到 CDN：

- **unpkg**: `https://unpkg.com/@easy-editor/setters@latest/dist/index.min.js`
- **jsdelivr**: `https://cdn.jsdelivr.net/npm/@easy-editor/setters@latest/dist/index.min.js`

## 📄 许可证

MIT © JinSo

## 🔗 相关项目

- [EasyEditor](https://github.com/Easy-Editor/EasyEditor) - 核心编辑器
- [EasyMaterials](https://github.com/Easy-Editor/EasyMaterials) - 官方物料库

## 💬 支持

如有问题或建议，请提交 [Issue](https://github.com/Easy-Editor/EasySetters/issues)。
