import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'
import { ChevronRight } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import styles from './styles.module.css'

export interface CollapseSetterProps extends SetterProps<boolean>, PropsWithChildren {
  icon?: boolean
  padding?: string
}

const CollapseSetter = (props: CollapseSetterProps) => {
  const { field, children, initialValue, icon = true, padding = '12px 16px' } = props
  const [isOpen, setIsOpen] = useState(initialValue ?? true)

  const handleToggle = () => {
    if (icon) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className={styles.container}>
      <div
        aria-expanded={icon ? isOpen : undefined}
        className={styles.header}
        onClick={handleToggle}
        onKeyDown={e => e.key === 'Enter' && handleToggle()}
        role={icon ? 'button' : undefined}
        tabIndex={icon ? 0 : undefined}
      >
        <div className={styles.titleWrapper}>
          {icon && <ChevronRight className={cn(styles.chevron, isOpen && styles.chevronOpen)} />}
          <h4 className={styles.title}>{field.title}</h4>
        </div>
      </div>
      <div className={cn(styles.content, !isOpen && styles.contentHidden)}>
        <div className={styles.contentInner} style={{ padding }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default CollapseSetter
