import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterModule,
  UrlTree,
  RouterStateSnapshot,
  MaybeAsync, GuardResult
} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService,private router: Router ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if(this.userService.currentUser.token) return true;
    this.router.navigate(['/login'], {queryParams:{returnUrl:state.url}})
    return false;
  }
}
