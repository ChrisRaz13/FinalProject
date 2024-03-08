export class User {

    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    enabled: boolean;
    role: string;
    imageUrl: string | null;
    aboutMe: string

    constructor (
    id: number = 0,
    username: string = '',
    password: string = '',
    firstName: string = '',
    lastName: string = '',
    email: string = '',
    enabled: boolean = true,
    role: string = '',
    imageUrl = null,
    aboutMe: string = ''
    ){
      this.id = id;
      this.username = username;
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.enabled = enabled;
      this.role = role;
      this.imageUrl = imageUrl;
      this.aboutMe = aboutMe;
    }
  }
