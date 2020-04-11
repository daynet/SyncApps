import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register()
{
  this.authService.register(this.model).subscribe(() => {
    this.alertify.success('registered successfully');

  }, error => {
    this.alertify.error('error');
  });
  console.log(this.model);
}

cancel()
{
  console.log('cancelled');
}

}
