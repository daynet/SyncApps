import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/User';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // model: any = {};
  user: User;
  @Input()valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {

    this.bsConfig = {
      containerClass: 'theme-red'
    },
    this.CreateRegisterForm();

  }
  CreateRegisterForm()
  {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      KnownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});

  }



  passwordMatchValidator(g: FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch : true};
  }

  register() {
    if (this.registerForm.valid)
    {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
            this.alertify.success('Registeration Successful')
      }, error => {
        this.alertify.error('error')
      }, () => {
        this.authService.login(this.user).subscribe(() => {
            this.router.navigate(['/members']);
        });
      });
    }
  // this.authService.register(this.model).subscribe(() => {
  //   this.alertify.success('registered successfully');

  // }, error => {
  //   this.alertify.error('error');
  // });
  // console.log(this.model);
  // console.log(this.registerForm.value);

}

cancel() {
  this.cancelRegister.emit(false);
  console.log('cancelled');
}

}
