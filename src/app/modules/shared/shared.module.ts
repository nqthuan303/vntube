import { NgModule }       from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirmModal.component';
import { UploadModalComponent } from './components/uploadModal.component';
import { ModalModule } from 'ngx-bootstrap';
import { UploadComponent } from './components/upload.component';
import { FileUploadModule, FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    UploadModalComponent,
    UploadComponent
  ],
  imports: [FileUploadModule, CommonModule, ModalModule.forRoot()],
  exports:[ ConfirmModalComponent, UploadModalComponent ]
})
export class SharedModule {}
