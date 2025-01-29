import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  standalone: false,
  styleUrls: ['./validation.component.scss'],
})
export class ValidationComponent  implements OnInit {

  constructor(public dialogRef: MatDialogRef<ValidationComponent>) { }

  ngOnInit() {}

  public onConfirm() {
    this.dialogRef.close("Good");
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
