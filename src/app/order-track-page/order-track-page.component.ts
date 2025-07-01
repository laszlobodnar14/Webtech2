import { Component } from '@angular/core';
import {order} from '../shared/models/order';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../services/order.service';
import {DatePipe, NgIf} from '@angular/common';
import {OrderItemsListComponent} from '../order-items-list/order-items-list.component';
import {TitleComponent} from '../title/title.component';
import {MapComponent} from '../map/map.component';
import {OnInit} from '@angular/core';
import {DefaultButtonComponent} from '../default-button/default-button.component';

@Component({
  selector: 'app-order-track-page',
  imports: [
    DatePipe,
    OrderItemsListComponent,
    TitleComponent,
    MapComponent,
    NgIf,
    DefaultButtonComponent
  ],
  templateUrl: './order-track-page.component.html',
  styleUrl: './order-track-page.component.css'
})
export class OrderTrackPageComponent implements OnInit {
  order!: order
  constructor(activatedRoute: ActivatedRoute, private orderService: OrderService) {

    const params = activatedRoute.snapshot.params;
    if(!params['orderId']) return;

    orderService.trackOrderById(params['orderId']).subscribe(order => {
      this.order = order;
    })


  }


  ngOnInit() {}

  completeOrder() {
    if (!this.order?.id) return;

    this.orderService.completeOrder(this.order.id).subscribe({
      next: (response: { refunded: any; }) => {
        alert(`Rendelés lezárva. Visszatérített letét: ${response.refunded} EUR`);

      },
      error: (err: { error: string; }) => {
        alert('Hiba történt: ' + err.error);
      }
    });
  }

}
