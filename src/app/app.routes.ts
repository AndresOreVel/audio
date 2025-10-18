import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeadphonesComponent } from './headphones/headphones.component';
import { SpeakersComponent } from './speakers/speakers.component';
import { EarphonesComponent } from './earphones/earphones.component';
import { DetailsComponent } from './details/details.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'headphones', component: HeadphonesComponent},
    {path: 'speakers', component: SpeakersComponent},
    {path: 'earphones', component: EarphonesComponent},
    {path: 'details/:productName', component: DetailsComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: '**', redirectTo: 'home'}
];
