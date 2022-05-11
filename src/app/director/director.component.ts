import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DirectorComponent>, @Inject(MAT_DIALOG_DATA) public data: {Name: string, Biography: string, Birth: string}) { }

  ngOnInit(): void {
  }

}
