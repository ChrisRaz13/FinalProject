export class User {

    id: number;
    username: string;
    password: string;
    email: string;
    enabled: boolean;
    role: string;

    constructor (
    id: number = 0,
    username: string = '',
    password: string = '',
    email: string = '',
    enabled: boolean = true,
    role: string = ''
    ){
      this.id = id;
      this.username = username;
      this.password = password;
      this.email = email;
      this.enabled = enabled;
      this.role = role;
    }
  }
