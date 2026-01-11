/**
 * @easy-editor/setters
 * Official setters library for EasyEditor
 */

// Import styles
import './styles/global.css'

// Basic Setters
export { default as ColorSetter } from './basic/color-setter'
export { default as NodeIdSetter } from './basic/node-id-setter'
export { default as NumberSetter } from './basic/number-setter'
export { default as RectSetter } from './basic/rect-setter'
export { default as StringSetter } from './basic/string-setter'
export { default as SwitchSetter } from './basic/switch-setter'
export { default as UploadSetter } from './basic/upload-setter'

// Group Setters
export { default as CollapseSetter } from './group/collapse-setter'
export { default as TabSetter } from './group/tab-setter'

// Export Setter Props types
export type { StringSetterProps } from './basic/string-setter'
export type { NumberSetterProps } from './basic/number-setter'
export type { ColorSetterProps } from './basic/color-setter'
export type { NodeIdSetterProps } from './basic/node-id-setter'
export type { RectSetterProps } from './basic/rect-setter'
export type { SwitchSetterProps } from './basic/switch-setter'
export type { UploadSetterProps, UploadValue } from './basic/upload-setter'
export type { CollapseSetterProps } from './group/collapse-setter'
export type { TabSetterProps } from './group/tab-setter'

// Default setter map
import ColorSetter from './basic/color-setter'
import NodeIdSetter from './basic/node-id-setter'
import NumberSetter from './basic/number-setter'
import RectSetter from './basic/rect-setter'
import StringSetter from './basic/string-setter'
import SwitchSetter from './basic/switch-setter'
import UploadSetter from './basic/upload-setter'
import CollapseSetter from './group/collapse-setter'
import TabSetter from './group/tab-setter'

export const setterMap = {
  ColorSetter,
  NodeIdSetter,
  NumberSetter,
  RectSetter,
  StringSetter,
  SwitchSetter,
  UploadSetter,
  CollapseSetter,
  TabSetter,
}

export default setterMap
