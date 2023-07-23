import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import * as jose from 'jose';
import { useNavigate } from "react-router-dom";

const initialState: any = {
    employer: [],
    userInfo: null,
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }: any) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function editEmp(id: any) {
        dispatch({
            type: "EDIT_EMPLOYER",
            payload: id,
        })
    }

    function addEmp(emp: any) {
        dispatch({
            type: "UPDATE_EMPLOYER",
            payload: emp,
        })
    }

    const GenerateJwtToken = async (employer: any) => {
        const secretKey = new TextEncoder().encode(
          'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
        )
        const alg = 'HS256'
        const jwtToken = await new jose.SignJWT({'urn:employer:claim': true })
          .setProtectedHeader({ alg })
          .setIssuedAt(employer)
          .setIssuer('urn:employer:issuer')
          .setAudience('urn:employer:audience')
          .setExpirationTime('1h')
          .sign(secretKey)
          return jwtToken;
      }

    const getUserToken = async (userInfo: any) => {
        let accessToken = await GenerateJwtToken(userInfo);
        localStorage.setItem('access-token', JSON.stringify(accessToken))
        dispatch({
            type: 'LOGIN_USER',
            payload: userInfo,
        });
        navigate("/emplist")
    }
    
    function userTokenFail(user: any) {
        dispatch({
            type: 'LOGIN_FAIL',
            payload: user,
        })
    }

    return (
        <GlobalContext.Provider
            value={{
                employer: state.employer,
                editEmp,
                addEmp,
                getUserToken,
                userTokenFail,
            }}>
            {children}
        </GlobalContext.Provider>
    )
}



