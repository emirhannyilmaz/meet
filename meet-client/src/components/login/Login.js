import React from 'react';
import './Login.css';
import { auth, provider } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions';

function Login() {
    const dispatch = useDispatch();

    const signIn = () => {
        auth.signInWithPopup(provider).then((result) => {
            dispatch(setUser(result.user));
        }).catch((error) => {
            alert(error.message);
        });
    }

    return (
        <div className="login">
            <div className="login__container">
                <button className="button" onClick={signIn}>Sign In With Google</button>
            </div>
        </div>
    );
}

export default Login;