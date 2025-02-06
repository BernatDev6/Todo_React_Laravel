import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router/AppRouter";
import { ThemeProvider } from "./components/Shared/ThemeSwitcher/ThemeContext";
import { MainMenu } from "./components/Shared/MainMenu/MainMenu";
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MainMenu />
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
