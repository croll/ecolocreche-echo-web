import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { RestService} from './rest.service';

@Injectable()
export class WkHtmlToPdfService {

  constructor(private http: Http, private restService: RestService) {
  }

  print() {
    // get element to print
    let src = document.getElementById('exportpdf');

    // clone this element, because we are going to modify it
    let elem = src.cloneNode(true);

    // replace canvas by images
    let _canvases_src = src.getElementsByTagName('canvas');
    let _canvases_dst = elem['getElementsByTagName']('canvas');

    // problems with HTMLCollections, so we convert them to array
    let canvases_dst=[];
    for (let i in _canvases_src) {
      canvases_dst[i] = _canvases_dst[i];
    }

    for (let i in _canvases_src) {
      let canvas_src = _canvases_src[i];
      let canvas_dst = canvases_dst[i];
      if (canvas_src.toDataURL) {
        var image = new Image();
        image.src = canvas_src.toDataURL("image/png");
        image.setAttribute('style', canvas_src.getAttribute('style'));
        canvas_dst['replaceWith'](image);
      }
    }

    // make the final html page
    let outp = '<!DOCTYPE html>';
    outp += '<html>';
    outp += ' <head>';
    outp += '  <meta charset="utf-8"/>';
    outp += '  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">';
    outp += '  <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">';
    outp += '  <link href="http://localhost:1242/assets/pdf.css" rel="stylesheet">';
    //outp += '  <style>';
    //outp += this.getallcss();
    //outp += `  </style>`;
    outp += '  <style>';
    outp += `   .not-in-pdf { display: none }`;
    outp += `  </style>`;
    outp += ' </head>';
    outp += ' <body>';
    outp += elem['innerHTML'].replace(/display: flex/g, 'display: -webkit-flex');
    outp += ' </body>';
    outp += '</html>';

    // request server to convert this html page to pdf
    console.log("loading...");
    this.restService.incLoading();
    this.http.post('/rest/pdf', outp, {
      responseType: ResponseContentType.Blob
    }).subscribe((data) => {
      console.log("loading... done");
      this.restService.decLoading();
      // open a window with this new PDF
      var url= window.URL.createObjectURL(data.blob());
      //window.open(url);
      window.location.href = url;
    });

  }

  getallcss() {
    var css = [];
    for (var i=0; i<document.styleSheets.length; i++) {
      let sheet = document.styleSheets[i];
      let rules = ('cssRules' in sheet)? sheet['cssRules'] : sheet['rules'];
      if (rules)
      {
          css.push('\n/* Stylesheet : '+(sheet.href||'[inline styles]')+' */');
          for (var j=0; j<rules.length; j++)
          {
              var rule = rules[j];
              if ('cssText' in rule)
                  css.push(rule.cssText);
              else
                  css.push(rule.selectorText+' {\n'+rule.style.cssText+'\n}\n');
          }
      }
  }
    return css.join('\n')+'\n';
}

}
