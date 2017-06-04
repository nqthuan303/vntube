import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

import { IndexComponent } from './components/index/index.component';
import { DistrictResolve } from '../../shared/resolves/district.resolve';

import { ListUserComponent } from './components/user/list/listUser.component';
import { FormUserComponent } from './components/user/form/formUser.component';
import { FormUserResolve } from './components/user/form/formUser.resolve';
import { UserResolve } from '../../shared/resolves/user.resolve';

import { ListPostComponent } from './components/post/list/listPost.component';
import { FormPostComponent } from './components/post/form/formPost.component';

import { AuthGuard } from '../../auth-guard.service';

let userRoutes = {
  path: 'user',
  children: [
    { path: '', component: ListUserComponent },
    {
      path: 'form', component: FormUserComponent,
      resolve: {
        districtResolve: DistrictResolve
      }
    },
    {
      path: 'form/:id', component: FormUserComponent,
      resolve: {
        dataResolve: FormUserResolve,
        districtResolve: DistrictResolve
      }
    },
  ]
};

let postRoutes = {
  path: 'post',
  children: [
    { path: '', component: ListPostComponent },
    {
      path: 'form', component: FormPostComponent
    },
    {
      path: 'form/:id', component: FormPostComponent
    }
  ]
};


let indexRoutes = { path: 'index', component: IndexComponent };

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [indexRoutes, userRoutes, postRoutes]
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }