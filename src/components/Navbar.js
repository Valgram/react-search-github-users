import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
    //31
    const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0();
    //33
    const isUser = isAuthenticated && user;
    // console.log({ isAuthenticated, user, isLoading });
    return (
        //32
        <Wrapper>
            {/* 34 */}
            {isUser && user.picture && <img src={user.picture} alt={user.name}></img>}
            {isUser && user.name && (
                <h4>
                    welcome, <strong>{user.name.toUpperCase()}</strong>
                </h4>
            )}
            {/* 35 */}
            {isUser ? (
                <button
                    onClick={() => {
                        logout({ returnTo: window.location.origin });
                    }}
                >
                    logout{' '}
                </button>
            ) : (
                <button onClick={loginWithRedirect}>login</button>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.nav`
    padding: 1.5rem;
    margin-bottom: 4rem;
    background: var(--clr-white);
    text-align: center;
    display: grid;
    grid-template-columns: auto auto 100px;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    h4 {
        margin-bottom: 0;
        font-weight: 400;
    }
    img {
        width: 35px !important;
        height: 35px;
        border-radius: 50%;
        object-fit: cover;
    }
    button {
        background: transparent;
        border: transparent;
        font-size: 1.2rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        color: var(--clr-grey-5);
        cursor: pointer;
    }
`;

export default Navbar;
//this is for login in an log out
//31 this comes from auth0, we are d estructuring
//32 in logout, that are the props we have to use, we are setting the
//return, it means were we are gonna go when we log out
//33 isAuthenticated, User, comes from the propertie that we saw in the console.log
//34 if use is true, and there is user.picture?(the user.picture is an extra step)
// if that its the case then we are gonna go with our image

//the other line, if user is true an there is a use. name then we create an h4

//35 isUser true? yes, then show me the log out button, if not show the login button
