import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import { terser } from 'rollup-plugin-terser'
import cleanup from 'rollup-plugin-cleanup'
import postcss from 'rollup-plugin-postcss'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pkg from './package.json' with { type: 'json' }

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ESM/CJS 外部依赖（npm 安装场景，依赖由用户项目提供）
const esmExternal = ['react', 'react-dom', 'react/jsx-runtime', '@easy-editor/core']

// UMD 外部依赖（CDN 场景，只排除 React 和 core，其他依赖打包进 bundle）
const umdExternal = ['react', 'react-dom', 'react/jsx-runtime', '@easy-editor/core']

// UMD 全局变量映射
const umdGlobals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react/jsx-runtime': 'jsxRuntime',
  '@easy-editor/core': 'EasyEditorCore',
}

// 路径别名插件
const aliasPlugin = alias({
  entries: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
})

// 基础插件
const basePlugins = [
  aliasPlugin,
  nodeResolve({
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  }),
  commonjs(),
  json(),
  babel({
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    exclude: 'node_modules/**',
    babelrc: false,
    babelHelpers: 'bundled',
    presets: [
      [
        '@babel/preset-react',
        {
          runtime: 'classic', // 使用 React.createElement，兼容 React 18/19
        },
      ],
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
  // 使用 PostCSS + CSS Modules 处理样式
  postcss({
    modules: {
      generateScopedName: 'es-[local]-[hash:base64:5]',
    },
    extract: 'index.css',
    minimize: true,
  }),
]

export default [
  // ESM 构建（用于现代打包工具，如 Vite/Webpack）
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
        assetFileNames: '[name][extname]',
      },
    ],
    plugins: basePlugins,
    external: esmExternal,
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
        assetFileNames: '[name][extname]',
      },
    ],
    plugins: basePlugins,
    external: esmExternal,
  },
  // UMD 构建（用于 CDN 和浏览器，打包所有依赖）
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'umd',
        name: 'EasyEditorSetters',
        globals: umdGlobals,
        sourcemap: true,
        banner: `/* @easy-editor/setters v${pkg.version} */`,
        exports: 'named',
        assetFileNames: '[name][extname]',
      },
    ],
    plugins: basePlugins,
    external: umdExternal,
  },
  // UMD 压缩版本（用于生产环境 CDN）
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.min.js',
        format: 'umd',
        name: 'EasyEditorSetters',
        globals: umdGlobals,
        sourcemap: true,
        banner: `/* @easy-editor/setters v${pkg.version} (minified) */`,
        exports: 'named',
        assetFileNames: '[name][extname]',
      },
    ],
    plugins: [...basePlugins, terser()],
    external: umdExternal,
  },
]
