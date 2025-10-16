import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import RegisterPage from "./pages/registerPage.jsx";
import AuthenticatedPage from "./pages/authenticatedPage.jsx";
import AdminPage from "./pages/adminPage.jsx";
import ProfileInteract from "./pages/profileInteract.jsx";
import ViewTemplates from "./pages/viewTemplates.jsx";
import PricingPage from "./pages/pricingPage.jsx";
import TemplateDetailPage from "./templates/templateDetail.jsx";
import Template2Page from "./templates/templateDetail1.jsx";
import Template3Page from "./templates/templateDetail2.jsx";
import TemplateDetail3 from "./templates/templateDetail3.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import CreateProject from "./pages/createProject.jsx";
import ForgotPasswordPage from "./pages/forgetPassword.jsx";
import ResetPasswordPage from "./pages/resetPasswordPage.jsx";
import ActivateAccountPage from "./pages/activeAccount.jsx";
import TemplateDetail4 from "./templates/templateDetail4.jsx";
import TemplateN1 from "./templates/templateN1.jsx";
import TemplateN2 from "./templates/templateN2.jsx";
import TemplateN3 from "./templates/templateN3.jsx";
import TemplateN4 from "./templates/templateN4.jsx";
import TemplateN5 from "./templates/templateN5.jsx";
import TemplateN6 from "./templates/templateN6.jsx";
import TemplateN7 from "./templates/templateN7.jsx";
import TemplateN8 from "./templates/templateN8.jsx";
import TemplateN9 from "./templates/templateN9.jsx";
import TemplateN10 from "./templates/templateN10.jsx";
import PaymentListPage from "./pages/paymentList.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/authen" element={<AuthenticatedPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile/:id" element={<ProfileInteract />} />
        <Route path="/templates" element={<ViewTemplates />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/templates/1" element={<TemplateDetailPage />} />
        <Route path="/templates/2" element={<Template2Page />} />
        <Route path="/templates/3" element={<Template3Page />} />
        <Route path="/templates/4" element={<TemplateDetail3 />} />
        <Route path="/templates/5" element={<TemplateDetail4 />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/forget-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/activate-account" element={<ActivateAccountPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/templates/6" element={<TemplateN1 />} />
        <Route path="/templates/7" element={<TemplateN2 />} />
        <Route path="/templates/8" element={<TemplateN3 />} />
        <Route path="/templates/9" element={<TemplateN4 />} />
        <Route path="/templates/10" element={<TemplateN5 />} />
        <Route path="/templates/11" element={<TemplateN6 />} />
        <Route path="/templates/12" element={<TemplateN7 />} />
        <Route path="/templates/13" element={<TemplateN8 />} />
        <Route path="/templates/14" element={<TemplateN9 />} />
        <Route path="/templates/15" element={<TemplateN10 />} />
        <Route path="/payments" element={<PaymentListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
