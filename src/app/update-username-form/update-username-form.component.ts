import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-update-username-form',
  templateUrl: './update-username-form.component.html',
  styleUrls: ['./update-username-form.component.scss']
})
export class UpdateUsernameFormComponent implements OnInit {

  @Input() Username: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: {Email: string, Username: string, Password: string, Birthday: string },
  public userRegistrationService: UserRegistrationService,
  public dialogRef: MatDialogRef<UpdateUsernameFormComponent>,
  public snackBar: MatSnackBar,
  private router: Router,) { }

  ngOnInit(): void {
  }

  submit() {

    this.data.Username =  this.Username;
    console.log(this.data)

    this.userRegistrationService.updateUser(this.data).subscribe(
      res => console.log(res)
    )

  }

}
