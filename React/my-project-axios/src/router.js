import { createBrowserRouter } from "react-router-dom";
import Aboutus from "./components/AboutUs";
import ProductPage from "./components/ProductPage"
import Signup from "./components/SignUp";
import Login from "./components/Login";
import ProductForm from "./components/ProductForm";
import ProductsList from "./components/ProductsList";
import Home from "./components/Home";
import Cart from "./components/Cart";
import AdminPanel from "./components/AdminPanel";
import Unauthorized from "./components/401";

const router = createBrowserRouter([
    { path: '', element: <Home /> },
    { path: 'signup', element: <Signup /> },
    { path: 'login', element: <Login /> },
    { path: 'login/:msg', element: <Login /> },
    { path: 'productsList', element: <ProductsList /> },
    { path: 'productPage/:id', element: <ProductPage /> },
    { path: 'productForm', element: <ProductForm /> },
    { path: 'productForm/:id', element: <ProductForm /> },
    { path: 'aboutus', element: <Aboutus /> },
    { path: 'checkout', element: <Cart /> },
    { path: 'adminPanel', element: <AdminPanel /> },
    { path: '401', element: <Unauthorized /> },
]);

export default router;