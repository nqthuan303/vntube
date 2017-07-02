import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { URL } from './app.config';
import { CategoryModel } from '../models/category.model';
import { CommonService } from './common.service';

@Injectable()
export class CategoryService {

  constructor(
    private http: Http,
    private commonService: CommonService
  ) { }

  getParentCategory(): Promise<any> {
    let auth =JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Authorization', token);

    let url: string = URL + '/category/parentList';

    return this.http.get(url, { headers: headers }).toPromise()
      .then(result => { return this.commonService.extractData(result) })
      .catch( error => { return this.commonService.handleError(error) });
  }

  listItems(options: Object): Promise<any> {
    let auth =JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Authorization', token);

    let url: string = URL + '/post/list';

    url = this.commonService.getUrl(url, options);

    return this.http.get(url, { headers: headers }).toPromise()
      .then(result => { return this.commonService.extractData(result) })
      .catch( error => { return this.commonService.handleError(error) });
  }

  findOne(options: Object): Promise<any> {
    let auth =JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Authorization', token);

    let url: string = URL + '/post/findOne';

    url = this.commonService.getUrl(url, options);

    return this.http.get(url, { headers: headers }).toPromise()
      .then(result => { return this.commonService.extractData(result) })
      .catch( error => { return this.commonService.handleError(error) });
  }

  add(data: CategoryModel): Promise<any> {
    let auth =JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);

    let url: string = URL + '/post/add';

    return this.http.post(url, JSON.stringify(data), { headers: headers })
      .toPromise().then(result => { return this.commonService.extractData(result) })
      .catch( error => { return this.commonService.handleError(error) });
  }

  delete(itemId: string): Promise<any> {
    const auth = JSON.parse(localStorage.getItem('auth'));
    const token = auth.token;
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    const url: string = URL + '/post/delete/' + itemId;

    return this.http.delete(url, { headers: headers })
      .toPromise().then(result => { return this.commonService.extractData(result)})
      .catch( error => { return this.commonService.handleError(error) });

  }

  update(data: CategoryModel): Promise<any> {
    let auth =JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);

    let url: string = URL + '/post/update/' + data._id;

    return this.http.put(url, JSON.stringify(data), { headers: headers })
      .toPromise().then(result => { return this.commonService.extractData(result) })
      .catch( error => { return this.commonService.handleError(error) });
  }

  numOfItem(options: Object): Promise<number> {
    let auth =JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Authorization', token);

    let url: string = URL + '/post/getCount';

    url = this.commonService.getUrl(url, options);

    return this.http.get(url, { headers: headers }).toPromise()
      .then(result => { return this.commonService.extractData(result) })
      .catch( error => { return this.commonService.handleError(error) });
  }

}
