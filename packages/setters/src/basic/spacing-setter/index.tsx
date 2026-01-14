import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'
import { Link, Unlink } from 'lucide-react'
import { useCallback, useState } from 'react'
import styles from './styles.module.css'

export interface SpacingValue {
  top: number
  right: number
  bottom: number
  left: number
}

export interface SpacingSetterProps extends SetterProps<SpacingValue> {
  mode?: 'padding' | 'margin'
  linked?: boolean
  min?: number
  max?: number
}

const defaultValue: SpacingValue = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

const presetValues = [0, 4, 8, 12, 16, 24, 32]

const SpacingSetter = (props: SpacingSetterProps) => {
  const { value, initialValue, onChange, mode = 'padding', linked: initialLinked = false, min = 0, max = 100 } = props

  const currentValue = value ?? initialValue ?? defaultValue
  const [isLinked, setIsLinked] = useState(initialLinked)

  const updateSpacing = useCallback(
    (updates: Partial<SpacingValue>) => {
      if (isLinked) {
        const newValue = Object.values(updates)[0] as number
        onChange({ top: newValue, right: newValue, bottom: newValue, left: newValue })
      } else {
        onChange({ ...currentValue, ...updates })
      }
    },
    [currentValue, isLinked, onChange],
  )

  const handlePresetClick = useCallback(
    (presetValue: number) => {
      onChange({ top: presetValue, right: presetValue, bottom: presetValue, left: presetValue })
    },
    [onChange],
  )

  const toggleLinked = useCallback(() => {
    setIsLinked(prev => !prev)
  }, [])

  return (
    <div className={styles.container}>
      {/* 可视化盒模型 */}
      <div className={styles.boxModel}>
        {/* 上 */}
        <div className={styles.inputTop}>
          <input
            className={styles.spacingInput}
            max={max}
            min={min}
            onChange={e => updateSpacing({ top: Number(e.target.value) })}
            type='number'
            value={currentValue.top}
          />
        </div>

        {/* 右 */}
        <div className={styles.inputRight}>
          <input
            className={styles.spacingInput}
            max={max}
            min={min}
            onChange={e => updateSpacing({ right: Number(e.target.value) })}
            type='number'
            value={currentValue.right}
          />
        </div>

        {/* 下 */}
        <div className={styles.inputBottom}>
          <input
            className={styles.spacingInput}
            max={max}
            min={min}
            onChange={e => updateSpacing({ bottom: Number(e.target.value) })}
            type='number'
            value={currentValue.bottom}
          />
        </div>

        {/* 左 */}
        <div className={styles.inputLeft}>
          <input
            className={styles.spacingInput}
            max={max}
            min={min}
            onChange={e => updateSpacing({ left: Number(e.target.value) })}
            type='number'
            value={currentValue.left}
          />
        </div>

        {/* 中心区域 - 联动按钮 */}
        <button
          aria-label={isLinked ? 'Unlink values' : 'Link values'}
          className={cn(styles.linkButton, isLinked ? styles.linkButtonActive : '')}
          onClick={toggleLinked}
          type='button'
        >
          {isLinked ? <Link className={styles.linkIcon} /> : <Unlink className={styles.linkIcon} />}
        </button>
      </div>

      {/* 快捷预设 */}
      <div className={styles.presets}>
        {presetValues.map(presetValue => (
          <button
            className={styles.presetButton}
            key={presetValue}
            onClick={() => handlePresetClick(presetValue)}
            type='button'
          >
            {presetValue}
          </button>
        ))}
      </div>

      {/* 模式标签 */}
      <div className={styles.modeLabel}>{mode === 'padding' ? '内边距' : '外边距'} (px)</div>
    </div>
  )
}

export default SpacingSetter
