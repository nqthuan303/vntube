import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FileService } from '../../../shared/services/file.service';

import { URL, SERVER_URL } from '../../../shared/services/app.config';

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
    serverUrl: string;
    arrClicked: Array<any> = new Array<any>();
    @Output() onClickedImage = new EventEmitter<any>();

    constructor(private service: FileService) {
        this.uploader.onCompleteItem = (item, response, status, header) => {
            if (status === 200) {
                this.getList();
            }
        }
        this.serverUrl = SERVER_URL;
    }
    ngOnInit() {

    }

    getList() {
        let $this = this;
        this.service.listItems('image').then(function (result) {
            $this.itemsInDir = result;

            for(let i=0; i< result.length; i++) {
                $this.arrClicked.push({
                    url: $this.serverUrl + '/' + result[i].url,
                    clicked: false
                });
            }

        });
    }

    onClickImage(index: number, event){
        if(event.ctrlKey) {
            this.arrClicked[index].clicked = !this.arrClicked[index].clicked;
        }else{
            let currentClicked = this.arrClicked[index].clicked;
            for(let i=0; i< this.arrClicked.length; i++){
                this.arrClicked[i].clicked = false;
            }
            this.arrClicked[index].clicked = !currentClicked;
        }
        this.onClickedImage.emit(this.arrClicked);
    }

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }
}