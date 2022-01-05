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

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public assetList: Assets[];
  public exportList:Export[]=[];
  public modelList:ModelList[];
  public manufacturerList:ManufacturerList[];
  u;
  test=[];
  Name;
 

 

  // exportToSheet(){
  //   this.assetservice.GetAssetsList().subscribe(res=> this.export= res as Assets[] )
  //   const ws:xl.WorkSheet=xl.utils.table_to_sheet(this.export);
  //   const wb:xl.WorkBook=xl.utils.book_new();
  //   xl.utils.book_append_sheet(wb,ws,'Sheet1');
  //   xl.writeFile(wb,'Asset-List.xlsx');

   
  // }
  constructor(private assetservice:AssetsService, private dialog:MatDialog) {
    this.assetservice.listen().subscribe((m:any)=>{
      this.assetservice.GetAssetsList().subscribe(m=> this.assetList= m as Assets[] )
    })
   }
  @ViewChild(MatPaginator) paginator:MatPaginator


  ngOnInit() {
    this.assetservice.GetAssetsList().subscribe(res=>this.assetList= res as Assets[] )
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
    // this.assetservice.test.push(row);
    this.u=row;
    this.assetservice.temp.push(this.u);
 
    
    // console.log("hello", this.u);
    const dialogconfig=new MatDialogConfig();
    dialogconfig.disableClose=true;
    dialogconfig.autoFocus=true;
    dialogconfig.width="65%"
    dialogconfig.height="65%"
    this.dialog.open(EditAssetComponent, dialogconfig);
  }

  exportToSheet() {
    // console.log("Asets: ",this.assetList)

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('ProductSheet');
   
    worksheet.columns = [
      { header: 'Id', key: 'Id', width: 10 },
      { header: 'Name', key: 'Name', width: 32 },
      { header: 'Model ID', key: 'ModelId', width: 10 },
      { header: 'Manufacturer ID', key: 'ManufacturerId', width: 10 },
      { header: 'Color ID', key: 'ColorId', width: 10 },
      { header: 'Description', key: 'Description', width: 10 },
      { header: 'Purchase Date', key: 'PurchaseDate', width: 10 },
      { header: 'IsActive', key: 'IsActive', width: 10 },
      { header: 'Price', key: 'Price', width: 10 },
      { header: 'Isdeleted', key: 'IsDeleted', width: 10 },
      { header: 'Created Date', key: 'CreatedOn', width: 10 },
      { header: 'Last Updated Date', key: 'LastUpdatedOn', width: 10 },
    ];
    this.exportList.forEach(e => {
     
      worksheet.addRow({},"n");
    });
   
    workbook.xlsx.writeBuffer().then((assetList) => {
      let blob = new Blob([assetList], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ProductData.xlsx');
    })
   
  }
 
  Search(){
    if(this.Name=""){
     
      this.ngOnInit();
    }
    else{         
      this.assetList=this.assetList.filter(
        res=>{
         
          return res.Name.toLocaleLowerCase().match(this.Name.toLocaleLowerCase())
        }
      )
    }
  }

}
