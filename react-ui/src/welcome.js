import React, { useEffect } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Login } from './login';
import { Registration } from './registration';
import axios from './axios';

export function Welcome() {

    useEffect(() => {
        (async () => {
            try {
                await axios.get('/api/getInitialCookie');
            } catch(err) {
                console.log("err in axios.get('/api/getInitialCookie'", err);
            }
        })();
    },[]);

    return (
        <HashRouter>
            <div>
                <Route exact path='/' component={Registration} />
                <Route path='/login' component={Login} />
            </div>
        </HashRouter>
    );
}
