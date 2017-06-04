import { NgModule }       from '@angular/core';
import { ConfirmModalComponent } from './components/confirmModal.component';
import { UploadModalComponent } from './components/uploadModal.component';
import { ModalModule } from 'ngx-bootstrap';
import { UploadComponent } from './components/upload.component';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    UploadModalComponent,
    UploadComponent
  ],
  imports: [ModalModule.forRoot()],
  exports:[ ConfirmModalComponent, UploadModalComponent ]
})
export class SharedModule {}
