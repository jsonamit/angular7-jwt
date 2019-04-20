import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  error;
  
  constructor(
    private _authService: AuthService,
    private router: Router,
    private fb: FormBuilder,  
  ) { }

  ngOnInit() {
    //ToDo. Redirect if Logged In
    this.loginForm = this.fb.group({
       email: ['',  Validators.required],
      password: ['',  Validators.required]
    });  
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }  


  onSubmit() {
     if(this.loginForm.valid) {
         var data = this.loginForm.value;
         this._authService.login(data.email, data.password)
             .subscribe(
                data => {
					//this.router.navigate([this.returnUrl]);
                    this.router.navigate(['/patients']);
                },             
                error => {
                    this.error = error;
                });
     }  
  }
  
}
