import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/constants/routes";
import { useAuthStore } from "../store/AuthStore";


export const useLogout = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    const [loading, setLoading ] = useState<boolean>(false);

    const handleLogout = async () => {
        try{
            setLoading(true);
            // llamamos al adapter AuthAdapter.logout para cerrar sesión desde back (futuro)
            //await AuthAdapter.logout();
            logout();// => eliminamos el accessToken de sessionStorage
            // redirigimos al home
            navigate(ROUTES.HOME);
            return Promise.resolve();
        }catch(error){
            console.error('Error al cerrar sesión: ', error);
            return Promise.reject(error);
        }finally{
            setLoading(false);
        }
    }

    return { handleLogout, loading }

}