import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResover } from './_resolver/member-detail.resolver';
import { MemberListResover } from './_resolver/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    {path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
        { path: 'list', component: ListComponent},
        { path: 'members', component: MemberListComponent,  resolve: {users: MemberListResover}},
        { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResover}},
        { path: 'member/edit', component: MemberEditComponent,
         resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges ]},
        { path: 'messages', component: MessagesComponent}
    ]
},
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
