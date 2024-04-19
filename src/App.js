import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";

const router = createBrowserRouter([
  { path: "/", element: <Browse /> },
  { path: "/search", element: <Search /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
