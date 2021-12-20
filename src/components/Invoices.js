// ---------------- Depenencies Import ------------------
import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui-slice';
import { Route, Redirect, useLocation  } from 'react-router-dom'
import classes from './Invoices.module.scss';
//--------------------------------------------------------

// ---------------- Components import --------------------
import InvoicesEmpty from './Invoices_components/InvoicesEmpty';
import InvoicesNav from './Invoices_components/InvoicesNav';
import NewInvoice from './newinvoice/NewInvoice';
import EditInvoice from './newinvoice/EditInvoice';
import InvoiceDarken from './Invoices_components/InvoiceDarken';
import InvoicesList from './Invoices_components/InvoicesList';
import Spinner from './Spinner.js'
import { userActions } from '../store/user-slice';
// -------------------------------------------------------------

const Invoices = (props) => {

const dispatch = useDispatch();
const isMobile = useSelector(state => state.ui.IsMobile);
const EmptyInvoices = useSelector(state => state.ui.showEmptyInvoices);
const showEditInvoice = useSelector(state => state.ui.showEditInvoice);
const userInformation = useSelector(state => state.user)
const Location = useLocation()

const [showNewInvoice, set_ShowNewInvoice] = useState(false);
const [filterMarks, setfilterMarks] = useState([]); 
const [editInvoiceValues, setEditInvoiceValues] = useState([]);
const [newInvoice, SetNewInvoice] = useState(false);
const [invoicesCount, setInvoicesCount] = useState(0);
const [dataArrived, setdataArrived] =  useState(false)
const [data, setData] = useState([])


useEffect(()=> {

    async function Invoicesfetch ()  {
        
        const response = await fetch(`https://api.eladinvoiceback.me/invoices`, {credentials: 'include'});
        //const response = await fetch(`http://localhost:4000/invoices`, {credentials: 'include'});
        const result = await response.text();
        const final = JSON.parse(result);
        if(final.length>0 ) {
            dispatch(uiActions.setEmptyInvoices(false))
        }
        setInvoicesCount(final.length);
        setData(final)
        setdataArrived(true)       
    }

    async function userInformationFetch () {
        const response = await fetch(`https://api.eladinvoiceback.me/userinformation`, {credentials: 'include'})
        //const response = await fetch(`http://localhost:4000/userinformation`, {credentials: 'include'});
        const result = await response.text();
        const final = JSON.parse(result);
        dispatch(userActions.setUser(final))
    }

    Invoicesfetch()

    if(!userInformation.fetch) {
        userInformationFetch()
    }
},[])


const hideNewInvoice = () => {
    set_ShowNewInvoice(val => !val);
}

const hideEditInvoice = () => {
    dispatch(uiActions.setEditInvoice(false))
}


const getfilterby = (str) => {
    if(filterMarks.includes(str)){
        const new_arr = filterMarks.filter(val => val!==str)
        setfilterMarks(new_arr)
    }
    else {
        setfilterMarks(val => [str,...val])
    }

}

    if(isMobile && (showNewInvoice || showEditInvoice)) {
        return <div className={classes.invoices}>

        {showNewInvoice && <NewInvoice SetNewInvoice={SetNewInvoice} Display_NewInvoice={set_ShowNewInvoice} display_newinvoice={showNewInvoice} newInvoice={newInvoice}/>}
        {showEditInvoice && <EditInvoice values={editInvoiceValues} setValues={setEditInvoiceValues}/>}   

        {showNewInvoice && <InvoiceDarken onPress={hideNewInvoice}/>} 
        {showEditInvoice && <InvoiceDarken onPress={hideEditInvoice}/>} 
        

    </div> 
    }


   return <div className={classes.invoices}>

                <InvoicesNav size={invoicesCount} filterMarks={filterMarks} ForInvDropdown={getfilterby} onPress={hideNewInvoice}/>
                {!dataArrived && <Spinner></Spinner>}

                <Route path='/invoices'> 
                {(EmptyInvoices && dataArrived) && <InvoicesEmpty />}
                {(dataArrived && !EmptyInvoices) && <InvoicesList filter={filterMarks} updateValues={setEditInvoiceValues} newInvoice={newInvoice} SetNewInvoice={SetNewInvoice} Invoicenumber={setInvoicesCount} number={invoicesCount} user={props.user} data={data}/>}
                {(dataArrived && !EmptyInvoices ) && <Redirect to={Location.pathname}/>}
                {(dataArrived && !EmptyInvoices && Location.pathname.length<10) && <Redirect to='invoices/all'/>}
                {!props.LoggedIn && <Redirect to='/'/>}
                </Route>

                {showNewInvoice && <NewInvoice SetNewInvoice={SetNewInvoice} Display_NewInvoice={set_ShowNewInvoice} display_newinvoice={showNewInvoice} newInvoice={newInvoice} user={props.user}/>}
                {showEditInvoice && <EditInvoice values={editInvoiceValues} setValues={setEditInvoiceValues}/>}   
                {showNewInvoice && <InvoiceDarken onClick={hideEditInvoice}/>} 
                {showEditInvoice && <InvoiceDarken onClick={hideEditInvoice}/>} 
                

            </div>
         
}

export default Invoices;
