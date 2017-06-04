import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*========== import modules ===========*/
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SelectModule } from 'angular2-select';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

/*========== import services ===========*/
import { UserService } from '../../shared/services/user.service';
import { DistrictService } from '../../shared/services/district.service';
import { WardService } from '../../shared/services/ward.service';
import { PostService } from '../../shared/services/post.service';

/*========== import resolves ===========*/
import { UserResolve } from '../../shared/resolves/user.resolve';
import { FormUserResolve } from './components/user/form/formUser.resolve';
import { DistrictResolve } from '../../shared/resolves/district.resolve';

/*========== import pipes ===========*/
import { SafeHtmlPipe } from '../../shared/pipes/safeHtml.pipe';
import { ProcessHtmlColumnPipe } from './components/list/processHtmlColumn.pipe';

/*========== import components ===========*/
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ListComponent } from './components/list/list.component';
import { IndexComponent } from './components/index/index.component';
import { ListUserComponent } from './components/user/list/listUser.component';
import { FormUserComponent } from './components/user/form/formUser.component';

import { ListPostComponent } from './components/post/list/listPost.component';
import { FormPostComponent } from './components/post/form/formPost.component';

@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ListComponent,
    IndexComponent,
    FormUserComponent,
    ListUserComponent,
    ListPostComponent,
    FormPostComponent,
    SafeHtmlPipe,
    ProcessHtmlColumnPipe
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SelectModule,
    ToastModule.forRoot(),
    SharedModule,
    AdminRoutingModule
  ],
  providers: [
    DistrictService,
    WardService,
    FormUserResolve,
    DistrictResolve,
    UserService,
    UserResolve,
    PostService
  ]
})
export class AdminModule { }
