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

function resourceListFunc(routeObj, originalPath=[], allResources=[]){
 
    for(var routeNode in routeObj){
        let newOriginalPath=originalPath.concat([routeNode])
        if(routeNode.startsWith(":")){
            allResources.push(originalPath)
            newOriginalPath.pop()
        }
        if(typeof routeObj[routeNode] == "object"){
            resourceListFunc(routeObj, newOriginalPath, allResources)
        }
    }
    return allResources;
}

const routeObjResources=useMemo(() => {
 return resourceListFunc(props.routeObj);
}, [props])

useEffect(() => {
    setMainApp(getRouteResult(window.location.href, props.routeObj, routeObjResources))
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