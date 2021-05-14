import React from 'react';
function redirectTo(path){
    
    
    if(!path.startsWith("/")) path="/" + path;
    window.location.replace(window.location.host+path)
}
const Link= () => {
    
return (
    <div onClick={() => {redirectTo(props.path)}}>

    </div>
);
}
export default Link;