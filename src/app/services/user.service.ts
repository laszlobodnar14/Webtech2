import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {User} from '../shared/models/User';
import {IUserLogin} from '../shared/interfaces/IUserLogin';
import {
  BASE_URL,
  USER_LOGIN_URL,
  USER_REGISTER_URL,
  USER_UPDATE_BALANCE_ON_PAY_URL,
  USER_UPDATE_BALANCE_URL
} from '../shared/constants/urls';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {IUserRegister} from '../shared/interfaces/IUserRegister';


const USER_KEY='User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;

  constructor(private http: HttpClient, private toastrService:ToastrService) {
    this.userObservable=this.userSubject.asObservable();
  }

  public get currentUser(): User{
    return this.userSubject.value;
  }

  login(userLogin:IUserLogin):Observable<User> {
    return  this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user)=> {
          this.setUserToLocalStorage(user);
           this.userSubject.next(user);
           this.toastrService.success(`Üdvözöljük ${user.name}!`,'Login Successful');
        },
        error: (errorResponse)=> {
            this.toastrService.error(errorResponse.error, 'Login UnSuccessful');
        }
      })
    )
  }

  register(UserRegister:IUserRegister):Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, UserRegister).pipe(
      tap({
        next: (user)=> {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Üdvözöljük ${user.name}!`,
            'Register Successful'
          )
        },
        error: (errorResponse)=> {
          this.toastrService.error(errorResponse.error, 'Register UnSuccessful');
        }
      })
    )
  }

  updateBalance(newBalance: number): Observable<any> {
    const userId = this.currentUser.id;
    return this.http.put(USER_UPDATE_BALANCE_URL.replace(':id', userId), { balance: newBalance }).pipe(
      tap(() => {

        const updatedUser = { ...this.currentUser, balance: newBalance };
        this.setUserToLocalStorage(updatedUser);
        this.userSubject.next(updatedUser);
      })
    );
  }
  updateBalanceOnPay(userId:string,amount: number): Observable<User> {
    const url = USER_UPDATE_BALANCE_ON_PAY_URL.replace(':id', userId);
    const updatedBalance = this.currentUser.balance - amount;
    const updatedUserWithToken = { ...this.currentUser, balance: updatedBalance, token: this.currentUser.token };
    return this.http.put<User>(url, updatedUserWithToken).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(updatedUserWithToken);
          this.userSubject.next(updatedUserWithToken);
        },
        error: (error) => {
          this.toastrService.error('Hiba történt az egyenleg frissítésekor!', 'Hiba');
        }
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY,JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User{
    const userJson=localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
