import React, { useCallback, useEffect, useState } from 'react';
import RouteObject from './RouteObject';



function getRouteResult(route, routeObj, routeObjResources, index=0){

    const routeResultObj=new RouteObject(route);
   
    let result=null;
    if(Object.getOwnPropertyNames(routeObj).includes(routeResultObj.getPathNodes()[index])){
        if(typeof routeObj[routeResultObj.getPathNodes()[index]] == "object"){

            result=getRouteResult(route, routeObj[routeResultObj.getPathNodes()[index]], index+1);
            
        }
        if(typeof routeObj[routeResultObj.getPathNodes()[index]] == "function"){
          
            result=routeObj[routeResultObj.getPathNodes()[index]]();
            
        }
       
        
        return result;

    }
    if(routeResultObj.getPathNodes() == [""]){
    
        return routeObj[""];
    }
    
   
    return routeObj.default;
}

const RoutableApp= props => {
const [mainApp, setMainApp] = useState(null);

function resourceListFunc(){
    let allResources=[]
    for(var routeNode in props.routeObj){
        if(routeNode.startsWith(":")){
            allResources.push(routeNode)
        }
    }
}

//Get an array of all resources, along with 
const routeObjResources=useMemo(() => {
 
}, [props])

useEffect(() => {
    setMainApp(getRouteResult(window.location.href, props.routeObj, []))
}, [props, window.location.pathname])




    return (
        <main>
            {mainApp}
        </main>   
    );    }

export default RoutableApp;
//OLDER CODE:
/*
function checkRoute(){
    for(var route in props.routingObj){
    
    if(validifyRoute(route) in validifyRoute(window.location.href)){
        return props.routingObj[route];
    }
    }
    return props.routingObj.default;
}

useEffect(() => {
setMainApp(checkRoute());
}, [props, window.location.href])
*/