import { lazy } from 'react';
import EmailVerification from '../pages/Authentications/Register/EmailVerification';
import ResetEmailSent from '../pages/Authentications/ForgetPassword/ResetEmailSent';

const Login = lazy(() => import('../pages/Authentications/Login/Login'));
const ForgetForm = lazy(() => import('../pages/Authentications/ForgetPassword/ForgetForm'));
const Register = lazy(() => import('../pages/Authentications/Register/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const KnowledgeBase = lazy(() => import('../pages/KnowledgeBase/KnowledgeBase'));
const Calender = lazy(() => import('../pages/Calender/Calender'));
const AccountSetting = lazy(() => import('../pages/AccountSetting/AccountSetting'));

const routes = [
    {
        path: '/',
        element: <Dashboard />,
        layout: 'default',
    },
    // Login Page (Public)
    {
        path: '/auth/login',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '/auth/register',
        element: <Register />,
        layout: 'blank',
    },
    {
        path: '/auth/forgot-password',
        element: <ForgetForm />,
        layout: 'blank',
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        layout: 'default',
    },
    {
        path: '/users/account-setting',
        element: <AccountSetting />,
        layout: 'default',
    },
    {
        path: '/app/knowledge-base',
        element: <KnowledgeBase />,
        layout: 'default',
    },
    {
        path: '/app/calender',
        element: <Calender />,
        layout: 'default',
    },
    {
        path: '/email-verify',
        element: <EmailVerification />,
        layout: 'blank',
    },
    {
        path: '/auth/reset-email-sent',
        element: <ResetEmailSent />,
        layout: 'blank',
    },
];

export { routes };
