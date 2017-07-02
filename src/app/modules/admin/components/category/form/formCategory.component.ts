import { Component, OnInit, Inject, OnDestroy, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CategoryModel } from '../../../../../shared/models/category.model';
import { CategoryService } from '../../../../../shared/services/category.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var $: any;
declare var tinymce: any;

@Component({
    moduleId: module.id,
    selector: 'admin-form-Category',
    templateUrl: './formCategory.component.html'
})
export class FormCategoryComponent implements OnInit {
    objData: CategoryModel = new CategoryModel();
    objForm: FormGroup;
    submited: boolean;
    parentList: Array<CategoryModel> = new Array<CategoryModel>();
    action: string = 'add';
    editor;

    constructor(
        @Inject(FormBuilder) formBuilder: FormBuilder,
        private service: CategoryService,
        vcr: ViewContainerRef,
        public toastr: ToastsManager
    ) {
        this.submited = false;
        this.toastr.setRootViewContainerRef(vcr);
        this.objForm = formBuilder.group({
            'name': ['', [Validators.required]],
            'parent': ['', [Validators.required]],
            'description': [''],
            'status': ['']
        });
    }

    ngOnInit() {
        this.service.getParentCategory().then(function(result) {
            this.parentList = result;
        });
    }
    
    ngAfterViewInit() {
        tinymce.init({
            selector: '#description',
            toolbar: `undo redo | styleselect | bold italic | 
                      alignleft aligncenter alignright alignjustify | 
                      bullist numlist outdent indent | table | 
                      fontsizeselect`,
            plugins: ['link', 'paste', 'table'],
            skin_url: '../../assets/skins/lightgray',
            height : "180",
            setup: editor => {
                this.editor = editor;
                editor.on('keyup', () => {
                    const content = editor.getContent();
                    this.objData.description = content;
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
                    this.toastr.success('Thêm category thành công!', result.message);
                    this.objForm.reset();
                } else {
                    this.toastr.error('Đã xảy ra lỗi!!', result.message)
                }
            });
        }

        if (this.action === 'update') {
            this.service.update(this.objData).then((result) => {
                if (result.statusCode == 0) {
                    this.toastr.success('Cập nhật category thành công!', result.message)
                } else {
                    this.toastr.error('Đã xảy ra lỗi trong quá trình cập nhật!', result.message)
                }
            });
        }


    }


}
