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

export function SetterDemo({ title, description, currentValue, children }: SetterDemoProps) {
  return (
    <div className='dev-setter-demo'>
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      <div className='dev-setter-content'>{children}</div>
      {currentValue !== undefined ? (
        <div className='dev-setter-value'>
          <div className='dev-setter-value-label'>当前值:</div>
          <pre>{typeof currentValue === 'object' ? JSON.stringify(currentValue, null, 2) : String(currentValue)}</pre>
        </div>
      ) : null}
    </div>
  )
}
