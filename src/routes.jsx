import {useRoutes} from 'react-router-dom';
import Login from "./frontend/pages/login";
import Register from "./frontend/pages/Register";
import MainLayOut from "./frontend/layout/MainLayOut";
import ShoppingCart from "./frontend/pages/ShoppingCart";
import Shopping from "./frontend/pages/Shopping";
import Order from "./frontend/pages/Order";
import DashboardLayout from "./frontend/layout/DashboardLayout";
import UserSetting from "./frontend/pages/UserSetting";
import CurrentPasswordCheck from "./frontend/pages/CurrentPasswordCheck";
import Setpreference from "./frontend/pages/Setpreference";
import Checkout from "./frontend/pages/Checkout";
import Landing from "./frontend/pages/Landing";
import Product from "./frontend/components/_dashboard/Product";
import AddProduct from "./frontend/components/_dashboard/AddProduct";
import UpdateProduct from "./frontend/components/_dashboard/UpdateProduct";
import Summary from "./frontend/components/_dashboard/Summary";
import React from "react";
import ProductDetail from "./frontend/pages/ProductDetail";
import FindPassword from "./frontend/pages/FindPassword";
import Users from "./frontend/components/_dashboard/Users"
import Report from "./frontend/pages/Report";
import UserIssue from "./frontend/components/UserIssueView"
import CreateAdmin from "./frontend/components/_dashboard/CreateAdmin"
import AdminIssue from "./frontend/components/Issueview";
import Transaction from "./frontend/components/_dashboard/Transaction";
import Help from "./frontend/pages/Help";

export default function Router(){
    return useRoutes([
        {
            path: '/',
            element: <MainLayOut/>,
            children: [
                { path: '/', element: <Landing /> },
                { path: 'shoppingCart', element: <ShoppingCart /> },
                { path: 'shopping', element: <Shopping /> },
                { path: 'setting', element: <UserSetting /> },
                { path: 'preference', element: <Setpreference /> },
                { path: 'checkout', element: <Checkout /> },
                { path: 'password', element: <CurrentPasswordCheck /> },
                { path: 'findpassword', element: <FindPassword /> },
                { path: 'login', element: <Login /> },
                { path: 'register', element: <Register /> },
                { path: 'order', element: <Order /> },
                { path: 'help', element: <Help />},
                { path: 'report', element: <UserIssue/> },
                { path: 'addReport', element: <Report/> },
                { path: '/:productname', element: <ProductDetail/> },
                { path: 'dashboard', element: <DashboardLayout/>,
                    children: [
                        { path: '/dashboard', element: <Summary />},
                        { path: '/dashboard/product', element: <Product /> },
                        { path: '/dashboard/addProduct', element: <AddProduct /> },
                        { path: '/dashboard/updateProduct', element: <UpdateProduct /> },
                        { path: '/dashboard/users', element: <Users/>},
                        { path: '/dashboard/addAdmin', element:<CreateAdmin/>},
                        { path: '/dashboard/issues', element:<AdminIssue/>},
                        { path: '/dashboard/transaction', element: <Transaction />}
                    ]}
            ]
        },
    ]);
}
