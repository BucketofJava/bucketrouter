import React, { useEffect, useState } from 'react';
const RoutableApp= props => {
const [mainApp, setMainApp] = useState(null);
function validifyRoute(r){
    route="";
if(!r.endswith("/")){
    route=r+"/";
}
return route;
}
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
    return (
        <main>
            {mainApp}
        </main>
    );
}
export default RoutableApp;