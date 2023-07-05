import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, of } from 'rxjs';
import { AppService } from 'src/app/service/app.service';

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
    private toastr: ToastrService,
    private _app: AppService
  ) { }

  ngOnInit(): void {}

  doLogin(){
    const payload = {
      username: this.loginForm.value.userName,
      password: this.loginForm.value.password,
    }
    this._app.changeLoaderVisibility(true);
    this._app.doLoggedIn(payload).pipe(finalize(() => this._app.changeLoaderVisibility(false))).subscribe((res) => {
      this.toastr.info('Logged in', 'info', {timeOut: 2000});
      this._app.setCookieByName('token', res['token']);
      this.router.navigateByUrl('dashboard');
    });
  }

}
