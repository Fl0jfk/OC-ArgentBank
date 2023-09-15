import '../../assets/fontAwesome/fontawesome-free-6.4.2-web/css/fontawesome.min.css';
import './sign-in.scss';
import { useState } from 'react';
//import { useDispatch } from 'react-redux';


function SignIn (){
    const initialState = {
        email: '',
        password: ''
    }
    const [data, setData] = useState(initialState);
    //const dispatch = useDispatch();
    const handleSubmit = e => {
        e.preventDefault();
       // dispatch(addUserAction(data))
    }
    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username"value={data.email} onChange={e => setData({...data, email: e.target.value})} required/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password"value={data.password} onChange={e => setData({...data, password: e.target.value})} required/>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me"/>
                        <label htmlFor="remember-me">
                            Remember me
                        </label>
                    </div>
                    <button className="sign-in-button">Sign In</button>
                </form>
            </section>
        </main>
    )
}

export default SignIn