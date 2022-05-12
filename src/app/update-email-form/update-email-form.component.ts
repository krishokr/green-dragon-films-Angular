import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-update-email-form',
  templateUrl: './update-email-form.component.html',
  styleUrls: ['./update-email-form.component.scss']
})
export class UpdateEmailFormComponent implements OnInit {

  @Input() Email: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: {Email: string, Username: string, Password: string, Birthday: string },
    public userRegistrationService: UserRegistrationService,
    public dialogRef: MatDialogRef<UpdateEmailFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  submitEmail() {

    this.data.Email =  this.Email;
    console.log(this.data)

    this.userRegistrationService.updateUser(this.data).subscribe(
      res => console.log(res)
    )

  }
}