import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) {}

  @Input() sidenav: MatSidenav;
  @Input() app: AppComponent;

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationStart))
    .subscribe((event: NavigationStart) => {
      if (!this.app.isMobile()) {
        this.sidenav.close();
      }
    });
  }

}
