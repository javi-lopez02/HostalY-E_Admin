/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useContext,
  useEffect,
  PropsWithChildren,
  FC,
} from "react";
import {loginRequest, LogoutRequest, verifyTokenRequest} from '../services/auth'
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { AuthContextType, User, UserLogin } from "../type";


export const AuthContext = createContext<AuthContextType | null>(
  null
);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(true);


  const signIn = async (values: UserLogin) => {
    try {
      const res = await loginRequest(values);
      setUser(res.data);
      setIsAuth(true);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
    
        if (axiosError.response) {

          setErrors(axiosError.response.data as Array<string>); 

        } else if (axiosError.request) {
          console.error('No se recibió respuesta:', axiosError.request);
        }
      } else {
        console.error('Error desconocido:', error);
      }
      
    }
  };

  const logout = async () => {
    try {
      await LogoutRequest();
      console.log("logout")
      setUser(null);
      setIsAuth(false);
    } catch (error) {
      console.log("error");
      console.log(error);
      //setErrors(error.response.data);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const time = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(time);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const { token } = Cookies.get();

      if (!token) {
        setIsAuth(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest();
        if (!res.data) return setIsAuth(false);
        setIsAuth(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuth(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        errors,
        loading,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// AuthProvider.propTypes = {
//   children: PropTypes.node,
// };
