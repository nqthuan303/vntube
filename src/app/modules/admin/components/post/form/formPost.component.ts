import { Component, OnInit, Inject, ViewContainerRef, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CustomValidators } from 'ng2-validation';

import { PostModel } from '../../../../../shared/models/post.model';

import { PostService } from '../../../../../shared/services/post.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var $: any;
declare var tinymce: any;

@Component({
    moduleId: module.id,
    selector: 'admin-form-Post',
    templateUrl: './formPost.component.html'
})
export class FormPostComponent {
    @ViewChild('fileModal') private fileModal: any;
    objForm: FormGroup;
    objData: PostModel = new PostModel();
    submited: boolean;
    action: string = 'add';
    params: Params;
    isWardListAvailable: boolean = false;
    editor;

    constructor(
        @Inject(FormBuilder) formBuilder: FormBuilder,
        private service: PostService,
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
        private activatedRoute: ActivatedRoute
    ) {
        this.submited = false;
        this.toastr.setRootViewContainerRef(vcr);
        this.objForm = formBuilder.group({
            'title': ['', [Validators.required]],
            'category': ['', [Validators.required]],
            'shortDescription': ['', [Validators.required]],
            'content': ['', [Validators.required]],
            'image': ['', [Validators.required]],
            'status': ['']
        });
    }

    ngOnInit() {

        this.activatedRoute.params.subscribe((params: Params) => {
            this.params = params;
        });

        if (this.params['id']) {
            this.action = 'update';
            this.objForm.get('password').setValidators(null);
            this.objForm.get('rePassword').setValidators(null);

            this.objData = this.activatedRoute.snapshot.data['dataResolve'];

            let $this = this;
        }
    }

    selectCategory() {

    }

    deselectCategory() {

    }
    
    ngAfterViewInit() {
        tinymce.init({
            selector: '#postContent',
            toolbar: `undo redo | styleselect | bold italic | 
                      alignleft aligncenter alignright alignjustify | 
                      bullist numlist outdent indent | table | 
                      fontsizeselect uploadFile`,
            plugins: ['link', 'paste', 'table'],
            skin_url: '../../assets/skins/lightgray',
            height : "320",
            setup: editor => {
                this.editor = editor;
                let $this = this;
                editor.addButton('uploadFile', {
                    text: '',
                    icon: 'image',
                    onclick: function () {
                        $this.fileModal.showModal();
                    }
                });

                editor.on('keyup', () => {
                    const content = editor.getContent();
                    this.objData.content = content;
                });
            },
        });

        tinymce.init({
            selector: '#shortDescription',
            toolbar: `undo redo | styleselect | bold italic | 
                      alignleft aligncenter alignright alignjustify | 
                      bullist numlist outdent indent | table | 
                      fontsizeselect uploadFile`,
            plugins: ['link', 'paste', 'table'],
            skin_url: '../../assets/skins/lightgray',
            height : "150",
            setup: editor => {
                this.editor = editor;
                let $this = this;
                editor.addButton('uploadFile', {
                    text: '',
                    icon: 'image',
                    onclick: function () {
                        $this.fileModal.showModal();
                    }
                });

                editor.on('keyup', () => {
                    const content = editor.getContent();
                    this.objData.shortDescription = content;
                });
            },
        });

    }

    ngOnDestroy() {
        tinymce.remove(this.editor);
    }

    onFileModalConfirm(arrImage: any) {
        let imageHtml = '';
        for (let i = 0; i < arrImage.length; i++) {
            let image = arrImage[i];
            if (image.clicked) {
                imageHtml += '<img height="42" width="42" src="' + image.url + '"/>';
            }

        }
        tinymce.execCommand('mceInsertContent', false, imageHtml);

        this.fileModal.hideModal();
    }

    formAction() {
        this.submited = true;
        if (!this.objForm.valid) {
            return;
        }
        this.submited = false;
        if (this.action === 'add') {
            this.service.add(this.objData).then((result) => {
                if (result.statusCode == 0) {
                    this.toastr.success('Thêm user thành công!', result.message);
                    this.objForm.reset();
                } else {
                    this.toastr.error('Đã xảy ra lỗi trong quá trình thêm user!!', result.message)
                }
            });
        }

        if (this.action === 'update') {
            this.service.update(this.objData).then((result) => {
                if (result.statusCode == 0) {
                    this.toastr.success('Cập nhật thông tin user thành công!', result.message)
                } else {
                    this.toastr.error('Đã xảy ra lỗi trong quá trình cập nhật!', result.message)
                }
            });
        }


    }
}
