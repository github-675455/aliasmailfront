import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Email } from '../model/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  loadListSimpleEmails() {
    return this.http.get(
      `${environment.API_URL}${environment.API_VERSION}mail/simple`
    );
  }
}
