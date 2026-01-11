import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { SetterProps } from '@easy-editor/core'
import Sketch from '@uiw/react-color-sketch'

export interface ColorSetterProps extends SetterProps<string> {
  disableAlpha?: boolean
}

const ColorSetter = (props: ColorSetterProps) => {
  const { value, initialValue, onChange, disableAlpha = false } = props

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label='Select color'
          className={'h-8 w-full justify-start gap-2 bg-transparent px-2 py-[5px] text-left font-normal text-xs'}
          variant={'outline'}
        >
          <div
            aria-label='Current color'
            className='h-3.5 w-3.5 rounded-full border border-muted-foreground'
            style={{ backgroundColor: value ?? initialValue }}
          />
          <span className='truncate font-mono'>{value ?? initialValue}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className='w-auto p-0'>
        <Sketch color={value} disableAlpha={disableAlpha} onChange={res => onChange(res.hexa)} presetColors={[]} />
      </PopoverContent>
    </Popover>
  )
}

export default ColorSetter
