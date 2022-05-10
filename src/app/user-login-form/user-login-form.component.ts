import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: ''}

  constructor(
    public userRegistrationService: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.userRegistrationService.userLogin(this.userData).subscribe(
      result => {
        this.dialogRef.close(); 
        console.log(result)
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token);
        
        this.snackBar.open(result, 'OK', {
           duration: 2000
        });
       }, (result) => {
         console.log(result)
         this.snackBar.open(result, 'OK', {
           duration: 2000
         });
       });
  }

}
