# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EasySetters is the official setters library for EasyEditor, providing property configuration UI components for the visual editor. Unlike EasyMaterials (multiple packages), EasySetters uses a **unified package approach** - all setters are bundled in a single npm package `@easy-editor/setters`.

## Build & Development Commands

```bash
# Install dependencies (pnpm 9.12.2+, node >= 18.0.0)
pnpm install

# Navigate to setters package
cd packages/setters

# Check code quality (Ultracite)
pnpm check

# Auto-fix code issues
pnpm fix

# Build package
pnpm build

# Build steps (can run individually)
pnpm build:clean    # Clean dist/
pnpm build:js       # Bundle with Rollup + PostCSS

# Generate TypeScript declarations
pnpm types

# Type checking only
pnpm test-types

# Format code
pnpm format

# Lint code
pnpm lint
```

### Publishing Workflow (via Changesets)

```bash
# At repository root
pnpm pub:changeset    # Create changeset for version bump
pnpm pub:version      # Apply changesets and bump versions
pnpm pub:release      # Publish to npm
```

## High-Level Architecture

### Unified Package Approach

**Unlike EasyMaterials**, this repository uses a **single package strategy**:

```
packages/
└── setters/                    # @easy-editor/setters (single package)
    ├── src/
    │   ├── basic/              # 7 basic setters
    │   │   ├── string-setter/
    │   │   ├── number-setter/
    │   │   ├── color-setter/
    │   │   ├── node-id-setter/
    │   │   ├── rect-setter/
    │   │   ├── switch-setter/
    │   │   └── upload-setter/
    │   │
    │   ├── group/              # 2 group setters
    │   │   ├── collapse-setter/
    │   │   └── tab-setter/
    │   │
    │   ├── styles/
    │   │   └── global.css      # Tailwind CSS v4
    │   │
    │   ├── lib/
    │   │   └── utils.ts        # Utility functions (cn)
    │   │
    │   ├── types.ts            # Common types
    │   ├── custom-field-item.tsx  # Field renderer
    │   ├── components.json     # shadcn/ui config
    │   └── index.ts            # Main entry point
    │
    └── dist/                   # Build output
        ├── index.js            # UMD
        ├── index.esm.js        # ESM
        ├── index.cjs           # CommonJS
        ├── index.min.js        # UMD minified
        └── index.d.ts          # TypeScript declarations
```

### Why Unified Package?

**Key Differences from EasyMaterials**:

| Aspect | EasyMaterials | EasySetters |
|--------|---------------|-------------|
| **Package Count** | Multiple (1 per material) | Single (all setters) |
| **Use Case** | Large component libraries | Small utility collections |
| **Installation** | Per-material or batch | One package, all setters |
| **Bundle Strategy** | Independent packages | Tree-shakeable exports |
| **Update Frequency** | Material-specific | All together |

**Advantages**:
1. **Simpler dependency management** - One version number
2. **Better DX** - Install once, use all setters
3. **Shared UI components** - All setters use same shadcn/ui components
4. **Consistent styling** - Single Tailwind config
5. **Tree-shaking friendly** - Modern bundlers remove unused setters

### Included Setters

**Basic Setters (7)**:
1. `StringSetter` - Text input with optional suffix
2. `NumberSetter` - Numeric input with optional suffix
3. `ColorSetter` - Color picker with alpha support
4. `NodeIdSetter` - Node ID display (read-only)
5. `RectSetter` - Rectangle editor (X, Y, Width, Height)
6. `SwitchSetter` - Toggle switch
7. `UploadSetter` - File upload with image preview

**Group Setters (2)**:
1. `CollapseSetter` - Collapsible container for grouping properties
2. `TabSetter` - Tab container for organizing properties

## Setter Structure

Each setter is a React component in its own directory:

```
basic/string-setter/
└── index.tsx          # Setter implementation + types
```

**Setter Implementation Pattern**:
```typescript
import { Input } from '@/components/ui/input'
import type { SetterProps } from '@easy-editor/core'

export interface StringSetterProps extends SetterProps<string> {
  placeholder?: string
  suffix?: string
}

const StringSetter = (props: StringSetterProps) => {
  const { value, initialValue, placeholder, suffix, onChange } = props

  return (
    <div className='flex items-center gap-1'>
      <Input
        value={value || initialValue || ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {suffix && <span>{suffix}</span>}
    </div>
  )
}

export default StringSetter
```

**Key Points**:
- Extends `SetterProps<T>` from `@easy-editor/core`
- Receives `value`, `initialValue`, `onChange` from EasyEditor
- Can accept custom props via `extraProps` in material configuration
- Uses shadcn/ui components for consistency

## Build System

Uses **Rollup** with multiple output formats:

**Build Outputs** (from `src/index.ts`):
- `index.js` - UMD (browser/CDN)
- `index.esm.js` - ESM (modern bundlers like Vite/Webpack)
- `index.cjs` - CommonJS (Node.js/legacy tools)
- `index.min.js` - UMD minified (production CDN)

**TypeScript Declarations**:
- Generated with `tsc`
- Single `index.d.ts` file with all types

**External Dependencies**:
- `react`, `react-dom`, `@easy-editor/core` marked as external
- Radix UI primitives (peer dependencies, not bundled)
- Reduces bundle size, avoids version conflicts

**CSS Processing**:
- Tailwind CSS v4 compiled with PostCSS
- Injected into bundle via `rollup-plugin-postcss`
- No separate CSS file needed

## Styling with Tailwind CSS v4

Uses **Tailwind CSS v4** with modern syntax:

**Global CSS** (`src/styles/global.css`):
```css
@import "tailwindcss";
@plugin "tailwindcss-animate";
@custom-variant dark (&:is(.dark *));

:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* ... more CSS variables */
}
```

**Features**:
- CSS variables for theming
- Dark mode support via `dark:` variant
- shadcn/ui integration
- Responsive design utilities

## shadcn/ui Integration

**Configuration** (`components.json`):
- Style: `new-york`
- Base color: `neutral`
- CSS variables: `true`
- Icon library: `lucide-react`

**Adding Components**:
```bash
cd packages/setters
npx shadcn@latest add button    # Add Button
npx shadcn@latest add select    # Add Select
npx shadcn@latest add slider    # Add Slider
```

Components are added to `src/components/ui/` (not tracked in this repo).

## Package Export Strategy

**Development** (src/):
- `package.json` "main": `"src/index.ts"`
- Used with workspace references in monorepo
- No build step during development

**Production** (dist/):
- `package.json` "publishConfig": Points to `dist/` files
- Multi-format exports (UMD/ESM/CJS)
- CSS bundled inline

**Named Exports**:
```typescript
// Full import
import { setterMap } from '@easy-editor/setters'

// Tree-shakeable imports
import { StringSetter, NumberSetter } from '@easy-editor/setters'

// Type imports
import type { StringSetterProps } from '@easy-editor/setters'

// Utilities
import { SetterGroup, customFieldItem } from '@easy-editor/setters'
```

## Usage Patterns

### Pattern 1: Full Import (Recommended)

```typescript
import { setterMap } from '@easy-editor/setters'

// Register all setters
Object.entries(setterMap).forEach(([name, setter]) => {
  editor.setters.register(name, setter)
})
```

### Pattern 2: Tree-Shaking Imports

```typescript
import {
  StringSetter,
  NumberSetter,
  ColorSetter
} from '@easy-editor/setters'

editor.setters.register('StringSetter', StringSetter)
editor.setters.register('NumberSetter', NumberSetter)
editor.setters.register('ColorSetter', ColorSetter)
```

### Pattern 3: CDN Usage

```html
<!-- Load dependencies -->
<script src="https://unpkg.com/react@19/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@19/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@easy-editor/core/dist/index.min.js"></script>

<!-- Load setters -->
<script src="https://unpkg.com/@easy-editor/setters@latest/dist/index.min.js"></script>

<script>
  const { setterMap } = window.EasyEditorSetters
  console.log(setterMap) // { StringSetter, NumberSetter, ... }
</script>
```

## Code Standards

Uses **Ultracite** (Biome preset) for strict code quality:

### Key Rules
- **Type Safety**: Explicit types, avoid `any`, extend `SetterProps<T>`
- **Modern React**: Function components, hooks, proper dependencies
- **Tailwind CSS**: Use utility classes, avoid inline styles
- **Accessibility**: Semantic HTML, ARIA attributes, keyboard navigation
- **Component Reuse**: Use shadcn/ui components, not custom implementations

### Formatting
- Single quotes
- 2-space indent
- 120 line width
- Semicolons required

Run `pnpm fix` before committing.

## Technology Stack

- **Language**: TypeScript 5.7+
- **Package Manager**: pnpm 9.12.2+
- **Build**: Rollup + Babel + PostCSS
- **UI Framework**: React 18|19
- **CSS Framework**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: lucide-react
- **Linter/Formatter**: Biome (Ultracite preset)
- **Versioning**: Changesets

## TypeScript Configuration

**tsconfig.json** - Base config:
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**tsconfig.build.json** - Type generation:
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "emitDeclarationOnly": true,
    "outDir": "./dist"
  }
}
```

**tsconfig.test.json** - Type checking:
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": true
  }
}
```

## Working with Setters

### Adding a New Setter

1. **Choose category** (basic or group):
   ```bash
   cd packages/setters/src/basic
   mkdir my-setter
   cd my-setter
   ```

2. **Create index.tsx**:
   ```typescript
   import { Input } from '@/components/ui/input'
   import type { SetterProps } from '@easy-editor/core'

   export interface MySetterProps extends SetterProps<string> {
     customProp?: string
   }

   const MySetter = (props: MySetterProps) => {
     const { value, initialValue, onChange, customProp } = props

     return (
       <Input
         value={value || initialValue || ''}
         onChange={(e) => onChange(e.target.value)}
       />
     )
   }

   export default MySetter
   ```

3. **Update src/index.ts**:
   ```typescript
   // Add export
   export { default as MySetter } from './basic/my-setter'
   export type { MySetterProps } from './basic/my-setter'

   // Add to setterMap
   import MySetter from './basic/my-setter'

   export const setterMap = {
     // ... existing setters
     MySetter,
   }
   ```

4. **Build and test**:
   ```bash
   cd packages/setters
   pnpm build
   pnpm test-types
   ```

### Modifying an Existing Setter

1. **Navigate to setter**:
   ```bash
   cd packages/setters/src/basic/string-setter
   ```

2. **Edit index.tsx** - changes are immediate in dev

3. **Test changes** in consuming application

4. **Before committing**:
   ```bash
   cd packages/setters
   pnpm fix           # Auto-fix issues
   pnpm test-types    # Verify types
   pnpm build         # Test build
   ```

### Adding shadcn/ui Components

```bash
cd packages/setters
npx shadcn@latest add select     # Add Select
npx shadcn@latest add slider     # Add Slider
npx shadcn@latest add checkbox   # Add Checkbox
```

Components appear in `src/components/ui/`.

## Integration with EasyEditor

Setters integrate with materials via `configure.ts`:

**In Material** (`@easy-editor/materials-dashboard-text`):
```typescript
// configure.ts
import { StringSetter, NumberSetter, ColorSetter } from '@easy-editor/setters'

export const configure = [
  {
    id: 'text',
    title: 'Text Content',
    setter: StringSetter,
    config: {
      key: 'text',
      extraProps: {
        placeholder: 'Enter text...',
        suffix: 'chars'
      }
    }
  },
  {
    id: 'fontSize',
    title: 'Font Size',
    setter: NumberSetter,
    config: {
      key: 'fontSize',
      extraProps: {
        suffix: 'px'
      }
    }
  }
]
```

**Setter Receives**:
- `value` - Current property value
- `initialValue` - Default value
- `onChange` - Callback to update value
- `...extraProps` - Custom props from material config

## Important Constraints

1. **All setters in one package** - Can't publish individual setters separately
2. **Shared dependencies** - All setters share same Tailwind/shadcn/ui versions
3. **Bundle size matters** - Keep setters lightweight (tree-shaking helps)
4. **Pure components** - No side effects, state management, or external APIs
5. **Peer dependencies** - Don't bundle React, ReactDOM, or @easy-editor/core

## Common Pitfalls

- **Forgetting to export** - Add new setter to `src/index.ts` and `setterMap`
- **Missing types** - Export TypeScript interfaces for each setter
- **Inline styles** - Use Tailwind classes, not `style` prop
- **Heavy components** - Avoid large libraries (bloats bundle)
- **Breaking changes** - Changing setter props affects all consumers
- **CSS not bundled** - Run full `pnpm build` to include PostCSS output
- **Path aliases** - Use `@/` prefix for imports (configured in tsconfig)

## CDN Usage

**unpkg**:
```html
<!-- Latest version -->
<script src="https://unpkg.com/@easy-editor/setters@latest/dist/index.min.js"></script>

<!-- Specific version -->
<script src="https://unpkg.com/@easy-editor/setters@0.0.1/dist/index.min.js"></script>
```

**jsdelivr**:
```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/npm/@easy-editor/setters@latest/dist/index.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@easy-editor/setters@0.0.1/dist/index.min.js"></script>
```

**Access in Browser**:
```javascript
const { setterMap, StringSetter, NumberSetter } = window.EasyEditorSetters
```

## Package Manager

**Must use pnpm 9.12.2+** - enforced by `preinstall` script. Other package managers will fail.

## Design Philosophy

**Unified vs. Independent**:
- EasyMaterials: Independent packages (materials vary greatly in size/complexity)
- EasySetters: Unified package (setters are small, frequently used together)

**Benefits of Unified Approach**:
- ✅ Simpler installation and updates
- ✅ Consistent UI/UX across all setters
- ✅ Shared component library (shadcn/ui)
- ✅ Single source of truth for styling
- ✅ Better developer experience

**Trade-offs**:
- ❌ Can't version setters independently
- ❌ Bundle includes all setters (mitigated by tree-shaking)
- ❌ Breaking changes affect entire package

For most use cases, the unified approach is more practical for setter libraries.
