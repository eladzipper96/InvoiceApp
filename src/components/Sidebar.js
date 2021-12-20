import classes from './Sidebar.module.scss';
import logo from '../assets/logo.svg'
import iconmoon from '../assets/icon-moon.svg';
import user from '../assets/user.svg'
import lock from '../assets/lock-open.svg'
import man from '../assets/image-avatar.jpg';
import { useSelector } from 'react-redux';
import { useState } from 'react';


const Sidebar = (props) => {

    
    var picture = useSelector(state => state.user.profile_pic)
    const [isInverted, setIsInverted] = useState(false)

    if(picture.length===0) {
        picture = man
    }

    function deleteAllCookies() {
        var cookies = document.cookie.split(";");
    
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.eladinvoiceback.me";
        }
    }

    function invert() { 
        var css = 'html {-webkit-filter: invert(100%);' +
            '-moz-filter: invert(100%);' + 
            '-o-filter: invert(100%);' + 
            '-ms-filter: invert(100%); }',
        head = document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    
    if (!window.counter) { window.counter = 1;} else  { window.counter ++;
    if (window.counter % 2 == 0) { var css ='html {-webkit-filter: invert(0%); -moz-filter: invert(0%); -o-filter: invert(0%); -ms-filter: invert(0%); }'}
     };
    
    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    
    head.appendChild(style);
    setIsInverted(val => !val)
     };
   

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }

      const cookie = getCookie('sessionid')
    
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            token: cookie
        })
    }

    const logouthandler =  (e) => {
        e.preventDefault();


        try {
            //fetch(`http://localhost:5000/logout`, requestOptions).then(console.log("logout"))
            fetch(`https://api.eladinvoiceback.me/logout`, requestOptions).then(console.log("logout"))
            .then(() => {
                if(isInverted) {
                    invert()
                }
                deleteAllCookies()
                console.log('logout')
                sessionStorage.removeItem('register')
                props.setLoggedIn(false)
            })
        }
        catch {
            console.log("logout failed, server side")
        }

    }


    return <div className={classes.sidebar}>
        <div className={classes['sidebar-top']}>
            <img className={classes['sidebar-img']} src={logo} alt="logo"></img>
        </div>

        <div className={classes['sidebar-bottom']}>
        <img className={classes['sidebar-bottom--moon']} onClick={logouthandler} src={lock} alt="Logout" title="Logout"></img>
            <img className={classes['sidebar-bottom--moon']} onClick={()=> props.setSettingsShow(true)} src={user} alt="Settings" title="Settings"></img>
            <img className={classes['sidebar-bottom--moon']} src={iconmoon} onClick={invert} alt="Dark/Light"></img>
            <hr></hr>
            <img className={classes['sidebar-bottom--man']} src={picture} alt="Profile"></img>
        </div>

    </div>
    
}

export default Sidebar;