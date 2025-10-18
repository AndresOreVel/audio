import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalService } from './local.service';

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
export class PruebaService {
  private readonly CART_KEY = 'cart';
  private cart = new BehaviorSubject<CartItem[]>(this.loadCart());
  cart$ = this.cart.asObservable();

  constructor(
    private localStorage: LocalService
  ) {}

  // 🔹 Cargar carrito de localStorage
  private loadCart(): CartItem[] {
    if (typeof window !== 'undefined' && this.localStorage.getItem(this.CART_KEY)) {
      try {
        return JSON.parse(this.localStorage.getItem(this.CART_KEY)!);
      } catch {
        return [];
      }
    }
    return [];
  }

  // 🔹 Guardar carrito en localStorage
  private saveCart(items: CartItem[]) {
    if (typeof window !== 'undefined') {
      this.localStorage.setItem(this.CART_KEY, JSON.stringify(items));
    }
  }

  // 🔹 Getter para items actuales
  get items(): CartItem[] {
    return this.cart.value;
  }

  // 🔹 Añadir item
  addToCart(item: CartItem) {
    const items = [...this.items];
    const index = items.findIndex(p => p.id === item.id);

    if (index >= 0) {
      items[index].quantity += item.quantity;
    } else {
      items.push(item);
    }

    this.cart.next(items);
    this.saveCart(items);
  }

  // 🔹 Contador total de productos (teniendo en cuenta cantidades)
  getCartCount(): number {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  // 🔹 Vaciar carrito
  clearCart() {
    this.cart.next([]);
    this.saveCart([]);
  }

  // 🔹 Eliminar un producto
  removeItem(id: number) {
    const items = this.items.filter(p => p.id !== id);
    this.cart.next(items);
    this.saveCart(items);
  }

  // 🔹 Subtotal
  getSubtotal(): number {
    return this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  // 🔹 Envío (ejemplo fijo)
  getShipping(): number {
    return this.items.length > 0 ? 50 : 0; // 50 si hay algo en carrito, 0 si está vacío
  }

  // 🔹 IVA / Impuesto
  getTax(): number {
    return parseFloat((this.getSubtotal() * 0.21).toFixed(2));
  }

  // 🔹 Total final
  getTotal(): number {
    return this.getSubtotal() + this.getShipping() + this.getTax();
  }
}
