import { Guid } from "guid-typescript";
import { Colors } from "./colors.model";
import { ManufacturerList } from "./manufacturerList.model";
import { ModelList } from "./modelslist.model";


export class Assets{
    public name:string;
    public modelId:string;
    public manufacturerId:string;
    public colorId:string;
    public price: number;
    public description:string;
    public isActive:boolean;
    public purchaseDate:Date;
    public id:Guid;
    public isDeleted:boolean;
    public createdOn:Date;
    public lastupdatedOn:Date;
    public color:Colors;
    public model:ModelList;
    public manufacturer:ManufacturerList;

    constructor(id:Guid,aname:string, modelId:string, created:Date,
        isDeleted:boolean, createdOn:Date, lastupdatedOn:Date, manu:string, 
        model:ModelList, color:Colors, manufacturer:ManufacturerList, colorId:string, price:number, date:Date,desc:string,check:boolean){
        this.name=aname;
        this.isDeleted=isDeleted;
        this.lastupdatedOn=lastupdatedOn;
        this.createdOn=createdOn;
        this.id=id;
        this.modelId=modelId;
        this.manufacturerId=manu;
        this.price=price;
        this.purchaseDate=date;
        this.colorId=colorId;
        this.description=desc;
        this.isActive=check;
        this.model=model;
        this.manufacturer=manufacturer;
        this.color=color;
     
    }

}