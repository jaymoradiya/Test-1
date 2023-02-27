import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Hobbies, UserModel } from '../../model/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent {
  reactForm: FormGroup = new FormGroup({});
  hobbyList = Hobbies;

  userId = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.reactForm = new FormGroup({
      firstName: new FormControl('', { validators: [Validators.required] }),
      lastName: new FormControl('', { validators: [Validators.required] }),
      middleName: new FormControl('', { validators: [Validators.required] }),
      age: new FormControl('', { validators: [Validators.required] }),
      gender: new FormControl('', { validators: [Validators.required] }),
      hobbies: new FormGroup(
        this.hobbyList.reduce((acc: any, crr) => {
          acc[crr] = new FormControl(false);
          return acc;
        }, {})
      ),
      company: new FormControl('', { validators: [Validators.required] }),
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParams['id'];

    this.route.queryParams.subscribe((qp) => {
      this.userId = qp['id'];
    });

    this.reactForm.reset();
  }

  getFullName(): string {
    return (
      (this.reactForm.get('firstName')?.value ?? '') +
      ' ' +
      (this.reactForm.get('middleName')?.value ?? '') +
      ' ' +
      (this.reactForm.get('lastName')?.value ?? '')
    );
  }

  onTempFormSubmit() {
    const user = this.reactForm.value;
    user.id = this.userId;
    this.userService.saveUser(user);
    this.router.navigate(['']);
  }

  getData() {
    if (this.userService.isUserExist(this.userId)) {
      const user = this.userService.getUser(this.userId)!;

      // Adding left over hobbies
      this.hobbyList.forEach((h) => {
        if (user.hobbies[h] == undefined) {
          user.hobbies[h] = false;
        }
      });

      // removing extra hobbies
      user.hobbies = Object.keys(user.hobbies).reduce((newObj: any, key) => {
        if (this.hobbyList.includes(key)) {
          newObj[key] = user.hobbies[key];
        }
        return newObj;
      }, {});

      this.reactForm.setValue(
        // removing id from user model
        Object.keys(user).reduce((newUser: any, crr) => {
          if (crr != 'id') {
            newUser[crr] = (user as any)[crr];
          }
          return newUser;
        }, {})
      );
    } else {
      console.log('No user found.');
    }
  }

  clearForm() {
    this.reactForm.reset({});
  }

  back() {
    this.router.navigate(['/template'], { queryParamsHandling: 'preserve' });
  }
}
