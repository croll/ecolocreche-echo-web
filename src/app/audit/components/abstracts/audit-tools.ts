import { Impact } from '../../../question/components/abstracts/impacts'

export class AuditTools {

  private static instance;
  private static impact

  public static getInstance() {
    if (!AuditTools.instance) {
      AuditTools.instance = new AuditTools();
      AuditTools.impact = new Impact(null);
    }
    return AuditTools.instance;
  }

  cacheQuestions(nodes, questionsList = {}, id_theme = null) {
    if (nodes.childs && nodes.childs.length) {
      nodes.childs.forEach(node => {
        // Store id_theme for graph generation
        if (!node.id_node_parent) {
          id_theme = node.id_node;
        }
        AuditTools.instance.cacheQuestions(node, questionsList, id_theme);
        // If it'as a question
        if (node.type.substring(0, 2) == 'q_') {
          let question = {id: node.id, id_node: node.id_node, id_theme: id_theme, title: node.title, comment: node.comment, type: node.type, ignored: false, choices: null, value: undefined};
          if (node.answer) {
            if (!node.answer.ignored) {
              let value = JSON.parse(node.answer.value);
              // checkbox of percentage
              if (node.type == 'q_checkbox' || node.type == 'q_percents') {
                question.value = [];
                for(let id_choice in value) {
                  node.choices.forEach(c => {
                    // console.log(node.type, parseInt(id_choice), c.id_choice);
                    if (parseInt(id_choice) == c.id_choice) {
                      if (node.type != 'q_percents' || value[id_choice] > 0) {
                        let choice = {title: c.title, impact: AuditTools.impact.getImpact(c.impact), comment: c.comment, value: value[id_choice], color: null};
                        question.value.push(choice);
                      }
                    }
                  });
                }
                // radio
              } else if (node.type == 'q_radio'){
                question.value = [];
                node.choices.forEach(c => {
                  if (value == c.id_choice) {
                    // console.log(question.title, c.impact, AuditTools.impact.getImpact(c.impact));
                    let choice = {title: c.title, impact: AuditTools.impact.getImpact(c.impact), comment: c.comment, color: null}
                    question.value.push(choice);
                  }
                });
                // All other question type, for now string and number
              } else {
                question.value = value;
              }
            } else {
              question.ignored = true;
            }
          }
          questionsList[question.id_node] = question;
        }
      });
    }
    return questionsList;
  }

}
