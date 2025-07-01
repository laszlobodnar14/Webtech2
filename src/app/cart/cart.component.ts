import { Component } from '@angular/core';
import {Cart} from '../shared/models/Cart';
import {CartService} from '../services/cart.service';
import {cartItem} from '../shared/models/cartItem';
import {TitleComponent} from '../title/title.component';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [
    TitleComponent,
    NgForOf,
    RouterLink,

  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
cart!: Cart;
constructor(private cartService: CartService) {
  this.cartService.getCartObservable().subscribe((cart) => this.cart = cart);
}
removeFromCart(cartItem:cartItem) {
  this.cartService.removeFromCart(cartItem.gep.id);
}

changeQuantity(cartItem:cartItem,quantityInString:string) {
  const quantity = parseInt(quantityInString);
  this.cartService.changeQuantity(cartItem.gep.id, quantity);
}

  protected readonly cartitem = cartItem;
}
