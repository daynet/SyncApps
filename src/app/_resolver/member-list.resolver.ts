import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../_models/User';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResover implements Resolve<User[]> {

    pageNumber = 1;
    pageSize = 5;
    constructor(private userService: UserService, private alertify: AlertifyService, private router: Router) {
 
    }

    resolve(route: ActivatedRouteSnapshot): Observable<User[]>  {
        return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('problem retreiving data!!!');
                this.router.navigate(['/home']);
                return of(null);
            })
        ) ;
    }
}