import { AppRoutes } from "./router/AppRouter"
import { ThemeProvider } from "./components/Shared/ThemeSwitcher/ThemeContext"
import './App.css'

function App() {

  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App