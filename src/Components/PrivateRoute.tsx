import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Route,useNavigate,Outlet } from 'react-router-dom';
import jwtDecode from "jwt-decode";

const PrivateRoute = (props: any) => {
    const navigate = useNavigate();
    const [isAuthenticated, setisAuthenticated] = useState<any>(false);
    const [isTokenValidated, setIsTokenValidated] = useState(false);

    useEffect(() => {
        let access_token: string = localStorage.getItem("access-token") || "";
        if(access_token) {
            const decodedJwt: any = jwtDecode(access_token);
            checkIfTokenExpired(decodedJwt);
        }
        else {
            navigate("/login");
        }
    }, []);

    const checkIfTokenExpired = (decodedJwt: any) => {
        if (decodedJwt?.exp < new Date().getTime() / 1000) {
            setisAuthenticated(false);
            navigate("/login")
        } else {
            setisAuthenticated(true);
            setIsTokenValidated(true);
        }
    }
    
  if (!isTokenValidated) {
    return null; // or loading indicator, etc...
  }
    // if (!isTokenValidated) return <div />; // or some kind of loading animation
    return isAuthenticated && <Outlet />;
};

export default PrivateRoute;