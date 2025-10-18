import { Component } from '@angular/core';
import { CategoryComponent } from "../category/category.component";

@Component({
  selector: 'app-headphones',
  standalone: true,
  imports: [CategoryComponent],
  templateUrl: './headphones.component.html',
  styleUrl: './headphones.component.scss'
})
export class HeadphonesComponent {

}
