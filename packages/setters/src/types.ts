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
