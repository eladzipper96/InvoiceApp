import './App.css';
import { useState, useEffect } from 'react'
import { Route, Redirect, Switch, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Invoices from './components/Invoices';
import Login from './components/Login';
import Register from './components/Register';
import EditSettings from './components/EditSettings';

function App() {

const Location = useLocation()   
const [LoggedIn, setLoggedIn] = useState (false);
const [LoggedUser, setLoggedUser] = useState(false); // From the Login component we revice the user
const [SettingsShow, setSettingsShow] = useState(false)


useEffect(() => {

    
    const cookieChecker = async () => {
        try {
            const response = await fetch(`https://api.eladinvoiceback.me/cookiecheck`, {credentials: 'include'})
            //const response = await fetch(`http://localhost:4000/cookiecheck`, {credentials: 'include'})
            const result = await response.text()
            const final = JSON.parse(result);
    
            if(final.result) {
                setLoggedIn(true)
            }
        }
        catch {
            console.log("not logged in")
        }

    }
    cookieChecker()
},[])

      return (
      <div className='App'>
          <Switch>
          
          {(Location.pathname.length<11 && Location.pathname!=='/register' && LoggedIn) && <Redirect to='/invoices'/>}

          {(Location.pathname.length<1000000 && Location.pathname!=='/register' && Location.pathname!=='/' && !LoggedIn) && <Redirect to='/'/>}

            <Route path='/register'> 
                <Register/>
            </Route>

            <Route path='/' exact> 
                {(!LoggedIn) &&  <Login setLoggedIn={setLoggedIn} setLoggedUser={setLoggedUser} /> }
                {LoggedIn && <Redirect to='/invoices'/>}
            </Route>

          </Switch>

            {LoggedIn && <Sidebar setLoggedIn={setLoggedIn} setSettingsShow={setSettingsShow} />}
            {LoggedIn &&  <Invoices user={LoggedUser} LoggedIn={LoggedIn}/> }
            {(SettingsShow && LoggedIn) && <EditSettings setSettingsShow={setSettingsShow}/>}
                     
      </div> )
      
}

export default App;

//  {(!LoggedIn && Registershow) && <Register setRegister={setRegister}/>}
