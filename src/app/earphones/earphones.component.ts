import { Component } from '@angular/core';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-earphones',
  standalone: true,
  imports: [CategoryComponent],
  templateUrl: './earphones.component.html',
  styleUrl: './earphones.component.scss'
})
export class EarphonesComponent {

}
