// import Auth from "./pages/AuthPages/Auth";
// import Cart from "./pages/Cart/Cart";
// import ProductsPage from "./pages/ProductsPage/Products";
import { LOGIN_ROUTE, HOME_ROUTE, REGISTER_ROUTE, CART_ROUTE } from "./utils/consts";

import Auth from "./pages/Authentication/Auth";
import homePage from "./pages/homePage/homePage";
import Cart from "./pages/Cart.js/Cart";
import { Navigate } from "react-router-dom";



export const authorizedRoutes = [

    {
        Element: Cart,
        path: CART_ROUTE,

    },
    {
        Element: homePage,
        path: HOME_ROUTE,
    },

]


export const publicRoutes = [
    {
        Element: Auth,
        path: LOGIN_ROUTE,
    },
    {
        Element: Auth,
        path: REGISTER_ROUTE,
    }

]
