import { Component, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent{
  processProgressPercent = 0;
}
