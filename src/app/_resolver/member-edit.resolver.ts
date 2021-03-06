import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../_models/User';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
    constructor(private userService: UserService, private alertify: AlertifyService, private router: Router,
                private authService: AuthService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<User>  {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('problem retreiving data!!!');
                this.router.navigate(['/members']);
                return of(null);
            })
        ) ;
    }
}