/**
 * @easy-editor/easypack configuration
 * @type {import('@easy-editor/easypack').EasypackConfig}
 */
export default {
  preset: 'setter',
  globalName: 'EasyEditorSetters',
  output: {
    esm: true,
    cjs: true,
    umd: true,
    minify: true,
    types: false,
  },
}
