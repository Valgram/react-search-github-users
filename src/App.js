import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
//1
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        //2-41
        <AuthWrapper>
            <Router>
                {/* 3 */}
                <Switch>
                    <PrivateRoute path='/' exact={true}>
                        <Dashboard></Dashboard>
                    </PrivateRoute>
                    <Route path='/login'>
                        <Login />
                    </Route>
                    <Route path='*'>
                        <Error />
                    </Route>
                </Switch>
            </Router>
        </AuthWrapper>
    );
}

export default App;
//2 dashboard is home page, the path prop that has the slash is my domain
//the exact prop is for that whe we are in the login page the dashboard doesn't show
//3 we use switch so when we rendered the dashboard, the error page and the other way around to
//go to error
//39 we change it the route, to the private route
//Authwrapper comes from the the api an we need to wrap my whole app
