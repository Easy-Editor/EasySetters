/**
 * Popover - 共享弹窗组件
 * - 使用 Portal 渲染到 document.body，避免被父容器遮挡
 * - 自动匹配触发器宽度
 */
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export interface PopoverProps {
  open: boolean
  onClose: () => void
  trigger: React.ReactNode
  children: React.ReactNode
  width?: number | 'trigger' // 弹窗宽度，'trigger' 表示匹配触发器宽度
}

const Popover = (props: PopoverProps) => {
  const { open, onClose, trigger, children, width = 'trigger' } = props

  const triggerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [popoverWidth, setPopoverWidth] = useState(0)

  // 计算弹窗位置
  useEffect(() => {
    if (open && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const triggerWidth = triggerRect.width

      // 设置弹窗宽度
      if (width === 'trigger') {
        setPopoverWidth(triggerWidth)
      }

      setPosition({
        top: triggerRect.bottom + 4,
        left: triggerRect.left,
      })
    }
  }, [open, width])

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      const popoverEl = document.querySelector('.es-popover-portal')
      if (popoverEl && !popoverEl.contains(target) && triggerRef.current && !triggerRef.current.contains(target)) {
        onClose()
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, onClose])

  return (
    <>
      <div ref={triggerRef}>{trigger}</div>
      {open
        ? createPortal(
            <div
              className='es-popover-portal'
              style={{
                position: 'fixed',
                top: position.top,
                left: position.left,
                width: popoverWidth || 'auto',
                zIndex: 1000,
              }}
            >
              {children}
            </div>,
            document.body,
          )
        : ''}
    </>
  )
}

export default Popover
