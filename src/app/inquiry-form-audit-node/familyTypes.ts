// question types

export class FamilyTypes {

  // singleton
  private static instance;
  public static getInstance(): FamilyTypes {
    if (!FamilyTypes.instance)
      FamilyTypes.instance = new FamilyTypes();
    return FamilyTypes.instance;
  }

  typeList = [{
    id: 'environnementales',
    label: "Environnementale",
  },{
    id: 'sociales',
    label: "Sociale",
  }];

  getFamilleType(id_type): any {
    for (let type of this.typeList) {
      if (type.id == id_type)
        return type;
    }
    return {
      id: 0,
      label: "Non défini",
    };
  }

}
