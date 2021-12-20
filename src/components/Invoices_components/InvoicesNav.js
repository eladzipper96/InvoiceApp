import {useState} from 'react';
import { useSelector } from 'react-redux';
import InvoiceDropdown from './InvoiceDropdown'
import classes from './InvoicesNav.module.scss';
import arrowdown from '../../assets/icon-arrow-down.svg';
import iconplus from '../../assets/icon-plus.svg'

const InvoicesNav = (props) => {

const [filterclicked, setFilterclicked] = useState(false);
const IsMobile = useSelector(state => state.ui.IsMobile)
const UserName = useSelector(state => state.user.name)

var invoice_amount_string = `There are total ${props.size} Invoices`
var filter_string = "Filter by status"
var button_string = "New Invoice"

    const toUpperWord = (str) => {
        return str.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    }

    if(window.screen.width<1200) {
        invoice_amount_string = `${props.size} Invoices`
        filter_string = 'Filter'
        button_string = 'New'
    }

    const togglefilter = () => {
        setFilterclicked(val => !val);
    }


    return (
        <div className={classes.main}>

            <div className={classes.headers}>
                <h1>{`${toUpperWord(UserName)}'s`} Invoices</h1>
                {(props.size===0) && <h4 className={classes.margin}>No Invoices</h4>} 
                {(props.size>0) && <h4 className={classes.margin}>{invoice_amount_string}</h4>}
            </div>


            <div onClick={togglefilter} className={classes.filter}>
                <li>{filter_string}</li>
                <img src={arrowdown} alt="v"/>
            </div>

            {filterclicked && <InvoiceDropdown filterMarks={props.filterMarks} onPress={props.ForInvDropdown} classes={classes}/>}

            <div className={classes.newInvoice} onClick={props.onPress}>
                <img src={iconplus} alt='+'></img>
                
                {window.screen.width>375 && <h3>{button_string}</h3>}         
            </div>
        </div>  )
}


export default InvoicesNav;