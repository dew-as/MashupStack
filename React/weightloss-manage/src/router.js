import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./components/pages/Login";
import Home from "./components/pages/Home";
import RegisterPage from "./components/pages/Register";
import ProfilePage from "./components/pages/ProfilePage";
import WeightListPage from "./components/pages/WeightListPage";

const router = createBrowserRouter([
    { path: '', element: <Home /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/login/:msg', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/profilePage', element: <ProfilePage /> },
    { path: '/weightList', element: <WeightListPage /> },
]);

export default router;