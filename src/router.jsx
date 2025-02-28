import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard.jsx"
import Signin from "./pages/Signin.jsx"
import Signup from "./pages/Signup.jsx";

const router = createBrowserRouter([
    {path: "/", element: <App />},
    {
        path: "/dashboard", element: <Dashboard />
    },
    {
        path: "/signin", element: <Signin />
    },
    {
        path: "/signup", element: <Signup />
    }
])

export  {router};