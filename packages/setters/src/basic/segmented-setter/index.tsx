/**
 * SegmentedSetter - 分段控制器
 * 用于在多个选项之间切换，类似于 iOS 的 UISegmentedControl
 */
import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'
import styles from './styles.module.css'

export interface SegmentedOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SegmentedSetterProps extends SetterProps<string> {
  options?: SegmentedOption[]
  size?: 'sm' | 'md'
}

const SegmentedSetter = (props: SegmentedSetterProps) => {
  const { value, initialValue, options = [], onChange, size = 'md' } = props

  const currentValue = value ?? initialValue ?? options[0]?.value ?? ''

  return (
    <div className={cn(styles.container, size === 'sm' ? styles.containerSm : '')}>
      {options.map(option => (
        <button
          className={cn(
            styles.segment,
            currentValue === option.value ? styles.segmentSelected : '',
            option.disabled === true ? styles.segmentDisabled : '',
          )}
          disabled={option.disabled}
          key={option.value}
          onClick={() => !option.disabled && onChange(option.value)}
          type='button'
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default SegmentedSetter
