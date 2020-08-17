import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  imagePath = "./assets/images/error.png";
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  btnBackClick(){
    this.router.navigateByUrl('/product');
  }
}
