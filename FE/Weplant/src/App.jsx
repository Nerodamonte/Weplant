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
import TemplateDetailPage from "./pages/templateDetail.jsx";
import Template2Page from "./pages/templateDetail1.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import CreateProject from "./pages/createProject.jsx";
import ForgotPasswordPage from "./pages/forgetPassword.jsx";
import ResetPasswordPage from "./pages/resetPasswordPage.jsx";
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
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/forget-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
