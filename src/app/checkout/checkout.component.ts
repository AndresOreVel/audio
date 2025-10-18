import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { CardModalComponent } from '../card-modal/card-modal.component';
import { SuccessComponent } from '../success/success.component';
import { FormsModule } from '@angular/forms';
import { LocalService } from '../services/local.service';
import { PruebaService } from '../services/prueba.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, CardModalComponent, SuccessComponent, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{
  isModalOpen = true;
  showSuccess = false;
  submitted = false;

  userInfo = {
    name: '',
    email: '',
    phone: '',
    address: '',
    zip: '',
    city: '',
    country: '',
    moneyNumber: '',
    pin: ''
  }
  
  paymentMethod: string = 'e-Money';
  
  constructor(
    private router: Router,
    public cartService: PruebaService,
    private localStorage: LocalService,
  ) { }

  ngOnInit(): void {
    if(this.cartService.items.length === 0){
      this.router.navigate(['/']);
    }

    const savedForm = this.localStorage.getItem('checkoutForm');
    if(savedForm){
      this.userInfo = JSON.parse(savedForm);
    }
  }

  onFormChange(){
    this.localStorage.setItem('checkoutForm', JSON.stringify(this.userInfo));
  }

  goBack() {
    this.router.navigate(['/']);
  }

  isValidName(): boolean{
    return this.userInfo.name.trim().length >= 3;
  }

  isEmailValid(): boolean{
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(this.userInfo.email.toLowerCase().trim());
  }

  isPhoneValid(): boolean{
    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
    return phoneRegex.test(this.userInfo.phone || "");
  }

  isValidAddress(): boolean{
    const regexAddress = /[A-Za-z0-9'\.\-\s\,]/;
    return regexAddress.test(this.userInfo.address.toLowerCase());
  }

  isValidZip(): boolean{
    const zipRegex = /^\d{4}(?:[-\s]\d{4})?$/;
    return zipRegex.test(this.userInfo.zip || "");
  }

  isValidCity(): boolean{
    const cityRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    return cityRegex.test(this.userInfo.city.toLowerCase());
  }

  isValidCountry(): boolean{
    const countryRegex = /[a-zA-Z]{2,}/;
    return countryRegex.test(this.userInfo.country.toLowerCase());
  }

  isFormValid():boolean{
    return this.isValidName() && this.isEmailValid() && this.isPhoneValid() && this.isValidAddress() && 
    this.isValidZip() && this.isValidCity() && this.isValidCountry();
  }

  isValidMoneyNumber(): boolean{
    const regexNumber = /^\d{9}(?:[-\s]\d{4})?$/;
    return regexNumber.test(this.userInfo.moneyNumber || "");
  }
  
  isValidPinNumber(): boolean{
    const regexPin = /^\d{4}(?:[-\s]\d{4})?$/;
    return regexPin.test(this.userInfo.pin || "");
  }

  onSuccess(){
    this.submitted = true;
    if(!this.isFormValid()){
      return
    }
    this.cartService.clearCart();
    this.showSuccess = true;
    this.localStorage.removeItem('checkoutForm');
  }

  closeSuccess(){
    this.showSuccess = false;
    this.router.navigate(['/'])
  }
}
