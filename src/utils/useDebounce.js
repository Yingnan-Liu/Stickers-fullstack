import { useCallback , useState } from "react";

const debounce = (fun,time,inmmediate)=>{
    let timerId=null
    let initInt=true
    return function(...args){
        if(initInt && inmmediate){
            fun.apply(this,args)
            initInt=false
        }else{
            clearTimeout(timerId)
            timerId = setTimeout(()=>{
                fun.apply(this,args)
                initInt = true
            },time)
        }     
    }
}

export const useDebounce = (obj=null, time=1000,immediate=true) =>{
    const [state,setState] = useState(obj)

    const _debounce = useCallback(debounce(setState,time,immediate),[])

    const setDebounceState =(value)=>{
        _debounce(value)
    }

    return [state,setDebounceState]  
}