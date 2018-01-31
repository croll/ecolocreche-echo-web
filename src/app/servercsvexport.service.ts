import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { saveAs } from 'file-saver';
import { RestService } from './rest.service';

@Injectable()
export class ServercsvexportService {

  constructor(private http: Http, private restService: RestService) {
  }

  download(uri: string, params: Object) {
    // request server to convert this html page to pdf
    console.log("loading...");
    this.restService.incLoading();
    this.http.post(uri, params, {
      responseType: ResponseContentType.Blob
    }).subscribe((data) => {
      console.log("loading... done");
      this.restService.decLoading();

      //saveAs(data.blob(), "export.xlsx");
      if (params['format'] == 'csv') {
        saveAs(new Blob([data.blob()], { type: 'text/csv' }), "export.csv");
      } else if (params['format'] == 'xlsx') {
        saveAs(new Blob([data.blob()], { type: 'application/octet-stream' }), "export.xlsx");
      } else {
        console.error("format inconnu");
      }

      //this.triggerDownload(data.blob())
    });
  }

}
