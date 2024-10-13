import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"

export const checkAuth = (Component) => {
    function Wrapper(props) {
        var user = useSelector(store => store.auth.user);
        var navigate = useNavigate();
        const location = useLocation();

        useEffect(() => {
            if (!user) {
                navigate('/login/You are not authenticated');
            } else {
                navigate(location.pathname)
            }
        }, [user, navigate]);
        return <Component {...props} />;
    }
    return Wrapper;
}

export default checkAuth;