import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../components/LoginPage/LoginPage';
import { RegisterPage } from '../components/RegisterPage/RegisterPage'; 
import { DashboardPage } from '../components/DashboardPage/DashboardPage';
import { PrivateRoute } from './PrivateRoute';
 
export const AppRoutes: React.FC = () => { 
  return ( 
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} /> 
        
        <Route path="/register" element={<RegisterPage />} /> 
        
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} /> 
        </Route> 
      </Routes> 
    </Router> 
  ); 
}; 