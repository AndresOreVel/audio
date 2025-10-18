import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AppNavigationService } from './shared/layout/app-navigation.service';
import { AppMenu } from './shared/layout/app-menu';
import { filter } from 'rxjs';
import { CardModalComponent } from './card-modal/card-modal.component';
import { ToastComponent } from "./toast/toast.component";
import { CartItem, PruebaService } from './services/prueba.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, CardModalComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ecommerce';
  menu!: AppMenu;
  showCart = false;
  cartCount = 0;

  constructor(
    private navigationService: AppNavigationService,
    private router: Router,
    private viewport: ViewportScroller,
    private cartService: PruebaService
  ){}
  
  ngOnInit(): void {
    this.menu = this.navigationService.getMenu();
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.viewport.scrollToPosition([0, 0]);
    });
    this.cartService.cart$.subscribe((items: CartItem[]) => {
  this.cartCount = items.reduce((acc: number, item: CartItem) => acc + item.quantity, 0);
});

  }

  toggleCart(){
    this.showCart = !this.showCart;
  }
}
