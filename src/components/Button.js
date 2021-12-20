import { useDispatch } from 'react-redux';
import { uiActions } from '../store/ui-slice';

import classes from './Button.module.scss'
const Button = (props) => {
    const dispatch = useDispatch();
    const cls = [classes.button]
    var id;

    if(props.id) {
        id = props.id
    }

    if(props.color === 'gray') {
        cls.push(classes.gray)
    }

    if(props.color === 'red') {
        cls.push(classes.red)
    }

    if(props.paid && props.status === 'Paid') {
        cls.push(classes.paid)
    }

    const clickhandler = () => {
        console.log(props.status)
        if(props.status === 'Paid') {
            if(props.paid) return; 
        }
        

        if(props.title === 'Edit') {
            dispatch(uiActions.setEditInvoice(true))
        }

        if(props.title === "Delete") {
            props.delete_item(props.info_for_delete)
        }

        if(props.title === 'Mark as Paid') {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    status: 'Paid',
                    id: id
               })
            }
            fetch('https://api.eladinvoiceback.me/updatestatus', requestOptions).then(console.log("updated status"))
            //fetch('http://localhost:5000/updatestatus', requestOptions).then(console.log("updated status"))


            props.change_status((val) => {
                return {
                    ...val,
                    status: 'Paid'
                }
            })
            if(props.flaginfo) {
                props.flaginfo(true)
            }
            console.log(props)
        }
    }

    return <div onClick={clickhandler} className={cls.join(' ')}>
                <h3>{props.title}</h3>
           </div>
}

export default Button;