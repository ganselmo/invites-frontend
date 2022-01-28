import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SuccessComponent>) { }

  ngOnInit(): void {
  }

  close(): void
  {
    this.dialogRef.close()
  }
}
