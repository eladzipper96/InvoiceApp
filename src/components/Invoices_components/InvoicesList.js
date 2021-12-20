import {useEffect, useState} from 'react'
import { Route, Redirect } from 'react-router-dom'
import classes from './InvoicesList.module.scss';
import rightimg from '../../assets/icon-arrow-right.svg'
import InvoicesEmpty from './InvoicesEmpty';
import InvoicePreview from './InvoicePreview';
import InvoicePages from './InvoicePages';


const InvoicesList = (props) => {

/**--------------States----------------------------------- */

    const [flag, setFlag] = useState(false) // Turns true if Filter By Status is being used
    const [ArrayChanged, setArrayChanged] = useState(false)
    const [final_array, setFinal_array] = useState([]) // Renders the Data, Used for UX purposes.
    const [snapshot_array, setSnapShot_Array] = useState([]); // Spanshot of the Data, fixed some issues.
    const [clicked_info, setClicked_info] = useState(false) // Information of Clicked Invoice
    const [showPreview, setShowPreview] = useState(false) // Turns True if user clicked on invoice
    const [flag_clickedinfo, setFlag_clickedinfo] = useState(false) 
    const [Pageindex,setPageindex] = useState(1)
    const ScreenHeight = window.screen.height
    let InvoicesToDisplay = 7;

/**---------------------------------------------------------------------- */

/** This UseEffect Handles a few things in the same time:
 * 
 * Firstly its handling Filter by Status, if its activted 
 * not because of the filter, it just return immedietly.
 * 
 * Secondly its responsible to render new Invoices to the Screen.
 */
    useEffect(() => {

    arrayfilterhandler(props.filter); // Filter Handler

/** ------------------------------------------------------------
* This makes sure that the pages buttons at the bottom will render
-----------------------------------------------------------------*/
    if(showPreview) {
        setShowPreview(false)
    }


/** ------------------------------------------
 * Render the new Invoice to the Screen
 * ------------------------------------------- */
        if(props.newInvoice) {

            props.Invoicenumber(val => val+1) // Adds 1 when a new invoice was created.
            var clone;

            if(ArrayChanged===false) {
                clone = Object.assign({}, props.newInvoice)
                props.data.unshift(clone) 
                props.SetNewInvoice(false)
            }
            if(ArrayChanged===true) {
                clone = Object.assign({}, props.newInvoice)
                setFinal_array(arr => [clone,...arr])
                setSnapShot_Array(arr => [clone,...arr]);
                props.SetNewInvoice(false)
            }

        }
        /** */
        if(clicked_info && flag_clickedinfo) {
            var temparr = [];
            if(ArrayChanged===false) {
                temparr = props.data.filter((obj) => obj.id !== clicked_info.id) ///
                temparr.push(clicked_info)
                props.data.splice(0,props.data.length); ///
                props.data.push(...temparr)
                setFlag_clickedinfo(false)

            }
            if(ArrayChanged) {
                console.log(final_array)
                temparr = final_array.filter((obj) => obj.id !== clicked_info.id)
                temparr.push(clicked_info)
                setFinal_array(temparr)
                setSnapShot_Array(temparr)
                setFlag_clickedinfo(false)
            }
        }
    },[props.filter,props.newInvoice,clicked_info,showPreview])

/** ----------------------------------------------------
 * This Function changed the amount of Invoices to display in a page,
 *  depends on the screen height.
 * ----------------------------------------------------- */
    const InvoiceNumberDisplayHandler = () => {
        if(ScreenHeight<=900) {
            InvoicesToDisplay=6
        }
    }
    InvoiceNumberDisplayHandler()


/** ----------------------------------------------------
 * This Function adds classes to the buttons by their role
 * ----------------------------------------------------- */

    const button_classes_helper = (val) => {
        const arr = [classes.button]
        const color = [classes.dot]
        if(!'Paid'.localeCompare(val)) {
            arr.push(classes.paid)
            color.push(classes.green)
        }
        if(!'Pending'.localeCompare(val)) {
            arr.push(classes.pending)
            color.push(classes.orange)
        }
        if(!'Draft'.localeCompare(val)) {
            arr.push(classes.draft)
            color.push(classes.black)
        }
        return [arr, color];
    }

/** Handels the cases of Filter by Status */
    const arrayfilterhandler = (arr) => {

        // Returns user to first page when filtering
        if(Pageindex>1) {
            localStorage.setItem('pagereturn', Pageindex)
            setPageindex(1)
        }

        // Edge Cases //
        if(arr.length>0){
            setFlag(true);
        } 
        if(arr.length===0 && !ArrayChanged) {
            setFlag(false);
            props.Invoicenumber(props.data.length)
            if(localStorage.getItem('pagereturn')) {
                setPageindex(parseInt(localStorage.getItem('pagereturn')))
                localStorage.removeItem('pagereturn')
            }
        }
        if(arr.length===0 && ArrayChanged) {
            setFinal_array(snapshot_array)
            props.Invoicenumber(snapshot_array.length)
            if(localStorage.getItem('pagereturn')) {
                setPageindex(parseInt(localStorage.getItem('pagereturn')))
                localStorage.removeItem('pagereturn')
            }
            return
        }
        else {

        var temp = [];
        let true_array = [];

        /// Case : all 3 filters (By Status) are selected, sets Final_array to original Array.
        if(arr.length===3) {
            setFinal_array(props.data)
            props.Invoicenumber(props.data.length)
            return
         }

        /// Case : One or Two filters (By Status), Are Selected.
        for(let i=0; i<arr.length; i++) {
                if(!ArrayChanged) {
                    temp = props.data.filter(val => val.status === arr[i])     ///          
                    true_array = [...temp,...true_array]
                    props.Invoicenumber(true_array.length)
                }

                if(ArrayChanged) {
                    temp = snapshot_array.filter(val => val.status === arr[i])              
                    true_array = [...temp,...true_array]
                    props.Invoicenumber(true_array.length)
                }
        }
        setFinal_array(true_array)
        
        }
    }

    const showPreviewhandler = (data) => {
        setClicked_info(data);
        setShowPreview(val => !val)
    }


    const delete_item = (val) => {
        console.log(val)
        setArrayChanged(true);

        fetch('https://api.eladinvoiceback.me/deleteinvoice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ id: val})
               
        })

        var temp;
        if(!flag) {
            temp = props.data.filter((obj) => { ////
                if(obj.id !== val) return obj
            })
        }
        if(flag) {
            temp = final_array.filter((obj) => {
                if(obj.id !== val) return obj
            })
        }
        setFinal_array(temp);
        setSnapShot_Array(temp);
        setFlag(true);
        setShowPreview(false)
        props.Invoicenumber(val => val-1)

    }


    const itemfunction = (data) => {  

        const [buttonclasses, colors] = button_classes_helper(data.status)
        var mobile_name = '';

        if(window.screen.width<400) {

            //Adds empty spaces to act as padding for short names
            if(data.clients_name.length<=11) {
                mobile_name = "\u00A0'\u00A0'\u00A0" + data.clients_name
            } 
               
            if(data.clients_name.length>=18) {
                mobile_name = data.clients_name.substring(0,15)+"..."
            }

            else {
                mobile_name = data.clients_name
            }
        }

         return <div onClick={()=> showPreviewhandler(data)} className={classes.block} key={data.id}>
            <h3 className={classes.id}>{data.id.toUpperCase()}</h3>
            <span className={classes.date}>{data.invoiceDate.substring(0,10)}</span>
            {(window.screen.width>400) && <span className={classes.name}>{data.clients_name}</span>}
            {(window.screen.width<400) && <span className={classes.name}>{mobile_name}</span>}
            <span className={classes.price}>{`$ ${data.total_value.toFixed(2)}`}</span>
            <div className={buttonclasses.join(" ")}>
                <span className={colors.join(" ")}></span>
                <span>{data.status}</span>     
            </div>
            <img className={classes.arrow} src={rightimg} alt=">"></img>
            
            </div>
        }


    return <div className={classes.container}>
            <div className={classes.main}>
            <Route path="/invoices/all">
            {(!flag && !ArrayChanged) && props.data.filter((obj,index) => {
            if((index+1<=Pageindex*InvoicesToDisplay) && (index+1>(Pageindex-1)*InvoicesToDisplay)) {
                return obj;
            }}).map((obj) => itemfunction(obj))}
        
            {(flag ) && final_array.filter((obj,index) => {
            if((index+1<=Pageindex*InvoicesToDisplay) && (index+1>(Pageindex-1)*InvoicesToDisplay)) {
                return obj;
            }}).map((obj) => itemfunction(obj))}

            {(flag  && final_array.length===0) && <InvoicesEmpty/>}

            </Route>

        {showPreview && <Redirect to={`/invoices/${clicked_info.id.substring(1)}`}/>}

        <Route path='/invoices/:invoiceId' exact>
            {<InvoicePreview info={clicked_info} setInfo={setClicked_info} back={setShowPreview} updateValues={props.updateValues} delete_item={delete_item} flaginfo={setFlag_clickedinfo} allInvoices={props.data} />}
        </Route>

    </div>
    
    <Route path="/invoices/all">
        {((props.data.length>InvoicesToDisplay || final_array.length>InvoicesToDisplay) && !showPreview) && <InvoicePages InvoiceNumber={props.number} setPage={setPageindex} Pageindex={Pageindex} InvoicesToDisplay={InvoicesToDisplay}/>}
    </Route>
    
    </div>
}


export default InvoicesList;
