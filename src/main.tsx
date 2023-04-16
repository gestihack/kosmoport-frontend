import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const queryClient = new QueryClient();
import OAuth from "./components/OAuth";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App create={false} course={false}/>
    },
    {
        path: "/course/:courseId",
        element: <App course/>
    },
    {
        path: "/course/create/",
        element: <App create />
    },
    {
        path: "/oauth/",
        element: <OAuth/>
    }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>,
);
