import { Component } from '@angular/core';

@Component({
  template: '<h1>Accueil</h1><p>Bienvenue sur l\'outil ECHO(S)</p><ngx-charts-advanced-pie-chart #chart [view]="view" [scheme]="colorScheme" [results]="single"></ngx-charts-advanced-pie-chart><input type="button" md-button value="PNG" (click)="saveAsPNG(this.chart)">'
})

export class PageHomeComponent{

  public single: any[];
  public view: any[] = [700, 400];
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  saveAsPNG(chart) {
    console.log(chart);
    console.log(chart.chartElement.nativeElement.firstElementChild.getElementsByTagName('svg')[0]);
    //console.log(document.getElementByTagName('svg'));
  }

  ngOnInit() {

    this.single = [
      {
        "name": "Germany",
        "value": 8940000
      },
      {
        "name": "USA",
        "value": 5000000
      },
      {
        "name": "France",
        "value": 7200000
      }
    ];

    setInterval(() => {
        let arr = [];
        this.single.forEach((x) => {
            arr.push(Object.assign({}, x));
        })
        arr[0].value += 1000000;
        this.single = arr;
    }, 2500);

  }

}
