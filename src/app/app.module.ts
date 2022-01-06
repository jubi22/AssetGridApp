import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatDialogModule} from '@angular/material/dialog';
import { CreateAssetComponent } from './homepage/create-asset/create-asset.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { EditAssetComponent } from './homepage/edit-asset/edit-asset.component';
import { SearchfilterPipe } from './filters/searchfilter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CreateAssetComponent,
    EditAssetComponent,
    SearchfilterPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule.forRoot()
    
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[CreateAssetComponent]
})
export class AppModule { }
