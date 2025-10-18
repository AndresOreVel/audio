import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent{

  constructor(
    private rout: Router
  ){}

  @Input() name!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() image!: string;
  @Input() alt!: string;
  @Input() overline?: string;
  @Input() reverse: boolean = false;

  
  goToDetails(){
    this.rout.navigate(['/details', this.name]);
  }
}
