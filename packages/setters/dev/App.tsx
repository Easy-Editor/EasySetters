/**
 * EasySetters Dev 应用
 * 路由配置
 */
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout'
import { HomePage } from './pages/home'
import { SetterPage } from './pages/setter-page'
import { ThemeProvider } from './theme-provider'

export default function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='easy-setters-theme'>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<HomePage />} index />
            <Route element={<SetterPage />} path=':slug' />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
