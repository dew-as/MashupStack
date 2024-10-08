import { createBrowserRouter } from "react-router-dom";
import Aboutus from "./components/AboutUs";
import App from "./App";
import ProductPage from "./components/ProductPage"
import Signup from "./components/SignUp";
import Login from "./components/Login";
import ProductForm from "./components/ProductForm";
import ProductsList from "./components/ProductsList";

const router = createBrowserRouter([
    { path: '', element: <App /> },
    { path: 'signup', element: <Signup /> },
    { path: 'login', element: <Login /> },
    { path: 'productsList', element: <ProductsList /> },
    { path: 'productPage/:id', element: <ProductPage /> },
    { path: 'productForm', element: <ProductForm /> },
    { path: 'productForm/:id', element: <ProductForm /> },
    { path: 'aboutus', element: <Aboutus /> },
]);

export default router;