import { Guid } from "guid-typescript";


export class Export{
    
    public name:string;
    public modelId:string;
    public manufacturerId:string;
    public colorId:string;
    public price: number;
    public description:string;
    public isActive:boolean;
    public purchaseDate:Date;
    public id:Guid;

    constructor(id:Guid,aname:string, model:string, created:Date, manu:string, color:string, price:number, date:Date,desc:string,check:boolean){
        this.name=aname;
    
        this.id=id;
        this.modelId=model;
        this.manufacturerId=manu;
        this.price=price;
        this.purchaseDate=date;
        this.colorId=color;
        this.description=desc;
        this.isActive=check;
     
    }

}