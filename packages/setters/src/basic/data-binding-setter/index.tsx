import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'
import { Database, FileJson, Link2 } from 'lucide-react'
import { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import styles from './styles.module.css'

export interface DataBindingValue {
  type: 'static' | 'datasource'
  staticValue?: unknown
  datasourceId?: string
  datasourcePath?: string
}

export interface DataBindingSetterProps extends SetterProps<DataBindingValue> {
  dataType?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'any'
  showPreview?: boolean
  staticSetter?: string
  dataSources?: Array<{ id: string; name: string }>
}

const defaultValue: DataBindingValue = {
  type: 'static',
  staticValue: '',
}

const DataBindingSetter = (props: DataBindingSetterProps) => {
  const { value, initialValue, onChange, dataType = 'any', showPreview = true, dataSources = [] } = props

  const currentValue = value ?? initialValue ?? defaultValue
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'static' | 'datasource'>(currentValue.type)
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

  const updateBinding = useCallback(
    (updates: Partial<DataBindingValue>) => {
      onChange({ ...currentValue, ...updates })
    },
    [currentValue, onChange],
  )

  const handleTypeChange = useCallback(
    (type: 'static' | 'datasource') => {
      setActiveTab(type)
      updateBinding({ type })
    },
    [updateBinding],
  )

  const handleStaticValueChange = useCallback(
    (staticValue: unknown) => {
      updateBinding({ staticValue })
    },
    [updateBinding],
  )

  const handleDatasourceChange = useCallback(
    (datasourceId: string) => {
      updateBinding({ datasourceId, datasourcePath: '' })
    },
    [updateBinding],
  )

  const handlePathChange = useCallback(
    (datasourcePath: string) => {
      updateBinding({ datasourcePath })
    },
    [updateBinding],
  )

  // 渲染静态值输入
  const renderStaticInput = useMemo(() => {
    switch (dataType) {
      case 'number':
        return (
          <input
            className={styles.input}
            onChange={e => handleStaticValueChange(Number(e.target.value))}
            placeholder='输入数值'
            type='number'
            value={(currentValue.staticValue as number) ?? ''}
          />
        )
      case 'boolean':
        return (
          <div className={styles.booleanButtons}>
            <button
              className={cn(styles.booleanButton, currentValue.staticValue === true ? styles.booleanButtonActive : '')}
              onClick={() => handleStaticValueChange(true)}
              type='button'
            >
              True
            </button>
            <button
              className={cn(styles.booleanButton, currentValue.staticValue === false ? styles.booleanButtonActive : '')}
              onClick={() => handleStaticValueChange(false)}
              type='button'
            >
              False
            </button>
          </div>
        )
      case 'array':
      case 'object':
        return (
          <textarea
            className={styles.textarea}
            onChange={e => {
              try {
                const parsed = JSON.parse(e.target.value)
                handleStaticValueChange(parsed)
              } catch {
                handleStaticValueChange(e.target.value)
              }
            }}
            placeholder={dataType === 'array' ? '["item1", "item2"]' : '{"key": "value"}'}
            value={
              typeof currentValue.staticValue === 'string'
                ? currentValue.staticValue
                : (JSON.stringify(currentValue.staticValue, null, 2) ?? '')
            }
          />
        )
      default:
        return (
          <input
            className={styles.input}
            onChange={e => handleStaticValueChange(e.target.value)}
            placeholder='输入值'
            type='text'
            value={(currentValue.staticValue as string) ?? ''}
          />
        )
    }
  }, [dataType, currentValue.staticValue, handleStaticValueChange])

  // 绑定状态显示
  const bindingStatus = useMemo(() => {
    if (currentValue.type === 'datasource' && currentValue.datasourceId) {
      const ds = dataSources.find(d => d.id === currentValue.datasourceId)
      return {
        icon: <Link2 className={cn(styles.triggerIcon, styles.triggerIconPrimary)} />,
        text: `${ds?.name ?? currentValue.datasourceId}${currentValue.datasourcePath ? `.${currentValue.datasourcePath}` : ''}`,
      }
    }
    return {
      icon: <FileJson className={cn(styles.triggerIcon, styles.triggerIconMuted)} />,
      text: '静态数据',
    }
  }, [currentValue, dataSources])

  return (
    <div className={styles.container} ref={containerRef}>
      <button aria-label='Data binding' className={styles.trigger} onClick={() => setOpen(!open)} type='button'>
        {bindingStatus.icon}
        <span className={styles.triggerText}>{bindingStatus.text}</span>
      </button>

      <div className={cn(styles.popover, open === false ? styles.popoverHidden : '')}>
        {/* Tabs */}
        <div className={styles.tabsList} role='tablist'>
          <button
            aria-selected={activeTab === 'static'}
            className={cn(styles.tabTrigger, activeTab === 'static' ? styles.tabTriggerActive : '')}
            onClick={() => handleTypeChange('static')}
            role='tab'
            type='button'
          >
            <FileJson className={styles.tabTriggerIcon} />
            静态数据
          </button>
          <button
            aria-selected={activeTab === 'datasource'}
            className={cn(styles.tabTrigger, activeTab === 'datasource' ? styles.tabTriggerActive : '')}
            onClick={() => handleTypeChange('datasource')}
            role='tab'
            type='button'
          >
            <Database className={styles.tabTriggerIcon} />
            数据源
          </button>
        </div>

        {/* Static Tab Content */}
        <div className={cn(styles.tabContent, activeTab === 'static' ? styles.tabContentActive : '')} role='tabpanel'>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>值 ({dataType})</span>
            {renderStaticInput}
          </div>
        </div>

        {/* Datasource Tab Content */}
        <div
          className={cn(styles.tabContent, activeTab === 'datasource' ? styles.tabContentActive : '')}
          role='tabpanel'
        >
          <div className={styles.section}>
            {/* 数据源选择 */}
            <span className={styles.sectionLabel}>数据源</span>
            {dataSources.length > 0 ? (
              <div className={styles.datasourceList}>
                {dataSources.map(ds => (
                  <button
                    className={cn(
                      styles.datasourceButton,
                      currentValue.datasourceId === ds.id ? styles.datasourceButtonActive : '',
                    )}
                    key={ds.id}
                    onClick={() => handleDatasourceChange(ds.id)}
                    type='button'
                  >
                    <Database className={styles.datasourceIcon} />
                    {ds.name}
                  </button>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>暂无可用数据源</div>
            )}

            {/* 数据路径 */}
            {currentValue.datasourceId ? (
              <>
                <span className={styles.sectionLabel}>数据路径</span>
                <input
                  className={cn(styles.input, styles.inputMono)}
                  onChange={e => handlePathChange(e.target.value)}
                  placeholder='data.list[0].name'
                  type='text'
                  value={currentValue.datasourcePath ?? ''}
                />
                <span className={styles.hint}>使用点号访问嵌套属性，如: data.items[0].value</span>
              </>
            ) : null}

            {/* 数据预览 */}
            {showPreview === true && currentValue.datasourceId ? (
              <>
                <span className={styles.sectionLabel}>数据预览</span>
                <div className={styles.preview}>绑定后可在预览模式查看数据</div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataBindingSetter
