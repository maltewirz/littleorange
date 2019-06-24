import React, { useEffect, useState } from 'react';
import axios from "./axios";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Bogen from './bogen';


export function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <div className="header">
                    <Link to="/"> Start </Link>
                    <Link to="/bogen"> Bogen </Link>
                    <a href="/logout"> Logout </a>
                </div>

                <div className="content">
                    <Route path="/bogen" component={Bogen} />
                </div>
            </div>
        </BrowserRouter>
    );
}
