//Imports
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { arrayEquals, includesOther } from './ArrayUtil';
import RouteObject from './RouteObject';

//Creating the resource object context
//const ResourceObj = React.createContext();
//Gets the page needed from the route dictionary
function getRouteResult(route, routeObj, routeObjResources, index=0, routeObjInitial=routeObj, routeResources={}){
    //Gets the RouteObject from the route provided
    const routeResultObj=new RouteObject(route);
    routeResultObj.setResourceObj(routeResources)
    console.log(routeResultObj.getPathNodes())
    console.log(routeResultObj.getPathNodes()[index])
    //Defining the return value
    let result=null;
    //Checks if the first path node of the RouteObject is within the route dictionary
    if(Object.getOwnPropertyNames(routeObj).includes(routeResultObj.getPathNodes()[index])){
        //Checks if the value of the path node in the route dictionary is an object; If there are further nodes to go down
        if(typeof routeObj[routeResultObj.getPathNodes()[index]] == "object"){

            //If so, runs the function with the next dictionary of nodes
            result=getRouteResult(route, routeObj[routeResultObj.getPathNodes()[index]], routeObjResources, index+1, routeObjInitial, routeResultObj.getResourceObj());
            
        }
        //Checks if the value of the path node in the route dictionary is an object; If there are not further nodes to go down
        if(typeof routeObj[routeResultObj.getPathNodes()[index]] == "function"){
            const resources=routeResultObj.getResourceObj();
            console.log(routeResultObj.getPathNodes())
            console.log(index)
            console.log(routeResultObj.getPathNodes()[index])
            if(routeResultObj.getPathNodes().length > index+2){ return React.cloneElement(routeObjInitial["*"](), {resources});}
            //If so, set result to the value of the path node in the dictionary
            result=routeObj[routeResultObj.getPathNodes()[index]]();
            
        }
        const resources=routeResultObj.getResourceObj();

        //Exit the function
        return React.cloneElement(result, {resources});

    }

    //Checks if the user is at the main page
    if(routeResultObj.getPathNodes() == [""]){
        //If so return the home page
        return routeObj[""];
    }
    //Checks if the current path nodes contain one of the resource path nodes
    if(includesOther(Object.values(routeObjResources), routeResultObj.getPathNodes().slice(0, index))&&!routeResultObj.getPathNodes()[index].includes(":")){
        //Add the key/value pair to the routeResultobj resource object
        const singleKeyArray=Object.keys(routeObjResources).filter(k => (arrayEquals(routeObjResources[k], routeResultObj.getPathNodes().slice(0, index))));
        routeResultObj.addResource(singleKeyArray[0], routeResultObj.getPathNodes()[index]);
        console.log(routeResultObj.getPathNodes().slice(0, index))
        console.log(`${routeResultObj.getURL().replace(routeResultObj.getPath(), "")}/${routeResultObj.getPathNodes().slice(0, index).concat([`:${singleKeyArray[0]}`]).concat(routeResultObj.getPathNodes().slice(index+1, routeResultObj.getPathNodes().length-1)).join("/")}`)
        //Run the function again, this time using the : value in the path and with the new routeResultObj thing
        return getRouteResult(`${routeResultObj.getURL().replace(routeResultObj.getPath(), "")}/${routeResultObj.getPathNodes().slice(0, index).concat([`:${singleKeyArray[0]}`]).concat(routeResultObj.getPathNodes().slice(index+1, routeResultObj.getPathNodes().length-1)).join("/")}`, routeObj, routeObjResources, index, routeObjInitial, routeResultObj.getResourceObj())
    }
    
    const resources=routeResultObj.getResourceObj();
   //Returns the 404/Page Not Found page
    return React.cloneElement(routeObjInitial["*"](), {resources});
}
//Declares the app variable
const RoutableApp= props => {
const [mainApp, setMainApp] = useState(props.routeObj["*"]);
const [resourceFinalObj, setResourceFinalObj] = useState({});





function resourceList(routeObj, resourceObj={}, currentPath=[]){
//Loop through every key in routeObj
for(var key in routeObj){
    console.log(key)
//If that key has a :, then add it without the colon as a key and its leading nodes as a value to the resourceObj
if(key.startsWith(":")){

Object.defineProperty(resourceObj, key.replace(":", ""), {
    value: currentPath,
    enumerable: true
})
console.log(resourceObj)
}
//If the value of the key is an object, then run the function again, adding all nodes and the value as routeObj
if(typeof routeObj[key]=="object"){
    resourceList(routeObj[key], resourceObj, currentPath.concat(key))
}
//When the loop exits, return the resourceObj


}
console.log(resourceObj)
return resourceObj;
}
//A memoized value containing a dictionary of all the resources and the path to them, chagnes if the route dictionary changes
const routeObjResources=useMemo(() => {
 return resourceList(props.routeObj);
}, [props])


//Everytime the path or the route dictionary changes, sets the Main App to the result of the route
useEffect(() => {
    const routeResult=getRouteResult(window.location.href, props.routeObj, routeObjResources);
    setMainApp(routeResult)
    console.log(routeResult)
   // setResourceFinalObj(routeResult[1])
 
}, [props, window.location.pathname], routeObjResources)



//Returns the page
    return (
      
        <main>

            {mainApp}

            </main>
    
    );    }

//Exports the component
export default RoutableApp;
//export { ResourceObj };
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
//Get a list of resources (i.e. https://url.com/settings/y34721) where y34721 is the id of the resource
function resourceListFunc(routeObj, originalPath=[], allResources={}){
    console.log("ln 57")
    //loops throught the property names in routeObj
    for(var routeNode in routeObj){
        console.log("ln 59")
        //Creates a new path to pass to the next iteration of the function
        let newOriginalPath=originalPath.concat([routeNode])
        console.log(newOriginalPath)
        //Check if routeNode is a resource
        if(routeNode.startsWith(":")){
            console.log("ln 65")
            //Adds a property to allResources with a value of routenode(e.x. ":id") and a key of the path(In node tree form) before it
            Object.defineProperty(allResources, routeNode, originalPath);
            //Removes the resource node from the new path
            newOriginalPath.pop()
        }
        //Checks if there is further to go down in the route tree
        if(typeof routeObj[routeNode] == "object"){
            console.log("ln 73")
            console.log(newOriginalPath)
            //Runs a new iteration of the function, passing in routeObj again, the value of the new path, and a list of all the resources
            resourceListFunc(routeObj[routeNode], newOriginalPath, allResources)
        }
    }
    console.log("ln 78")
    console.log(allResources)
    //Exit the function
    return allResources;
}
*/