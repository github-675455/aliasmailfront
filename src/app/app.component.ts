import { Component, ApplicationRef } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import {
  BreakpointObserver
} from '@angular/cdk/layout';
import { interval } from 'rxjs/internal/observable/interval';
import { concat } from 'rxjs/internal/observable/concat';
import { first } from 'rxjs/operators';
import { AskUpdateComponent } from './pages/ask-update/ask-update.component';
import 'hammerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  public isOpened = true;
  title = 'Alias Mail Front';
  public screenWidth: number;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private appRef: ApplicationRef,
    private updates: SwUpdate,
    private dialog: MatDialog,
    private swPush: SwPush,
    private http: HttpClient
  ) {
    this.screenWidth = window.innerWidth;

    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };

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

    this.subscribeToNotifications();

    if (environment.production) {
      const appIsStable$ = appRef.isStable.pipe(
        first(isStable => isStable === true)
      );
      const everySixHours$ = interval(5000);
      const everySixHoursOnceAppIsStable$ = concat(
        appIsStable$,
        everySixHours$
      );

      everySixHoursOnceAppIsStable$.subscribe(() => {
        updates.checkForUpdate();
      });

      updates.available.subscribe(event => {
        const result = this.dialog.open(AskUpdateComponent);
        result.afterClosed().subscribe(e => {
          if (e === 'true') {
            updates.activateUpdate().then(() => document.location.reload());
          }
        });
      });
    }
  }

  public isMobile(): boolean {
    return this.screenWidth > 840;
  }

  isMobileSidenavMode() {
    return this.isMobile() ? 'side' : 'over';
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: environment.VAPID_PUBLIC_KEY
    })
      .then(sub => {

        this.http.post(`${environment.API_URL}${environment.API_VERSION}Notification`, sub).subscribe(d => {
          console.log('post http');
          console.log(d);
        });
        console.log(sub);
      })
      .catch(err => console.error(err));
    console.log('click');
  }
}
