/**
 * Demo 注册表
 * 使用 import.meta.glob 自动发现所有 demo
 */
import type { ComponentType } from 'react'

export interface DemoMeta {
  name: string
  slug: string
  group: 'basic' | 'group'
  order: number
  description?: string
}

export interface DemoModule {
  default: ComponentType
  demoMeta: DemoMeta
}

// 自动导入所有 demo
const demoModules = import.meta.glob('../demos/*-demo.tsx', { eager: true }) as Record<string, DemoModule>

function sortDemos(a: DemoMeta, b: DemoMeta): number {
  if (a.group === b.group) {
    return a.order - b.order
  }
  return a.group === 'basic' ? -1 : 1
}

// 解析并排序 demos
export const demos = Object.values(demoModules)
  .filter(m => m.default && m.demoMeta)
  .map(m => ({ ...m.demoMeta, Component: m.default }))
  .sort(sortDemos)

// 按 slug 查找 demo
export function getDemoBySlug(slug: string) {
  return demos.find(d => d.slug === slug)
}

// 按分组获取 demos
export function getDemosByGroup(group: 'basic' | 'group') {
  return demos.filter(d => d.group === group)
}
