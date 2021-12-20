/// ------------- Dependancies ------------------
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import { uiActions } from '../../store/ui-slice';
// ------------------------------------------------

/// ---------- CSS ----------------------
import classes from './NewInvoice.module.scss';
///---------------------------------------

/// ---------- Components ----------------------
import NewInoviceForm from './NewInvoiceForm';
import NewInvoiceItems from './NewInvoiceItems';
// ---------------------------------------------

const EditInvoice = (props) => {

    const dispatch = useDispatch();
    const [items, setItems] = useState(props.values.item_list);
    const [editobj, setEditobj] = useState(props.values)
    
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }

    const hideEditInvoice = () => {
        dispatch(uiActions.setEditInvoice(false))
    }


    const updateArray = (arr) => {
        setItems(arr);
    }
    
    const sumbithandler = (event) => {
        event.preventDefault();

        let total = 0;
        for(let i = 0; i<editobj.item_list.length; i++) {
            total = total + (editobj.item_list[i].quantity * editobj.item_list[i].price)
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: editobj.id,
                street_address: editobj.street_address,
                city: editobj.city,
                post_code: editobj.post_code,
                country: editobj.country,
                clients_name: editobj.clients_name,
                clients_email: editobj.clients_email,
                clients_street_address: editobj.clients_street_address,
                clients_city: editobj.clients_city,
                clients_post_code: editobj.clients_post_code,
                clients_country: editobj.clients_country,
                invoiceDate: editobj.invoiceDate,
                payments_terms: editobj.payments_terms,
                project_desc: editobj.project_desc,
                total_value: total,
                item_list: items
           })
        }
        fetch('https://api.eladinvoiceback.me/updateinvoice', requestOptions).then((val) => console.log("updated the invoice"))
        //fetch('http://localhost:5000/updateinvoice', requestOptions).then((val) => console.log("updated the invoice"))


        setEditobj({...editobj, item_list: items})
        hideEditInvoice()

    }

    return (
        <div className={classes.main}>
            <h1 className={classes.header}>{`Edit ${props.values.id.toUpperCase()}`}</h1>
            <div className={classes.scroll}>
            <form onSubmit={sumbithandler}>
                <NewInoviceForm values={props.values} editobj={editobj} setEditobj={setEditobj}/>
                <NewInvoiceItems items={items} updateArray={updateArray} makeid={makeid} editobj={editobj}/>
                <div className={classes.edit_buttons}>
                    <div onClick={hideEditInvoice} className={classes.edit_cancel}>Cancel</div>
                    <button className={classes.edit_sumbit} type="submit" value="Save Changes">Save Changes</button> 
                </div>
            </form>

            </div>
        </div>
    )

}

export default EditInvoice;