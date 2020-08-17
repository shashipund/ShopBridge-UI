import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  // Need to be changes as per API project localhost port or api host
  url: string = 'http://localhost:7009/api/Product/';

  constructor(private _http: HttpClient) { }

  getProducts(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:7009/',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          'Accept': 'application/json'
        })
    };
    return this._http.get<any[]>(this.url + 'ProductList', httpOptions);
  }

  InsertProduct(productItem): Observable<any> {
    debugger;
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          'Accept': 'application/json'
        }
      )
    };
    return this._http.post<any>(this.url + 'AddProduct', JSON.stringify(productItem), httpOptions);
  }

  DeleteProduct(id): Observable<any> {
    debugger;
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT , DELETE',
          'Accept': 'application/json'
        })
    };

    return this._http.delete<any>(this.url + 'DeleteProduct/' + id);
  }

  searchProducts(searchTerm: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          'Accept': 'application/json'
        })
    };
    return this._http.get<any[]>(this.url + 'SearchProductList/' + searchTerm, httpOptions);
  }


  getProductDetails(ID: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          'Accept': 'application/json'
        })
    };

    return this._http.get<any>(this.url + 'GetProductDetails/' + ID, httpOptions);
  }
}
