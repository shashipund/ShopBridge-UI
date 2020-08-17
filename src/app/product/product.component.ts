import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../Services/product-service.service';
import { Product } from './product';
import { Router } from '@angular/router';
import { DataTransferService } from '../DataService/data-transfer.service';

// import * as image from '../_imageJson/Image.json';
// import {productImage} from './productImage';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  productList: Product[] = [];
  _productData: Product = new Product();
  deleteStatus: boolean;
  searchTerm: string;
  status: boolean;
  isEmpty : boolean=true;

  selectedFile: File = null;
  imgURL: any = "./assets/images/placeholder.png";
  imagePath: any;
  receivedImageData: any;
  base64Data: any;
  fileName: any;
  imageType: any;
  
  constructor(private _productService: ProductServiceService, private _router: Router, private _dataService: DataTransferService) {
    this.getProductList();
  }

  ngOnInit(): void {
    this.searchTerm = "";
  }

  getProductList(): void {
    this._productData.DESCRIPTION = "";
    this._productService.getProducts().subscribe((response) => {
      debugger;
      this.productList = [];
      if (response.length > 0) {
        this.isEmpty=false;
        for (var i = 0; i < response.length; i++) {
          debugger;
          if (response[i].Base64Content != null) {
            var ext = response[i].ImageName.split('.')[1];
            this.imagePath = 'data:image/'+ ext +';base64,' + response[i].Base64Content;
          }
          else {
            this.imagePath = "./assets/images/placeholder.png";
          }
          this.productList.push({ PRODUCTID: response[i].Id, NAME: response[i].Name, DESCRIPTION: response[i].Description, PRICE: response[i].Price, IMAGENAME: "", BASE64CONTENT: this.imagePath });
        }
      }
      else{
        this.isEmpty=true;
      }
    },
    (error)=>{
      this._router.navigateByUrl('/error');
    });
    
  }

  btnSubmit() {
    this._productData.BASE64CONTENT = this.base64Data;
    this._productData.IMAGENAME = this.fileName;
    this._productService.InsertProduct(this._productData).subscribe((response) => {
      this.status = response;
      if (this.status) {
        alert("Product Added successfully !!!");
        this.clearFields();
        this.getProductList();
      }
      else {

      }
    },
    (error)=>{
      this._router.navigateByUrl('/error');
    });
  }
  clearFields() {
    this._productData.NAME = " ";
    this._productData.DESCRIPTION = "";
    this._productData.PRICE = "";
    this._productData.IMAGENAME = "";
    this.base64Data = "";
    this.imagePath = "./assets/images/placeholder.png";
  }

  viewProduct(product) {
    this._productData.PRODUCTID = product.PRODUCTID;
    this._dataService.pushProductData(this._productData);
    this._router.navigateByUrl('/editproduct');
  }

  deleteProduct(id): void {
    this._productService.DeleteProduct(id).subscribe((response) => {
      this.deleteStatus = response;
      if (this.deleteStatus) {
        alert("Product Deleted Successfully !!!");
        this.getProductList();
      }
    },
    (error)=>{
      this._router.navigateByUrl('/error');
    });
  }

  onFileLoad(event) {
    this.selectedFile = <File>event.target.files[0];
    this.fileName = this.selectedFile.name;
    this.imageType = this.selectedFile.type;
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
      this.base64Data = this.imgURL.split(',')[1];
      this.imgURL = 'data:' + this.imageType + ';base64,' + this.base64Data;
      //this.imgURL = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    };
  }
}
