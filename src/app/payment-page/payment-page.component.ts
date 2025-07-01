import { Component, OnInit } from '@angular/core';
import { order } from '../shared/models/order';
import { Router } from '@angular/router';
import { MapComponent } from '../map/map.component';
import { OrderItemsListComponent } from '../order-items-list/order-items-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../text-input/text-input.component';
import { TitleComponent } from '../title/title.component';
import { PaypalButtonComponent } from '../paypal-button/paypal-button.component';
import {PayWithBalanceButtonComponent} from '../pay-with-balance-button/pay-with-balance-button.component';

@Component({
  selector: 'app-payment-page',
  imports: [
    MapComponent,
    OrderItemsListComponent,
    ReactiveFormsModule,
    TitleComponent,
    PaypalButtonComponent,
    PayWithBalanceButtonComponent

  ],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit {
  order: order = new order();

  constructor(private router: Router) {}

  ngOnInit() {
    const storedOrder = localStorage.getItem('order');
    if (storedOrder) {
      this.order = JSON.parse(storedOrder);

    } else {
      console.warn('Nincs mentett rendelés!');
      this.router.navigateByUrl('/checkout');
    }
  }
}
