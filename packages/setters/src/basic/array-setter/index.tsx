import type { SetterProps } from '@easy-editor/core'
import { GripVertical, Plus, Trash2 } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'
import { useCallback } from 'react'
import {
  type ArrayItemSetter,
  canAddArrayItem,
  canRemoveArrayItem,
  createArrayItemValue,
  normalizeArrayItemSetter,
  parseArrayNumberInput,
} from './model'
import styles from './styles.module.css'

export interface ArraySetterProps extends SetterProps<unknown[]> {
  itemProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'value'>
  itemSetter?: ArrayItemSetter
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
  const itemKind = normalizeArrayItemSetter(itemSetter)
  const itemInputType = { color: 'color', number: 'number', string: 'text' }[itemKind]

  const handleAdd = useCallback(() => {
    if (!canAddArrayItem(items.length, maxItems)) {
      return
    }
    onChange([...items, createArrayItemValue(itemSetter)])
  }, [items, maxItems, itemSetter, onChange])

  const handleRemove = useCallback(
    (index: number) => {
      if (!canRemoveArrayItem(items.length, minItems)) {
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

  const canAdd = canAddArrayItem(items.length, maxItems)
  const canRemove = canRemoveArrayItem(items.length, minItems)

  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: primitive values can repeat and do not provide stable identity
        <div className={styles.item} key={index}>
          <GripVertical className={styles.dragHandle} />
          <input
            {...props.itemProps}
            className={styles.input}
            onChange={e => {
              if (itemKind !== 'number') {
                handleChange(index, e.target.value)
                return
              }

              const result = parseArrayNumberInput(e.target.value)
              if (result.kind === 'invalid') {
                return
              }
              handleChange(index, result.value)
            }}
            placeholder={props.itemProps?.placeholder ?? placeholder}
            type={itemInputType}
            value={(item as string | number | undefined) ?? ''}
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
