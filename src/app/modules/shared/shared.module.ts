import { NgModule }       from '@angular/core';
import { ConfirmModalComponent } from './components/confirmModal.component';

@NgModule({
  declarations: [
    ConfirmModalComponent
  ],
  exports:[ ConfirmModalComponent ]
})
export class SharedModule {}
