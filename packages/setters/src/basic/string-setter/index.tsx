import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'

export interface StringSetterProps extends SetterProps<string> {
  placeholder?: string
  suffix?: string
}

const StringSetter = (props: StringSetterProps) => {
  const { value, initialValue, placeholder, onChange, suffix } = props

  return (
    <div className='relative w-full'>
      <Input
        className={cn('h-8 px-2 py-[5px] text-xs!', !!suffix && 'pr-8')}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || ''}
        value={value || initialValue}
      />
      {!!suffix && (
        <span
          aria-label={`Unit: ${suffix}`}
          className='pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground'
        >
          {suffix}
        </span>
      )}
    </div>
  )
}

export default StringSetter
