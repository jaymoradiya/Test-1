import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { Hobbies, UserModel } from '../model/user.model';
import { FormControl, FormGroup, NgForm, Validators , FormArray} from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent {
  
  reactForm: FormGroup = new FormGroup({});
  hobbyList = Hobbies;
  // hobbiesDefault = {
  //   'chess': false,
  //   'cricket': false,
  //   'read': false,
  //   'singing': false,
  //   'music': false,
  // };
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
   
     
    this.reactForm = new FormGroup({
      'firstName': new FormControl('',{validators: [Validators.required, ]}),
      'lastName':  new FormControl('',{validators: [Validators.required, ]}),
      'middleName':  new FormControl('',{validators: [Validators.required, ]}),
      'age':  new FormControl('',{validators: [Validators.required,]}),
      'gender': new FormControl('',{validators: [Validators.required,]}),
      'hobbies': new FormGroup(this.hobbyList.reduce((acc: any,crr) => {
         acc[crr] = new FormControl(false);
        return acc;
      },[])),
      'company': new FormControl('',{validators: [Validators.required,]})
    });
  }



  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParams['id'];
    
    this.route.queryParams.subscribe(qp=> {
      this.userId = qp['id'];
    });

    this.reactForm.reset();    
  }

  getFullName():string{
   return (this.reactForm.get('firstName')?.value ?? "") +' '+(this.reactForm.get('middleName')?.value ?? "")+' '+(this.reactForm.get('lastName')?.value ?? "");
  }


  onTempFormSubmit(){
    this.user = this.reactForm.value;
    this.user.id = this.userId!;
    this.userService.saveUser(this.user);
    this.router.navigate(['']);
  }

  getData(){
    if (this.userService.isUserExist(this.userId!)){
      this.user = this.userService.getUser(this.userId!)!;
      
      // Adding left over hobbies
      this.hobbyList.forEach(h => {
        if(this.user.hobbies[h] == undefined){
          this.user.hobbies[h] = false
        }
      })

      // removing extra hobbies
      this.user.hobbies = Object.keys(this.user.hobbies).reduce((newObj : any, key) => {
        if (this.hobbyList.includes(key)) {
          newObj[key] = this.user.hobbies[key];
        }
        return newObj;
      }, {});
      const tmp = {
        "firstName" :this.user.firstName,
        "lastName" :this.user.lastName,
        "middleName" :this.user.middleName,
        "age" :this.user.age,
        "gender" :this.user.gender,
        "hobbies": this.user.hobbies,
        "company" :this.user.company,
     };
     console.log(tmp);
      this.reactForm.setValue(tmp);
    }
  }

  clearForm(){
    this.reactForm.reset({});
  }

  back(){
    this.router.navigate(['/template'],{queryParamsHandling: 'preserve'});
  }

}
