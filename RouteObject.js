import React from 'react';
import { useParams } from './routing';
class RouteObject{
    constructor(url){
       this.urlObj=new URL(url);
       this.params=this.urlObj.searchParams;
       this.pathVal=this.urlObj.pathname;
       this.pathNodes=this.urlObj.pathname.split("/");
       this.pathNodes[this.pathNodes.length-1].replace(this.urlObj.search, '');
       
       
    }
}