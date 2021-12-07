import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./components/app";
import About from "./components/about/about";
import MobileApp from "./mobile/app";
import MobileAbout from "./mobile/about";

import "./index.scss";
let windowWidth = window.innerWidth;
ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={windowWidth >= 1000 ? <App /> : <MobileApp />}
                />
                <Route
                    path="/about"
                    element={windowWidth >= 1000 ? <About /> : <MobileAbout />}
                />
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
