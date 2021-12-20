import classes from './NewInvoiceForm.module.scss'
import { useEffect } from 'react';

const NewInvoiceForm = (props) => {


      useEffect(() => {
        if(props.new) {
            props.editobj.clients_name = undefined
            props.editobj.clients_email = undefined
            props.editobj.client_street_address = undefined
            props.editobj.clients_city = undefined
            props.editobj.clients_post_code = undefined
            props.editobj.clients_country = undefined
            props.editobj.invoiceDate = new Date().toISOString().substring(0,10)
            props.editobj.project_desc = undefined
        }

    },[]) 

    if(props.new === true) {
        return (
            <div className={classes.form}>
            <h3>Bill From</h3>
            
            <label htmlFor="streetadd">Street Address</label>
            <input onChange={(e) => props.editobj.street_address= e.target.value}
             type="text" id="streetadd" name="street_add" required defaultValue={props.editobj.street_address}></input>
            <div className={classes.threeinput}>
                <label htmlFor="city" >City</label>
                <input onChange={(e) => props.editobj.city= e.target.value} type="text" id="city" name="city" required defaultValue={props.editobj.city}></input>
                <label htmlFor="postcode">Post Code</label>
                <input onChange={(e) => props.editobj.post_code= e.target.value} type="text" id="postcode" name="post_code" required defaultValue={props.editobj.post_code}></input>
                <label htmlFor="country">Country</label>
                <input onChange={(e) =>  props.editobj.country= e.target.value}
                 type="text" id="country" name="country" required defaultValue={props.editobj.country}></input>
            </div>
            
            <h3>Bill To</h3>

            <label htmlFor="clientsname">Client's Name</label>
            <input onChange={(e) =>  props.editobj.clients_name = e.target.value} type="text" id="clientsname" name="clients_name" required></input>

            <label htmlFor="clientsemail">Client's Email</label>
            <input onChange={(e) =>  props.editobj.clients_email = e.target.value} type="email" id="clientsemail" name="clients_email" required></input>

            <label htmlFor="streetadd_client">Street Address</label>
            <input onChange={(e) =>  props.editobj.client_street_address = e.target.value} type="text" id="streetadd_client" name="streetadd_client" required></input>

            <div className={classes.threeinput}>
                <label htmlFor="city">City</label>
                <input onChange={(e) =>  props.editobj.clients_city = e.target.value} type="text" id="city" name="city" required></input>
                <label htmlFor="postcode">Post Code</label>
                <input onChange={(e) =>  props.editobj.clients_post_code = e.target.value} type="text" id="postcode" name="post_code" required></input>
                <label htmlFor="streetadd">Country</label>
                <input onChange={(e) =>  props.editobj.clients_country = e.target.value} type="text" id="country" name="country" required ></input>
            </div>

            <div className={classes.invoice_payment}>
                <label htmlFor="invoicedate">Invoice Date</label>
                <input onChange={(e) =>  props.editobj.invoiceDate = e.target.value} type="date" id="invoicedate" name="invoice_date" required></input>
                <label htmlFor="paymentterms">Payment Terms</label>
                <select id="paymentterms" name="payment_terms" >
                    <option value="Credit">Credit</option>
                    <option value="Plus 30">Plus 30</option>
                    <option value="Direct">Direct</option>
                </select>
            </div>

            <label htmlFor="projectdesc">Project Description</label>
            <input onChange={(e) =>  props.editobj.project_desc = e.target.value} type="text" id="projectdesc" name="project_desc" required></input>

        </div>
        )
    }

    const datehandler = props.values.invoiceDate.substring(0,10)

    return (
        <div className={classes.form}>

            <h3>Bill From</h3>
            
            <label htmlFor="streetadd">Street Address</label>
            <input onChange={(e) => props.editobj.street_address= e.target.value}
             type="text" id="streetadd" name="street_add" defaultValue={props.values.street_address} required></input>
            <div className={classes.threeinput}>
                <label htmlFor="city" >City</label>
                <input onChange={(e) => props.editobj.city= e.target.value} type="text" id="city" name="city" defaultValue={props.values.city} required></input>
                <label htmlFor="postcode">Post Code</label>
                <input onChange={(e) => props.editobj.post_code= e.target.value} type="text" id="postcode" name="post_code" defaultValue={props.values.post_code} required></input>
                <label htmlFor="country">Country</label>
                <input onChange={(e) =>  props.editobj.country= e.target.value}
                 type="text" id="country" name="country" defaultValue={props.values.country} required></input>
            </div>
            
            <h3>Bill To</h3>

            <label htmlFor="clientsname">Client's Name</label>
            <input onChange={(e) =>  props.editobj.clients_name = e.target.value} type="text" id="clientsname" name="clients_name" defaultValue={props.values.clients_name} required></input>

            <label htmlFor="clientsemail">Client's Email</label>
            <input onChange={(e) =>  props.editobj.clients_email = e.target.value} type="email" id="clientsemail" name="clients_email" defaultValue={props.values.clients_email} required></input>

            <label htmlFor="streetadd_client">Street Address</label>
            <input onChange={(e) =>  props.editobj.client_street_address = e.target.value} type="text" id="streetadd_client" name="streetadd_client" defaultValue={props.values.client_street_address} required></input>

            <div className={classes.threeinput}>
                <label htmlFor="city">City</label>
                <input onChange={(e) =>  props.editobj.clients_city = e.target.value} type="text" id="city" name="city" defaultValue={props.values.clients_city} required></input>
                <label htmlFor="postcode">Post Code</label>
                <input onChange={(e) =>  props.editobj.clients_post_code = e.target.value} type="text" id="postcode" name="post_code" defaultValue={props.values.clients_post_code} required></input>
                <label htmlFor="streetadd">Country</label>
                <input onChange={(e) =>  props.editobj.clients_country = e.target.value} type="text" id="country" name="country" defaultValue={props.values.clients_country} required></input>
            </div>

            <div className={classes.invoice_payment}>
                <label htmlFor="invoicedate">Invoice Date</label>
                <input onChange={(e) =>  props.editobj.invoiceDate = e.target.value} type="date" id="invoicedate" name="invoice_date" defaultValue={datehandler} required></input>
                <label htmlFor="paymentterms">Payment Terms</label>
                <select id="paymentterms" name="payment_terms" defaultValue={props.values.payments_terms}>
                    <option value="Credit">Credit</option>
                    <option value="Something">Plus 30</option>
                    <option value="Kamehameha">Direct</option>
                </select>
            </div>

            <label htmlFor="projectdesc">Project Description</label>
            <input onChange={(e) =>  props.editobj.project_desc = e.target.value} type="text" id="projectdesc" name="project_desc" defaultValue={props.values.project_desc} required></input>
        </div>
    )
    
}

export default NewInvoiceForm;

/**<div className={classes.form}>
    
                <h3>Bill From</h3>
                
                <label htmlFor="streetadd">Street Address</label>
                <input type="text" id="streetadd" name="street_add" ></input>
    
                <div className={classes.threeinput}>
                    <label htmlFor="city" >City</label>
                    <input type="text" id="city" name="city" ></input>
                    <label htmlFor="postcode">Post Code</label>
                    <input type="text" id="postcode" name="post_code" ></input>
                    <label htmlFor="streetadd">Country</label>
                    <input type="text" id="country" name="country" ></input>
                </div>
                
                <h3>Bill To</h3>
    
                <label htmlFor="clientsname">Client's Name</label>
                <input type="text" id="clientsname" name="clients_name" ></input>
    
                <label htmlFor="clientsemail">Client's Email</label>
                <input type="email" id="clientsemail" name="clients_email" ></input>
    
                <label htmlFor="streetadd_client">Street Address</label>
                <input type="text" id="streetadd_client" name="streetadd_client" ></input>
    
                <div className={classes.threeinput}>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" name="city" ></input>
                    <label htmlFor="postcode">Post Code</label>
                    <input type="text" id="postcode" name="post_code"></input>
                    <label htmlFor="streetadd">Country</label>
                    <input type="text" id="country" name="country"></input>
                </div>
    
                <div className={classes.invoice_payment}>
                    <label htmlFor="invoicedate">Invoice Date</label>
                    <input type="date" id="invoicedate" name="invoice_date" ></input>
                    <label htmlFor="paymentterms">Payment Terms</label>
                    <select id="paymentterms" name="payment_terms">
                        <option value="Credit">Credit</option>
                        <option value="Something">Plus 30</option>
                        <option value="Kamehameha">Direct</option>
                    </select>
                </div>
    
                <label htmlFor="projectdesc">Project Description</label>
                <input type="text" id="projectdesc" name="project_desc"></input>
            </div> */