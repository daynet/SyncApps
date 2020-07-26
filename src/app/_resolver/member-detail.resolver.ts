import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../_models/User';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResover implements Resolve<User> {
    constructor(private userService: UserService, private alertify: AlertifyService, private router: Router) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<User>  {
        return this.userService.getUser(route.params.id).pipe(
            catchError(error => {
                this.alertify.error('problem retreiving data!!!');
                this.router.navigate(['/members']);
                return of(null);
            })
        ) ;
    }
}