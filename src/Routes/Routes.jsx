import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import Login from "../Pages/Auth/Login";
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import Otp from "../Pages/Auth/Otp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import Management from "../Pages/Dashboard/Management";
import Profile from "../Pages/Dashboard/Profile";
import Notification from "../Pages/Dashboard/Notification";
import FAQ from "../Pages/Dashboard/FAQ";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy";
import TermsCondition from "../Pages/Dashboard/TermsCondition";
import AdminRoutes from "../PrivetRoutes/AdminRoutes";
import VendorRequest from "../Pages/Dashboard/VendorRequest";
import Users from "../Pages/Dashboard/Users";
import Vendors from "../Pages/Dashboard/Vendors";
import Events from "../Pages/Dashboard/Events";
import AboutUs from "../Pages/Dashboard/AboutUs";

export const Routes = createBrowserRouter([
    {
        path: '/',
        element: <AdminRoutes><Dashboard /></AdminRoutes>,
        children: [
            {
                path: '/',
                element: <DashboardHome />
            },
            {
                path: '/vendor-request',
                element: <VendorRequest />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/events',
                element: <Events />
            },
            {
                path: '/vendors',
                element: <Vendors />
            },
            {
                path: '/management',
                element: <Management />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/notification',
                element: <Notification />
            },
            {
                path: '/faq',
                element: <FAQ />
            },
            {
                path: '/privacy-policy',
                element: <PrivacyPolicy />
            },
            {
                path: '/about-us',
                element: <AboutUs />
            },
            {
                path: '/terms-&-condition',
                element: <TermsCondition />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/forget-password',
        element: <ForgetPassword />
    },
    {
        path: '/otp',
        element: <Otp />
    },
    {
        path: '/reset-password',
        element: <ResetPassword />
    },
])