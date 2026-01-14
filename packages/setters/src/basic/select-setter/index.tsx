import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'
import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
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
  const containerRef = useRef<HTMLDivElement>(null)

  const currentValue = value ?? initialValue ?? ''
  const selectedOption = options.find(opt => opt.value === currentValue)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const handleSelect = (optionValue: string, disabled?: boolean) => {
    if (disabled) {
      return
    }
    onChange(optionValue)
    setOpen(false)
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        aria-expanded={open}
        aria-haspopup='listbox'
        className={styles.trigger}
        onClick={() => setOpen(!open)}
        type='button'
      >
        <span className={cn(styles.triggerValue, selectedOption ? '' : styles.placeholder)}>
          {selectedOption?.label || placeholder || '请选择'}
        </span>
        <ChevronDown className={cn(styles.chevron, open ? styles.chevronOpen : '')} />
      </button>
      <div className={cn(styles.dropdown, open === false ? styles.dropdownHidden : '')} role='listbox'>
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
    </div>
  )
}

export default SelectSetter
