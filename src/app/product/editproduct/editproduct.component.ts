import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/DataService/data-transfer.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  model: Product = new Product();
  productID:any;
  imagePath:any;
  productName:any;
  description:any;
  ID:any;
  price:any;
  constructor(private router: Router, private _dataService: DataTransferService, private _productService: ProductServiceService) {
  }

  ngOnInit(): void {
    
    this._dataService.prodData.subscribe((response) => {
      debugger;
      if(response.PRODUCTID == null || response.PRODUCTID ==""){
          this.ID= localStorage.getItem("ID");
      }
      else{
        localStorage.clear();
       localStorage.setItem('ID',response.PRODUCTID);
       this.ID=response.PRODUCTID;
      }
      this.getProductDetails(this.ID);
    });
  }

  getProductDetails(ID) {
    this._productService.getProductDetails(ID).subscribe((response) => {
      if(response !=null || response != undefined){
        debugger;
        this.productName= response.Name;
        this.description= response.Description;
        this.price=response.Price;
        
        if(response.Base64Content == null)
          this.imagePath = "./assets/images/placeholder.png";
        else
        {
          var ext = response.ImageName.split('.')[1];
         this.imagePath = 'data:image/'+ext+';base64,' + response.Base64Content;
        }
      }
      else{
        this.router.navigateByUrl('/error');
      }
    },
    (error)=>{
      this.router.navigateByUrl('/error');
    });
  }

  btnBackClick(){
    this.router.navigateByUrl('/product');
  }
}
