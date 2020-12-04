import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import loginImg from '../images/login-img.svg';
const Login = () => {
    //40
    const { loginWithRedirect } = useAuth0();
    return (
        <Wrapper>
            <div className='container'>
                <img src={loginImg} alt='github user'></img>
                <h1>github user</h1>
                <button className='btn' onClick={loginWithRedirect}>
                    login / sign up
                </button>
            </div>
        </Wrapper>
    );
};
const Wrapper = styled.section`
    min-height: 100vh;
    display: grid;
    place-items: center;
    .container {
        width: 90vw;
        max-width: 600px;
        text-align: center;
    }
    img {
        margin-bottom: 2rem;
    }
    h1 {
        margin-bottom: 1.5rem;
    }
`;
export default Login;

//go to dashboard page

//40 we have to create the const with the prop loginWithRedirect, and we create
//onClick
