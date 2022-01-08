import { Component, OnInit, ViewChild } from '@angular/core';
import { Assets } from 'src/app/models/assets.model';
import { AssetsService } from 'src/app/services/assets.service';
import { Colors } from 'src/app/models/colors.model';
import { ModelList } from 'src/app/models/modelslist.model';
import { ManufacturerList } from 'src/app/models/manufacturerList.model';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.css']
})
export class EditAssetComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  public assetList:Assets[];
  public modelList:ModelList[];
  public manufacturerList:ManufacturerList[];
  public colorList:Colors[];
  u;
  id;
  temp;
  c;
  assetIdget;
  assetId;
  format:'dd-MM-yyyy'

  constructor(public assetservice:AssetsService,
    public activated: ActivatedRoute, public router: Router, public mess:ToastrService,
    public dialogref:MatDialogRef<EditAssetComponent>) { 
        

    }

  ngOnInit(): void {
    // this.assetIdget= this.activated.paramMap.subscribe(
    //   t=>{
    //     this.assetId= t.get('id')
    //   }
    // )
   
    // var c= this.temp.toString().toUpperCase();
    // this.temp=(this.temp).toUppercase();
    // console.log(c);
    this.assetservice.GetAssetsList().subscribe(res=> this.assetList= res as Assets[])
    this.assetservice.GetModelsList().subscribe(res=>this.modelList=res as ModelList[])
    this.assetservice.GetColorList().subscribe(res=> this.colorList= res as Colors[])
    this.assetservice.GetManufacturerList().subscribe(res=>this.manufacturerList=res as ManufacturerList[]);
    this.temp= this.assetservice.temp;
  
   

  
  }
  onSubmit(form:NgForm){
    // form.value.Id=this.assetId  //new
    if(form.value.ColorId==""){
      form.value.ColorId=null
    }
    this.assetservice.UpdateAsset(form.value).subscribe(
      res=>{
        if(res!=null){
        this.mess.success("Updated successfully")
        this.dialogref.close();
        // this.closebutton.nativeElement.click()
        this.assetservice.filter('edit');
        this.temp.pop();
        }
      },
      err=>{
        console.log("Failed", err)
        this.mess.error("Something went wrong!")
      }
    );
  }
  onCancel(){
    this.temp.pop();

    this.dialogref.close();
    // this.closebutton.nativeElement.click();
    
  }

}
