import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'
import { ArrowRight, Code, Settings2 } from 'lucide-react'
import { useCallback, useState, useRef, useEffect } from 'react'
import styles from './styles.module.css'

export interface DataMappingItem {
  targetField: string
  sourceField: string
  transform?: string
}

export interface DataMappingValue {
  mappings: DataMappingItem[]
}

export interface TargetFieldConfig {
  name: string
  label: string
  type: 'string' | 'number' | 'boolean' | 'array'
  required?: boolean
}

export interface DataMappingSetterProps extends SetterProps<DataMappingValue> {
  targetFields: TargetFieldConfig[]
  sourceFields?: string[]
}

const defaultValue: DataMappingValue = {
  mappings: [],
}

const DataMappingSetter = (props: DataMappingSetterProps) => {
  const { value, initialValue, onChange, targetFields, sourceFields = [] } = props

  const currentValue = value ?? initialValue ?? defaultValue
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  // 获取字段的映射
  const getMapping = useCallback(
    (targetField: string): DataMappingItem | undefined =>
      currentValue.mappings.find(m => m.targetField === targetField),
    [currentValue.mappings],
  )

  // 更新映射
  const updateMapping = useCallback(
    (targetField: string, updates: Partial<Omit<DataMappingItem, 'targetField'>>) => {
      const existingIndex = currentValue.mappings.findIndex(m => m.targetField === targetField)
      const newMappings = [...currentValue.mappings]

      if (existingIndex >= 0) {
        newMappings[existingIndex] = { ...newMappings[existingIndex], ...updates }
      } else {
        newMappings.push({
          targetField,
          sourceField: updates.sourceField ?? '',
          transform: updates.transform,
        })
      }

      onChange({ mappings: newMappings })
    },
    [currentValue.mappings, onChange],
  )

  // 清除映射
  const clearMapping = useCallback(
    (targetField: string) => {
      const newMappings = currentValue.mappings.filter(m => m.targetField !== targetField)
      onChange({ mappings: newMappings })
    },
    [currentValue.mappings, onChange],
  )

  // 统计已映射字段数
  const mappedCount = currentValue.mappings.filter(m => m.sourceField).length

  return (
    <div className={styles.container} ref={containerRef}>
      <button aria-label='Data mapping' className={styles.trigger} onClick={() => setOpen(!open)} type='button'>
        <Settings2 className={styles.triggerIcon} />
        <span className={styles.triggerText}>
          字段映射 ({mappedCount}/{targetFields.length})
        </span>
      </button>

      <div className={cn(styles.popover, open === false ? styles.popoverHidden : '')}>
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.headerTitle}>字段映射配置</span>
            <span className={styles.headerCount}>
              {mappedCount}/{targetFields.length} 已映射
            </span>
          </div>

          {/* 映射列表 */}
          <div className={styles.mappingList}>
            {targetFields.map(field => {
              const mapping = getMapping(field.name)
              return (
                <div className={styles.mappingItem} key={field.name}>
                  {/* 字段标题 */}
                  <div className={styles.mappingHeader}>
                    <span className={styles.mappingTitle}>
                      {field.label}
                      {field.required ? <span className={styles.mappingRequired}>*</span> : null}
                    </span>
                    <span className={styles.mappingType}>{field.type}</span>
                  </div>

                  {/* 映射配置 */}
                  <div className={styles.mappingRow}>
                    {/* 源字段 */}
                    {sourceFields.length > 0 ? (
                      <select
                        className={styles.select}
                        onChange={e => updateMapping(field.name, { sourceField: e.target.value })}
                        value={mapping?.sourceField ?? ''}
                      >
                        <option value=''>选择字段</option>
                        {sourceFields.map(sf => (
                          <option key={sf} value={sf}>
                            {sf}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        className={styles.input}
                        onChange={e => updateMapping(field.name, { sourceField: e.target.value })}
                        placeholder='源字段路径'
                        type='text'
                        value={mapping?.sourceField ?? ''}
                      />
                    )}

                    <ArrowRight className={styles.arrowIcon} />

                    {/* 目标字段 (只读) */}
                    <div className={styles.targetField}>{field.name}</div>
                  </div>

                  {/* 转换表达式 */}
                  {mapping?.sourceField ? (
                    <div className={styles.transformRow}>
                      <Code className={styles.transformIcon} />
                      <input
                        className={styles.transformInput}
                        onChange={e => updateMapping(field.name, { transform: e.target.value })}
                        placeholder='转换表达式 (可选)'
                        type='text'
                        value={mapping?.transform ?? ''}
                      />
                    </div>
                  ) : null}

                  {/* 清除按钮 */}
                  {mapping?.sourceField ? (
                    <button className={styles.clearButton} onClick={() => clearMapping(field.name)} type='button'>
                      清除映射
                    </button>
                  ) : null}
                </div>
              )
            })}
          </div>

          {/* 帮助文本 */}
          <div className={styles.helpText}>
            <p>• 源字段: 数据源中的字段路径</p>
            <p>• 转换表达式: 如 value * 100, value.toFixed(2)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataMappingSetter
