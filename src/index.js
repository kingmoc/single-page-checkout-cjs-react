import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import 'semantic-ui-css/semantic.min.css'
import App from './App';

// router import
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
    <Router>
        <App />
    </Router>
,document.getElementById('root'));
