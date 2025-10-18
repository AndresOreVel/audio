import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {
  @Output() close = new EventEmitter<void>();

  constructor(
    private router: Router
  ){}

  goBack(){
    this.router.navigate(['/']);
  }
}
