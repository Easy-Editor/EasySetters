import type { SetterProps } from '@easy-editor/core'
import styles from './styles.module.css'

export interface NodeIdSetterProps extends SetterProps<string> {}

const NodeIdSetter = (props: NodeIdSetterProps) => {
  const { selected } = props

  return (
    <div className={styles.container}>
      <p className={styles.id}>{selected.id}</p>
      <p className={styles.title}>{selected.componentMeta.title}</p>
    </div>
  )
}

export default NodeIdSetter
