import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PruebaService } from '../services/prueba.service';

@Component({
  selector: 'app-card-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-modal.component.html',
  styleUrl: './card-modal.component.scss'
})
export class CardModalComponent {
  @Input() mode: 'modal' | 'checkout' = 'modal';
  @Output() close = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();

  constructor(
    public cartService: PruebaService,
    private router: Router
  ) { }

  action() {
    if (this.mode === 'modal') {
      this.close.emit();
      this.router.navigate(['/checkout']);
    } else {
      this.success.emit();
    }
  }

  removeAll() {
    this.cartService.clearCart();
  }
}
