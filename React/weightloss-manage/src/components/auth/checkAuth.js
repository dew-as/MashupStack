import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom"

export const checkAuth = (Component) => {
    function Wrapper(props) {
        // var user = useSelector(store=>store.auth.user);
        // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
        const isAuthenticated = JSON.parse(localStorage.getItem('isAuth'))
        var navigate = useNavigate();

        useEffect(() => {
            console.log(isAuthenticated);

            if (!isAuthenticated) {
                navigate('/login/You are not authenticated');
            }
        }, [isAuthenticated, navigate]);
        return <Component {...props} />
    }
    return Wrapper;
}

export default checkAuth;