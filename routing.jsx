import React from 'react';
function useParams(){
const paramObject={};
const searchParams=new URLSearchParams(window.location.search);
searchParams.forEach((p, i) => {
Object.defineProperty(paramObject, i, {
    value: p,
    writable:false
})
})
return paramObject;
}
/*function useAnchors(anchorObj){
const scrollRef=useRef();
for(var anchor in anchorObj){
    if(window.location.hash==anchor){
        scrollRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }
}
return scrollRef;
}*/
function useId(){
    
}

export {useParams}