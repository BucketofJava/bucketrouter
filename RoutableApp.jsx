import React, { useEffect, useState } from 'react';
const RoutableApp= props => {
const [mainApp, setMainApp] = useState(null);
function checkRoute(){
    for(var route in props.routingObj){
    if(route in window.location.pathname){
        return props.routingObj[route];
    }
    }
    return props.routingObj.default;
}
useEffect(() => {
setMainApp(checkRoute());
}, [props])
    return (
        <main>
            {mainApp}
        </main>
    );
}
export default RoutableApp;