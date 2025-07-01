import { Injectable } from '@angular/core';
import {Cart} from '../shared/models/Cart';
import {BehaviorSubject, Observable} from 'rxjs';
import {Gep} from '../shared/models/gep';
import {cartItem} from '../shared/models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 private cart:Cart = new Cart();
 private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addToCart(gep: Gep) {

    const existingItem = this.cart.items.find(item => item.gep.id === gep.id);

    if (existingItem) {
      return;
    }


    const newItem = new cartItem(gep);

    this.cart.items.push(newItem);

    this.setCartToLocalStorage();
  }

  removeFromCart(gepId:string) {
    this.cart.items = this.cart.items.filter(item => item.gep.id != gepId);


    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);


  }

  changeQuantity(gepId:string,quantity:number) {
    let cartItem = this.cart.items.find(item => item.gep.id === gepId);
    if(!cartItem)
      return;

    cartItem.quantity = quantity;
    cartItem.price =cartItem.gep.letet + quantity * cartItem.gep.berletidij ;
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): Cart{
    return this.cartSubject.value;
  }

  private setCartToLocalStorage() {
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }
 getCartFromLocalStorage():Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson) : new Cart();
 }
}
