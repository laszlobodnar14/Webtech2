import {Component, Input} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-title',
  imports: [
    NgStyle
  ],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {
 @Input()
  title!: string;
 @Input()
  margin? = '1rem 0 1rem 0.2rem';
 @Input()
  fontSize? = '1.7rem';


}
