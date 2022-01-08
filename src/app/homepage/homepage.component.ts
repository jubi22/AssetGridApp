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
import { DatePipe, formatDate } from '@angular/common';
// import { test1 } from '../models/test.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  @ViewChild('cancel') cancel
  public assetList: Assets[];
  public exportList:Assets[]
  public modelList:ModelList[];
  public manufacturerList:ManufacturerList[];
  u;
  model:any
  test=[];
  Search:string;
  rowsPerPage: number = 5
  totalPages:number =0
  currentPageNumber:number =1
  pageNumberArray:any = []
  totalRecords:any = 0
  temp:any;
  editId:any
  display:any


  constructor(private assetservice:AssetsService, private dialog:MatDialog, private datePipe:DatePipe) {
    // this.currentPageNumber=1
    // this.rowsPerPage = 5
    // this.totalRecords= 0
    this.GettotalRecords()
    this.currentPageNumber = 1
    this.getAssetsPage()
    this.assetservice.listen().subscribe((m:any)=>{

      // this.getAssetsPage()
      this.assetservice.GetAssetsList().subscribe(m=> this.assetList= m as Assets[] )
      this.assetservice.GetAssetsList().subscribe(res=>this.exportList= res as Assets[] )
      this.GettotalRecords()
      this.currentPageNumber = 1
      this.getAssetsPage()
      // this.assetservice.totalrecords()
      
    })
   }
  // @ViewChild(MatPaginator) paginator:MatPaginator


  ngOnInit() {
    this.GettotalRecords()
    this.currentPageNumber = 1
    this.getAssetsPage()
    this.assetservice.GetAssetsList().subscribe(res=>this.assetList= res as Assets[] )
    this.assetservice.GetAssetsList().subscribe(res=>this.exportList= res as Assets[] )
    this.assetservice.GetModelsList().subscribe(res=>  this.modelList=res as ModelList[])
    this.assetservice.GetManufacturerList().subscribe(res=>this.manufacturerList=res as ManufacturerList[]);
    
  }

  onCancel(){
    this.cancel.nativeElement.click()
  }
 
  createAsset(){
    // const dialogconfig=new MatDialogConfig();
    // dialogconfig.disableClose=false;
    // dialogconfig.autoFocus=false;
    // dialogconfig.width="50%"
    // dialogconfig.height="75%"
    let config: MatDialogConfig={
      panelClass:"tester"
    }
    
    
    this.dialog.open(CreateAssetComponent,config)
  }
  EditAsset(editId:any){ 
    // this.display="block"
    this.u=editId;
    console.log(this.u)
    this.assetservice.temp.push(this.u);
    let config: MatDialogConfig={
      panelClass:"tester"
    }
    this.dialog.open(EditAssetComponent,config)
    // const dialogconfig=new MatDialogConfig();
    // dialogconfig.disableClose=false;
    // dialogconfig.autoFocus=false;
    // // dialogconfig.width="65%"
    // // dialogconfig.height="65%"
    // this.dialog.open(EditAssetComponent,{
    //   width:"50%",
    //   height:"86%",
    //   disableClose:true,
 
    // });
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
      // { header: 'Isdeleted', key: 'IsDeleted', width: 10 },
    ];
    this.exportList.forEach(e => {
     if(e.isActive==true){
       var inUse="YES"
     }
     else{
       var inUse="NO"
     }
     if(e.isDeleted==true){
       var isdelete="YES"
     }
     else{
       var isDelete="NO"
     }
  
     this.datePipe.transform(e.purchaseDate,'yyyy-MM-dd')
     console.log(e.purchaseDate)
      worksheet.addRow({ Name:e.name,ModelId:e.model.name,
      ManufacturerId:e.manufacturer.name, ColorId:e.color.name, Description:e.description,
      IsActive:inUse, Price:e.price, PurchaseDate:e.purchaseDate,},"n");
    });
   
    workbook.xlsx.writeBuffer().then((exportList) => {
      let blob = new Blob([exportList], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
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
      (data:Assets[])=>{this.assetList=data}
    )
  }

  paginationLeftArrowClick() {
    if(this.currentPageNumber>1) {
    this.currentPageNumber-=1
    // console.log(this.currentPageNumber)
    this.getAssetsPage()
    }
  }

  paginationRightArrowClick() {
    if(this.currentPageNumber<this.totalPages) {
      this.currentPageNumber +=1
      // console.log(this.currentPageNumber)
      this.getAssetsPage()
    }
  }

  onPageNumberChange(pno:number) {
    this.currentPageNumber = pno
    console.log(this.currentPageNumber)
    this.GettotalRecords()
    this.getAssetsPage()
  }

}
 