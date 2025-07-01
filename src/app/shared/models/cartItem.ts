import {Gep} from './gep';

export class cartItem {
  quantity: number = 1;
  price: number;

  constructor(public gep: Gep) {
    this.price = gep?.berletidij +gep?.letet || 0;
  }
}
