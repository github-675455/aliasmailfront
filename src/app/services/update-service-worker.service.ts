import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { AskUpdateComponent } from '../pages/ask-update/ask-update.component';
import { MatDialog } from '@angular/material';
import { environment } from 'src/environments/environment';

@Injectable()
export class UpdateServiceWorkerService {
  constructor(public updates: SwUpdate, private dialog: MatDialog) {
    if (environment.production) {
      if (this.updates.isEnabled) {
        interval(5000).subscribe(() =>
          this.updates.checkForUpdate()
        );
      }
    }
  }

  public checkForUpdates() {
    this.updates.available.subscribe(event => this.promptUser());
  }

  private promptUser() {
    const result = this.dialog.open(AskUpdateComponent);
    result.afterClosed().subscribe(e => {
      if (e === 'true') {
        this.updates.activateUpdate().then(() => document.location.reload());
      }
    });
  }
}
