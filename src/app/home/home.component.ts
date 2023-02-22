import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  @ViewChild('idForm')
  idForm : NgForm | undefined;
  error: string | undefined;
  timer : number = 3;

  constructor(private router:Router, private userService: UserService){
    this.timer = 3;
  }

  onIdFormSubmit(){

    const id = this.idForm?.form.get('id')?.value;
    // if(this.userService.isUserExist(id)){
    this.router.navigate(['template'], {queryParams: {id: id}});
      //   return;
    // }
    // this.error = "user doesn't exist!";
    
  }

}
