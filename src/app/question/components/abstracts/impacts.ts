//import { ReflectiveInjector } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


export class Impact {

  // singleton
  private static instance;
  public static getInstance(sanitizer: DomSanitizer) {
    if (!Impact.instance)
      Impact.instance = new Impact(sanitizer);
    return Impact.instance;
  }

  constructor(public sanitizer: DomSanitizer) {
  }

  impactList= [
    {
      id: 0,
      label: "Aucun",
      color: "#ffffff",
    },
    {
      id: 1,
      label: "Très faible",
      color: "#008000",
    },
    {
      id: 2,
      label: "Faible",
      color: "#99cc00",
    },
    {
      id: 3,
      label: "Neutre",
      color: "#ffff00",
    },
    {
      id: 4,
      label: "Fort",
      color: "#ff9900",
    },
    {
      id: 5,
      label: "Très fort",
      color: "#ff0000",
    },
  ];

  getImpact(id_impact) {
    for (let impact of this.impactList) {
      if (impact.id == id_impact)
        return impact;
    }
    return null;
  }

  getImpactColorStyle(id_impact) {
    let impact = this.getImpact(id_impact);
    if (impact)
      return {
        backgroundColor: impact.color,
      };
      //return this.sanitizer.bypassSecurityTrustStyle("background-color: "+impact.color);
    else
      return {
        backgroundColor: "none",
      };
      //return this.sanitizer.bypassSecurityTrustStyle("background-color: none");
  }

}
