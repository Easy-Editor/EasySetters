import type { SetterProps } from '@easy-editor/core'
import styles from './styles.module.css'

export interface RectSetterProps extends SetterProps<DOMRect> {}

const RectSetter = (props: RectSetterProps) => {
  const { value, onChange } = props

  const handleChange = (key: keyof DOMRect, newValue: number) => {
    onChange({ ...value, [key]: newValue })
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          onChange={e => handleChange('x', Number(e.target.value))}
          type='number'
          value={formatDecimal(value.x)}
        />
        <span aria-label='Unit: X' className={styles.suffix}>
          X
        </span>
      </div>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          onChange={e => handleChange('y', Number(e.target.value))}
          type='number'
          value={formatDecimal(value.y)}
        />
        <span aria-label='Unit: Y' className={styles.suffix}>
          Y
        </span>
      </div>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          onChange={e => handleChange('width', Number(e.target.value))}
          type='number'
          value={formatDecimal(value.width)}
        />
        <span aria-label='Unit: W' className={styles.suffix}>
          W
        </span>
      </div>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          onChange={e => handleChange('height', Number(e.target.value))}
          type='number'
          value={formatDecimal(value.height)}
        />
        <span aria-label='Unit: H' className={styles.suffix}>
          H
        </span>
      </div>
    </div>
  )
}

export default RectSetter

const decimalRegex = /(\.\d{2})\d+$/
const formatDecimal = (num: number) => num.toString().replace(decimalRegex, '$1')
