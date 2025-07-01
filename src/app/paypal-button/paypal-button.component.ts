import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {order} from '../shared/models/order';
import {OnInit} from '@angular/core';
import {OrderService} from '../services/order.service';
import {CartService} from '../services/cart.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


declare var paypal: any;

@Component({
  selector: 'app-paypal-button',
  imports: [],
  templateUrl: './paypal-button.component.html',
  styleUrl: './paypal-button.component.css'
})
export class PaypalButtonComponent implements OnInit {
  @Input()
  order!: order;

  @ViewChild('paypal',{static:true})
  paypalElement!: ElementRef;

  constructor(private orderService: OrderService, private cartService: CartService, private router:Router, private toastrService: ToastrService) {

  }
  ngOnInit(): void {
    const self = this;

    const totalPrice = self.order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);



    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          console.log('Create Order Data:', self.order);
          return actions.order.create({
            purchase_units: [
              {
                amount:  {
                  currency_code: 'EUR',
                  value: totalPrice.toString(),
                },
              },
            ],
          });
        },

        onApprove: async (data: any, actions: any) => {
          const payment = await actions.order.capture();
          this.order.paymentMethod = payment.method;
          self.orderService.pay(this.order).subscribe(
            {
              next: (orderId) => {
                this.cartService.clearCart();
                this.router.navigateByUrl('/track/' + orderId);
                this.toastrService.success('Payment Saved Successfully', 'Success');
              },
              error: (error) => {
                this.toastrService.error('Payment Save Failed', 'Error');
              }
            }
          );
        },

        onError: (err: any) => {
          this.toastrService.error('Payment Failed', 'Error');
          console.log(err);
        },
      })
      .render(this.paypalElement.nativeElement);
  }

  }




