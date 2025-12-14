# EasySetters

[English](./README.md) | 简体中文

官方设置器库 for EasyEditor - 可视化低代码编辑器的属性设置器组件集合

## 📦 包含的设置器

### 基础设置器
- **StringSetter** - 字符串输入设置器
- **NumberSetter** - 数字输入设置器，支持 min/max/step
- **ColorSetter** - 颜色选择设置器
- **NodeIdSetter** - 显示节点 ID 和组件标题
- **RectSetter** - 矩形位置和尺寸设置器（X, Y, W, H）
- **SwitchSetter** - 布尔值开关设置器
- **UploadSetter** - 文件上传设置器，支持预览

### 分组设置器
- **CollapseSetter** - 可折叠分组容器
- **TabSetter** - 选项卡分组容器

## 🚀 安装

```bash
npm install @easy-editor/setters
# 或
pnpm add @easy-editor/setters
```

## 📖 使用方式

### 导入所有设置器

```typescript
import { setterMap } from '@easy-editor/setters'

// 一次性注册所有设置器
Object.entries(setterMap).forEach(([name, setter]) => {
  editor.setters.register(name, setter)
})
```

### 导入单个设置器

```typescript
import { StringSetter, NumberSetter, ColorSetter } from '@easy-editor/setters'

// 单独注册
editor.setters.register('StringSetter', StringSetter)
editor.setters.register('NumberSetter', NumberSetter)
editor.setters.register('ColorSetter', ColorSetter)
```

### 按需导入特定设置器

```typescript
import StringSetter from '@easy-editor/setters/StringSetter'

editor.setters.register('StringSetter', StringSetter)
```

### 通过 CDN（UMD）

```html
<script src="https://unpkg.com/@easy-editor/setters@latest/dist/index.min.js"></script>
<script>
  // 所有设置器都挂载在 window.$EasyEditor.setters
  const { StringSetter, NumberSetter, ColorSetter } = window.$EasyEditor.setters
  
  // 或使用 setterMap
  const setterMap = window.$EasyEditor.setters.setterMap
</script>
```

## 🎨 设置器示例

### StringSetter

```typescript
{
  name: 'title',
  title: '标题',
  setter: 'StringSetter',
  extraProps: {
    placeholder: '请输入标题...',
    suffix: 'px',
  },
}
```

### NumberSetter

```typescript
{
  name: 'fontSize',
  title: '字体大小',
  setter: 'NumberSetter',
  extraProps: {
    min: 12,
    max: 72,
    step: 2,
    suffix: 'px',
  },
}
```

### ColorSetter

```typescript
{
  name: 'color',
  title: '颜色',
  setter: 'ColorSetter',
  extraProps: {
    disableAlpha: false,
  },
}
```

### RectSetter

```typescript
{
  name: 'rect',
  title: '位置尺寸',
  setter: 'RectSetter',
  extraProps: {
    getValue(target) {
      return target.getExtraPropValue('$dashboard.rect')
    },
    setValue(target, value) {
      target.setExtraPropValue('$dashboard.rect', value)
    },
  },
}
```

### SwitchSetter

```typescript
{
  name: 'visible',
  title: '显示',
  setter: 'SwitchSetter',
  extraProps: {
    defaultValue: true,
  },
}
```

### UploadSetter

```typescript
{
  name: 'image',
  title: '图片',
  setter: 'UploadSetter',
  extraProps: {
    accept: '.jpg,.jpeg,.png,.gif',
    maxSize: 5 * 1024 * 1024, // 5MB
  },
}
```

### CollapseSetter（分组）

```typescript
{
  type: 'group',
  title: '高级设置',
  setter: {
    componentName: 'CollapseSetter',
    props: {
      icon: true,
    },
  },
  items: [
    // ... 嵌套的字段配置
  ],
}
```

### TabSetter（分组）

```typescript
{
  type: 'group',
  title: '设置',
  setter: 'TabSetter',
  items: [
    {
      type: 'group',
      key: 'basic',
      title: '基本',
      items: [/* ... */],
    },
    {
      type: 'group',
      key: 'advanced',
      title: '高级',
      items: [/* ... */],
    },
  ],
}
```

## 🔧 TypeScript 支持

所有设置器都提供完整的 TypeScript 类型支持：

```typescript
import type { StringSetterProps, NumberSetterProps, ColorSetterProps, UploadValue } from '@easy-editor/setters'
```

## 📦 包导出方式

该包支持多种导入方式：

- **默认导出**: `import setterMap from '@easy-editor/setters'`
- **命名导出**: `import { StringSetter, NumberSetter } from '@easy-editor/setters'`
- **特定导出**: `import StringSetter from '@easy-editor/setters/StringSetter'`

## 🌐 CDN 使用

### unpkg

```html
<script src="https://unpkg.com/@easy-editor/setters@latest/dist/index.min.js"></script>
```

### jsdelivr

```html
<script src="https://cdn.jsdelivr.net/npm/@easy-editor/setters@latest/dist/index.min.js"></script>
```

## 🎯 特性

- ✅ **9 个内置设置器** - 覆盖大多数常见属性类型
- ✅ **TypeScript 支持** - 完整的类型定义和智能提示
- ✅ **多种导入方式** - 可全量或按需导入
- ✅ **CDN 就绪** - UMD 构建支持浏览器直接使用
- ✅ **零依赖** - 仅有对等依赖（React, @easy-editor/core）
- ✅ **轻量级** - 小体积，支持 Tree-shaking
- ✅ **可定制** - 纯内联样式，无 CSS 依赖

## 📄 许可证

MIT © JinSo

## 🔗 相关项目

- [EasyEditor](https://github.com/Easy-Editor/EasyEditor) - 核心编辑器
- [EasyMaterials](https://github.com/Easy-Editor/EasyMaterials) - 官方物料库

## 💬 支持

如有问题或建议，请提交 [Issue](https://github.com/Easy-Editor/EasySetters/issues)。

