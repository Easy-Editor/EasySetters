import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import { terser } from 'rollup-plugin-terser'
import cleanup from 'rollup-plugin-cleanup'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pkg from './package.json' with { type: 'json' }

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 外部依赖（不打包进设置器）
const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  '@easy-editor/core',
  '@radix-ui/react-slot',
  '@radix-ui/react-label',
  '@radix-ui/react-popover',
  '@radix-ui/react-switch',
  '@radix-ui/react-collapsible',
  '@radix-ui/react-tabs',
  '@radix-ui/react-dropdown-menu',
  '@uiw/react-color-sketch',
  'lucide-react',
]

// 路径别名插件
const aliasPlugin = alias({
  entries: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
})

// 基础插件
const basePlugins = [
  aliasPlugin,
  nodeResolve({
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  }),
  commonjs(),
  json(),
  babel({
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    exclude: 'node_modules/**',
    babelrc: false,
    babelHelpers: 'bundled',
    presets: [
      ['@babel/preset-react', { runtime: 'automatic' }],
      [
        '@babel/preset-typescript',
        {
          allowDeclareFields: true,
        },
      ],
    ],
  }),
  cleanup({
    comments: ['some', /PURE/],
    extensions: ['.js', '.ts'],
  }),
  // 忽略 CSS 导入（CSS 由 Tailwind CLI 单独构建）
  {
    name: 'ignore-css',
    resolveId(source) {
      if (source.endsWith('.css')) {
        return { id: source, external: true }
      }
      return null
    },
    load(id) {
      if (id.endsWith('.css')) {
        return ''
      }
      return null
    },
  },
]

export default [
  // ESM 构建（用于现代打包工具）
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: basePlugins,
    external,
  },
  // UMD 构建（用于 CDN 和浏览器）
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'umd',
        name: 'EasyEditorSetters',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          '@easy-editor/core': 'EasyEditorCore',
        },
        sourcemap: true,
        banner: `/* @easy-editor/setters v${pkg.version} */`,
        exports: 'named',
      },
    ],
    plugins: basePlugins,
    external,
  },
  // CJS 构建（用于 Node.js）
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: basePlugins,
    external,
  },
  // 压缩版本（用于生产环境）
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.min.js',
        format: 'umd',
        name: 'EasyEditorSetters',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          '@easy-editor/core': 'EasyEditorCore',
        },
        sourcemap: true,
        banner: `/* @easy-editor/setters v${pkg.version} (minified) */`,
        exports: 'named',
      },
    ],
    plugins: [...basePlugins, terser()],
    external,
  },
]
