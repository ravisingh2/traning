import { useState } from "react"
const WithCounter = (OriginalComp)=>{
    const NewComp = (props)=>{
        const [count, setCount] = useState(0);
        const handler = () =>{
            setCount(previous=>(previous+1))
        }

        return (
        <>
            <div> Counter :{count}</div>
            <OriginalComp counterHandler={handler} name={props.name}/>
        </>)
    }

    return NewComp;
}
export default WithCounter;