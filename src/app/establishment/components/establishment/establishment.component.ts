import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.css']
})

export class EstablishmentComponent implements OnInit {

  public name: string
  public address: string
  public postalcode: string
  public city: string
  public phone: string
  public mail: string
  public type: number
  public status: number

  constructor() { }

  ngOnInit() {
  }

}
