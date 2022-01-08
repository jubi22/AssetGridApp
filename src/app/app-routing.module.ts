import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAssetComponent } from './homepage/edit-asset/edit-asset.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'edit/:id', component:EditAssetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
