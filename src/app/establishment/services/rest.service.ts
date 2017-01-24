import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Establishment } from '../establishment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RestService {

  constructor(private http: Http) { }

  getList(): Observable<Establishment[]> {
    return this.http.get('rest/establishments')
                    .map(this.extractList)
                    .catch(this.handleError);
  }

  get(id: number): Observable<Establishment> {
    return this.http.get(`rest/establishments/${id}`)
                    .map(this.extractOne)
                    .catch(this.handleError);
  }

  save(obj: Establishment): Observable<Establishment> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options       = new RequestOptions({ headers: headers });

    if (obj.id) {
      return this.http.put(`rest/establishments/${obj.id}`, JSON.stringify(obj), options)
              .map(this.extractOne)
              .catch(this.handleError);
    } else {
      return this.http.post('rest/establishments', JSON.stringify(obj), options)
              .map(this.extractOne)
              .catch(this.handleError);
    }


  }

  delete(id): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options       = new RequestOptions({ headers: headers });

    if (!id) {
      return;
    }

    return this.http.delete(`rest/establishments/${id}`, options)
      .catch(this.handleError);

  }

  private extractOne(res: Response) {
    let body = res.json();
    let obj = new Establishment();
    Object.assign(obj, body);
    return obj;
  }

  private extractList(res: Response) {
    let body = res.json();
    let list: Establishment[] = [];
    for(let elem of body) {
      let obj = new Establishment();
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
