import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'
import styles from './styles.module.css'

export interface NumberSetterProps extends SetterProps<number> {
  placeholder?: string
  suffix?: string
}

const NumberSetter = (props: NumberSetterProps) => {
  const { value, initialValue, placeholder, onChange, suffix } = props

  return (
    <div className={styles.container}>
      <input
        className={cn(styles.input, suffix ? styles.inputWithSuffix : '')}
        onChange={e => onChange(+e.target.value)}
        placeholder={placeholder || ''}
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
