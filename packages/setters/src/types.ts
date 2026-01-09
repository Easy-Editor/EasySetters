/**
 * @easy-editor/core 类型扩展
 */
declare module '@easy-editor/core' {
  interface FieldExtraProps {
    /**
     * 是否显示 label
     * @default true
     */
    label?: boolean

    /**
     * 是否换行
     * @default false
     */
    wrap?: boolean

    /**
     * 是否支持变量绑定
     * @default false
     */
    supportVariable?: boolean
  }
}

/**
 * Setter 分组
 */
export const SetterGroup = {
  /** 基础设置器 */
  BASIC: 'basic',
  /** 高级设置器 */
  ADVANCED: 'advanced',
  /** 布局设置器 */
  LAYOUT: 'layout',
  /** 分组设置器 */
  GROUP: 'group',
} as const

/**
 * Setter 元数据
 */
export interface SetterMetadata {
  /** 设置器名称（唯一标识） */
  setterName: string
  /** 显示标题 */
  title: string
  /** 分组 */
  group: typeof SetterGroup
  /** 描述 */
  description?: string
  /** 图标 URL */
  icon?: string
}
