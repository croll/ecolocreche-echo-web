// question types

export class QTypes {

  // singleton
  private static instance;
  public static getInstance() {
    if (!QTypes.instance)
      QTypes.instance = new QTypes();
    return QTypes.instance;
  }

  typeList = [{
    id: 'q_radio',
    label: "Question fermée à choix unique",
  },{
    id: 'q_checkbox',
    label: "Question fermée à choix multiple",
  },{
    id: 'q_percents',
    label: "Question fermée à choix multiple pondéré",
  },{
    id: 'q_text',
    label: "Question ouverte",
  },{
    id: 'q_numeric',
    label: "Question ouverte numérique",
  }];

  getQuestionType(id_type): any {
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
