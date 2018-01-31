import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class RestService {

  constructor(private http: Http, private snackBar: MatSnackBar) { }

  getList(type: string, params?: any): Observable<any[]> {
    this.incLoading();
    return this.http.get(`rest/${type}`, {search: this.setParams(params)})
    .map((data) => {
      this.decLoading();
      return data;
    })
    .map(this.extractList)
    .catch((err) => {
      this.decLoading();
      return this.handleError(err);
    });
  }

  get(id: number, type: string, params?: any): Observable<any> {
    this.incLoading();
    return this.http.get(`rest/${type}/${id}`, {search: this.setParams(params)})
      .map((data) => {
        this.decLoading();
        return data;
      })
      .map(this.extractOne)
      .catch((err) => {
        this.decLoading();
        return this.handleError(err);
      });
  }

  //save(obj: InquiryForm, t: string): Observable<InquiryForm> {
  save(obj: any, type: string, params?: any, keyname: string = 'id', message: string = "Sauvegarde : ", submessage?: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, search: this.setParams(params) });

    console.log(obj);
    console.log(keyname);

    if (keyname in obj && obj[keyname]) {
      this.incLoading();
      return this.http.put(`rest/${type}/${obj[keyname]}`, JSON.stringify(obj), options)
      .map((response) => {
          this.decLoading();
          this.snackBar.open(message, submessage ? submessage : "Sauvegardé", {
                duration: 3000,
              });
          return response;
      })
      .map(this.extractOne)
      .catch((err) => {
        this.decLoading();
        this.snackBar.open(message, "ERREUR !", {
              duration: 6000,
            });
        return this.handleError(err);
      });
    } else {
      this.incLoading();
      return this.http.post(`rest/${type}`, JSON.stringify(obj), options)
      .map((response) => {
          this.decLoading();
          this.snackBar.open(message, submessage ? submessage :  "Ajouté", {
                duration: 3000,
              });
          return response;
      })
      .map(this.extractOne)
      .catch((err) => {
        this.decLoading();
        this.snackBar.open(message, "ERREUR !", {
              duration: 6000,
            });
        return this.handleError(err);
      });
    }
  }

  delete(id: number, type: string, params?: any, message: string = "Suppression : "): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, search: this.setParams(params) });

    if (!id) {
      console.error("call delete without id ?");
      return;
    }

    this.incLoading();
    return this.http.delete(`rest/${type}/${id}`, options)
      .map((data) => {
        this.decLoading();
        this.snackBar.open(message, "Effacé", {
              duration: 3000,
            });
        return data;
      })
      .catch((err) => {
        this.decLoading();
        this.snackBar.open(message, "ERREUR !", {
              duration: 6000,
            });
        return this.handleError(err);
      });

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

  private loading = 0;

  public incLoading() {
    this.loading++;
    if (this.loading == 1) {
      let elem = document.getElementById('loading');
      if (elem)
        elem.className ="loading";
        //elem.style.display="block";
    }
  }

  public decLoading() {
    this.loading--;
    if (this.loading <= 0) {
      let elem = document.getElementById('loading');
      if (elem)
        elem.className = "not-loading";
        //elem.style.display="none";
    }
  }

}
