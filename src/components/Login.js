import {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/user-slice';
import { NavLink } from 'react-router-dom'
import classes from './Login.module.scss';
import img from '../assets/logo.svg';

const Login = (props) => {

const dispatch = useDispatch()
const [wrongLogin, setWrongLogin] = useState({
    bool: false,
    type: ""
})
const [user, SetUser] = useState('')
const [password, setPassword] = useState('')




useEffect(() => {
    if(sessionStorage.getItem('register')) {
        sessionStorage.removeItem('register')
    }
})

    const sumbithandler = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                username: user,
                password: password
                })
        }

        if(user.length>0 && password.length>0) {
            fetch('https://api.eladinvoiceback.me/login', requestOptions)
            //fetch('http://localhost:5000/login', requestOptions)
            .then(val => val.text())
            .then(val => JSON.parse(val))
            .then(val => {
                if(val.error) {
                    setWrongLogin({
                        bool: true,
                        type: val.error
                    })
                    setPassword('')
                }
                if(!val.error) {
                dispatch(userActions.setUser(val))
                props.setLoggedIn(true)
                }

            })
        }
        
    }

    return <div className={classes.main}>
        <img src={img} alt='Logo'></img>
        <div className={classes.box}>
            <h1>Login</h1>
                <form className={classes.form}>
                    {sessionStorage.getItem('register') && <p>Your registration have completed!</p>}
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required value={user} placeholder='Username' onChange={(e)=> SetUser(e.target.value)}></input>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required value={password} placeholder='Password' onChange={(e)=> setPassword(e.target.value)}></input>
                    {wrongLogin.bool && <small>{`Your ${wrongLogin.type} is wrong! Please Try Again`}</small>}
                    <button type="text" onClick={sumbithandler}>Login</button>
                </form>
                <span>Dont have a account?</span>
                <NavLink to='/register' activeClassName={classes.kaka}>SIGN UP</NavLink>
        </div>

    </div>

    
}

export default Login