import { useCallback , useState } from "react";

const debounce = (fun,time)=>{
    let timerId=null
    return function(...args){
        clearTimeout(timerId)
        timerId = setTimeout(()=>{
            fun.apply(this,args)
        },time)
    }
}

export const useDebounce = (obj=null, time=1000) =>{
    const [state,setState] = useState(obj)

    const _debounce = useCallback(debounce(setState,time),[])

    const setDebounceState =(value)=>{
        _debounce(value)
    }

    return [state,setDebounceState]  
}