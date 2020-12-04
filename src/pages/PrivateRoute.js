import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
//36
const PrivateRoute = ({ children, ...rest }) => {
    //39
    const { isAuthenticated, user } = useAuth0();
    //37
    const isUser = isAuthenticated && user;
    //38
    return (
        <Route
            {...rest}
            render={() => {
                return isUser ? children : <Redirect to='/login'></Redirect>;
            }}
        ></Route>
    );
};
export default PrivateRoute;

//36 we wanna render the children that is gonna be the dasboard, that is why
//we put children, because we are gonna wrap our api with private route
//we wanna bring the properties we have in the app(i mean path, exact...), thats why here we are using the spread operator
//and then we putting a name called rest

//37 we create a local variable that its gonna be isUser
// so ...res in private route we wanna collecting the props, and then we are setting then in my new
//route
//38 in the render we are saying the user is true? then render the children
//all my app, if not then render the rediret that is gonna send us to login
//39 we create a variable that has the authentication of useAuth0
