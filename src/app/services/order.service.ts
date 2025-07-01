import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { order} from '../shared/models/order'
import {
  ORDER_COMPLETE_URL,
  ORDER_NEW_FOR_CURRENT_USER_URL,
  ORDER_PAY_URL,
  ORDER_TRACK_URL,
  ORDERS_CREATE_URL
} from '../shared/constants/urls';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  create(order:order){

    return this.http.post<order>(ORDERS_CREATE_URL, order,);


  }

  getNewOrderForCurrentUser():Observable<order>{
    return this.http.get<order>(ORDER_NEW_FOR_CURRENT_USER_URL);
  }

  pay(order:order):Observable<string>{
    return this.http.post<string>(ORDER_PAY_URL, order);
  }

  trackOrderById(id:number):Observable<order>{
    return this.http.get<order>(ORDER_TRACK_URL + id);
  }
  createOrder(order: order): Observable<order> {
    return this.http.post<order>(ORDERS_CREATE_URL, order);
  }
  completeOrder(orderId: string): Observable<any> {
    return this.http.post(`${ORDER_COMPLETE_URL}${orderId}/complete`,{});
  }


}
