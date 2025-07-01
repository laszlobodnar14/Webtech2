import {Component, Input, input} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'input-container',
  imports: [
    NgStyle
  ],
  templateUrl: './input-container.component.html',
  styleUrl: './input-container.component.css'
})
export class InputContainerComponent {

@Input()
label!: string;
@Input()
  bgcolor =' white';


}
