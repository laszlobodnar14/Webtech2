import {model, Schema,Types} from 'mongoose' ;
import {Gep, GepSchema} from './gep.model';
import {cartItem} from '../../../src/app/shared/models/cartItem';
import {OrderStatus} from '../constants/order_status';

export interface LatLng{
  lat:string;
  lng:string;
}

export const LatLngSchema = new Schema<LatLng>(
  {
    lat: {type:String, required:true},
    lng: {type:String, required:true},
  }
);

export interface OrderItem{
  gep:Gep;
  price:number;
  quantity:number;
}
export const OrderSchema = new Schema<OrderItem>(
  {
    gep:{type: GepSchema, required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
  }
);

export interface order{
  id: string;
  items: OrderItem[];
  totalPrice: number;
  name: string;
  address: string;
  addressLatLng:LatLng

  paymentId:string;
  paymentMethod: string;
  status: OrderStatus;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<order>({
  name: {type:String, required:true},
  address: {type:String, required:true},
  addressLatLng: {type:LatLngSchema, required:true},
  paymentId: {type:String},
  paymentMethod: {type:String},
  items: {type:[OrderSchema], required:true},
  status: {type:String, default: OrderStatus.NEW},
  user: {type:Schema.Types.ObjectId, required:true }
},{
  timestamps:true,
  toJSON:{
    virtuals: true,
  },
  toObject:{
    virtuals: true,
  }
  });

export const OrderModel = model('order', orderSchema);
