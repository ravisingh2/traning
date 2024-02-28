import { useEffect, useReducer, useState } from "react";
import {useDispatch, useSelector } from "react-redux";

const Counter = ()=>{
    
    const reducerFunc = (state, action)=>{
        let count = state.count;
        switch(action){
            case 'increment':
                count = count+1;
                return {...state, "count":count}
            case 'decrement':
                count = state.count-1;
                return {...state, count:count}    
            default:
             return state;    
        }
        
    }
    const initialState = {count:0};
    //const [count, setCount] = useState(0);
    /*const [state, dispatch] = useReducer(reducerFunc, initialState);
    useEffect(()=>{
        setTimeout(() => {
            dispatch("increment")
        }, 1000);
    }, [state.count]);*/

    useEffect(()=>{
        dispatch({type:"Test", payload:{name:"ravi"}});
    }, [])

    const dispatch = useDispatch();
    const mainReducer = useSelector(state=>state.mainReducer);
    console.log(mainReducer)
    return <div> Counter :{mainReducer.name} </div>
}
export default Counter;