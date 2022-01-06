import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { Assets } from '../models/assets.model';
import { ManufacturerList } from '../models/manufacturerList.model';
import { ModelList } from '../models/modelslist.model';
import { AssetsService } from '../services/assets.service';
import * as xl from  'xlsx';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateAssetComponent } from './create-asset/create-asset.component';
import { EditAssetComponent } from './edit-asset/edit-asset.component';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { Export } from '../models/export.model';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { test1 } from '../models/test.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public assetList: test1[];
  // public exportList:Export[]
  public modelList:ModelList[];
  public manufacturerList:ManufacturerList[];
  u;
  model:any
  test=[];
  Search:string;
  rowsPerPage: number = 3
  totalPages:number =0
  currentPageNumber:number =1
  pageNumberArray:any = []
  totalRecords:any = 0


  constructor(private assetservice:AssetsService, private dialog:MatDialog) {
    this.assetservice.listen().subscribe((m:any)=>{
      // this.getAssetsPage()
      this.assetservice.GetAssetsList().subscribe(m=> this.assetList= m as test1[] )
      this.assetservice.totalrecords()
    })
   }
  @ViewChild(MatPaginator) paginator:MatPaginator


  ngOnInit() {
    this.assetservice.totalrecords()
    this.currentPageNumber = 1
    // this.getAssetsPage()
    this.assetservice.GetAssetsList().subscribe(res=>this.assetList= res as test1[] )
    // this.assetservice.GetAssetsList().subscribe(res=>this.exportList= res as Export[] )
    this.assetservice.GetModelsList().subscribe(res=>  this.modelList=res as ModelList[])
    this.assetservice.GetManufacturerList().subscribe(res=>this.manufacturerList=res as ManufacturerList[]);
    
  }
 
  createAsset(){
    const dialogconfig=new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus=true;
    dialogconfig.width="65%"
    dialogconfig.height="65%"

    this.dialog.open(CreateAssetComponent, dialogconfig);
  }
  EditAsset(row){ 
    this.u=row;
    this.assetservice.temp.push(this.u);
    const dialogconfig=new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus=true;
    dialogconfig.width="65%"
    dialogconfig.height="65%"
    this.dialog.open(EditAssetComponent, dialogconfig);
  }

  exportToSheet() {

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Asset-List');
   
    worksheet.columns = [
      { header: 'Name', key: 'Name', width: 20 },
      { header: 'Model Name', key: 'ModelId', width: 20 },
      { header: 'Manufacturer Name', key: 'ManufacturerId', width: 20 },
      { header: 'Color Name', key: 'ColorId', width: 20 },
      { header: 'Description', key: 'Description', width: 20 },
      { header: 'Purchase Date', key: 'PurchaseDate', width: 15 },
      { header: 'InUse', key: 'IsActive', width: 10 },
      { header: 'Price', key: 'Price', width: 10 },
      { header: 'Isdeleted', key: 'IsDeleted', width: 10 },
      { header: 'Created Date', key: 'CreatedOn', width: 20 },
      { header: 'Last Updated Date', key: 'LastUpdatedOn', width: 20 },
    ];
    this.assetList.forEach(e => {
     console.log(e)
     if(e.assets.isActive==true){
       var inUse="YES"
     }
     else{
       var inUse="NO"
     }
     if(e.assets.isDeleted==true){
       var isdelete="YES"
     }
     else{
       var isDelete="NO"
     }
      worksheet.addRow({ Name:e.assets.name,ModelId:e.assets.model.name,
      ManufacturerId:e.assets.manufacturer.name, ColorId:e.assets.color.name, Description:e.assets.description,
      IsActive:inUse, Price:e.assets.price, PurchaseDate:e.assets.purchaseDate,
      IsDeleted:isDelete, CreatedOn:e.assets.createdOn, LastUpdatedOn:e.assets.lastupdatedOn},"n");
    });
   
    workbook.xlsx.writeBuffer().then((assetList) => {
      let blob = new Blob([assetList], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'AssetGrid.xlsx');
    })
   
  }
  rowSelect()
  {
    this.currentPageNumber = 1
    this.GettotalRecords()
    this.getAssetsPage()
  }
  
  GettotalRecords(){
    this.assetservice.totalrecords().subscribe({
      next:(data)=>{
        this.totalRecords=parseFloat(data)
        this.totalPages=Math.ceil(this.totalRecords/this.rowsPerPage)
        this.pageNumberArray= new Array(this.totalPages)
      }
    }
    )
  }

  getAssetsPage() {
    this.assetservice.GetAssetsPage(this.rowsPerPage,this.currentPageNumber).subscribe(
     )
  }

}
 