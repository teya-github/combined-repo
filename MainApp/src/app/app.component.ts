import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MainApp';
  lstUsers: User[] = [];
  user: User =  {} as User;
  result: any;
  isloggedIn: Boolean = false;
  choice: string = "";
  
  constructor(private builder: FormBuilder, private router: Router, private _freeApiService: ApiService) {
  }

  ngOnInit() {
    this.choice = "login";
    this.getAllUsers();
    console.log("is log in? "+this.isloggedIn);
    if(this._freeApiService.isloggedin())
    {
      console.log("is log in? "+this.isloggedIn);
      this.isloggedIn = true;
      this.router.navigate(['Home']);
    }
    else{
      this.isloggedIn = false;
    }
  }

  getAllUsers() {
    this._freeApiService.getUsers()
      .subscribe
      (
        data => {
          this.lstUsers = data;
          console.log(this.lstUsers);
        }
      )
  }

  loginform = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  proceedlogin() {
    console.log('masuk proceed');
    if (this.loginform.valid) {
      console.log('masuk valid');
      console.log('this.loginform.value.id: '+this.loginform.value.id);
      this._freeApiService.GetUserbyEmail(this.loginform.value.id)
        .subscribe
        (
          data => {
            this.result = data;
            console.log("display: "+this.result.password);
            console.log("this.loginform.value.password: "+this.loginform.value.password);
            if (this.result.password === this.loginform.value.password) {
              sessionStorage.setItem('email',this.result.email);
              sessionStorage.setItem('name',this.result.name);
              this.router.navigate(['Home']);
              this.isloggedIn = true;
            } else {
              console.log('Invalid credentials');
            }
          });

    } 
    else {
      console.log('loginform not valid.');
     
    }
  }

  registerForm(){
    this.choice = "register";
  }
  loginForm(){
    this.choice = "login";
  }
}
