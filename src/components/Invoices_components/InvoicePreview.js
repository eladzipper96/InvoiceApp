import Button from '../Button';
import leftarrow from '../../assets/icon-arrow-left.svg';
import classes from './InvoicePreview.module.scss';
import { NavLink, useParams } from 'react-router-dom';
import InvoicesEmpty from './InvoicesEmpty';
const InvoicePreview = (props) => {

    // ------------- Variables --------------
    var cls = [classes.statusbutton]
    var colors = [classes.dot]
    let totalmoney = 0;
    const params = useParams()
    const InvoiceData = props.allInvoices.filter((inv) => {
        if(inv.id.substring(1) === params.invoiceId)
            return inv
    }) 

    if(InvoiceData[0]) {
        var new_month = new Date(InvoiceData[0].invoiceDate)
        new_month.setMonth(new_month.getMonth()+1)
    }
    // ----------------------------------------------


    // If user is on /all, prevents from Component from rendering
    if(params.invoiceId === 'all') {
        return <> </>
    }
    //-----------------------------------------------------------------


    // Prevent User Viewing unexisting Invoice

    if(InvoiceData.length===0) {
        return <InvoicesEmpty/>
    }
    // ------------------------------------


    props.updateValues(InvoiceData[0]) // not sure what this is doing

    // Adding SCSS Classes according to the Status of the Invoice
    if(InvoiceData[0].status === 'Pending') {
        cls.push(classes.pending)
        colors.push(classes.orange)
    }

    if(InvoiceData[0].status === 'Paid') {
        cls.push(classes.paid)
        colors.push(classes.green)
    }

    if(InvoiceData[0].status === 'Draft') {
        cls.push(classes.draft)
        colors.push(classes.black)
    }
    // -----------------------------------------------------

    //  Rendering the Item list
    const renderlist = (obj) => {
        totalmoney = totalmoney + (obj.quantity*obj.price)
        InvoiceData[0].total_value = totalmoney
        return <>
            <span className={classes.bottom_name}>{obj.name}</span>
            <span className={classes.bottom_others}>{obj.quantity}</span>
            <span className={classes.bottom_others}>{obj.price}</span>
            <span className={classes.bottom_others}>{obj.quantity*obj.price}</span>
        </>
    }
    // -----------------------------------------



    return  <div className={classes.strucure}>
                <NavLink to='/invoices/all'>
                <div className={classes.goback}>   
                    <img src={leftarrow} alt="<"></img>
                    <h3>Go Back</h3>
                </div>
                </NavLink>

                <div className={classes.top}>
                    <div className={classes.status}>
                        <span>Status</span>
                        <div className={classes.statusbutton_container}>
                            <span className={colors.join(' ')}></span>
                            <span className={cls.join(' ')}>{InvoiceData[0].status}</span>
                        </div>
                    </div>
                    <div className={classes.topbuttons}>
                        <Button title='Edit' color='gray' paid={true} status={InvoiceData[0].status}/>
                        <Button title='Delete' color='red' delete_item={props.delete_item} info_for_delete={InvoiceData[0].id}/>
                        {!(InvoiceData[0].status==='Paid') && <Button title='Mark as Paid' color='purple' change_status={props.setInfo} flaginfo={props.flaginfo} id={InvoiceData[0].id}/>}
                        {InvoiceData[0].status==='Paid' && <Button title='Mark as Paid' color='gray' paid={true} status={InvoiceData[0].status} id={InvoiceData[0].id}/>}
                    </div>
                </div>

                <div className={classes.main}>
                    <div className={classes.id_desc}>
                        <h2>{InvoiceData[0].id.toUpperCase()}</h2>
                        <h4>{InvoiceData[0].project_desc}</h4>
                    </div>

                    <div className={classes.dates}>
                        <div>
                            <h4>Invoice Date</h4>
                            <h2>{InvoiceData[0].invoiceDate.substring(0,10)}</h2>
                        </div>
                        <div>
                            <h4>Payment Due</h4>
                            <h2>{new_month.toISOString().substring(0,10)}</h2>
                        </div>
                    </div>

                    <div className={classes.bill_to}>
                        <h4>Bill To</h4>
                        <h2>{InvoiceData[0].clients_name}</h2>
                        <h4>{InvoiceData[0].client_street_address}</h4>
                        <h4>{InvoiceData[0].clients_city}</h4>
                        <h4>{InvoiceData[0].clients_post_code}</h4>
                        <h4>{InvoiceData[0].clients_country}</h4>
                    </div>

                    <div className={classes.info}>
                         <h4>{InvoiceData[0].street_address}</h4>
                        <h4>{InvoiceData[0].city}</h4>
                        <h4>{InvoiceData[0].post_code}</h4>
                        <h4>{InvoiceData[0].country}</h4>
                    </div>

                    <div className={classes.send_to}>
                        <h4>Send to</h4>
                        <h2>{InvoiceData[0].clients_email}</h2>
                    </div>
                    
                </div>

                <div className={classes.bottom}>
                        <h4 className={classes.bottom_title}>Item Name</h4>
                        <h4 className={classes.bottom_title}>QTY.</h4>
                        <h4 className={classes.bottom_title}>Price</h4>
                        <h4 className={classes.bottom_title}>Total</h4>
                        {InvoiceData[0].item_list.map((obj) => renderlist(obj))}
                </div>

                <div className={classes.totalmoney}>
                    <span>Amount Due</span>
                    <div className={classes.money}>{`$ ${totalmoney}`}</div>
                </div>

                <div className={classes.mobile_buttons}>
                        <Button title='Edit' color='gray' paid={true} status={InvoiceData[0].status}/>
                        <Button title='Delete' color='red' delete_item={props.delete_item} info_for_delete={InvoiceData[0].id}/>
                        {!(InvoiceData[0].status==='Paid') && <Button title='Mark as Paid' color='purple' change_status={props.setInfo} flaginfo={props.flaginfo} id={InvoiceData[0].id}/>}
                        {InvoiceData[0].status==='Paid' && <Button title='Mark as Paid' color='gray' paid={true} status={InvoiceData[0].status} id={InvoiceData[0].id}/>}
                    </div>

           </div>

}

export default InvoicePreview