import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontendComponent } from './frontend.component';
import { IndexComponent } from './components/index/index.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

const userRoutes: Routes = [
  {
    path: '',
    component: FrontendComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', redirectTo: 'index', pathMatch: 'full' },
          { path: 'index', component: IndexComponent },
          { path: 'about', component: AboutComponent },
          { path: 'contact', component: ContactComponent }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FrontendRoutingModule { }