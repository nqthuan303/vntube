import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    moduleId: module.id,
    selector: 'file-modal',
    templateUrl: './fileModal.component.html'
})
export class FileModalComponent {

    @ViewChild('modalDirective') private modalDirective: ModalDirective;
    @ViewChild('fileManager') private fileManager: any;

    confirmTitle: string;
    @Output() onConfirm = new EventEmitter<boolean>();

    showModal(options: any) {
        this.modalDirective.show();
        this.fileManager.getList();
    }

    hideModal() {
        // this.modalDirective.hide();
    }

    confirm() {
        this.onConfirm.emit(true);
    }
}
