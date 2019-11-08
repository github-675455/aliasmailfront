import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  show(message: string, button: string) {
    return this.snackBar.open(message, button, {
      duration: 5000
    });
  }
}
