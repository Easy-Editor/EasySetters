import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'
import Sketch from '@uiw/react-color-sketch'
import { useState, useRef, useEffect } from 'react'
import styles from './styles.module.css'

export interface ColorSetterProps extends SetterProps<string> {
  disableAlpha?: boolean
}

const ColorSetter = (props: ColorSetterProps) => {
  const { value, initialValue, onChange, disableAlpha = false } = props
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <button aria-label='Select color' className={styles.trigger} onClick={() => setOpen(!open)} type='button'>
        <div
          aria-label='Current color'
          className={styles.colorPreview}
          style={{ backgroundColor: value ?? initialValue }}
        />
        <span className={styles.colorValue}>{value ?? initialValue}</span>
      </button>
      <div className={cn(styles.popover, !open && styles.popoverHidden)}>
        <Sketch color={value} disableAlpha={disableAlpha} onChange={res => onChange(res.hexa)} presetColors={[]} />
      </div>
    </div>
  )
}

export default ColorSetter
