import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage{
  text: string;
  type?: 'success' | 'error' | 'info' | 'custom';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastMessage | null>(null);
  toast$ = this.toastSubject.asObservable();

  constructor() { }

  show(message: string, type: 'success' | 'error' | 'info' | 'custom' = 'success'){
    this.toastSubject.next({ text: message, type });

    setTimeout(() => this.toastSubject.next(null), 3000);
  }
}
