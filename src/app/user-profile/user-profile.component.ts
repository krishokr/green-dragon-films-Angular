import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


//need to get user info

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  username: string = '';
  email: string = '';
  birthday: string = '';
  password: string = '';

  constructor(private router: Router, private userRegistrationService: UserRegistrationService) { }

  ngOnInit(): void {
  }

  navigateHome(): void {
    this.router.navigate(['movies']);
  }

  getUserInfo(): void {
    this.userRegistrationService.getUser().subscribe(
      res => {
        this.username = res.data.Username;
        this.email = res.data.Email;
        this.birthday = res.data.Birth;
      }
    )
  }

  updateUserInfo(): void {

    let userData = {Username: this.username, Email: this.email, Password: this.password, }

    this.userRegistrationService.updateUser(userData).subscribe(
      res => {

      }
    )
  }
}
