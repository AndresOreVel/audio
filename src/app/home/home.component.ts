import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PRODUCTS } from '../details/product-data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  products = PRODUCTS;

  markII = this.products.find(p => p.name === 'mark-II');
  markI = this.products.find(p => p.name === 'mark-I');
  zx7 = this.products.find(p => p.name === 'zx7');
  zx9 = this.products.find(p => p.name === 'zx9');
  yx1 = this.products.find(p => p.name === 'yx1');

  constructor( 
    private router: Router
  ){}

  showDetails(productName: string){
    this.router.navigate(['/details', productName]);
  }
}
