import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 // baseUrl = 'http://localhost:59946/api/Auth/';
  baseUrl =  environment.apiUrl + 'Auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  private photoUrl = new BehaviorSubject<string>('../../assets/mark.png');
  currentPhotoUrl = this.photoUrl.asObservable();

constructor(private http: HttpClient) { }

 changeMemberPhoto(photoUrl: string)
 {
   this.photoUrl.next(photoUrl);
 }
 login(model: any) {
  return  this.http.post(this.baseUrl + 'Login', model).pipe(
     map((response: any) => {
       const user = response;

       if (user) {
         localStorage.setItem('token', user.token);
         localStorage.setItem('user', JSON.stringify(user.user));
         this.currentUser = user.user;
         this.decodedToken = this.jwtHelper.decodeToken(user.token);
         this.changeMemberPhoto(this.currentUser.photoUrl);
       }
     })
   );
 }

 register(user: User) {
   return this.http.post(this.baseUrl + 'Register', user);
 }

 loggedin() {
  const token = localStorage.getItem('token');

  return !this.jwtHelper.isTokenExpired(token);
}

}
