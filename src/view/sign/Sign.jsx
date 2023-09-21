import '../../assets/fontAwesome/fontawesome-free-6.4.2-web/css/fontawesome.min.css';
import './sign.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { authSuccess } from '../../redux/slices/authSlice';
import { useNavigate } from "react-router-dom";

function Sign (){
    const signInState = {
        email: '',
        password: ''
    }
    const signUpState = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        userName: ''
    }
    const [dataSignIn, setDataSignIn] = useState(signInState);
    const [dataSignUp, setDataSignUp] = useState(useSelector(state => state.user));
    const [rememberMe, setRememberMe] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [inputSignUp, setInputSignUp] = useState(false);
    const clickSignUp = () => {
        setInputSignUp(!inputSignUp);
    }
    const formSignIn = (!inputSignUp ? "" : "none");
    const formSignUp = (inputSignUp ? "" : "none");
    const buttonSignUpAppear = (inputSignUp ? "sign-in-button" : "none");
    const divSignUpAppear = (inputSignUp ? "none" : "sign-in-button");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmitSignIn = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:3001/api/v1/user/login',
            data: dataSignIn
        })
            .then( res => {
                dispatch(authSuccess(res.data.body.token));
                localStorage.setItem("token", res.data.body.token);
                if (rememberMe) {
                    sessionStorage.setItem("token", res.data.body.token);
                  }  
                navigate(`/user`);  
                setDataSignIn(signInState);
              })
            .catch((err) => {
              setIsError(true);
              setDataSignIn(signInState);
              setErrorMessage(err.message);
            });
    }
    const handleSubmitSignUp = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:3001/api/v1/user/signup',
            data: dataSignUp
        })
            .then( res => {
                console.log(res)
                handleSubmitSignIn(e);
                setDataSignIn(signInState);
                setDataSignUp(signUpState);
              })
            .catch((err) => {
              setIsError(true);
              setDataSignIn(signInState);
              setDataSignUp(signUpState);
              setErrorMessage(err.message);
            });
    }
    const handleRememberMeChange = e => {
        setRememberMe(e.target.checked);
      };
    const handleInfoChange = (e, info) => {
        setIsError(false);
        setErrorMessage("");
        if (info === 'email'){
            setDataSignIn({...dataSignIn, email: e.target.value})
            setDataSignUp({...dataSignUp, email: e.target.value})
        } else if (info === 'password'){
            setDataSignIn({...dataSignIn, password: e.target.value})
            setDataSignUp({...dataSignUp, password: e.target.value})
        } else if (info === 'userName'){
            setDataSignUp({...dataSignUp, userName: e.target.value})
        } else if (info === 'firstName'){
            setDataSignUp({...dataSignUp, firstName: e.target.value})
        } else {
            setDataSignUp({...dataSignUp, lastName: e.target.value})
        }
        
    }
    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmitSignIn} className={formSignIn}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email"value={dataSignIn.email} onChange={e => handleInfoChange(e, 'email') } required/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password"value={dataSignIn.password} onChange={e => handleInfoChange(e, 'password')} required/>
                    </div>
                    <div className="input-wrapper">
                        <input type="checkbox" id="remember-me" checked={rememberMe} onChange={handleRememberMeChange}/>
                        <label htmlFor="remember-me">
                            Remember me
                        </label>
                    </div>
                    <button className="sign-in-button">Sign In</button> 
                    <div onClick={clickSignUp} className={divSignUpAppear}>Sign Up</div>
                    <button onClick={clickSignUp} className={buttonSignUpAppear}>Sign Up</button> 
                </form>
                <form onSubmit={handleSubmitSignUp} className={formSignUp}>
                <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email"value={dataSignUp.email} onChange={e => handleInfoChange(e, 'email')} required/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username"value={dataSignUp.userName} onChange={e => handleInfoChange(e, 'userName') } required/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password"value={dataSignUp.password} onChange={e => handleInfoChange(e, 'password')} required/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="firstname">FirstName</label>
                        <input type="text" id="firstname"value={dataSignUp.firstName} onChange={e => handleInfoChange(e, 'firstName')} required/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="lastname">LastName</label>
                        <input type="text" id="lastname"value={dataSignUp.lastName} onChange={e => handleInfoChange(e, 'lastName')} required/>
                    </div>
                    <div className="input-wrapper">
                        <input type="checkbox" id="remember-me" checked={rememberMe} onChange={handleRememberMeChange}/>
                        <label htmlFor="remember-me">
                            Remember me
                        </label>
                    </div>
                    <button className={divSignUpAppear}>Sign In</button> 
                    <div onClick={clickSignUp} className={divSignUpAppear}>Sign Up</div>
                    <button className={buttonSignUpAppear}>Sign Up</button> 
                </form>
                {isError && <p className="error-message">{errorMessage}</p>}
            </section>
        </main>
    )
}

export default Sign;