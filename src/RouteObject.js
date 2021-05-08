//Imports
import React from 'react';
import { useParams } from './routing';

//Constructs an object with the given parameters keys and values
function constructParams(searchParams){
    const paramObject={};
    searchParams.forEach((p, i) => {
        Object.defineProperty(paramObject, i, {
            value: p,
            writable:false
        })
        })
        return paramObject;
}

class RouteObject{
    //Constructor
    constructor(url){
        //Declares values of the object
       this.urlObj=new URL(url);
       this.params=constructParams(this.urlObj.searchParams);
       this.pathVal=this.urlObj.pathname;
       this.pathNodes=this.urlObj.pathname.split("/");
       this.query=this.urlObj.search;
        this.href=url;
        //Removes query from path nodes
       this.pathNodes[this.pathNodes.length-1].replace(this.urlObj.search, '');
       //Removes empty strings from path nodes
       if(this.pathNodes[this.pathNodes.length-1]!=""){
      
        this.pathNodes.push("")
    }
        if(this.pathNodes[0]==""){
  
           this.pathNodes.shift()
        }

        
    }
    //Getter methods
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

//Exporting the object
export default RouteObject;