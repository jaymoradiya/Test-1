export interface UserModel {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  age: number;
  gender: string;
  hobbies: {[k: string]: boolean};
  company: string;
}


export const Hobbies = [
  'music',
  'cricket',
  'chess',
  'read',
  'singing'
];