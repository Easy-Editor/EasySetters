import type { SetterProps } from '@easy-editor/core'
import { useRef, useCallback } from 'react'
import styles from './styles.module.css'

export interface SliderSetterProps extends SetterProps<number> {
  min?: number
  max?: number
  step?: number
  showValue?: boolean
  suffix?: string
}

const SliderSetter = (props: SliderSetterProps) => {
  const { value, initialValue, min = 0, max = 100, step = 1, showValue = true, suffix, onChange } = props

  const currentValue = value ?? initialValue ?? min
  const trackRef = useRef<HTMLDivElement>(null)

  const percentage = ((currentValue - min) / (max - min)) * 100

  const handleChange = useCallback(
    (clientX: number) => {
      if (!trackRef.current) {
        return
      }
      const rect = trackRef.current.getBoundingClientRect()
      const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      const rawValue = min + percent * (max - min)
      const steppedValue = Math.round(rawValue / step) * step
      const clampedValue = Math.max(min, Math.min(max, steppedValue))
      onChange(clampedValue)
    },
    [min, max, step, onChange],
  )

  const handleMouseDown = (event: React.MouseEvent) => {
    handleChange(event.clientX)

    const handleMouseMove = (moveEvent: MouseEvent) => {
      handleChange(moveEvent.clientX)
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        <div className={styles.track} onMouseDown={handleMouseDown} ref={trackRef} role='presentation'>
          <div className={styles.range} style={{ width: `${percentage}%` }} />
          <div
            aria-valuemax={max}
            aria-valuemin={min}
            aria-valuenow={currentValue}
            className={styles.thumb}
            role='slider'
            style={{ left: `${percentage}%` }}
            tabIndex={0}
          />
        </div>
      </div>
      {showValue === true ? (
        <span className={styles.value}>
          {currentValue}
          {suffix}
        </span>
      ) : null}
    </div>
  )
}

export default SliderSetter
