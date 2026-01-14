/**
 * SwitchSetter - 布尔值设置器
 * 提供多种 UI 模式：switch（开关）、checkbox（复选框）、segmented（分段）
 */
import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'
import { Check } from 'lucide-react'
import styles from './styles.module.css'

export interface SwitchSetterProps extends SetterProps<boolean> {
  mode?: 'switch' | 'checkbox' | 'segmented'
  trueLabel?: string
  falseLabel?: string
}

const SwitchSetter = (props: SwitchSetterProps) => {
  const { value, initialValue, onChange, mode = 'switch', trueLabel = '是', falseLabel = '否' } = props

  const currentValue = value ?? initialValue ?? false

  // 分段模式
  if (mode === 'segmented') {
    return (
      <div className={styles.segmented}>
        <button
          className={cn(styles.segmentedButton, currentValue === false ? styles.segmentedButtonSelected : '')}
          onClick={() => onChange(false)}
          type='button'
        >
          {falseLabel}
        </button>
        <button
          className={cn(styles.segmentedButton, currentValue === true ? styles.segmentedButtonSelected : '')}
          onClick={() => onChange(true)}
          type='button'
        >
          {trueLabel}
        </button>
      </div>
    )
  }

  // 复选框模式
  if (mode === 'checkbox') {
    return (
      <label className={styles.checkboxWrapper}>
        <input
          checked={currentValue}
          className={styles.checkboxInput}
          onChange={e => onChange(e.target.checked)}
          type='checkbox'
        />
        <span className={cn(styles.checkbox, currentValue ? styles.checkboxChecked : '')}>
          {currentValue ? <Check className={styles.checkIcon} /> : null}
        </span>
      </label>
    )
  }

  // 开关模式（默认）
  return (
    <button
      aria-checked={currentValue}
      className={cn(styles.switch, currentValue ? styles.switchChecked : '')}
      onClick={() => onChange(!currentValue)}
      role='switch'
      type='button'
    >
      <span className={cn(styles.switchThumb, currentValue ? styles.switchThumbChecked : '')} />
    </button>
  )
}

export default SwitchSetter
