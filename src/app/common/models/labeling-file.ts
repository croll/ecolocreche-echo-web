import { Injectable } from '@angular/core';
import { RestService } from '../../rest.service';

export class LabelingFile {

  public id: number
  public id_establishment: number
  public id_labelingfile_src: number
  public id_audit_1: number
  public id_audit_2: number
  public id_audit_recap_actions: number

}

export namespace LabelingFile {
  export class Json {
    public logo: string
    public custom_headers: CustomHeader[] = []
    public themes_commitments: ThemeCommitment[] = []
    public themes_comments: ThemeComment[] = []
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
    private _dirty: boolean = false

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

    addCustomHeader(label: string, value: string): void {
      if (!label || !value) return;
      this.custom_headers.push(new LabelingFile.CustomHeader(label, value));
      this._dirty = true;
    }

    setThemeCommitment(id_theme, value):void {
      if (!id_theme) return;
      let obj = this.get(id_theme, 'themes_commitments');
      // if empty value, delete entry
      if (obj && !value) {
        this.delete(obj.id, 'themes_commitments');
        this._dirty = true;
        return;
      }
      if (obj) {
        obj.value = value;
      } else {
        this.themes_commitments.push(new LabelingFile.ThemeCommitment(id_theme, value));
      }
      this._dirty = true;
    }

    setThemeComment(id_theme, past_action, future_action): void {
      if (!id_theme) return;
      let obj = this.get(id_theme, 'themes_comments');
      // if empty value, delete entry
      if (obj && (!past_action && !future_action)) {
        this.delete(obj.id, 'themes_comments');
        this._dirty = true;
        return;
      }
      if (obj) {
        obj.past_action = past_action;
        obj.future_action = future_action;
      } else {
        this.themes_comments.push(new LabelingFile.ThemeComment(id_theme, past_action, future_action));
      }
      this._dirty = true;
    }

    delete(id, what): boolean {
      let i = 0;
      this[what].forEach(obj => {
        if (id == obj.id) {
          this[what].splice(i, 1);
          this._dirty = true;
          return true;
        }
      })
      return false;
    }

    isDirty(): boolean {
      return this._dirty;
    }

  }

  export class CustomHeader {
    id: number
    label: string
    value: string
    constructor(l: string, v: string) {
      this.id = new Date().getUTCMilliseconds();
      this.label = l;
      this.value = v;
    }
  }

  export class ThemeCommitment {
    id: number
    value: string
    constructor(id_theme: number , v: string) {
      this.id = id_theme;
      this.value = v;
    }
  }

  export class ThemeComment {
    id: number
    past_action: string
    future_action: string
    constructor(id_theme: number , pa: string = null, fa: string = null) {
      this.id = id_theme;
      this.past_action = pa;
      this.future_action = fa;
    }
  }

}
