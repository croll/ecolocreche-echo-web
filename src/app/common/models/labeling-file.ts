import { Injectable } from '@angular/core';
import { RestService } from '../../rest.service';

export class LabelingFile {

  public id: number
  public id_establishment: number
  public id_labelingfile_src: number
  public id_audit_1: number
  public id_audit_2: number
  public id_audit_recap_actions: number
  public datajson: string;

}

export namespace LabelingFile {

  export class Json {
    public logo: string = '/assets/images/' + 'ecoaccueil.png';
    public custom_headers: CustomHeader[] = []
    public themes_commitments: {} = {}
    public themes_comments: {} = {}
    public themes_engaged: {} = {}
    public comments1: string
    public comments2: string
    public hide_comments: boolean = false
    public hide_social_details: boolean = false
    public hide_balance_sheet_social_radar: boolean = false
    public hide_balance_sheet_social_bar: boolean = false
    public hide_balance_sheet_social_pie: boolean = false
    public hide_environment_details: boolean = false
    public hide_balance_sheet_environmental_radar: boolean = false
    public hide_balance_sheet_environmental_bar: boolean = false
    public hide_balance_sheet_environmental_pie: boolean = false

    get(id, what) {
      let ret = null;
      this[what].forEach(obj => {
        if (obj.id == id) {
          ret = obj;
          return;
        }
      });
      return ret;
    }

    // addCustomHeader(label: string, value: string): void {
    //   if (!label || !value) return;
    //   this.custom_headers[label] = value;
    // }
    //
    // deleteCustomHeader(label) {
    //   delete this.custom_headers[label];
    // }

    addCustomHeader(label: string, value: string): void {
      if (!label || !value) {
        console.warn('No label or value provided to addCustomHeader()');
        return;
      }
      this.custom_headers.push(new LabelingFile.CustomHeader(label, value));
    }

    deleteCustomHeader(index): void {
        this.custom_headers.splice(index, 1);
    }

    set(id, what, val) {
      this[what][id] = val;
    }

    delete(id, what): boolean {
      let i = 0;
      this[what].forEach(obj => {
        if (id == obj.id) {
          this[what].splice(i, 1);
          return true;
        }
        i++;
      })
      return false;
    }

    swapLogo() {
      this.logo = '/assets/images/' + ((this.logo.indexOf('ecoaccueil') != -1) ? 'ecolocreche.png' : 'ecoaccueil.png');
    }

  }

  export class CustomHeader {
    label: string
    value: string
    constructor(l: string, v: string) {
      this.label = l;
      this.value = v;
    }
  }

}
