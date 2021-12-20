import classes from './InvoicePages.module.scss'

const InvoicePages = (props) => {

    const pages_array = [...Array(Math.floor(props.InvoiceNumber/props.InvoicesToDisplay)+1).keys()]
    if(pages_array.length===1 || props.InvoiceNumber===props.InvoicesToDisplay) return <div></div>;

    if(pages_array.length>5) {
        const num = pages_array.length-props.Pageindex;
        console.log(num)
        if((num)>=5) {
            if(props.Pageindex===1) {
                return <div className={classes.container}>
                <span key={props.Pageindex} className={classes.current}onClick={()=> props.setPage(props.Pageindex)}>{props.Pageindex}</span>
                <span key={props.Pageindex+1} onClick={()=> props.setPage(props.Pageindex+1)}>{props.Pageindex+1}</span>
                <span key={props.Pageindex+2} onClick={()=> props.setPage(props.Pageindex+2)}>{props.Pageindex+2}</span>
                <span key={props.Pageindex+3} onClick={()=> props.setPage(props.Pageindex+3)}>{props.Pageindex+3}</span>
                <span key={props.Pageindex+4} onClick={()=> props.setPage(props.Pageindex+4)}>{props.Pageindex+4}</span>
                <span key={pages_array.length-1} className={classes.end} onClick={()=> props.setPage(pages_array.length-1)}>{pages_array.length-1}</span>
                </div>   
            }
            if(props.Pageindex===2) {
                return <div className={classes.container}>
                <span key={props.Pageindex-1} className={classes.start} onClick={()=> props.setPage(props.Pageindex-1)}>{props.Pageindex-1}</span>
                <span key={props.Pageindex} className={classes.current} onClick={()=> props.setPage(props.Pageindex)}>{props.Pageindex}</span>
                <span key={props.Pageindex+1} onClick={()=> props.setPage(props.Pageindex+1)}>{props.Pageindex+1}</span>
                <span key={props.Pageindex+2} onClick={()=> props.setPage(props.Pageindex+2)}>{props.Pageindex+2}</span>
                <span key={props.Pageindex+3} onClick={()=> props.setPage(props.Pageindex+3)}>{props.Pageindex+3}</span>
                <span key={pages_array.length-1} className={classes.end} onClick={()=> props.setPage(pages_array.length-1)}>{pages_array.length-1}</span>
                </div>   
            }

            return <div className={classes.container}>
            {(props.Pageindex-2!==1) && <span key={1} className={classes.start} onClick={()=> props.setPage(1)}>{1}</span>}
            {(props.Pageindex-2===1) && <span key={props.Pageindex-2} className={classes.start} onClick={()=> props.setPage(props.Pageindex-2)}>{props.Pageindex-2}</span>}
            <span key={props.Pageindex-1} onClick={()=> props.setPage(props.Pageindex-1)}>{props.Pageindex-1}</span>
            <span key={props.Pageindex} className={classes.current} onClick={()=> props.setPage(props.Pageindex)}>{props.Pageindex}</span>
            <span key={props.Pageindex+1} onClick={()=> props.setPage(props.Pageindex+1)}>{props.Pageindex+1}</span>
            <span key={props.Pageindex+2} onClick={()=> props.setPage(props.Pageindex+2)}>{props.Pageindex+2}</span>
            <span key={pages_array.length-1} className={classes.end} onClick={()=> props.setPage(pages_array.length-1)}>{pages_array.length-1}</span>
            </div>           
        }

        if(num<5) {
            console.log("num is smaller then 5")
            if(num===4) {
                return <div className={classes.container}>
                <span key={1} className={classes.start} onClick={()=> props.setPage(1)}>{1}</span>
                <span key={props.Pageindex-1} onClick={()=> props.setPage(props.Pageindex-1)}>{props.Pageindex-1}</span>
                <span key={props.Pageindex} className={classes.current} onClick={()=> props.setPage(props.Pageindex)}>{props.Pageindex}</span>
                <span key={props.Pageindex+1} onClick={()=> props.setPage(props.Pageindex+1)}>{props.Pageindex+1}</span>
                <span key={props.Pageindex+2} onClick={()=> props.setPage(props.Pageindex+2)}>{props.Pageindex+2}</span>
                <span key={props.Pageindex+3} className={classes.end} onClick={()=> props.setPage(props.Pageindex+3)}>{props.Pageindex+3}</span>
                </div> 
            }
            if(num===3) {
                return <div className={classes.container}>
                <span key={1} className={classes.start} onClick={()=> props.setPage(1)}>{1}</span>
                <span key={props.Pageindex-2} onClick={()=> props.setPage(props.Pageindex-2)}>{props.Pageindex-2}</span>
                <span key={props.Pageindex-1} onClick={()=> props.setPage(props.Pageindex-1)}>{props.Pageindex-1}</span>
                <span key={props.Pageindex} className={classes.current} onClick={()=> props.setPage(props.Pageindex)}>{props.Pageindex}</span>
                <span key={props.Pageindex+1} onClick={()=> props.setPage(props.Pageindex+1)}>{props.Pageindex+1}</span>
                <span key={props.Pageindex+2} className={classes.end} onClick={()=> props.setPage(props.Pageindex+2)}>{props.Pageindex+2}</span>
                </div> 
            }
            if(num===2) {
                return <div className={classes.container}>
                <span key={1} className={classes.start} onClick={()=> props.setPage(1)}>{1}</span>
                <span key={props.Pageindex-3} onClick={()=> props.setPage(props.Pageindex-3)}>{props.Pageindex-3}</span>
                <span key={props.Pageindex-2} onClick={()=> props.setPage(props.Pageindex-2)}>{props.Pageindex-2}</span>
                <span key={props.Pageindex-1} onClick={()=> props.setPage(props.Pageindex-1)}>{props.Pageindex-1}</span>
                <span key={props.Pageindex} className={classes.current} onClick={()=> props.setPage(props.Pageindex)}>{props.Pageindex}</span>
                <span key={props.Pageindex+1} className={classes.end} onClick={()=> props.setPage(props.Pageindex+1)}>{props.Pageindex+1}</span>
                </div> 
            }
            if(num===1) {
                return <div className={classes.container}>
                <span key={1} className={classes.start} onClick={()=> props.setPage(1)}>{1}</span>
                <span key={props.Pageindex-4} onClick={()=> props.setPage(props.Pageindex-4)}>{props.Pageindex-4}</span>
                <span key={props.Pageindex-3} onClick={()=> props.setPage(props.Pageindex-3)}>{props.Pageindex-3}</span>
                <span key={props.Pageindex-2} onClick={()=> props.setPage(props.Pageindex-2)}>{props.Pageindex-2}</span>
                <span key={props.Pageindex-1} onClick={()=> props.setPage(props.Pageindex-1)}>{props.Pageindex-1}</span>
                <span key={props.Pageindex} className={classes.current} onClick={()=> props.setPage(props.Pageindex)}>{props.Pageindex}</span>
                </div> 
            }
    
        }
    }
    
    return <div className={classes.container}>
        {pages_array.map((val,index) => {
            if(index+1===props.Pageindex) {
                return <span key={index+1} className={classes.current} onClick={()=> props.setPage(index+1)}>{index+1}</span>
            }
            return <span key={index+1} onClick={()=> props.setPage(index+1)}>{index+1}</span>
        })}
    </div>
}

export default InvoicePages