import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
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
    /*
    outp += `<script>
      document.registerElement('md-sidenav-container');
    </script>`;
    */
    outp += ' </head>';
    outp += ' <body>';
    //outp += document.getElementsByTagName('app-root')[0].innerHTML;
    outp += document.getElementById('exportpdf').innerHTML;
    outp += ' </body>';
    outp += '</html>';

    this.http.post('/rest/pdf', outp).subscribe((res) => {
      console.log(res);

    });

    // let data = new URLSearchParams();
    // data.append('html', outp)
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    //
    // this.http.post('/rest/pdf', JSON.stringify({html: outp}), options)
    //   .map((data) => {
    //     return data;
    //   })
    //   .catch((error: Response | any) => {
    //     let errMsg: string;
    //     if (error instanceof Response) {
    //       const body = error.json() || '';
    //       const err = body.error || JSON.stringify(body);
    //       errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    //     } else {
    //       errMsg = error.message ? error.message : error.toString();
    //     }
    //     console.error(errMsg);
    //     return Observable.throw(errMsg);
    //   });

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
