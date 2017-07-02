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

import { ListCategoryComponent } from './components/category/list/listCategory.component';
import { FormCategoryComponent } from './components/category/form/formCategory.component';

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

let categoryRoutes = {
  path: 'category',
  children: [
    { path: '', component: ListCategoryComponent },
    {
      path: 'form', component: FormCategoryComponent
    },
    {
      path: 'form/:id', component: FormCategoryComponent
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
        children: [indexRoutes, userRoutes, postRoutes, categoryRoutes]
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