import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/compat/storage'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fName="";
  lName="";
  email="";
  program="";
  password="";
  message = '';
  errorMessage = ''; // validation error handle

  path: String = "";  


  error: { name: string, message: string } = { name: '', message: '' }; // for firbase error handle

  constructor(private authservice: AuthService, private router:Router, private af:AngularFireStorage) { }

  ngOnInit(): void {
  }

  clearErrorMessage()
  {
    this.errorMessage = '';
    this.error = {name : '' , message:''};
  }
  clearForm()
  {
    this.fName="";
    this.lName="";
    this.email="";
    this.program="";
    this.password="";
  }
  
 
  // upload($event:any){
  //   this.path = $event.target.files[0];
  // }
  // uploadImage(){
  //  console.log(this.path)

  //   this.af.upload("/files" + Math.random()+this.path,this.path)
  // }

  register()
  {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password, this.fName, this.lName, this.program)) {
      this.authservice.registerWithEmail(this.email, this.password, this.fName, this.lName, this.program)
        .then(() => {
          this.message = "you are register with data on firbase"

          this.clearForm();

          //this.router.navigate(['/userinfo'])
        }).catch(_error => {
          this.error = _error
          this.router.navigate(['/register'])
        })
    }
  }

  validateForm(email: any, password:any, fName:any, lName:any, program:any)
  {
    if(fName.length === 0)
    {
      this.errorMessage = "please enter your first name";
      return false;
    }

    if(lName.length === 0)
    {
      this.errorMessage = "please enter your last name";
      return false;
    }

    if(email.length === 0)
    {
      this.errorMessage = "please enter email id";
      return false;
    }

    if (password.length === 0) {
      this.errorMessage = "please enter password";
      return false;
    }

    if (password.length < 6)
    {
      this.errorMessage = "password should be at least 6 char";
      return false;
    }

    if(program.length === 0)
    {
      this.errorMessage = "please enter your program name";
      return false;
    }

    this.errorMessage = '';
    return true;

  }

}
