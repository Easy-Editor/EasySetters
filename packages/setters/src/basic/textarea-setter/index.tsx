import type { SetterProps } from '@easy-editor/core'
import styles from './styles.module.css'

export interface TextAreaSetterProps extends SetterProps<string> {
  placeholder?: string
  rows?: number
  maxLength?: number
}

const TextAreaSetter = (props: TextAreaSetterProps) => {
  const { value, initialValue, placeholder, rows = 3, maxLength, onChange } = props

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        maxLength={maxLength}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || ''}
        rows={rows}
        value={value ?? initialValue ?? ''}
      />
      {maxLength ? (
        <div className={styles.counter}>
          {(value ?? initialValue ?? '').length}/{maxLength}
        </div>
      ) : null}
    </div>
  )
}

export default TextAreaSetter
