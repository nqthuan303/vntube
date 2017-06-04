import { Component, OnInit, Inject, ViewContainerRef, ViewChild } from '@angular/core';
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
    @ViewChild('uploadModal') private uploadModal: any;
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

    ngAfterViewInit() {
        tinymce.init({
            selector: '#postContent',
            toolbar: 'mybutton',
            plugins: ['link', 'paste', 'table'],
            skin_url: '../../assets/skins/lightgray',
            setup: editor => {
                this.editor = editor;
                let $this = this;
                editor.addButton('mybutton', {
                    text: 'My button',
                    icon: true,
                    onclick: function () {
                        $this.uploadModal.showModal();
                    }
                });

                editor.on('keyup', () => {
                    const content = editor.getContent();
                    this.objData.content = content;
                    //   this.onEditorKeyup.emit(content);
                });
            },
        });
    }

    ngOnDestroy() {
        tinymce.remove(this.editor);
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
