import React, { useEffect, useState } from 'react';
const RoutableApp= props => {
const [mainApp, setMainApp] = useState(null);
function checkRoute(){
    for(var route in props.routingObj){
    if(window.location.pathname==route || window.location.pathname==route+"/"){
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