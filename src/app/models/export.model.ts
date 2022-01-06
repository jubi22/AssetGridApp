import { Guid } from "guid-typescript";


export class Export{

    public Name:string;
    public modelId:string;
    public manufacturerId:string;
    public colorId:string;
    public price: number;
    public description:string;
    public isActive:boolean;
    public purchaseDate:Date;
    public id:Guid;

    constructor(id:Guid,name:string, modelId:string, purchaseDate:Date, manufacturerId:string, colorId:string, price:number,description:string,isActive:boolean){
        this.Name=name;
    
        this.id=id;
        this.modelId=modelId;
        this.manufacturerId=manufacturerId;
        this.price=price;
        this.purchaseDate=purchaseDate;
        this.colorId=colorId;
        this.description=description;
        this.isActive=isActive;
     
    }

}