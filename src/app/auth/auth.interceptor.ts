import {Injectable, Injector} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';


@Injectable()
export class AuthInterceptor  implements HttpInterceptor {
  constructor(private userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.userService.currentUser?.token;
    console.log('Interceptor running. Token:', token);
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
