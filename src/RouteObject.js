import React from 'react';
import { useParams } from './routing';

function constructParams(searchParams){
    paramObject={};
    searchParams.forEach((p, i) => {
        Object.defineProperty(paramObject, i, {
            value: p,
            writable:false
        })
        })
        return paramObject;
}

class RouteObject{
    constructor(url){
       this.urlObj=new URL(url);
       this.params=constructParams(this.urlObj.searchParams);
       this.pathVal=this.urlObj.pathname;
       this.pathNodes=this.urlObj.pathname.split("/");
       this.pathNodes[this.pathNodes.length-1].replace(this.urlObj.search, '');
        this.query=this.url.search;
        this.href=url;
        
    }
    getParams(){
        return this.params;
    }
    getURL(){
        return this.href;
    }
    getPathNodes(){
        return this.pathNodes;
    }
    getPath(){
        return this.pathVal;
    }
    getURLObj(){
        return this.urlObj;
    }
}


export default RouteObject;