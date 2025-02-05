import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../components/LoginPage/LoginPage';
import { RegisterPage } from '../components/RegisterPage/RegisterPage'; 
import { DashboardPage } from '../components/DashboardPage/DashboardPage';
import { PrivateRoute } from './PrivateRoute';
import { LandingPage } from '../components/LandingPage/LandingPage';
 
export const AppRoutes: React.FC = () => { 
  return ( 
    <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} /> 

        <Route path="/login" element={<LoginPage />} /> 
        
        <Route path="/register" element={<RegisterPage />} /> 
        
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} /> 
        </Route> 
      </Routes> 
    </Router> 
  ); 
}; 