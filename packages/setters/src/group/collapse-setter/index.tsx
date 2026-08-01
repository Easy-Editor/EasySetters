import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'
import { ChevronRight } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { useId, useState } from 'react'
import styles from './styles.module.css'

export interface CollapseSetterProps extends SetterProps<boolean>, PropsWithChildren {
  defaultOpen?: boolean
  icon?: boolean
  padding?: string
}

const CollapseSetter = (props: CollapseSetterProps) => {
  const { field, children, initialValue, defaultOpen = true, icon = true, padding = '12px 16px' } = props
  const [isOpen, setIsOpen] = useState(initialValue ?? defaultOpen)
  const contentId = useId()

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const headerContent = (
    <span className={styles.titleWrapper}>
      {icon ? <ChevronRight className={cn(styles.chevron, isOpen ? styles.chevronOpen : '')} /> : null}
      <span className={styles.title}>{field.title}</span>
    </span>
  )

  return (
    <div className={styles.container}>
      {icon ? (
        <button
          aria-controls={contentId}
          aria-expanded={isOpen}
          className={cn(styles.header, styles.headerButton)}
          onClick={handleToggle}
          type='button'
        >
          {headerContent}
        </button>
      ) : (
        <div className={styles.header}>{headerContent}</div>
      )}
      <div className={styles.content} hidden={icon ? !isOpen : false} id={contentId}>
        <div className={styles.contentInner} style={{ padding }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default CollapseSetter
