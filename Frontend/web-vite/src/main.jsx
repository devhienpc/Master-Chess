import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import reportWebVitals from './reportWebVitals';

// Styles
import './Styles/StyleReset.css'

// Fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/inter'
import '@fontsource/inter/100.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <App/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
