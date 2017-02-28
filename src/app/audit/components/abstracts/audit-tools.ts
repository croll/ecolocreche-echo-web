import { Impact } from '../../../question/components/abstracts/impacts'

export class AuditTools {

  private static instance;
  private static impact
  private static impactObj = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0};

  public static getInstance() {
    if (!AuditTools.instance) {
      AuditTools.instance = new AuditTools();
      AuditTools.impact = new Impact(null);
    }
    return AuditTools.instance;
  }

  cacheDatas(nodes, id_theme = null, questionsList = {}, chartDatas = {}) {
    if (nodes.childs && nodes.childs.length) {
      nodes.childs.forEach(node => {
        // Store impact informations for graph generation
        if (!node.id_node_parent) {
          id_theme = node.id_node;
          if (!chartDatas[id_theme]) {
            chartDatas[id_theme] = {id: node.id, id_node: node.id_node, title: node.title, family: node.family, impact: Object.assign({}, AuditTools.impactObj), totalAnswersWithImpact: 0};
          }
        }
        AuditTools.instance.cacheDatas(node, id_theme, questionsList, chartDatas);
        // If it'as a question
        if (node.type.substring(0, 2) == 'q_') {
          let question = {id: node.id, id_node: node.id_node, id_theme: id_theme, title: node.title, description: node.description, type: node.type, ignored: false, choices: null, value: undefined};
          if (node.answer) {
            if (!node.answer.ignored) {
              let value = JSON.parse(node.answer.value);
              // checkbox of percentage
              if (node.type == 'q_checkbox' || node.type == 'q_percents') {
                question.value = [];
                for(let id_choice in value) {
                  node.choices.forEach(c => {
                    if (parseInt(id_choice) == c.id_choice) {
                      if (node.type != 'q_percents' || value[id_choice] > 0) {
                        let impact = AuditTools.impact.getImpact(c.impact);
                        if (impact.id != 0) {
                          chartDatas[id_theme].impact[impact.id]++;
                          chartDatas[id_theme].totalAnswersWithImpact++;
                        }
                        let choice = {title: c.title, impact: impact, comment: c.comment, value: value[id_choice], color: null};
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
                    let impact = AuditTools.impact.getImpact(c.impact);
                    if (impact.id != 0) {
                      chartDatas[id_theme].impact[impact.id]++;
                      chartDatas[id_theme].totalAnswersWithImpact++;
                    }
                    let choice = {title: c.title, impact: impact, comment: c.comment, color: null}
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
    return {questionList: questionsList, chartDatas: chartDatas};
  }

  toChartDatas(chartType, datas) {
    let params = {
      labels: [],
      chartType: chartType,
      datasets: [],
      colors: [{}],
      options: {}
    }
    if (chartType == 'pie') {
      let dataset = {
        backgroundColor: [],
        data: []
      }
      for (let id_impact in datas.impact) {
        let impact = AuditTools.impact.getImpact(id_impact)
        params.labels.push(impact.label);
        dataset.backgroundColor.push(impact.color);
        dataset.data.push(datas.impact[id_impact]);
      }
      params.datasets.push(dataset);
    } else if (chartType == 'bar') {
      params.labels.push(datas.title);
      params.options = {scales:{yAxes:[{stacked:true}]}, stacked: true};
      for (let id_impact in datas.impact) {
        let impact = AuditTools.impact.getImpact(id_impact)
        let dataset = {
          label: impact.label,
          backgroundColor: impact.color,
          data: [datas.impact[id_impact]]
        }
        params.datasets.push(dataset);
      }
    } else if (chartType == 'radar') {
    }
    return params;
  }

  generateChartDatas(chartType, chartDatas) {
    chartDatas.familiesImpact = {global: {impact: Object.assign({}, AuditTools.impactObj)}, other: {impact: Object.assign({}, AuditTools.impactObj)}, environmental: {impact: Object.assign({}, AuditTools.impactObj)}, social: {impact: Object.assign({}, AuditTools.impactObj)}};
    for (let id_theme in chartDatas) {
        for(let k in chartDatas[id_theme].impact) {
          let fam = (!chartDatas[id_theme].family) ? 'other' : chartDatas[id_theme].family;
          chartDatas.familiesImpact[fam].impact[k] = chartDatas.familiesImpact[fam].impact[k] + chartDatas[id_theme].impact[k];
          chartDatas.familiesImpact['global'].impact[k] = chartDatas.familiesImpact['global'].impact[k] + chartDatas[id_theme].impact[k];
        }
      if (id_theme != 'familiesImpact') {
        Object.assign(chartDatas[id_theme], AuditTools.instance.toChartDatas(chartType, chartDatas[id_theme]));
      }
    }

    // Generate family impact datas
    for (let fam in chartDatas.familiesImpact) {
      Object.assign(chartDatas.familiesImpact[fam], AuditTools.instance.toChartDatas(chartType, chartDatas.familiesImpact[fam]));
    }
    return chartDatas;
  }

}
