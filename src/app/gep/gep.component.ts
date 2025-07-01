import { Component } from '@angular/core';
import {Gep} from '../shared/models/gep';
import {GepService} from '../services/gep.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CartService} from '../services/cart.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-gep',
  imports: [
    CurrencyPipe

  ],
  templateUrl: './gep.component.html',
  styleUrl: './gep.component.css'
})
export class GepComponent {
  gep!: Gep;
  constructor(activatedRoute:ActivatedRoute, private gepService: GepService,private cartService:CartService, private router: Router) {
    activatedRoute.params.subscribe(params => {
      if(params['id'])
        gepService.getGepById(params['id']).subscribe(serverGepek =>{
          this.gep = serverGepek;
        });
    })

  }
  addToCart() {
    this.cartService.addToCart(this.gep);
    this.router.navigate(['cart']).then(success => {
      if (!success) {
        console.error('Navigation failed! Check route path or guards.');
      }
    });
  }


}

