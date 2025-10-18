import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private localStorage: Storage | null = null;
  constructor(@Inject(DOCUMENT) document: Document) {
    this.localStorage = document.defaultView?.localStorage ?? null;
  }

  getItem(key: string): string | null {
    return this.localStorage ? this.localStorage.getItem(key) : null;
  }

  setItem(key: string, value: string): void {
    if (this.localStorage) {
      this.localStorage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    if (this.localStorage) {
      this.localStorage.removeItem(key);
    }
  }
}
