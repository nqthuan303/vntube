import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirmModal.component';
import { FileModalComponent } from './components/fileModal.component';
import { ModalModule } from 'ngx-bootstrap';
import { FileManagerComponent } from './components/fileManager.component';
import { FileUploadModule, FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { FileService } from '../../shared/services/file.service';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    FileModalComponent,
    FileManagerComponent
  ],
  imports: [FileUploadModule, CommonModule, ModalModule.forRoot()],
  providers: [FileService],
  exports: [ConfirmModalComponent, FileModalComponent]
})
export class SharedModule { }
