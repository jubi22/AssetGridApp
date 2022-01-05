import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AssetsService } from 'src/app/services/assets.service';
import { ModelList } from 'src/app/models/modelslist.model';
import { ManufacturerList } from 'src/app/models/manufacturerList.model';
import { Colors } from 'src/app/models/colors.model';
import { MatDialogRef } from '@angular/material/dialog';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { Assets } from 'src/app/models/assets.model';

@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.css']
})
export class CreateAssetComponent implements OnInit {
  public modelList:ModelList[];
  public manufacturerList:ManufacturerList[];
  public colorList:Colors[];
  public assetList:Assets[];

  constructor(private assetservice:AssetsService, public dialogref:MatDialogRef<CreateAssetComponent>,
    private message: ToastrService) {
   }

  ngOnInit(): void {
    this.assetservice.GetModelsList().subscribe(res=>this.modelList=res as ModelList[])
    this.assetservice.GetColorList().subscribe(res=> this.colorList= res as Colors[])
    this.assetservice.GetManufacturerList().subscribe(res=>this.manufacturerList=res as ManufacturerList[]);

  }
  onSubmit(form:NgForm){
    if(form.value.ColorId==""){
      form.value.ColorId=null;
    }
    this.assetservice.AddAsset(form.value).subscribe(
      res=>{
        if(res!=null){
          console.log("successfully added new asset");
          this.message.success("New Asset has been added successfully");
          this.dialogref.close();
          this.assetservice.filter('test');
          
        }
      },
      err=>{
        // console.log("failed : ",err)
        this.message.error("Something went wrong..");
      }
    );
  }
  onCancel(){

    this.dialogref.close();
    
  }

}
