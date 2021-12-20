import classes from './Register.module.scss'
import { NavLink } from 'react-router-dom'
import img from '../assets/logo.svg'

const Register = (props) => {

    var user = ''
    var password = ''
    var validatepass = ''
    var email = ''
    var name = ''
    var wrongpassword = false

    const submithandler = (e) => {
        
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: user,
                password: password,
                email: email,
                name: name})
        }

        if(user.length>0 && password.length>0 && validatepass.length>0 && email.length>0 && name.length>0) {
            fetch('https://api.eladinvoiceback.me/adduser', requestOptions)
            .then(res => {
                console.log(res)
                window.location.href ='/'
                sessionStorage.setItem('register', true) 
            })
            //props.setRegister(false)
            //window.location.reload()

         }

    }
    return <div className={classes.main}>
        <img src={img} alt="Logo"></img>
        <div className={classes.box}>
            <h1>Register</h1>
            <form className={classes.form}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required defaultValue={undefined} placeholder='Username' onChange={(e)=> user=e.target.value}></input>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required defaultValue={undefined} placeholder='Password' onChange={(e)=> password=e.target.value}></input>
                <label htmlFor="con_password">Confirm Password</label>
                <input type="password" id="con_password" name="con_password" required defaultValue={undefined} placeholder='Confirm Password' onChange={(e)=> validatepass=e.target.value}></input>
                {wrongpassword && <p>Passwords are not matched!</p>}
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" required defaultValue={undefined} placeholder='Email' onChange={(e)=> email=e.target.value}></input>
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" defaultValue={undefined} required placeholder='Name' onChange={(e)=> name=e.target.value}></input>
                <button onClick={submithandler} type="sumbit" >Submit</button>
                <NavLink to="/"> <button className={classes.cancel} type="text" >Cancel</button></NavLink>

            </form>
        </div>
    </div>
}

export default Register;

//                 <button className={classes.cancel} onClick={()=> props.setRegister(false)}type="text" >Cancel</button>