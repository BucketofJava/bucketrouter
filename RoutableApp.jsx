import React, { useEffect, useState } from 'react';
const RoutableApp= props => {
const [mainApp, setMainApp] = useState(null);
useEffect(() => {
    
}, [props])
    return (
        <main>
            {mainApp}
        </main>
    );
}
export default RoutableApp;