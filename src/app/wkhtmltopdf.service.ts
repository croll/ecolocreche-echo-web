import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class WkHtmlToPdfService {

  constructor(private http: Http) {
  }

  print() {
    let outp = '<!DOCTYPE html>';
    outp += '<html>';
    outp += ' <head>';
    outp += '  <meta charset="utf-8"/>';
    outp += '  <style>';
    outp += this.getallcss();
    outp += `  </style>`;
    outp += ' </head>';
    outp += ' <body>';
    outp += document.getElementById('exportpdf').innerHTML;
    outp += ' </body>';
    outp += '</html>';

    this.http.post('/rest/pdf', outp, {
      responseType: ResponseContentType.Blob
    }).subscribe((data) => {
      var url= window.URL.createObjectURL(data.blob());
      window.open(url);
      //console.log(data);
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
