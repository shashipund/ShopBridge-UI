import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { EditproductComponent } from './product/editproduct/editproduct.component';
import { ErrorPageComponent } from './error-page/error-page.component';


const routes: Routes = [
  {path:"", component:ProductComponent},
  {path:"product", component:ProductComponent},
  {path:"editproduct", component:EditproductComponent},
  {path:"error", component:ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
