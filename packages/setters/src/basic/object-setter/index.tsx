import type { SetterProps } from '@easy-editor/core'
import { Plus, Trash2 } from 'lucide-react'
import { useCallback } from 'react'
import styles from './styles.module.css'

export interface ObjectField {
  key: string
  label: string
  type?: 'string' | 'number'
  placeholder?: string
}

export interface ObjectSetterProps extends SetterProps<Record<string, unknown>> {
  fields?: ObjectField[]
  allowCustomFields?: boolean
  addFieldText?: string
}

const ObjectSetter = (props: ObjectSetterProps) => {
  const { value, initialValue, fields = [], allowCustomFields = false, addFieldText = '添加字段', onChange } = props

  const currentValue = value ?? initialValue ?? {}

  const handleFieldChange = useCallback(
    (key: string, newValue: unknown) => {
      onChange({ ...currentValue, [key]: newValue })
    },
    [currentValue, onChange],
  )

  const handleAddField = useCallback(() => {
    const newKey = `field_${Date.now()}`
    onChange({ ...currentValue, [newKey]: '' })
  }, [currentValue, onChange])

  const handleRemoveField = useCallback(
    (key: string) => {
      const newValue = { ...currentValue }
      delete newValue[key]
      onChange(newValue)
    },
    [currentValue, onChange],
  )

  // Get all keys: defined fields + custom fields
  const definedKeys = fields.map(f => f.key)
  const customKeys = Object.keys(currentValue).filter(k => !definedKeys.includes(k))

  return (
    <div className={styles.container}>
      {/* Defined fields */}
      {fields.map(field => (
        <div className={styles.field} key={field.key}>
          <span className={styles.label}>{field.label}</span>
          <input
            className={styles.input}
            onChange={e => {
              const val = field.type === 'number' ? +e.target.value : e.target.value
              handleFieldChange(field.key, val)
            }}
            placeholder={field.placeholder}
            type={field.type === 'number' ? 'number' : 'text'}
            value={(currentValue[field.key] as string | number) ?? ''}
          />
        </div>
      ))}

      {/* Custom fields */}
      {customKeys.map(key => (
        <div className={styles.customField} key={key}>
          <div className={styles.customFieldInputs}>
            <input
              className={styles.keyInput}
              onChange={e => {
                const newKey = e.target.value
                if (newKey && newKey !== key) {
                  const newValue = { ...currentValue }
                  newValue[newKey] = newValue[key]
                  delete newValue[key]
                  onChange(newValue)
                }
              }}
              placeholder='字段名'
              type='text'
              value={key}
            />
            <input
              className={styles.input}
              onChange={e => handleFieldChange(key, e.target.value)}
              placeholder='值'
              type='text'
              value={(currentValue[key] as string) ?? ''}
            />
          </div>
          <button className={styles.removeButton} onClick={() => handleRemoveField(key)} type='button'>
            <Trash2 className={styles.removeIcon} />
          </button>
        </div>
      ))}

      {/* Add custom field button */}
      {allowCustomFields ? (
        <button className={styles.addButton} onClick={handleAddField} type='button'>
          <Plus className={styles.addIcon} />
          {addFieldText}
        </button>
      ) : null}
    </div>
  )
}

export default ObjectSetter
