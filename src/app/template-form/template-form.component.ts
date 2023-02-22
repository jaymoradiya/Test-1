import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { Hobbies, UserModel } from '../model/user.model';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  @ViewChild('tempForm')
  tempForm : NgForm | undefined;
  hobbyList = Hobbies;

  userId : string | undefined;
  user : UserModel  = {
    id: '',
    firstName: '',
    lastName: '',
    middleName: '',
    age: 0,
    gender: '',
    hobbies: {},
    company: '',
  };

  constructor(private router: Router, private route: ActivatedRoute,private userService: UserService){
    
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParams['id'];
    if (this.userService.isUserExist(this.userId!)){
      this.user = this.userService.getUser(this.userId!)!;
    }

    this.route.queryParams.subscribe(qp=> {
      this.userId = qp['id'];
      if (this.userService.isUserExist(qp['id'])){
        this.user = this.userService.getUser(qp['id'])!;
      }
    });
    
  }

  onTempFormSubmit(){
    this.user.id = this.userId!;
    this.userService.saveUser(this.user);
    this.router.navigate(['/reactive'],{queryParamsHandling: 'preserve'})
  }

  clearForm(){
    this.user = {
      id: '',
      firstName: '',
      lastName: '',
      middleName: '',
      age: 0,
      gender: '',
      hobbies: {},
      company: '',
    };
  }

  back(){
    this.router.navigate(['../']);
  }
}
