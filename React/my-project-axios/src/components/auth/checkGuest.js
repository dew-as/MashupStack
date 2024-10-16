import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const checkGuest = (Component) => {
    function Wrapper(props) {
        var user = localStorage.getItem('user');
        const navigate = useNavigate();

        useEffect(() => {
            if (user) {
                navigate('/');
            }
        }, [user]);

        return <Component {...props} />;
    }

    return Wrapper;
};

export default checkGuest;

