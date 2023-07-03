import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.form.group({
    userName: [null, Validators.required],
    password: [null, Validators.required],
  })
  
  constructor(
    private form: FormBuilder, 
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  doLogin(){
    if(this.loginForm.valid){
      if(this.loginForm.value.userName == 'admin' && this.loginForm.value.password == 'Project@2023'){
        this.toastr.info('Logged in', 'info', {timeOut: 2000});
        this.router.navigateByUrl('dashboard');
      }
      else{
        this.toastr.error('Bad Credentials', 'Error', {timeOut: 2000});
      }
    }
  }

}
