import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'
import { ChevronsUpDown } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import styles from './styles.module.css'

export interface CollapseSetterProps extends SetterProps<boolean>, PropsWithChildren {
  icon?: boolean
}

const CollapseSetter = (props: CollapseSetterProps) => {
  const { field, children, initialValue, icon = true } = props
  const [isOpen, setIsOpen] = useState(initialValue ?? true)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>{field.title}</h4>
        {icon ? (
          <button
            aria-expanded={isOpen}
            className={styles.toggleButton}
            onClick={() => setIsOpen(!isOpen)}
            type='button'
          >
            <ChevronsUpDown className={styles.toggleIcon} />
            <span className={styles.srOnly}>Toggle</span>
          </button>
        ) : null}
      </div>
      <div className={cn(styles.content, isOpen === false ? styles.contentHidden : '')}>{children}</div>
    </div>
  )
}

export default CollapseSetter
