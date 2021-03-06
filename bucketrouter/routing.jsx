//Imports
import React, { useContext } from 'react';
//import { ResourceObj } from './RoutableApp';
import RouteObject from './RouteObject';


//Gets the RouteObject for a given url, default the current url
function useRoute(url=window.location.href){
    //Returns the RouteObject
    return new RouteObject(url);
}

//Gets the params for a given query, default the current query
function useParams(search=window.location.search){
    //Declaring an empty object to return
    const paramObject={};
    //Instantiates a URLSearchParams object from the given query
    const searchParams=new URLSearchParams(search);
    //Constructs an object from the searchParams
    searchParams.forEach((p, i) => {
    Object.defineProperty(paramObject, i, {
        value: p,
        writable:false
    })
    })
    //Returns the final value of paramObject
    return paramObject;
}

//Gets a resource given the index
/*function useResources(){
return useContext(ResourceObj);
}*/



//Exports the hooks
export {useRoute, useParams};



//OLD CODE:
/*
// function getParams(route){
//     const paramObject={};
//     const searchParams=new URLSearchParams(route);
//     searchParams.forEach((p, i) => {
//     Object.defineProperty(paramObject, i, {
//         value: p,
//         writable:false
//     })
//     })
//     return paramObject;
// }
// function useParams(){
// const paramObject={};
// const searchParams=new URLSearchParams(window.location.search);
// searchParams.forEach((p, i) => {
// Object.defineProperty(paramObject, i, {
//     value: p,
//     writable:false
// })
// })
// return paramObject;
// }



// function useAnchors(anchorObj){
// const scrollRef=useRef();
// for(var anchor in anchorObj){
//     if(window.location.hash==anchor){
//         scrollRef.current.scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//         })
//     }
// }
// return scrollRef;
// }
// function useId(ref){
// for(var route in ref.current.routingObj){
//     if(validifyRoute(route) in validifyRoute(window.location.href)){

//     }
// }
// }
// function validifyRoute(r, robj=null){
    
//     route=r;
//     if(robj != null && typeof robj[r]=="object"){
//         route=validifyRoute(route + robj)        
//     }
// if(!route.endswith("/")){
//     route=route+"/";
// }




// //new system
// function getPathArrayFromRoute(route){
//     var routeArray=route.split("/")

// }


// function getPage(route, routeObj){
// if(window.location.host in route){}
// }
// return route;}

// export {useParams, validifyRoute}*/