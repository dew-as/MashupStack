import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserFromLocalStorage } from "../../store/actions/authActions";

function AutoLogin(props) {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(setUserFromLocalStorage()) }, [])
    return props.children
}

export default AutoLogin;