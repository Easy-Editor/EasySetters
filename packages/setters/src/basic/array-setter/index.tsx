import type { SetterProps } from '@easy-editor/core'
import { GripVertical, Plus, Trash2 } from 'lucide-react'
import { useCallback } from 'react'
import styles from './styles.module.css'

export interface ArraySetterProps extends SetterProps<unknown[]> {
  itemSetter?: 'string' | 'number'
  maxItems?: number
  minItems?: number
  placeholder?: string
  addButtonText?: string
}

const ArraySetter = (props: ArraySetterProps) => {
  const {
    value,
    initialValue,
    itemSetter = 'string',
    maxItems,
    minItems = 0,
    placeholder,
    addButtonText = '添加项',
    onChange,
  } = props

  const items = value ?? initialValue ?? []

  const handleAdd = useCallback(() => {
    if (maxItems && items.length >= maxItems) {
      return
    }
    const newItem = itemSetter === 'number' ? 0 : ''
    onChange([...items, newItem])
  }, [items, maxItems, itemSetter, onChange])

  const handleRemove = useCallback(
    (index: number) => {
      if (items.length <= minItems) {
        return
      }
      const newItems = items.filter((_, i) => i !== index)
      onChange(newItems)
    },
    [items, minItems, onChange],
  )

  const handleChange = useCallback(
    (index: number, newValue: unknown) => {
      const newItems = [...items]
      newItems[index] = newValue
      onChange(newItems)
    },
    [items, onChange],
  )

  const canAdd = !maxItems || items.length < maxItems
  const canRemove = items.length > minItems

  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <div className={styles.item} key={index}>
          <GripVertical className={styles.dragHandle} />
          <input
            className={styles.input}
            onChange={e => {
              const val = itemSetter === 'number' ? +e.target.value : e.target.value
              handleChange(index, val)
            }}
            placeholder={placeholder}
            type={itemSetter === 'number' ? 'number' : 'text'}
            value={item as string | number}
          />
          <button
            className={styles.removeButton}
            disabled={!canRemove}
            onClick={() => handleRemove(index)}
            type='button'
          >
            <Trash2 className={styles.removeIcon} />
          </button>
        </div>
      ))}
      <button className={styles.addButton} disabled={!canAdd} onClick={handleAdd} type='button'>
        <Plus className={styles.addIcon} />
        {addButtonText}
      </button>
    </div>
  )
}

export default ArraySetter
