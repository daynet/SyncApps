import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../_models/User';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/internal/operators/map';


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

 getUsers(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<User[]>> {
   const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
   


   let params = new HttpParams();

   if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

   if (userParams != null) {
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
  }

   return this.http.get<User[]>(this.baseUrl + 'Users', {observe: 'response', params})
  .pipe(
    map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );

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