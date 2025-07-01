import {Component, Input} from '@angular/core';
import {order} from '../shared/models/order';
import {CurrencyPipe, NgForOf} from '@angular/common';


@Component({
  selector: 'order-items-list',
    imports: [
        NgForOf,
        CurrencyPipe
    ],
  templateUrl: './order-items-list.component.html',
  styleUrl: './order-items-list.component.css'
})
export class OrderItemsListComponent {
  @Input()
  order!: order;

}
