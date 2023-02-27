import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layout/RootLayout";
import Private from "../layout/PrivateLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import DashboardProyect from "../pages/DasboardProyect";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "dashboard",
                element: <Private />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                    },
                    {
                        path: "/dashboard/proyect",
                        element: <DashboardProyect/>,
                    },
                ],
            },
        ],
    },
]);
