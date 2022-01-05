import { Guid } from "guid-typescript";


export class Assets{
    public Name:string;
    public ModelId:string;
    public ManufacturerId:string;
    public ColorId:string;
    public Price: number;
    public Description:string;
    public IsActive:boolean;
    public PurchaseDate:Date;
    public Id:Guid;

    constructor(id:Guid,aname:string, model:string, created:Date, manu:string, color:string, price:number, date:Date,desc:string,check:boolean){
        this.Name=aname;
    
        this.Id=id;
        this.ModelId=model;
        this.ManufacturerId=manu;
        this.Price=price;
        this.PurchaseDate=date;
        this.ColorId=color;
        this.Description=desc;
        this.IsActive=check;
     
    }

}