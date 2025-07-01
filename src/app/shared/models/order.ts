import {cartItem} from './cartItem';
import {LatLng} from 'leaflet';

export class order{
  id!: string;
  items!: cartItem[];
  totalPrice!: number;
  name!: string;
  address!: string;
  addressLatLng?:LatLng
  paymentMethod!: string;
  paymentId!: string;
  created_at!: Date;
  status!: number;
}





