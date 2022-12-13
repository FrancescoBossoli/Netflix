import { Injectable } from '@angular/core';
import { AccessService } from '../services/access.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, take } from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private accessSrv: AccessService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.accessSrv.user$.pipe(take(1), switchMap((user) => {
      if (!user) return next.handle(request);
      //console.log("adding headings");
      return next.handle(request.clone({ headers: request.headers.set("Authorization", "Bearer " + user.accessToken) }));
    }))
  }
}
