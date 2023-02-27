import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomeComponent {
  error: string | undefined;

  constructor(
    private router: Router //, private userService: UserService
  ) {}

  onIdFormSubmit(id: number) {
    // if(this.userService.isUserExist(id)){
    this.router.navigate(['template'], { queryParams: { id: id } });
    //   return;
    // }
    // this.error = "user doesn't exist!";
  }
}
