import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../services/user.service';
import {OrderService} from '../services/order.service';
import {ToastrService} from 'ngx-toastr';
import { order } from '../shared/models/order';
import {User} from '../shared/models/User';
import {CartService} from '../services/cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pay-with-balance-button',
  templateUrl: './pay-with-balance-button.component.html',
  styleUrls: ['./pay-with-balance-button.component.css']
})
export class PayWithBalanceButtonComponent implements OnInit {

  @Input() order!: order;
  @Output() paymentSuccess = new EventEmitter<void>();
  user!: User;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private toastrService: ToastrService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.userObservable.subscribe((user) => {
      this.user = user;
    });
  }

  payWithBalance() {
    const totalPrice = this.order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const currentBalance = Number(this.userService.currentUser.balance);

    console.log('Fizetendő összeg:', totalPrice);
    console.log('Jelenlegi egyenleg:', currentBalance);

    if (totalPrice <= currentBalance) {
      console.log('Van elegendő egyenleg, folytatom a tranzakciót');

      this.orderService.create(this.order).subscribe(
        (createdOrder) => {

          this.userService.updateBalanceOnPay(this.userService.currentUser.id, totalPrice).subscribe(
            (updatedUser) => {
              console.log('Balance updated successfully');
              console.log(this.userService.currentUser);

              // Process the payment
              this.orderService.pay(createdOrder).subscribe(
                (orderId) => {
                  console.log('Payment processed successfully:', orderId);
                  this.cartService.clearCart();
                  this.router.navigateByUrl('/track/' + orderId);
                  this.toastrService.success('Fizetés sikeresen rögzítve!', 'Siker');
                  this.paymentSuccess.emit();
                },
                (error) => {
                  this.toastrService.error('Fizetés rögzítése nem sikerült!', 'Hiba');
                  console.error('Fizetés rögzítése nem sikerült!', error);
                }
              );
            },
            (error) => {
              this.toastrService.error('Hiba történt az egyenleg frissítésekor!', 'Hiba');
              console.error('Error updating balance:', error);
            }
          );
        },
        (error) => {
          console.error('Rendelés mentése sikertelen:', error);
          this.toastrService.error('Hiba történt a rendelés mentésekor!');
        }
      );
    } else {
      console.log('Nincs elegendő egyenleg!');
      this.toastrService.error('Nincs elegendő egyenleg a fizetéshez!');
    }
  }
}
