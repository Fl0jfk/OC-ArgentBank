import '../../assets/fontAwesome/fontawesome-free-6.4.2-web/css/fontawesome.min.css';
import './sign-in.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { authSuccess } from '../../redux/Slices/authSlice';
import { useNavigate } from "react-router-dom";
import CreateAccount from '../../components/createAccount/CreateAccount';

function SignIn (){
    const initialState = {
        email: '',
        password: ''
    }
    const [data, setData] = useState(initialState);
    const [rememberMe, setRememberMe] = useState(false);
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:3001/api/v1/user/login',
            data: data
        })
            .then( res => {
                dispatch(authSuccess(res.data.body.token));
                if (rememberMe) {
                    localStorage.setItem("token", res.data.body.token);
                  }  
                navigate(`/user`);  
                setData(initialState);
              })
            .catch(() => {
              setIsError(true);
              setData(initialState);
            });
    }
    const handleRememberMeChange = e => {
        setRememberMe(e.target.checked);
      };
    const handleInfoChange = (e, info) => {
        setIsError(false);
        if (info === 'email'){
            setData({...data, email: e.target.value})
        } else {
            setData({...data, password: e.target.value})
        }
    }
    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username"value={data.email} onChange={e => handleInfoChange(e, 'email') } required/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password"value={data.password} onChange={e => handleInfoChange(e, 'password')} required/>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" checked={rememberMe} onChange={handleRememberMeChange}/>
                        <label htmlFor="remember-me">
                            Remember me
                        </label>
                    </div>
                    <button className="sign-in-button">Sign In</button>
                    <CreateAccount/>
                </form>
                {isError && <p className="error-message">Mauvais e-mail ou mot de passe</p>}
            </section>
        </main>
    )
}

export default SignIn