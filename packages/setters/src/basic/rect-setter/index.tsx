import { Input } from '@/components/ui/input'
import type { SetterProps } from '@easy-editor/core'

export interface RectSetterProps extends SetterProps<DOMRect> {}

const RectSetter = (props: RectSetterProps) => {
  const { value, onChange } = props

  const handleChange = (key: keyof DOMRect, newValue: number) => {
    onChange({ ...value, [key]: newValue })
  }

  return (
    <div className='flex w-full flex-wrap gap-2'>
      <div className='relative w-[calc(50%-4px)]'>
        <Input
          className='h-8 px-2 py-[5px] pr-8 text-xs! [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
          onChange={e => handleChange('x', Number(e.target.value))}
          type='number'
          value={formatDecimal(value.x)}
        />
        <span
          aria-label={'Unit: X'}
          className='pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground'
        >
          X
        </span>
      </div>
      <div className='relative w-[calc(50%-4px)]'>
        <Input
          className='h-8 px-2 py-[5px] pr-8 text-xs! [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
          onChange={e => handleChange('y', Number(e.target.value))}
          type='number'
          value={formatDecimal(value.y)}
        />
        <span
          aria-label={'Unit: Y'}
          className='pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground'
        >
          Y
        </span>
      </div>
      <div className='relative w-[calc(50%-4px)]'>
        <Input
          className='h-8 px-2 py-[5px] pr-8 text-xs! [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
          onChange={e => handleChange('width', Number(e.target.value))}
          type='number'
          value={formatDecimal(value.width)}
        />
        <span
          aria-label={'Unit: W'}
          className='pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground'
        >
          W
        </span>
      </div>
      <div className='relative w-[calc(50%-4px)]'>
        <Input
          className='h-8 px-2 py-[5px] pr-8 text-xs! [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
          onChange={e => handleChange('height', Number(e.target.value))}
          type='number'
          value={formatDecimal(value.height)}
        />
        <span
          aria-label={'Unit: H'}
          className='pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground'
        >
          H
        </span>
      </div>
    </div>
  )
}

export default RectSetter

const decimalRegex = /(\.\d{2})\d+$/
const formatDecimal = (num: number) => num.toString().replace(decimalRegex, '$1')
