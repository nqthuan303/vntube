import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    moduleId: module.id,
    selector: 'upload-modal',
    templateUrl: './uploadModal.component.html'
})
export class UploadModalComponent {

    @ViewChild('modalDirective') private modalDirective: ModalDirective;
    confirmTitle: string;
    @Output() onConfirm = new EventEmitter<boolean>();

    showModal(options: any) {
        this.modalDirective.show();
    }

    hideModal() {
        // this.modalDirective.hide();
    }

    confirm() {
        this.onConfirm.emit(true);
    }
}
