import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Assets } from '../models/assets.model';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  public temp=[];

  constructor(private http:HttpClient) {
    
   }

  GetAssetsList(){
    return this.http.get(environment.apiUrl+'/getassets', { responseType: 'json' });
  }
  GetModelsList(){
    return this.http.get(environment.apiUrl+'/getmodels');
  }
  GetColorList(){
    return this.http.get(environment.apiUrl+'/getcolors');
  }

  GetManufacturerList(){
    return this.http.get(environment.apiUrl+'/getmanufacturers');
  }
  AddAsset(asset:Assets){
    return this.http.post(environment.apiUrl+"/create", asset);
  }

  private l=new Subject<any>();
  listen():Observable<any>{
    return this.l.asObservable();
  }
  filter(filterby:string){
    this.l.next(filterby);
  }
  
  UpdateAsset(asset:Assets){
    return this.http.put(environment.apiUrl+'/edit-asset',asset);
  }
}
