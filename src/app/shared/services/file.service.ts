import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { URL } from './app.config';
import { CommonService } from './common.service';

@Injectable()
export class FileService {

    constructor(
        private http: Http,
        private commonService: CommonService
    ) { }

    listItems(type: string): Promise<any> {

        let auth = JSON.parse(localStorage.getItem('auth'));
        let token = auth.token;
        let headers = new Headers();
        headers.append('Authorization', token);

        let url: string = URL + '/file/list';

        if(type != '') {
            url += '?type=' + type;
        }
        

        return this.http.get(url, { headers: headers }).toPromise()
            .then(result => { return this.commonService.extractData(result) })
            .catch(error => { return this.commonService.handleError(error) });
    }

}
