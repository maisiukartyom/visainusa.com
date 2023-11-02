import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import axios from '../api/axios'

const RequireAuth = ({ allowedRoles, allowedLevel }) => {
    const { auth, clearAuthentication } = useAuth();
    const location = useLocation();
    //console.log(allowedRoles, auth);

    useEffect(() => {
        async function checkCredentials() {
            try{
                await axios.post("/auth/check", {
                    email: auth.email,
                    level: auth.level,
                    roles: auth.roles
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                })
            }
            catch (err){
                console.log(err)
                clearAuthentication();
            }

        }

        checkCredentials();
    }, [])

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role)) && auth?.level >= allowedLevel
            ? <Outlet />
            : auth?.email
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;