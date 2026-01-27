/**
 * @easy-editor/setters
 * Official setters library for EasyEditor
 */

// Import styles
import './styles/variables.css'

// Shared components
export { default as Popover } from './lib/popover'

// Setters
export { default as ArraySetter } from './basic/array-setter'
export { default as ColorSetter } from './basic/color-setter'
export { default as JsonSetter } from './basic/json-setter'
export { default as NumberSetter } from './basic/number-setter'
export { default as ObjectSetter } from './basic/object-setter'
export { default as RectSetter } from './basic/rect-setter'
export { default as SegmentedSetter } from './basic/segmented-setter'
export { default as SelectSetter } from './basic/select-setter'
export { default as SliderSetter } from './basic/slider-setter'
export { default as StringSetter } from './basic/string-setter'
export { default as SwitchSetter } from './basic/switch-setter'
export { default as TextAreaSetter } from './basic/textarea-setter'
export { default as UploadSetter } from './basic/upload-setter'
export { default as CollapseSetter } from './group/collapse-setter'
export { default as SubTabSetter } from './group/sub-tab-setter'
export { default as TabSetter } from './group/tab-setter'

// Export Setter Props types
export type { ArraySetterProps } from './basic/array-setter'
export type { ColorSetterProps } from './basic/color-setter'
export type { JsonSetterProps } from './basic/json-setter'
export type { NumberSetterProps } from './basic/number-setter'
export type { ObjectField, ObjectSetterProps } from './basic/object-setter'
export type { RectSetterProps } from './basic/rect-setter'
export type { SegmentedOption, SegmentedSetterProps } from './basic/segmented-setter'
export type { SelectOption, SelectSetterProps } from './basic/select-setter'
export type { SliderSetterProps } from './basic/slider-setter'
export type { StringSetterProps } from './basic/string-setter'
export type { SwitchSetterProps } from './basic/switch-setter'
export type { TextAreaSetterProps } from './basic/textarea-setter'
export type { UploadSetterProps, UploadValue } from './basic/upload-setter'
export type { CollapseSetterProps } from './group/collapse-setter'
export type { SubTabSetterProps } from './group/sub-tab-setter'
export type { TabSetterProps } from './group/tab-setter'

// Default setter map
import ArraySetter from './basic/array-setter'
import ColorSetter from './basic/color-setter'
import JsonSetter from './basic/json-setter'
import NumberSetter from './basic/number-setter'
import ObjectSetter from './basic/object-setter'
import RectSetter from './basic/rect-setter'
import SegmentedSetter from './basic/segmented-setter'
import SelectSetter from './basic/select-setter'
import SliderSetter from './basic/slider-setter'
import StringSetter from './basic/string-setter'
import SwitchSetter from './basic/switch-setter'
import TextAreaSetter from './basic/textarea-setter'
import UploadSetter from './basic/upload-setter'
import CollapseSetter from './group/collapse-setter'
import SubTabSetter from './group/sub-tab-setter'
import TabSetter from './group/tab-setter'

export const setterMap = {
  ColorSetter,
  NumberSetter,
  RectSetter,
  StringSetter,
  SwitchSetter,
  UploadSetter,
  SegmentedSetter,
  CollapseSetter,
  SubTabSetter,
  TabSetter,
  SelectSetter,
  SliderSetter,
  TextAreaSetter,
  ArraySetter,
  JsonSetter,
  ObjectSetter,
}

export default setterMap
