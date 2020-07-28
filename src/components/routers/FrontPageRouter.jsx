import React from 'react';
import { Router } from '@reach/router';
import Home from 'components/pages/frontend/Home';
import AboutUs from 'components/pages/frontend/AboutUs';
import AtoZ from 'components/pages/frontend/AtoZ';
import FAQs from 'components/pages/frontend/FAQs';
import ContactUs from 'components/pages/frontend/ContactUs';
import TermsOfUse from 'components/pages/frontend/TermsOfUse';
import PrivacyPolicy from 'components/pages/frontend/PrivacyPolicy';
import Login from 'components/pages/auth/Login';
import Logout from 'components/pages/auth/Logout';
import Register from 'components/pages/auth/Register';
import ForgotPassword from 'components/pages/auth/ForgotPassword';
import ResetPassword from 'components/pages/auth/ResetPassword';
import SearchResult from 'components/pages/frontend/SearchResult';
import FormComponents from 'components/forms/FormComponents';
import Dashboard from 'components/pages/user/Dashboard';

const FrontPageRouter = () => (
  <Router>
    <Home path="/" />
    <AboutUs path="/about-us" />
    <AtoZ path="/a-z-of-ball" />
    <FAQs path="/faqs" />
    <ContactUs path="contact-us" />
    <TermsOfUse path="terms-of-use" />
    <PrivacyPolicy path="privacy-policy" />
    <Login path="login" />
    <Login path="login/:sid" />
    <Login path="activate/:token" />
    <Logout path="logout" />
    <ForgotPassword path="forgot-password" />
    <ResetPassword path="reset-password/:token" />
    <Register path="register" />
    <SearchResult path="search/:state/:area/:houseType" />
    <FormComponents path="forms" />
    <Dashboard path="test" />
  </Router>
);

export default FrontPageRouter;
