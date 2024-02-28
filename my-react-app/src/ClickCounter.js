import WithCounter from "./WithCounter"

const ClickCounter = (props) =>{
    return (<>
        <button onClick={props.counterHandler} >{props.name}</button>
    </>)
}
export default WithCounter(ClickCounter)