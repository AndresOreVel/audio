import { Component, OnInit } from '@angular/core';
import { ToastMessage, ToastService } from '../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit{
  message: ToastMessage | null = null;

  constructor(
    private toastService: ToastService
  ){}

  ngOnInit(): void {
    this.toastService.toast$.subscribe((msg) => {
      this.message = msg;
    });
  }
}
