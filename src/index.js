import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
    <React.StrictMode>
        <Auth0Provider domain='dev-n0x8f459.eu.auth0.com' clientId='ygb9ly9wS2uAxFFZVcaFK5C05qjLMr99' redirectUri={window.location.origin} cacheLocation='localstorage'>
            <GithubProvider>
                <App />
            </GithubProvider>
        </Auth0Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

//got to info
//we use cache location when we neeed to save something in the loca storage,for example
//when you wanna go back in the page and you wanna see the home not the login page,

//AUTH0 provider is an api for login an autentication
//dev-n0x8f459.eu.auth0.com
//ygb9ly9wS2uAxFFZVcaFK5C05qjLMr99

//git remote add origin https://github.com/Valgram/react-search-github-users.git
//git push -u origin master
