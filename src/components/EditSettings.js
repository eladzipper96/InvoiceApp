import { useState } from 'react'
import { useSelector } from 'react-redux';

import classes from './EditSettings.module.scss'
import Spinner from './Spinner';



const EditSettings = (props) => {
    const UserSettings = useSelector(state => state.user)
    const IsMobile = useSelector(state => state.ui.IsMobile)

    const [dataArrived, setdataArrived] =  useState(UserSettings)
    const [Settings, setSettings] = useState({
        password: UserSettings.password,
        email: UserSettings.email,
        name: UserSettings.name,
        profile_pic: UserSettings.profile_pic,
        street_address: UserSettings.street_address,
        city: UserSettings.city,
        post_code: UserSettings.post_code,
        country: UserSettings.country
    })

    function isValidHttpUrl(string) {
        let url;
        try {
          url = new URL(string);
        } catch (_) {
          return false;  
        }
      
        return url.protocol === "http:" || url.protocol === "https:";
      }
             
    
    const submithandler = () => {

        if(!isValidHttpUrl(Settings.profile_pic)) {
            Settings.profile_pic = UserSettings.profile_pic
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: UserSettings.id,
                password: Settings.password,
                email: Settings.email,
                name: Settings.name,
                profile_pic: Settings.profile_pic,
                street_address: Settings.street_address,
                city: Settings.city,
                post_code: Settings.post_code,
                country: Settings.country
           })
        }
        try {
            //fetch('http://localhost:5000/updateuser', requestOptions)
            fetch('https://api.eladinvoiceback.me/updateuser', requestOptions)
            .then(console.log("edited"))
        }
        catch {
            console.log("error server editsettings")
        }

        props.setSettingsShow(false)
    }

    return <div className={classes.container} >
        <div></div>
        {!dataArrived && <div className={classes.spinner}><Spinner></Spinner></div>}
        {dataArrived && <div className={classes.main}>
            <h1>Settings</h1>
            <div className={classes.personal}>
                <h2>Personal Information</h2>
                <div className={classes.inputs}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" defaultValue={undefined} placeholder='Password' onChange={(e)=> Settings.password=e.target.value}></input>
                </div>
                <div className={classes.inputs}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" defaultValue={Settings.email} placeholder='Email Address' onChange={(e)=> Settings.email=e.target.value}></input>
                </div>
                <div className={classes.inputs}>
                    {IsMobile &&  <label htmlFor="name">Name</label>}
                    {!IsMobile &&  <label htmlFor="name">Full Name</label>}
                    <input type="text" id="name" name="name" defaultValue={Settings.name} placeholder='Full Name' onChange={(e)=> Settings.name=e.target.value}></input>
                </div>
                <div className={classes.inputs}>
                    {IsMobile && <label htmlFor="profilepic">Photo</label>}
                    {!IsMobile && <label htmlFor="profilepic">Profile Pic.</label>}
                    <input type="text" id="profilepic" name="profilepic" defaultValue={Settings.profile_pic} placeholder='Profile Picture URL' onChange={(e)=> Settings.profile_pic=e.target.value}></input>
                </div>
            </div>
            <div className={classes.invoices}>
                <h2>Invoice Information</h2>
                <div className={classes.inputs}>
                    {!IsMobile && <label htmlFor="street_address">St. Address</label>}
                    {IsMobile && <label htmlFor="street_address">St. Add</label>}
                    <input type="text" id="street_address" name="street_address" defaultValue={Settings.street_address} placeholder='Street Address' onChange={(e)=> Settings.street_address=e.target.value}></input>
                </div>
                <div className={classes.inputs}>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="city" defaultValue={Settings.city} placeholder='City' onChange={(e)=> Settings.city=e.target.value}></input>
                </div>
                <div className={classes.inputs}>
                    {IsMobile &&  <label htmlFor="post_code">Post Co.</label>}
                    {!IsMobile &&  <label htmlFor="post_code">Post Code</label>}
                    <input type="text" id="post_code" name="post_code" defaultValue={Settings.post_code} placeholder='Post Code' onChange={(e)=> Settings.post_code=e.target.value}></input>
                </div>
                <div className={classes.inputs}>
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" name="country" defaultValue={Settings.country} placeholder='Country' onChange={(e)=> Settings.country=e.target.value}></input>
                </div>
            </div>
            
            <div className={classes.button}>
                <div onClick={submithandler}>Apply Changes</div>
                <div onClick={() => props.setSettingsShow(false)}>Cancel</div>
            </div>
        </div>}
    </div>
}

export default EditSettings;