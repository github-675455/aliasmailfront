import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-conta-modal-add',
  templateUrl: './conta-modal-add.component.html',
  styleUrls: ['./conta-modal-add.component.scss']
})
export class ContaModalAddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ContaModalAddComponent>) {}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
