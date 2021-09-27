import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Animation';
import Style from './style.module.scss';
import { Switch } from './Switch';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className={Style.Layout}>
                    <Switch />
                    <Router />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
