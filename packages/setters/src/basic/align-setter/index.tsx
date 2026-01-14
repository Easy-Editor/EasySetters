import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'
import {
  AlignEndHorizontal,
  AlignEndVertical,
  AlignHorizontalDistributeCenter,
  AlignStartHorizontal,
  AlignStartVertical,
  AlignVerticalDistributeCenter,
  Maximize2,
} from 'lucide-react'
import { useCallback } from 'react'
import styles from './styles.module.css'

export interface AlignValue {
  horizontal: 'left' | 'center' | 'right' | 'stretch'
  vertical: 'top' | 'center' | 'bottom' | 'stretch'
}

export interface AlignSetterProps extends SetterProps<AlignValue> {
  showHorizontal?: boolean
  showVertical?: boolean
  mode?: 'flex' | 'text'
}

const defaultValue: AlignValue = {
  horizontal: 'left',
  vertical: 'top',
}

const horizontalOptions: Array<{
  value: AlignValue['horizontal']
  icon: React.ComponentType<{ className?: string }>
  label: string
}> = [
  { value: 'left', icon: AlignStartVertical, label: '左对齐' },
  { value: 'center', icon: AlignVerticalDistributeCenter, label: '水平居中' },
  { value: 'right', icon: AlignEndVertical, label: '右对齐' },
  { value: 'stretch', icon: Maximize2, label: '水平拉伸' },
]

const verticalOptions: Array<{
  value: AlignValue['vertical']
  icon: React.ComponentType<{ className?: string }>
  label: string
}> = [
  { value: 'top', icon: AlignStartHorizontal, label: '顶部对齐' },
  { value: 'center', icon: AlignHorizontalDistributeCenter, label: '垂直居中' },
  { value: 'bottom', icon: AlignEndHorizontal, label: '底部对齐' },
  { value: 'stretch', icon: Maximize2, label: '垂直拉伸' },
]

// 9宫格位置映射
const gridPositions: Array<{ h: AlignValue['horizontal']; v: AlignValue['vertical'] }> = [
  { h: 'left', v: 'top' },
  { h: 'center', v: 'top' },
  { h: 'right', v: 'top' },
  { h: 'left', v: 'center' },
  { h: 'center', v: 'center' },
  { h: 'right', v: 'center' },
  { h: 'left', v: 'bottom' },
  { h: 'center', v: 'bottom' },
  { h: 'right', v: 'bottom' },
]

// 获取元素在容器中的位置样式
const getElementPosition = (h: AlignValue['horizontal'], v: AlignValue['vertical']) => {
  const style: React.CSSProperties = {
    position: 'absolute',
  }

  // 水平位置
  if (h === 'left') {
    style.left = '4px'
    style.width = '30%'
  } else if (h === 'center') {
    style.left = '50%'
    style.transform = 'translateX(-50%)'
    style.width = '30%'
  } else if (h === 'right') {
    style.right = '4px'
    style.width = '30%'
  } else {
    style.left = '4px'
    style.right = '4px'
    style.width = 'auto'
  }

  // 垂直位置
  if (v === 'top') {
    style.top = '4px'
    style.height = '30%'
  } else if (v === 'center') {
    style.top = '50%'
    style.transform = h === 'center' ? 'translate(-50%, -50%)' : 'translateY(-50%)'
    style.height = '30%'
  } else if (v === 'bottom') {
    style.bottom = '4px'
    style.height = '30%'
  } else {
    style.top = '4px'
    style.bottom = '4px'
    style.height = 'auto'
  }

  return style
}

const AlignSetter = (props: AlignSetterProps) => {
  const { value, initialValue, onChange, showHorizontal = true, showVertical = true } = props

  const currentValue = value ?? initialValue ?? defaultValue

  const updateAlign = useCallback(
    (updates: Partial<AlignValue>) => {
      onChange({ ...currentValue, ...updates })
    },
    [currentValue, onChange],
  )

  const handleGridClick = useCallback(
    (h: AlignValue['horizontal'], v: AlignValue['vertical']) => {
      onChange({ horizontal: h, vertical: v })
    },
    [onChange],
  )

  const isGridSelected = (h: AlignValue['horizontal'], v: AlignValue['vertical']) =>
    currentValue.horizontal === h && currentValue.vertical === v

  return (
    <div className={styles.container}>
      {/* 可视化对齐预览 + 9宫格选择器 */}
      {showHorizontal === true && showVertical === true ? (
        <div className={styles.visualWrapper}>
          {/* 预览区域 */}
          <div className={styles.previewBox}>
            <div
              className={styles.previewElement}
              style={getElementPosition(currentValue.horizontal, currentValue.vertical)}
            />
          </div>

          {/* 9宫格选择器 */}
          <div className={styles.grid}>
            {gridPositions.map(pos => (
              <button
                aria-label={`Align ${pos.h} ${pos.v}`}
                className={cn(styles.gridButton, isGridSelected(pos.h, pos.v) ? styles.gridButtonSelected : '')}
                key={`${pos.h}-${pos.v}`}
                onClick={() => handleGridClick(pos.h, pos.v)}
                type='button'
              />
            ))}
          </div>
        </div>
      ) : null}

      {/* 水平对齐 */}
      {showHorizontal === true ? (
        <div className={styles.section}>
          <span className={styles.sectionLabel}>水平对齐</span>
          <div className={styles.buttonGroup}>
            {horizontalOptions.map(option => {
              const Icon = option.icon
              const isRotated = option.value === 'stretch'
              return (
                <button
                  aria-label={option.label}
                  className={cn(
                    styles.alignButton,
                    currentValue.horizontal === option.value ? styles.alignButtonSelected : '',
                  )}
                  key={option.value}
                  onClick={() => updateAlign({ horizontal: option.value })}
                  title={option.label}
                  type='button'
                >
                  <Icon className={cn(styles.alignIcon, isRotated ? styles.alignIconRotated : '')} />
                </button>
              )
            })}
          </div>
        </div>
      ) : null}

      {/* 垂直对齐 */}
      {showVertical === true ? (
        <div className={styles.section}>
          <span className={styles.sectionLabel}>垂直对齐</span>
          <div className={styles.buttonGroup}>
            {verticalOptions.map(option => {
              const Icon = option.icon
              return (
                <button
                  aria-label={option.label}
                  className={cn(
                    styles.alignButton,
                    currentValue.vertical === option.value ? styles.alignButtonSelected : '',
                  )}
                  key={option.value}
                  onClick={() => updateAlign({ vertical: option.value })}
                  title={option.label}
                  type='button'
                >
                  <Icon className={styles.alignIcon} />
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default AlignSetter
