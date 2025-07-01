import {Component, OnInit} from '@angular/core';
import {order} from '../shared/models/order';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CartService} from '../services/cart.service';
import {UserService} from '../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {TitleComponent} from '../title/title.component';
import {TextInputComponent} from '../text-input/text-input.component';
import {OrderItemsListComponent} from '../order-items-list/order-items-list.component';
import {MapComponent} from '../map/map.component';
import {OrderService} from '../services/order.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-checkout-page',
  imports: [
    TitleComponent,
    ReactiveFormsModule,
    TextInputComponent,
    OrderItemsListComponent,
    MapComponent
  ],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent implements OnInit {
  order:order = new order();
  checkoutForm!: FormGroup;
  constructor(cartService: CartService,private formBuilder: FormBuilder,private userService: UserService, private toastrService: ToastrService, private orderService:OrderService, private router:Router) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;

  }
  ngOnInit(): void {

   let {name, address} = this.userService.currentUser;
   this.checkoutForm = this.formBuilder.group({
     name: [name, Validators.required],
     address: [address, Validators.required],
   })
  }
  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder(){
    if(this.checkoutForm.invalid){
      this.toastrService.warning('Please fill all required fields.','Invalid Inputs');
      return;
    }

    if(!this.order.addressLatLng){
      this.toastrService.warning('Please select your location on the map','Location');
      return;
    }

    this.order.name = this.fc['name'].value;
    this.order.address = this.fc['address'].value;


    this.orderService.create(this.order).subscribe({
      next:(createdOrder) => {
        localStorage.setItem('order',JSON.stringify(createdOrder));
        this.router.navigateByUrl('/payment');
      },
      error:(errorresponse)=>{
        this.toastrService.error(errorresponse.error,'Cart');
      }
    })

  }

}
