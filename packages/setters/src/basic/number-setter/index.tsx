import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'
import { parseNumberInput } from './model'
import styles from './styles.module.css'

export interface NumberSetterProps extends SetterProps<number> {
  max?: number
  min?: number
  placeholder?: string
  step?: number
  suffix?: string
}

const NumberSetter = (props: NumberSetterProps) => {
  const { value, initialValue, max, min, placeholder, onChange, removeProp, step, suffix } = props

  return (
    <div className={styles.container}>
      <input
        className={cn(styles.input, suffix ? styles.inputWithSuffix : '')}
        max={max}
        min={min}
        onChange={event => {
          const result = parseNumberInput(event.target.value)
          if (result.kind === 'empty') {
            removeProp()
            return
          }
          onChange(result.value)
        }}
        placeholder={placeholder ?? ''}
        step={step}
        type='number'
        value={value ?? initialValue ?? ''}
      />
      {suffix ? (
        <span aria-label={`Unit: ${suffix}`} className={styles.suffix}>
          {suffix}
        </span>
      ) : null}
    </div>
  )
}

export default NumberSetter
