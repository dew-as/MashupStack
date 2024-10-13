import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserFromLocalStorage } from "../../store/authSlice";

function AutoLogin(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setUserFromLocalStorage())
    }, [])
    return props.children
}

export default AutoLogin;