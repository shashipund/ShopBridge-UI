import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../product/product';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  // private categoryDetails = new BehaviorSubject<Category>({
  //   CategoryID:null, Name:""
  // });

  // data = this.categoryDetails.asObservable();

  // Observable for product details 

  private productDetails=new BehaviorSubject<Product>({
    PRODUCTID: "",NAME: "",PRICE: "",DESCRIPTION :"",IMAGENAME:"",BASE64CONTENT:""
  });

  
  prodData = this.productDetails.asObservable();

   constructor() { }

  //  changeMessage(catDetails:Category){
  //    this.categoryDetails.next(catDetails);
  //  }

   pushProductData(prodDetail:Product){
     this.productDetails.next(prodDetail);
   }
}

