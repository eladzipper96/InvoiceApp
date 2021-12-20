

const InvoiceDropdown = (props) => {

    /** ----------------------------------------------------------------
     * Checks if Draft/Pending/Paid is selected, returns true or false
     * used to render a checked (true) input or unchecked (false) input.
     ------------------------------------------------------------------*/
    const DraftExist = props.filterMarks.some( val => val==='Draft');
    const PendingExist =  props.filterMarks.some(val => val==='Pending');
    const PaidExist = props.filterMarks.some(val => val==='Paid')


    return (
    <div className={props.classes.dropdown}>
                        
        {!DraftExist && 
        <label  htmlFor="check1" className={props.classes.checkbox}>
            <input onClick={() => props.onPress('Draft')} className={props.classes.input}type="checkbox" id="check1" name="check1" value="Draft"/>
            <div className={props.classes.checkmark}></div>
            Draft
        </label>}
        {DraftExist && 
        <label  htmlFor="check1" className={props.classes.checkbox}>
            <input onClick={() => props.onPress('Draft')} className={props.classes.input}type="checkbox" id="check1" name="check1" value="Draft" defaultChecked/>
            <div className={props.classes.checkmark}></div>
            Draft
        </label>}

        {!PendingExist &&       
        <label htmlFor="check2" className={props.classes.checkbox}>
            <input onClick={() => props.onPress('Pending')} className={props.classes.input}type="checkbox" id="check2" name="check2" value="Pending"/>
            <div className={props.classes.checkmark}></div>
            Pending
        </label>}
        {PendingExist &&         
        <label htmlFor="check2" className={props.classes.checkbox}>
            <input onClick={() => props.onPress('Pending')} className={props.classes.input}type="checkbox" id="check2" name="check2" value="Pending" defaultChecked/>
            <div className={props.classes.checkmark}></div>
            Pending
        </label>}
        {!PaidExist &&         
        <label  htmlFor="check3" className={props.classes.checkbox}>
            <input onClick={() => props.onPress('Paid')} className={props.classes.input}type="checkbox" id="check3" name="check3" value="Paid"/>
            <div className={props.classes.checkmark}></div>
            Paid
        </label> }
        {PaidExist &&         
        <label  htmlFor="check3" className={props.classes.checkbox}>
            <input onClick={() => props.onPress('Paid')} className={props.classes.input}type="checkbox" id="check3" name="check3" value="Paid" defaultChecked/>
            <div className={props.classes.checkmark}></div>
            Paid
        </label> }

    </div> )
}

export default InvoiceDropdown;