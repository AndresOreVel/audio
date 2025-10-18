import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cart.asObservable();

  constructor() { }

  get items(): CartItem[] {
    return this.cart.value;
  }

  addToCart(item: CartItem){
    const items = [...this.items];
    const index = items.findIndex(p => p.id === item.id);
    
    if(index >= 0){
      items[index].quantity += item.quantity;
    } else{
      items.push(item);
    }
    
    this.cart.next(items);
  }

  getCartCount(): number{
    return this.cart.getValue().length;
  }
  
  clearCart(){
    this.cart.next([]);
  }

  removeItem(id: number){
    const items = this.items.filter(p => p.id !== id);
    this.cart.next(items);
  }

  getSubtotal(): number{
    return this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  getShipping():number{
    return 50;
  }

  getTax():number{
    return parseFloat((this.getSubtotal() * 0.21).toFixed(2));
  }

  getTotal():number{
    return parseFloat(this.getSubtotal() + this.getShipping() + this.getTax().toFixed(2));
  }
}
