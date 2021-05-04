import React from 'react';
import { useParams } from './routing';

class RouteObject{
    constructor(route){
        this.routeParts=(() => {
             return route.split("/");
        })();
        this.params=useParams()
    }
}