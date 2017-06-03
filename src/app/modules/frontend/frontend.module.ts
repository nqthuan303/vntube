import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { FrontendComponent } from './frontend.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { IndexComponent } from './components/index/index.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

import { SharedModule } from '../shared/shared.module';
import { FrontendRoutingModule } from './frontend-routing.module';

import 'assets/templates/frontend/css/magnific-popup.css';

@NgModule({
    declarations: [
        FrontendComponent,
        HeaderComponent,
        FooterComponent,
        IndexComponent,
        AboutComponent,
        ContactComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        FrontendRoutingModule,
        SharedModule
    ]
})
export class FrontendModule { }
