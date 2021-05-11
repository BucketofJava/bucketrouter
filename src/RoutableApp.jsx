//Imports
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import RouteObject from './RouteObject';


//Gets the page needed from the route dictionary
function getRouteResult(route, routeObj, routeObjResources, index=0, routeObjInitial=routeObj){
    //Gets the RouteObject from the route probided
    const routeResultObj=new RouteObject(route);
    //Defining the return value
    let result=null;
    //Checks if the first path node of the RouteObject is within the route dictionary
    if(Object.getOwnPropertyNames(routeObj).includes(routeResultObj.getPathNodes()[index])){
        //Checks if the value of the path node in the route dictionary is an object; If there are further nodes to go down
        if(typeof routeObj[routeResultObj.getPathNodes()[index]] == "object"){

            //If so, runs the function with the next dictionary of nodes
            result=getRouteResult(route, routeObj[routeResultObj.getPathNodes()[index]], routeObjResources, index+1, routeObj);
            
        }
        //Checks if the value of the path node in the route dictionary is an object; If there are not further nodes to go down
        if(typeof routeObj[routeResultObj.getPathNodes()[index]] == "function"){

            //If so, set result to the value of the path node in the dictionary
            result=routeObj[routeResultObj.getPathNodes()[index]]();
            
        }
        //Exit the function
        console.log(routeResultObj.getPathNodes())
        return result;

    }

    //Checks if the user is at the main page
    if(routeResultObj.getPathNodes() == [""]){
        //If so return the home page
        return routeObj[""];
    }
    console.log(Object.values(routeObjResources))
    //Checks if the node is a resource
    if(routeResultObj.getPathNodes().splice(0, index+1) in Object.values(routeObjResources)){
        console.log("pog lmao")
        //If so go to the next iteration of the function using the placeholder for the resource
        return getRouteResult(routeResultObj.getURL().replace(routeResultObj.getPathNodes()[index], Object.keys(routeObjResources).find(key => routeObjResources[key]==routeResultObj.getPathNodes().splice(0, index+1))), routeObj, routeObjResources, index);
    }
    
   //Returns the 404/Page Not Found page
    return routeObjInitial.default;
}
//Declares the app variable
const RoutableApp= props => {
const [mainApp, setMainApp] = useState(props.routeObj.default);


//Get a list of resources (i.e. https://url.com/settings/y34721) where y34721 is the id of the resource
function resourceListFunc(routeObj, originalPath=[], allResources={}){
    //loops throught the property names in routeObj
    for(var routeNode in routeObj){
        //Creates a new path to pass to the next iteration of the function
        let newOriginalPath=originalPath.concat([routeNode])
        console.log(newOriginalPath)
        //Check if routeNode is a resource
        if(routeNode.startsWith(":")){
            //Adds a property to allResources with a value of routenode(e.x. ":id") and a key of the path(In node tree form) before it
            Object.defineProperty(allResources, routeNode, originalPath);
            //Removes the resource node from the new path
            newOriginalPath.pop()
        }
        //Checks if there is further to go down in the route tree
        if(typeof routeObj[routeNode] == "object"){
            //Runs a new iteration of the function, passing in routeObj again, the value of the new path, and a list of all the resources
            resourceListFunc(routeObj[routeNode], newOriginalPath, allResources)
        }
    }

    //Exit the function
    return allResources;
}

//A memoized value containing a dictionary of all the resources and the path to them, chagnes if the route dictionary changes
const routeObjResources=useMemo(() => {
 return resourceListFunc(props.routeObj);
}, [props])


//Everytime the path or the route dictionary changes, sets the Main App to the result of the route
useEffect(() => {
    setMainApp(getRouteResult(window.location.href, props.routeObj, routeObjResources))
 
}, [props, window.location.pathname], routeObjResources)



//Returns the page
    return (
        <main>
            {mainApp}
            </main>
    );    }

//Exports the component
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