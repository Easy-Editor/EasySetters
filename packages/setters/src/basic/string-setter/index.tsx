import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'
import type { HTMLInputTypeAttribute } from 'react'
import styles from './styles.module.css'

export interface StringSetterProps extends SetterProps<string> {
  inputType?: HTMLInputTypeAttribute
  maxLength?: number
  minLength?: number
  pattern?: string
  placeholder?: string
  suffix?: string
}

const StringSetter = (props: StringSetterProps) => {
  const {
    value,
    initialValue,
    inputType = 'text',
    maxLength,
    minLength,
    pattern,
    placeholder,
    onChange,
    suffix,
  } = props

  return (
    <div className={styles.container}>
      <input
        className={cn(styles.input, suffix ? styles.inputWithSuffix : '')}
        maxLength={maxLength}
        minLength={minLength}
        onChange={e => onChange(e.target.value)}
        pattern={pattern}
        placeholder={placeholder ?? ''}
        type={inputType}
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

export default StringSetter
