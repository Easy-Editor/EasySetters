# @easy-editor/setters

Official setters library for EasyEditor - A collection of property setter components for the visual low-code editor.

## 📦 Included Setters

### Basic Setters
- **StringSetter** - Text input setter
- **NumberSetter** - Number input setter with min/max/step support
- **ColorSetter** - Color picker setter
- **NodeIdSetter** - Display node ID and component title
- **RectSetter** - Rectangle position and size setter (X, Y, W, H)
- **SwitchSetter** - Boolean toggle switch
- **UploadSetter** - File upload setter with preview

### Group Setters
- **CollapseSetter** - Collapsible group container
- **TabSetter** - Tabbed group container

## 🚀 Installation

```bash
npm install @easy-editor/setters
# or
pnpm add @easy-editor/setters
```

## 📖 Usage

### Import All Setters

```typescript
import { setterMap } from '@easy-editor/setters'

// Register all setters at once
Object.entries(setterMap).forEach(([name, setter]) => {
  editor.setters.register(name, setter)
})
```

### Import Individual Setters

```typescript
import { StringSetter, NumberSetter, ColorSetter } from '@easy-editor/setters'

// Register individually
editor.setters.register('StringSetter', StringSetter)
editor.setters.register('NumberSetter', NumberSetter)
editor.setters.register('ColorSetter', ColorSetter)
```

### Import Specific Setter

```typescript
import StringSetter from '@easy-editor/setters/StringSetter'

editor.setters.register('StringSetter', StringSetter)
```

### Via CDN (UMD)

```html
<script src="https://unpkg.com/@easy-editor/setters@latest/dist/index.min.js"></script>
<script>
  // All setters are available at window.$EasyEditor.setters
  const { StringSetter, NumberSetter, ColorSetter } = window.$EasyEditor.setters
  
  // Or use the setterMap
  const setterMap = window.$EasyEditor.setters.setterMap
</script>
```

## 🎨 Setter Examples

### StringSetter

```typescript
{
  name: 'title',
  title: 'Title',
  setter: 'StringSetter',
  extraProps: {
    placeholder: 'Enter title...',
    suffix: 'px',
  },
}
```

### NumberSetter

```typescript
{
  name: 'fontSize',
  title: 'Font Size',
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
  title: 'Color',
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
  title: 'Position & Size',
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
  title: 'Visible',
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
  title: 'Image',
  setter: 'UploadSetter',
  extraProps: {
    accept: '.jpg,.jpeg,.png,.gif',
    maxSize: 5 * 1024 * 1024, // 5MB
  },
}
```

### CollapseSetter (Group)

```typescript
{
  type: 'group',
  title: 'Advanced Settings',
  setter: {
    componentName: 'CollapseSetter',
    props: {
      icon: true,
    },
  },
  items: [
    // ... nested field configs
  ],
}
```

### TabSetter (Group)

```typescript
{
  type: 'group',
  title: 'Settings',
  setter: 'TabSetter',
  items: [
    {
      type: 'group',
      key: 'basic',
      title: 'Basic',
      items: [/* ... */],
    },
    {
      type: 'group',
      key: 'advanced',
      title: 'Advanced',
      items: [/* ... */],
    },
  ],
}
```

## 🔧 TypeScript Support

All setters are fully typed with TypeScript:

```typescript
import type { StringSetterProps, NumberSetterProps, ColorSetterProps, UploadValue } from '@easy-editor/setters'
```

## 📦 Package Exports

The package supports multiple import methods:

- **Default**: `import setterMap from '@easy-editor/setters'`
- **Named**: `import { StringSetter, NumberSetter } from '@easy-editor/setters'`
- **Specific**: `import StringSetter from '@easy-editor/setters/StringSetter'`

## 🌐 CDN Usage

### unpkg

```html
<script src="https://unpkg.com/@easy-editor/setters@latest/dist/index.min.js"></script>
```

### jsdelivr

```html
<script src="https://cdn.jsdelivr.net/npm/@easy-editor/setters@latest/dist/index.min.js"></script>
```

## 🎯 Features

- ✅ **9 Built-in Setters** - Covers most common property types
- ✅ **TypeScript Support** - Fully typed with IntelliSense
- ✅ **Multiple Import Methods** - Use all or individual setters
- ✅ **CDN Ready** - UMD build for browser usage
- ✅ **Zero Dependencies** - Only peer dependencies (React, @easy-editor/core)
- ✅ **Lightweight** - Small bundle size with tree-shaking support
- ✅ **Customizable** - Pure inline styles, no CSS dependencies

## 📄 License

MIT © JinSo

## 🔗 Related Projects

- [EasyEditor](https://github.com/Easy-Editor/EasyEditor) - Core editor
- [EasyMaterials](https://github.com/Easy-Editor/EasyMaterials) - Official materials library

## 💬 Support

If you have any questions or suggestions, please submit an [Issue](https://github.com/Easy-Editor/EasySetters/issues).
