import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'
import { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.css'

export interface JsonSetterProps extends SetterProps<unknown> {
  placeholder?: string
  rows?: number
}

const JsonSetter = (props: JsonSetterProps) => {
  const { value, initialValue, placeholder, rows = 6, onChange } = props

  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Sync value to text
  useEffect(() => {
    const currentValue = value ?? initialValue
    if (currentValue !== undefined) {
      try {
        setText(JSON.stringify(currentValue, null, 2))
        setError(null)
      } catch {
        setText(String(currentValue))
      }
    } else {
      setText('')
    }
  }, [value, initialValue])

  const handleChange = useCallback(
    (newText: string) => {
      setText(newText)
      if (!newText.trim()) {
        setError(null)
        onChange(undefined)
        return
      }
      try {
        const parsed = JSON.parse(newText)
        setError(null)
        onChange(parsed)
      } catch (e) {
        setError((e as Error).message)
      }
    },
    [onChange],
  )

  const lineHeight = 1.5
  const minHeight = rows * lineHeight * 14 // 14px base font size

  return (
    <div className={styles.container}>
      <textarea
        className={cn(styles.textarea, error ? styles.textareaError : null)}
        onChange={e => handleChange(e.target.value)}
        placeholder={placeholder || '输入 JSON 数据'}
        spellCheck={false}
        style={{ minHeight }}
        value={text}
      />
      {error ? <div className={styles.error}>{error}</div> : null}
    </div>
  )
}

export default JsonSetter
