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
  let serializedValue = '// 该分组设置器的状态由内部子设置器维护。'
  if (currentValue !== undefined) {
    serializedValue =
      typeof currentValue === 'object' ? JSON.stringify(currentValue, null, 2) : JSON.stringify(currentValue)
  }

  return (
    <div className='dev-setter-demo'>
      <div className='dev-demo-heading'>
        <span className='dev-demo-kicker'>交互示例</span>
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      <div className='dev-demo-workbench'>
        <section className='dev-inspector-pane'>
          <div className='dev-pane-bar'>
            <span>属性面板</span>
            <span>320 px</span>
          </div>
          <div className='dev-setter-content'>
            <div className='dev-property-row'>
              <span className='dev-property-label'>当前值</span>
              <div>{children}</div>
            </div>
          </div>
        </section>
        <section className='dev-value-pane'>
          <div className='dev-pane-bar'>
            <span>实时值</span>
            <span>JSON</span>
          </div>
          <pre>{serializedValue}</pre>
        </section>
      </div>
    </div>
  )
}
