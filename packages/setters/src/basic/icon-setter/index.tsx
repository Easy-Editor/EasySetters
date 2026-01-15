import { cn } from '@/lib/utils'
import type { SetterProps } from '@easy-editor/core'
import Popover from '@/lib/popover'
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BarChart,
  BarChart2,
  Bell,
  Calendar,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  Clock,
  Cloud,
  Code,
  Copy,
  Database,
  Download,
  Edit,
  Eye,
  EyeOff,
  File,
  FileText,
  Filter,
  Folder,
  Globe,
  Grid,
  Heart,
  Home,
  Image,
  Info,
  Layers,
  Layout,
  Link,
  List,
  Loader,
  Lock,
  LogOut,
  Mail,
  Map as MapIcon,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Monitor,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Move,
  Music,
  Package,
  Pause,
  PieChart,
  Play,
  Plus,
  Power,
  Printer,
  RefreshCw,
  Save,
  Search,
  Send,
  Server,
  Settings,
  Share,
  Shield,
  ShoppingCart,
  Sidebar,
  Sliders,
  Smartphone,
  Square,
  Star,
  Sun,
  Table,
  Tag,
  Target,
  Terminal,
  ThumbsUp,
  Trash,
  TrendingDown,
  TrendingUp,
  Triangle,
  Truck,
  Tv,
  Type,
  Unlock,
  Upload,
  User,
  Users,
  Video,
  Wifi,
  X,
  XCircle,
  Zap,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import styles from './styles.module.css'

export interface IconValue {
  name: string
}

export interface IconSetterProps extends SetterProps<IconValue> {
  recent?: boolean
}

// 图标映射表
const iconMap: Record<string, LucideIcon> = {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BarChart,
  BarChart2,
  Bell,
  Calendar,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  Clock,
  Cloud,
  Code,
  Copy,
  Database,
  Download,
  Edit,
  Eye,
  EyeOff,
  File,
  FileText,
  Filter,
  Folder,
  Globe,
  Grid,
  Heart,
  Home,
  Image,
  Info,
  Layers,
  Layout,
  Link,
  List,
  Loader,
  Lock,
  LogOut,
  Mail,
  Map: MapIcon,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Monitor,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Move,
  Music,
  Package,
  Pause,
  PieChart,
  Play,
  Plus,
  Power,
  Printer,
  RefreshCw,
  Save,
  Search,
  Send,
  Server,
  Settings,
  Share,
  Shield,
  ShoppingCart,
  Sidebar,
  Sliders,
  Smartphone,
  Square,
  Star,
  Sun,
  Table,
  Tag,
  Target,
  Terminal,
  ThumbsUp,
  Trash,
  TrendingDown,
  TrendingUp,
  Triangle,
  Truck,
  Tv,
  Type,
  Unlock,
  Upload,
  User,
  Users,
  Video,
  Wifi,
  X,
  XCircle,
  Zap,
  ZoomIn,
  ZoomOut,
}

// 常用图标列表
const commonIcons = Object.keys(iconMap)

const defaultValue: IconValue = {
  name: 'Circle',
}

const IconSetter = (props: IconSetterProps) => {
  const { value, initialValue, onChange, recent = true } = props

  const currentValue = value ?? initialValue ?? defaultValue
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [recentIcons, setRecentIcons] = useState<string[]>([])

  // 获取图标组件
  const getIconComponent = useCallback((iconName: string): LucideIcon => iconMap[iconName] || Circle, [])

  // 过滤图标
  const filteredIcons = useMemo(() => {
    if (!searchQuery) {
      return commonIcons
    }
    const query = searchQuery.toLowerCase()
    return commonIcons.filter(icon => icon.toLowerCase().includes(query))
  }, [searchQuery])

  // 选择图标
  const handleSelectIcon = useCallback(
    (iconName: string) => {
      onChange({ name: iconName })
      setRecentIcons(prev => {
        const newRecent = [iconName, ...prev.filter(i => i !== iconName)].slice(0, 8)
        return newRecent
      })
      setOpen(false)
    },
    [onChange],
  )

  const CurrentIcon = getIconComponent(currentValue.name)

  return (
    <Popover
      onClose={() => setOpen(false)}
      open={open}
      trigger={
        <button aria-label='Select icon' className={styles.trigger} onClick={() => setOpen(true)} type='button'>
          <CurrentIcon className={styles.triggerIcon} />
          <span className={styles.triggerText}>{currentValue.name}</span>
        </button>
      }
    >
      <div className={styles.popover}>
        {/* 搜索框 */}
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder='搜索图标...'
            type='text'
            value={searchQuery}
          />
        </div>

        {/* 最近使用 */}
        {recent === true && recentIcons.length > 0 && searchQuery === '' ? (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>最近使用</div>
            <div className={styles.iconGrid}>
              {recentIcons.map(iconName => {
                const Icon = getIconComponent(iconName)
                return (
                  <button
                    aria-label={iconName}
                    className={cn(styles.iconButton, currentValue.name === iconName ? styles.iconButtonSelected : '')}
                    key={iconName}
                    onClick={() => handleSelectIcon(iconName)}
                    title={iconName}
                    type='button'
                  >
                    <Icon className={styles.iconButtonIcon} />
                  </button>
                )
              })}
            </div>
          </div>
        ) : null}

        {/* 图标网格 */}
        <div className={styles.iconGrid}>
          {filteredIcons.map(iconName => {
            const Icon = getIconComponent(iconName)
            return (
              <button
                aria-label={iconName}
                className={cn(styles.iconButton, currentValue.name === iconName ? styles.iconButtonSelected : '')}
                key={iconName}
                onClick={() => handleSelectIcon(iconName)}
                title={iconName}
                type='button'
              >
                <Icon className={styles.iconButtonIcon} />
              </button>
            )
          })}
        </div>

        {/* 无结果提示 */}
        {filteredIcons.length === 0 ? <div className={styles.emptyMessage}>未找到匹配的图标</div> : null}
      </div>
    </Popover>
  )
}

export default IconSetter
