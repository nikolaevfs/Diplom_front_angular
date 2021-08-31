import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { ACCESS_TOKEN_KEY, AuthService, TOKEN_EXPIRED } from './auth.service';
import { Observable } from 'rxjs';
import { NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

constructor(
  private authService: AuthService,
  private router: Router
) {  }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
  if(Date.now()>Number.parseInt(localStorage.getItem(TOKEN_EXPIRED)!)){
    console.log("expired");
    this.router.navigate(['']);
  }
  else{
    if(this.authService.getJwtToken()!=null){
    
      var token = localStorage.getItem(ACCESS_TOKEN_KEY);
  
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer_${this.authService.getJwtToken()}`,
        }
      });
  
    }
  }

  return next.handle(req);
}


}
