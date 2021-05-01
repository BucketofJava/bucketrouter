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


export {useParams}