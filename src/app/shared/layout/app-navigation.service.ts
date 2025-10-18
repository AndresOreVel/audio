import { Injectable } from '@angular/core';
import { AppMenu } from './app-menu';
import { AppMenuItem } from './app-menu-item';

@Injectable({
  providedIn: 'root'
})
export class AppNavigationService {

  constructor() { }

  getMenu(): AppMenu{
    return new AppMenu('MainMenu', [
      new AppMenuItem('Home', '', '', '/home'),
      new AppMenuItem('Headphones', '', '', '/headphones'),
      new AppMenuItem('Speakers', '', '', '/speakers'),
      new AppMenuItem('Earphones', '', '', '/earphones'),
    ]);
  }
}
