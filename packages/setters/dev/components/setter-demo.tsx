/**
 * Setter 展示容器组件
 */
interface SetterDemoProps {
  title: string
  description?: string
  currentValue?: unknown
  children: React.ReactNode
  fullWidth?: boolean
}

export function SetterDemo({ title, description, currentValue, children, fullWidth }: SetterDemoProps) {
  return (
    <div className={`rounded-lg border bg-card p-4 ${fullWidth ? 'w-full' : ''}`}>
      <h3 className='mb-1 font-medium text-foreground text-sm'>{title}</h3>
      {description ? <p className='mb-3 text-muted-foreground text-xs'>{description}</p> : null}
      <div className='space-y-2'>{children}</div>
      {currentValue !== undefined ? (
        <div className='mt-3 rounded bg-muted p-2'>
          <div className='mb-1 font-medium text-muted-foreground text-xs'>当前值:</div>
          <pre className='overflow-auto text-xs'>
            {typeof currentValue === 'object' ? JSON.stringify(currentValue, null, 2) : String(currentValue)}
          </pre>
        </div>
      ) : null}
    </div>
  )
}
