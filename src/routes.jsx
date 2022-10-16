import { useRoutes } from "react-router-dom";
import Login from "./frontend/pages/login";
import Register from "./frontend/pages/Register";
import MainLayOut from "./frontend/layout/MainLayOut";
import DashboardLayout from "./frontend/layout/DashboardLayout";
import UserSetting from "./frontend/pages/UserSetting";
import Landing from "./frontend/pages/Landing";
import Summary from "./frontend/components/_dashboard/Summary";
import React from "react";
import Help from "./frontend/pages/Help";
import ChatBox from "./frontend/pages/ChatBox";
export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayOut />,
      children: [
        { path: "/", element: <Landing /> },
        { path: "chatbox", element: <ChatBox /> },
        { path: "setting", element: <UserSetting /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "help", element: <Help /> },
        {
          path: "dashboard",
          element: <DashboardLayout />,
          children: [
            { path: "/dashboard", element: <Summary /> },
            
          ],
        },
      ],
    },
  ]);
}
