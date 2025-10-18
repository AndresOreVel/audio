import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PRODUCTS } from './product-data';
import { ToastService } from '../services/toast.service';
import { PruebaService } from '../services/prueba.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  productName = '';
  product: any = null;
  quantity = 1;

  constructor(
    private router: ActivatedRoute,
    private rout: Router,
    private viewporController: ViewportScroller,
    private cartService: PruebaService,
    private toastService: ToastService
  ){}
  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.productName = params.get('productName') || '';
      this.product = PRODUCTS.find(p => p.name === this.productName);
      this.viewporController.scrollToPosition([0, 0]);
    });
  }

  goBack(){
    this.rout.navigate(['/']);
  }
  
  goToDetails(name: string){
    this.rout.navigate(['/details', name]);
  }

  increase(){
    this.quantity++;
  }
  
  decrease(){
    if(this.quantity > 1) this.quantity--;
  }

  addToCart(){
    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      image: this.product.image,
      quantity: this.quantity
    });
    this.toastService.show(`${this.product.name} added to cart`, 'success');
  }
}
