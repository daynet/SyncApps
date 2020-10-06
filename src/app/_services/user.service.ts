import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/User';
import { Observable } from 'rxjs';

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + localStorage.getItem('token')

//   })
// };


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) {

 }

 getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl + 'Users');
 }


 getUser(id): Observable<User>{
   return this.http.get<User>(this.baseUrl + 'Users/' + id);
 }

 updateUser(id: number, user: User) {
  return this.http.put(this.baseUrl + 'Users/' + id, user);
 }

 setMainPhoto( userid: number, id: number) {
   return this.http.post(this.baseUrl + 'Users/' + userid + '/photos/' + id + '/setMain', {} );
 }

 deletePhoto( userid: number, id: number) {
   return this.http.delete(this.baseUrl + 'Users/' + userid + '/photos/' + id );
 }

}
