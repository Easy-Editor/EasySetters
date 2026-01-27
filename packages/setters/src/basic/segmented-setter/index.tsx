/**
 * SegmentedSetter - 分段控制器
 * 用于在多个选项之间切换，类似于 iOS 的 UISegmentedControl
 */
import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'
import { useCallback, useEffect, useRef, useState } from 'react'
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
  const containerRef = useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  const currentValue = value ?? initialValue ?? options[0]?.value ?? ''

  const updateIndicator = useCallback(() => {
    if (!containerRef.current) return
    const selectedButton = containerRef.current.querySelector(
      `[data-value="${currentValue}"]`,
    ) as HTMLButtonElement
    if (selectedButton) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const buttonRect = selectedButton.getBoundingClientRect()
      setIndicatorStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      })
    }
  }, [currentValue])

  useEffect(() => {
    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [updateIndicator])

  return (
    <div
      className={cn(styles.container, size === 'sm' && styles.containerSm)}
      ref={containerRef}
    >
      <div
        className={styles.indicator}
        style={{
          transform: `translateX(${indicatorStyle.left}px)`,
          width: `${indicatorStyle.width}px`,
        }}
      />
      {options.map(option => (
        <button
          className={cn(
            styles.segment,
            currentValue === option.value && styles.segmentSelected,
            option.disabled === true && styles.segmentDisabled,
          )}
          data-value={option.value}
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
