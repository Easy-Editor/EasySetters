import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'
import Popover from '@/lib/popover'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import styles from './styles.module.css'

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectSetterProps extends SetterProps<string> {
  options?: SelectOption[]
  placeholder?: string
}

const SelectSetter = (props: SelectSetterProps) => {
  const { value, initialValue, options = [], placeholder, onChange } = props
  const [open, setOpen] = useState(false)

  const currentValue = value ?? initialValue ?? ''
  const selectedOption = options.find(opt => opt.value === currentValue)

  const handleSelect = (optionValue: string, disabled?: boolean) => {
    if (disabled) {
      return
    }
    onChange(optionValue)
    setOpen(false)
  }

  return (
    <Popover
      onClose={() => setOpen(false)}
      open={open}
      trigger={
        <button
          aria-expanded={open}
          aria-haspopup='listbox'
          className={styles.trigger}
          onClick={() => setOpen(true)}
          type='button'
        >
          <span className={cn(styles.triggerValue, selectedOption ? '' : styles.placeholder)}>
            {selectedOption?.label || placeholder || '请选择'}
          </span>
          <ChevronDown className={cn(styles.chevron, open ? styles.chevronOpen : '')} />
        </button>
      }
    >
      <div className={styles.dropdown} role='listbox'>
        {options.map(option => (
          <button
            aria-selected={option.value === currentValue}
            className={cn(
              styles.option,
              option.value === currentValue ? styles.optionSelected : '',
              option.disabled === true ? styles.optionDisabled : '',
            )}
            key={option.value}
            onClick={() => handleSelect(option.value, option.disabled)}
            role='option'
            type='button'
          >
            {option.label}
          </button>
        ))}
      </div>
    </Popover>
  )
}

export default SelectSetter
