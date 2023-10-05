import '../../assets/fontAwesome/fontawesome-free-6.4.2-web/css/fontawesome.min.css';
import './sign.scss';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { authSuccess, authRejected } from '../../redux/slices/authSlice';
import { useNavigate } from "react-router-dom";
import Alert from '../../components/alert/Alert';

function Sign (){
    const localToken = localStorage.getItem("token");
    const localState = localStorage.getItem("localState");
    const localStateParse = JSON.parse(localState);
    const signInState = localStateParse || {email: "", password: ""};
    const signUpState = {email: '', password: '', firstName: '', lastName: '', userName: ''};
    const [dataSignIn, setDataSignIn] = useState(signInState);
    const [dataSignUp, setDataSignUp] = useState(signUpState);
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [inputSignUp, setInputSignUp] = useState(false);
    const clickSignUp = () => {setInputSignUp(!inputSignUp);};
    const formSignIn = (!inputSignUp ? "" : "none");
    const formSignUp = (inputSignUp ? "" : "none");
    const buttonSignUpAppear = (inputSignUp ? "sign-in-button" : "none");
    const divSignUpAppear = (inputSignUp ? "none" : "sign-in-button");
    const rememberMyMail = dataSignIn.email || localStorage.getItem("email");
    const rememberMyPassword = dataSignIn.password || localStorage.getItem("password");
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
                sessionStorage.setItem("token", res.data.body.token);
                if (rememberMe) {
                    localStorage.setItem("token", res.data.body.token)
                    localStorage.setItem("email", dataSignIn.email);
                    localStorage.setItem("password", dataSignIn.password);
                    localStorage.setItem("localState", JSON.stringify(dataSignIn));
                } 
                if (!rememberMe){
                    setDataSignIn(signInState);
                    setDataSignIn(localStateParse);
                } 
                navigate(`/user`);
              })
            .catch((err) => {
              setDataSignIn(signInState);
              dispatch(authRejected());
              setErrorMessage(err.response.data.message);
            });
    }
    const handleSubmitSignUp = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:3001/api/v1/user/signup',
            data: dataSignUp
        })
            .then(() => {
                handleSubmitSignIn(e);
                setDataSignIn(signInState);
                setDataSignUp(signUpState);
              })
            .catch((err) => {
              setDataSignIn(signInState);
              setDataSignUp(signUpState);
              dispatch(authRejected());
              setErrorMessage(err.response.data.message);
            });
    }
    const handleRememberMeChange = e => {
        setRememberMe(e.target.checked);
      };
    const handleInfoChange = (e, info) => {
        e.preventDefault();
        if(localToken && dataSignIn.email === null && dataSignIn.password === null){
            setDataSignIn(localStateParse);
        }
        setErrorMessage("");
        if (info === 'email'){
            setDataSignIn({...dataSignIn, email: e.target.value || localStorage.getItem("email")});
            setDataSignUp({...dataSignUp, email: e.target.value});
        } else if (info === 'password'){
            setDataSignIn({...dataSignIn, password: e.target.value || localStorage.getItem("password")});
            setDataSignUp({...dataSignUp, password: e.target.value});
        } else if (info === 'userName'){
            setDataSignUp({...dataSignUp, userName: e.target.value});
        } else if (info === 'firstName'){
            setDataSignUp({...dataSignUp, firstName: e.target.value});
        } else {
            setDataSignUp({...dataSignUp, lastName: e.target.value});
        } 
        console.log(dataSignIn)
    }
    const navigateToUser = useNavigate();
    const token = useSelector((state) => state.auth.token);
    useEffect(() => {
        if(token){
            navigateToUser('/user');
        }
    },[token, navigateToUser])
    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1 className={formSignIn}>Sign In</h1>
                <h1 className={formSignUp}>Sign Up</h1>
                <form onSubmit={handleSubmitSignIn} className={formSignIn}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" value={rememberMyMail} onChange={e => handleInfoChange(e, 'email')} minLength={5} required/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={rememberMyPassword} onChange={e => handleInfoChange(e, 'password')} minLength={10} required/>
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
                        <input type="email" id="email" value={dataSignUp.email} onChange={e => handleInfoChange(e, 'email')} minLength={5} required/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={dataSignUp.userName} onChange={e => handleInfoChange(e, 'userName') } minLength={5} required/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={dataSignUp.password} onChange={e => handleInfoChange(e, 'password')} minLength={10} required/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="firstname">FirstName</label>
                        <input type="text" id="firstname" value={dataSignUp.firstName} onChange={e => handleInfoChange(e, 'firstName')} minLength={5} required/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="lastname">LastName</label>
                        <input type="text" id="lastname" value={dataSignUp.lastName} onChange={e => handleInfoChange(e, 'lastName')} minLength={5} required/>
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
               {errorMessage && <Alert alert={errorMessage}/>}
            </section>
        </main>
    )
}

export default Sign;