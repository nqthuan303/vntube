import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FileService } from '../../../shared/services/file.service';

import { URL } from '../../../shared/services/app.config';

@Component({
    selector: 'file-manager',
    templateUrl: './fileManager.component.html',
    styleUrls: ['./fileManager.component.css']
})
export class FileManagerComponent implements OnInit {
    uploader: FileUploader = new FileUploader({ url: URL + '/file/upload' });
    hasBaseDropZoneOver: boolean = false;
    hasAnotherDropZoneOver: boolean = false;
    itemsInDir: Array<any> = new Array<any>();

    constructor(private service: FileService) {
        this.uploader.onCompleteItem = (item, response, status, header) => {
            if (status === 200) {
                this.getList();
            }
        }
    }
    ngOnInit() {

    }

    getList() {
        let $this = this;
        this.service.listItems('').then(function (result) {
            $this.itemsInDir = result;
        });
    }

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }
}