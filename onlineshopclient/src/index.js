import React from 'react';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProductProvider} from './context';
import {createRoot} from "react-dom/client";
import { AuthProvider } from "./context/AuthProvider";


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ProductProvider>
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
                </ProductProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
    ,
);

