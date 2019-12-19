import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject, Observer } from 'rxjs';
import * as moment from 'moment';
import { LoginResponse } from '../model/login-response';

@Injectable()
export class AutenticacaoService {

  private accessToken = null;
  private expiration: moment.Moment;

  public assinaturaIsAutenticado = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.restoreAccessToken();
  }

  login(usuario: string, senha: string): Observable<LoginResponse> {

    const observable = new Observable((observer: Observer<LoginResponse>) => {

      this.http.post<LoginResponse>(
        `${environment.API_URL}${environment.API_VERSION}usuario/autenticar`,
        { Login: usuario, Senha: senha }
      ).subscribe((data: LoginResponse) => {

        if (data.errors.length === 0) {
          this.saveAccessToken(data);
          observer.next(data);
          observer.complete();
        } else {
          observer.error(data.errors);
        }
      }, (error) => {
        observer.error(error);
      });

    });

    return observable;
  }

  saveAccessToken(accessToken: LoginResponse) {
    const expiresAt = moment().add(accessToken.expiresIn, 'second');
    this.accessToken = accessToken.accessToken;
    this.expiration = expiresAt;
    localStorage.setItem('access_token', accessToken.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt));
    this.emitAutenticado(true);
  }

  isAutenticado() {
    return typeof this.accessToken !== 'undefined' && this.accessToken !== null;
  }

  getAccessToken() {
    return this.accessToken;
  }

  setAccessToken(token: string) {
    return this.accessToken = token;
  }

  emitAutenticado(autenticado: boolean) {
    return this.assinaturaIsAutenticado.next(autenticado);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    this.accessToken = null;
    this.emitAutenticado(false);
  }

  restoreAccessToken() {
    this.accessToken = localStorage.getItem('access_token');
    this.expiration = JSON.parse(localStorage.getItem('expires_at'));
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
