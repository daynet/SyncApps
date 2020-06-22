import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService){}

  ngOnInit() {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    const token = localStorage.getItem('token');

    if (token) { 

      this.authService.decodedToken = this.jwtHelper.decodeToken(token);

    }


  }
}
