'use client'
import { useLocation, Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import Forbidden from "../components/error/Forbidden";
import { useContext } from "react";
import { AuthContext } from '../utils/context/AuthProvider'

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useContext(AuthContext);
    try {
        const roles = auth.roles;
        return (
            roles.find(role => allowedRoles?.includes(role))
                ? <Outlet />
                : <Forbidden />
        );
    } catch (e) {
        toast.error('You have to login first');
        return <Navigate to="/login" replace />
    }

}

export default RequireAuth;