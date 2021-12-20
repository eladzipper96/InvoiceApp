import classes from './InvoicesEmpty.module.scss';
import picture_empty from '../../assets/illustration-empty.svg';

const InvoicesEmpty = () => {
var string = "New Invoice"
    if(window.screen.width < 500) {
        string = 'New'
    }

    return  <div  className={classes.position}>

                <img src={picture_empty} alt="no invoices"/>

                <div className={classes.text}>
                    <h2>There is nothing here</h2>
                    <p>Create an invoice by clicking the <br/> <b>{string}</b> button and get started</p>
                </div>
                
            </div>
}
export default InvoicesEmpty;