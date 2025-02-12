import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router/AppRouter";
import { ThemeProvider } from "./components/Shared/ThemeSwitcher/ThemeContext";
import { MainMenu } from "./components/Shared/MainMenu/MainMenu";
import { FooterComp } from "./components/Shared/FooterComp/FooterComp"
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div id="app">
          <MainMenu />
          <div id="main">
            <AppRoutes />
          </div>
          <FooterComp />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
