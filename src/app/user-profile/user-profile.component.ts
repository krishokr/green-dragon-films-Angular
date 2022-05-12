import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UpdateEmailFormComponent } from '../update-email-form/update-email-form.component';
import { UpdatePasswordFormComponent } from '../update-password-form/update-password-form.component';
import { UpdateUsernameFormComponent } from '../update-username-form/update-username-form.component';


//need to get user info

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userDetails: any = {};

  constructor(private router: Router, private userRegistrationService: UserRegistrationService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  navigateHome(): void {
    this.router.navigate(['movies']);
  }

  getUserInfo(): void {
    this.userRegistrationService.getUser().subscribe(
      res => {
        this.userDetails = res;
      }
    )
  }

  openUpdateEmailDialog(): void {
   
    this.dialog.open(UpdateEmailFormComponent, {
      width: '280px',
      data: this.userDetails
    });
  }

  openUpdatePasswordDialog(): void {
      this.dialog.open(UpdatePasswordFormComponent, {
        width: '280px',
        data: this.userDetails
      });
    }

    openUpdateUsernameDialog(): void {
      this.dialog.open(UpdateUsernameFormComponent, {
        width: '280px',
        data: this.userDetails
      });
    }
  

  
  

  // updateUserInfo(): void {

    

  //   this.userRegistrationService.updateUser(userData).subscribe(
  //     res => {

  //     }
  //   )
  // }
}
