import { Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className='dev-theme-toggle'>
      <button
        className={`dev-theme-btn ${theme === 'light' ? 'active' : ''}`}
        onClick={() => setTheme('light')}
        title='浅色模式'
        type='button'
      >
        <Sun size={16} />
      </button>
      <button
        className={`dev-theme-btn ${theme === 'dark' ? 'active' : ''}`}
        onClick={() => setTheme('dark')}
        title='深色模式'
        type='button'
      >
        <Moon size={16} />
      </button>
    </div>
  )
}
