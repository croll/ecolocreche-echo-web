import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { RestService} from './rest.service';

@Injectable()
export class PuppeteerPdfService {

  constructor(private http: Http, private restService: RestService) {
  }

  print(what: string, id: number) {
    // request server to convert this html page to pdf
    console.log("loading...");
    this.restService.incLoading();
    this.http.post('/rest/pdf', {
      what: what,
      id: id,
    }, {
      responseType: ResponseContentType.Blob
    }).subscribe((data) => {
      console.log("loading... done");
      this.restService.decLoading();

      this.triggerDownload(data.blob())
    });
  }

  triggerDownload(blob) {

    let proposedFileName = 'export.pdf';

    if (typeof window.navigator.msSaveBlob !== 'undefined'){
      window.navigator.msSaveBlob(blob, proposedFileName);
    } else {
      var downloadUrl = URL.createObjectURL(blob);

      // build and open link - use HTML5 a[download] attribute to specify filename
      var a = document.createElement("a");

      // safari doesn't support this yet
      if (typeof a.download === 'undefined') {
          window.open(downloadUrl);
      }

      var link = document.createElement('a');
      link.href = downloadUrl;
      link.download = proposedFileName;
      document.body.appendChild(link);
      var event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      link.dispatchEvent(event);
      document.body.removeChild(link);
    }
  }

}
