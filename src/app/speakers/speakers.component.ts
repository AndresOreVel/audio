import { Component } from '@angular/core';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-speakers',
  standalone: true,
  imports: [CategoryComponent],
  templateUrl: './speakers.component.html',
  styleUrl: './speakers.component.scss'
})
export class SpeakersComponent {

}
