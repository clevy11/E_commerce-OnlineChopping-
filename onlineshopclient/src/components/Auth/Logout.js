import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from "../../api/_auth";
import useAuth from "../../hooks/useAuth";

const Logout = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    useEffect(() => {
        logout();
    }, []);

    const logout = () => {
        logOut(() => {
            sessionStorage.removeItem('authData');
            setAuth(null);
            navigate('/login');
        })
    };

    return (
        <div>
            Logging out...
        </div>
    );
};
export default Logout;
