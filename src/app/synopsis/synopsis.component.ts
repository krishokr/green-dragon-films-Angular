import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SynopsisComponent>, @Inject(MAT_DIALOG_DATA) public data: {description: string}) { }

  ngOnInit(): void {
  }

}
