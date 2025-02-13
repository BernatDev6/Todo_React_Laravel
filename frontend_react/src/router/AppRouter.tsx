import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../components/LoginPage/LoginPage';
import { RegisterPage } from '../components/RegisterPage/RegisterPage';
import { DashboardPage } from '../components/DashboardPage/DashboardPage';
import { PrivateRoute } from './PrivateRoute';
import { LandingPage } from '../components/LandingPage/LandingPage';
import { UserPannel } from '../components/UserPannel/UserPannel';
import { PrivacyPolicy } from '../components/SeguridadProteccionDatos/ProtectedData';
import { LegalNotice } from '../components/SeguridadProteccionDatos/ProtectedData';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/userPannel" element={<UserPannel />} />
      
      <Route path="/privacyPolicy" element={<PrivacyPolicy />} />

      <Route path="/legalNotice" element={<LegalNotice />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}; 