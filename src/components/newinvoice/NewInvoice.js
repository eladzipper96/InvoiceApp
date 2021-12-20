import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { uiActions } from '../../store/ui-slice';


import classes from './NewInvoice.module.scss';
import NewInoviceForm from './NewInvoiceForm';
import NewInvoiceItems from './NewInvoiceItems';
import { emptyobject } from '../Invoices_components/InvoicesData';

const NewInvoice = (props) => {

    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    const [editobj, setEditobj] = useState(emptyobject);
    const [dataArrived, setdataArrived] =  useState(false);
    const userInformation = useSelector(state => state.user)

    var reqobject = {
        owner: userInformation.id,
        id: editobj.id,
        status: editobj.status,
        street_address: editobj.street_address,
        city: editobj.city,
        post_code: editobj.post_code,
        country: editobj.country,
        clients_name: editobj.clients_name,
        clients_email: editobj.clients_email,
        client_street_address: editobj.client_street_address,
        clients_city: editobj.clients_city,
        clients_post_code: editobj.clients_post_code,
        clients_country: editobj.clients_country,
        invoiceDate: editobj.invoiceDate,
        payments_terms: "Direct",
        project_desc: editobj.project_desc,
        total_value: 0,
        item_list: items
    }


    useEffect(() => {
        editobj.id = `#${makeid(6)}`
        editobj.street_address = userInformation.street_address
        editobj.city = userInformation.city
        editobj.post_code = userInformation.post_code
        editobj.country = userInformation.country

    },[]) 


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

    const updateArray = (arr) => {
        setItems(arr);
    }

    const clickDrafthandler = () => {
        editobj.status = "Draft"
    }

    const clickSaveSendhandler = () => {
        editobj.status = "Pending"
        reqobject.status = "Pending"
    }

    const discardhandler = () => {
        props.Display_NewInvoice(false)
        setEditobj(emptyobject)
        setItems([])
    }


    const onSubmithandler = (e) => {
       e.preventDefault();      

        let total = 0;
        for(let i = 0; i<editobj.item_list.length; i++) {
            total = total + (editobj.item_list[i].quantity * editobj.item_list[i].price)
        }
        editobj.total_value = total;
        props.SetNewInvoice(editobj)
        props.Display_NewInvoice(false)
        dispatch(uiActions.setEmptyInvoices(false)) // check this one for bugs

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                total_value: total,
                ...reqobject
           })
        }
        fetch('https://api.eladinvoiceback.me/addinvoice', requestOptions)
    }
    
    return (
        <div className={classes.main}>
            <h1 className={classes.header}>New Invoice</h1>
            <div className={classes.scroll}>
            <form onSubmit={onSubmithandler}>
                <NewInoviceForm values={emptyobject} new={true} editobj={editobj} setEditobj={setEditobj}/>
                <NewInvoiceItems items={items} updateArray={updateArray} makeid={makeid} editobj={editobj} new={true} />
                <div className={classes.newinvoicebuttons}>

                    <div onClick={discardhandler} className={classes.discard}>Discard</div>

                    {(window.screen.width < 1704 && window.screen.width > 200) && <button onClick={clickDrafthandler} className={classes.saveasdraft} type="submit">Draft</button>} 
                    {(window.screen.width > 1704) && <button onClick={clickDrafthandler} className={classes.saveasdraft} type="submit">Save as Draft</button>}

                    {(window.screen.width < 1533 && window.screen.width > 200) && <button onClick={clickSaveSendhandler} className={classes.edit_sumbit} type="submit">{"Save"}</button>}
                    {(window.screen.width > 1533) && <button onClick={clickSaveSendhandler} className={classes.edit_sumbit} type="submit">{"Save & Send"}</button>}

                </div>
            </form>
            </div>
        </div>
    )

}

export default NewInvoice;