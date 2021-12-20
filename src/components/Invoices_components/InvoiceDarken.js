import classes from './InvoiceDarken.module.scss'

const InvoiceDarken = (props) => {

        
    return  <div 
            className={classes.dark} onClick={props.onClick} >
            </div>
}

export default InvoiceDarken;