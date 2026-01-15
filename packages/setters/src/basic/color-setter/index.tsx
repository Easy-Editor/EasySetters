import type { SetterProps } from '@easy-editor/core'
import Popover from '@/lib/popover'
import Sketch from '@uiw/react-color-sketch'
import { useState } from 'react'
import styles from './styles.module.css'

export interface ColorSetterProps extends SetterProps<string> {
  disableAlpha?: boolean
}

const ColorSetter = (props: ColorSetterProps) => {
  const { value, initialValue, onChange, disableAlpha = false } = props
  const [open, setOpen] = useState(false)

  return (
    <Popover
      onClose={() => setOpen(false)}
      open={open}
      trigger={
        <button aria-label='Select color' className={styles.trigger} onClick={() => setOpen(true)} type='button'>
          <div
            aria-label='Current color'
            className={styles.colorPreview}
            style={{ backgroundColor: value ?? initialValue }}
          />
          <span className={styles.colorValue}>{value ?? initialValue}</span>
        </button>
      }
    >
      <div className={styles.popover}>
        <Sketch color={value} disableAlpha={disableAlpha} onChange={res => onChange(res.hexa)} presetColors={[]} />
      </div>
    </Popover>
  )
}

export default ColorSetter
