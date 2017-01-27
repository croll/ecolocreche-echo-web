import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RestService {

  constructor(private http: Http) { }

  getList(type: string, params?: any): Observable<any[]> {
    return this.http.get(`rest/${type}`, {search: this.setParams(params)})
                    .map(this.extractList)
                    .catch(this.handleError);
  }

  get(id: number, type: string, params?: any): Observable<any> {
    return this.http.get(`rest/${type}/${id}`, {search: this.setParams(params)})
                    .map(this.extractOne)
                    .catch(this.handleError);
  }

  //save(obj: InquiryForm, t: string): Observable<InquiryForm> {
  save(obj: any, type: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (type.indexOf('hist/') === 0 && obj.id_node) {
      return this.http.put(`rest/${type}/${obj.id_node}`, JSON.stringify(obj), options)
              .map(this.extractOne)
              .catch(this.handleError);
    } else if (obj.id) {
      return this.http.put(`rest/${type}/${obj.id}`, JSON.stringify(obj), options)
              .map(this.extractOne)
              .catch(this.handleError);
    } else {
      return this.http.post(`rest/${type}`, JSON.stringify(obj), options)
              .map(this.extractOne)
              .catch(this.handleError);
    }
  }

  delete(id: number, type: string): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (!id) {
      console.error("call delete without id ?");
      return;
    }

    return this.http.delete(`rest/${type}/${id}`, options)
      .catch(this.handleError);

  }

  private setParams(params: any): URLSearchParams {
   if (!params || typeof(params) != 'object') return;
   let p = new URLSearchParams()
   for (let key of Object.keys(params)) {
     p.set(key, params[key]);
   }
   return p;
  }

  private extractOne(res: Response) {
    let body = res.json();
    let obj = {};
    Object.assign(obj, body);
    return obj;
  }

  private extractList(res: Response) {
    let body = res.json();
    let list: any[] = [];
    for(let elem of body) {
      let obj = {};
      Object.assign(obj, elem);
      list.push(obj);
    }
    return list;
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
