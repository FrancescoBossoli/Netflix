import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AccessService } from './../services/access.service';


@Injectable({
  providedIn: 'root'
})

export class AuthorizationGuard implements CanActivate, CanActivateChild {

  constructor(private accessSrv: AccessService, private router: Router) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): | Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean|UrlTree {
    return this.accessSrv.user$.pipe(take(1), map((user) => {
      if (user) return true;
      return this.router.createUrlTree(['/']);
    }));
  }

  canActivateChild( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): | Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean|UrlTree {
    return this.canActivate(route, state);
  }
}
