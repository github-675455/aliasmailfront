import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Alias Mail';
  constructor(private swPush: SwPush, private http: HttpClient) {
  if (this.swPush.isEnabled) {
    this.swPush.messages.subscribe(data => {
      console.log('messages:');
      console.log(data);
    });

    this.swPush.notificationClicks.subscribe(data => {
      console.log('notificationClicks:');
      console.log(data);
    });
  }
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
        serverPublicKey: environment.VAPID_PUBLIC_KEY
    })
    .then(sub => {

      this.http.post(`${environment.API_URL}${environment.API_VERSION}subscription`, sub).subscribe(d => {
        console.log('post http');
        console.log(d);
      });
      console.log(sub);
    })
    .catch(err => console.error(err));
    console.log('click');
}
}
