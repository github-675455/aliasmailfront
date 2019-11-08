import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacaoService } from '../services/autenticacao.service';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  constructor(private autenticacaoService: AutenticacaoService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (!this.autenticacaoService.isAutenticado()) {
      return next.handle(request);
    }
    const updatedRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${this.autenticacaoService.getAccessToken()}`
    }});
    return next.handle(updatedRequest).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {

          }
        },
        error => {
          if (event instanceof HttpResponse) {
            if (event.status === 401) {
              this.autenticacaoService.logout();
            }
          }
        }
      )
    );
  }
}
