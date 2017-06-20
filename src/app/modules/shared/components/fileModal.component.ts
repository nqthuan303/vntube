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
    @Output() onConfirm = new EventEmitter<any>();
    arrClicked: Array<any> = new Array<any>();

    showModal(options: any) {
        this.modalDirective.show();
        this.fileManager.getList();
    }

    hideModal() {
        this.modalDirective.hide();
    }

    onClickedImage(event) {
        this.arrClicked = event;
    }

    confirm() {
        this.onConfirm.emit(this.arrClicked);
    }
}
