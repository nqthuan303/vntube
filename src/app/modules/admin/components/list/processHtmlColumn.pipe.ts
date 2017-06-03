import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'processHtmlColumn' })
export class ProcessHtmlColumnPipe implements PipeTransform {

    transform(column: any, objData: any) {
        let result = column;
        let item = objData.item;
        let componentInfo = objData.componentInfo;

        if (column.type == 'html') {
            let elms = column.elms;
            result = '';

            for (let i = 0; i < elms.length; i++) {
                let elm = elms[i];
                switch (elm.elmType) {
                    case 'btn-edit':
                        result += '<button type="button" class="btn btn-primary btn-edit"><i class="fa fa-pencil"></i></button> ';
                        break;
                    case 'btn-delete':
                        result += '<button type="button" class="btn btn-danger btn-delete"><i class="fa fa-trash-o"></i></button> ';
                        break;
                }
            }
        }
        return result;
    }
}