import {useEffect} from 'react'
import classes from './NewInvoiceItems.module.scss'
import delete_icon from '../../assets/icon-delete.svg';

const NewInvoiceItems = (props) => {

    var sum = 0;
    var prices_array = [];

    useEffect(() => {
        if(props.new) {
            props.editobj.item_list = []
            props.updateArray([])
        }
    },[])

    
        props.items.forEach((obj)=> {
            const price = obj.quantity * obj.price;
            sum = sum + price;
            prices_array.push(sum.toFixed(0))
        },)
    

    var final_array =  props.items.map( (obj,index)=> {

        return {
            ...obj,total: prices_array[index], tindex: index}
    })


    const itemfunction = (obj) => {
        if(obj) {
            const price = obj.quantity * obj.price;

            const deleteitem = (key) => {
                const newarray = props.items.filter((val) => val.key !== key)
                props.updateArray(newarray)
                props.editobj.item_list = newarray;
        }

            const updatevalues = (num,string) => {
            var newarray = [];
                /// !num === true, only when the input is 'Item Name'
                if(!num) {
                    newarray = props.items.map((val) => {
                        if(val.key === obj.key) {
                            // if statment fix bug, unwanted e.target.value updates to the dom.
                            if(string === 'quantity' || string === 'price') {
                                return {...val, name: undefined}
                            }
                            // normal case where input is legit.
                            return {...val, name: string}
                        }
                    return val
                    })
                    props.updateArray(newarray)
                    props.editobj.item_list = newarray;
                }

                if(num) {
                    if(string==="price") {
                        newarray = props.items.map((val) => {
                        if(val.key === obj.key) {
                            return {...val,price: parseInt(num)}
                        }
                        return val
                    })
                props.updateArray(newarray)
                props.editobj.item_list = newarray; 
                }
                
                if(string==="quantity") {
                    newarray = props.items.map((val) => {
                        if(val.key === obj.key) {
                            return {...val,quantity: parseInt(num)}
                        }
                        return val
                    })
                props.updateArray(newarray) 
                props.editobj.item_list = newarray;
            }
                }
                return;
            }



            if(obj.price===null || obj.quantity===null) {
                
                return  <div key={obj.key}>
                        <input onChange={(e) => updatevalues(false,e.target.value)} type="text" id="item_name" defaultValue={obj.name} ></input>
                        <input onBlur={(e) => updatevalues(e.target.value,"quantity")} type="text" id="quantity" defaultValue={obj.quantity}></input>
                        <input onBlur={(e) => updatevalues(e.target.value,"price")} type="text" id="price" defaultValue={null}></input>
                        <span className={classes.total}>{obj.total}</span>
                        <img onClick={() => deleteitem(obj.key)} className={classes.delete} src={delete_icon} alt="delete"></img>
                        </div>
            }

        return  <div key={obj.key}>
            <input onBlur={(e) => updatevalues(false,e.target.value)} type="text" id="item_name" defaultValue={obj.name} ></input>
            <input onBlur={(e) => updatevalues(e.target.value,"quantity")} type="text" id="quantity" defaultValue={obj.quantity}></input>
            <input onBlur={(e) => updatevalues(e.target.value,"price")} type="text" id="price" defaultValue={price.toFixed(2)}></input>
            <span className={classes.total}>{obj.total}</span>
            <img onClick={() => deleteitem(obj.key)} className={classes.delete} src={delete_icon} alt="delete"></img>
            </div>
        }
        
        if(obj===false) {
            var newid = props.makeid(6)
            const newarray = [...props.items,{name: null,quantity: null, price: null, key: newid}]
            props.updateArray(newarray)
            //props.editobj.item_list = newarray;
        }

    }
 
    return (
        <div className={classes.container} >

            <h3 className={classes.header}>Item List</h3>

            <div className={classes.main}>
                <h5>Item Name</h5>
                <h5>Qty</h5>
                <h5>Price</h5>
                <h5>Total</h5>

                {final_array.map((obj) => itemfunction(obj))}
            </div>


            <div className={classes.addnew} onClick={() => itemfunction(false)}>
                <h4>+ Add New Item</h4>
            </div>
        </div>
    )

}

export default NewInvoiceItems;