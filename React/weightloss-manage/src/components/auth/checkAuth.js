import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom"

export const checkAuth = (Component) => {
    function Wrapper(props) {
        // var user = useSelector(store=>store.auth.user);
        const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
        var navigate = useNavigate();

        useEffect(() => {
            if (!isAuthenticated) {
                navigate('/login/You are not authenticated');
            }
        }, [isAuthenticated, navigate]);
        return <Component {...props} />
    }
    return Wrapper;
}

export default checkAuth;