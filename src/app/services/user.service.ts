import { Injectable } from '@angular/core';
import { UserModel } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  isUserExist(userId: string) {
    return localStorage.getItem(userId) != null;
  }

  saveUser(user: UserModel) {
    localStorage.setItem(user.id, JSON.stringify(user));
  }

  getUser(userId: string): UserModel | undefined {
    try {
      const user = JSON.parse(localStorage.getItem(userId) ?? '') as UserModel;
      return user;
    } catch (error) {
      return;
    }
  }
}
