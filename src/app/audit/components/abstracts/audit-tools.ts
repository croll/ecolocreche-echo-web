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

  merge(list1, list2) {
    let arr = [];
    for (let id_node in list1) {
      arr.push(list1[id_node]);
    }
    for (let id_node in list2) {
      if (!list1[id_node]) {
        arr.push(list2[id_node]);
      }
    }
    return arr;
  }

  cacheDatas(nodes, id_theme = null, questionsList = {}, chartDatas = null) {
    if (chartDatas === null) {
      chartDatas = {themes: {}, families: {global: {hasDatas: true, impact: Object.assign({}, AuditTools.impactObj), totalAnswersWithImpact: 0}, other: {hasDatas: false, impact: Object.assign({}, AuditTools.impactObj), totalAnswersWithImpact: 0}, environnementales: {hasDatas: false, impact: Object.assign({}, AuditTools.impactObj), totalAnswersWithImpact: 0}, sociales: {hasDatas: false, impact: Object.assign({}, AuditTools.impactObj), totalAnswersWithImpact: 0}}};
    }
    if (nodes.childs && nodes.childs.length) {
      nodes.childs.forEach(node => {
        // Store impact informations for graph generation
        if (!node.id_node_parent) {
          id_theme = node.id_node;
          if (!chartDatas.themes[id_theme]) {
            chartDatas.themes[id_theme] = {id: node.id, id_node: node.id_node, hasDatas: false, title: node.title, family: node.family, impact: Object.assign({}, AuditTools.impactObj), totalAnswersWithImpact: 0};
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
                        let fam = (!chartDatas.themes[id_theme].family) ? 'other' : chartDatas.themes[id_theme].family;
                        let impact = AuditTools.impact.getImpact(c.impact);
                        if (impact.id != 0) {
                          if (!chartDatas.themes[id_theme].hasDatas) {
                            chartDatas.themes[id_theme].hasDatas = true;
                          }
                          // families
                          if (!chartDatas.families[fam].hasDatas && chartDatas.themes[id_theme].impact[impact.id]) {
                            chartDatas.families[fam].hasDatas = true
                          }
                          // chartDatas.families[fam].impact[impact.id] = chartDatas.families[fam].impact[impact.id] + chartDatas.themes[id_theme].impact[impact.id];
                          // chartDatas.families['global'].impact[impact.id] = chartDatas.families['global'].impact[impact.id] + chartDatas.themes[id_theme].impact[impact.id];
                          chartDatas.themes[id_theme].impact[impact.id]++;
                          chartDatas.themes[id_theme].totalAnswersWithImpact++;
                          chartDatas.families[fam].impact[impact.id]++;
                          chartDatas.families['global'].impact[impact.id]++;
                          chartDatas.families[fam].totalAnswersWithImpact++;
                          chartDatas.families['global'].totalAnswersWithImpact++;
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
                    let fam = (!chartDatas.themes[id_theme].family) ? 'other' : chartDatas.themes[id_theme].family;
                    let impact = AuditTools.impact.getImpact(c.impact);
                    if (impact.id != 0) {
                      if (chartDatas.themes[id_theme] && !chartDatas.themes[id_theme].hasDatas) {
                        chartDatas.themes[id_theme].hasDatas = true;
                      }
                      // families
                      if (!chartDatas.families[fam].hasDatas && chartDatas.themes[id_theme].impact[impact.id]) {
                        chartDatas.families[fam].hasDatas = true
                      }
                      chartDatas.themes[id_theme].impact[impact.id]++;
                      chartDatas.themes[id_theme].totalAnswersWithImpact++;
                      chartDatas.families[fam].impact[impact.id]++;
                      chartDatas.families['global'].impact[impact.id]++;
                      chartDatas.families[fam].totalAnswersWithImpact++;
                      chartDatas.families['global'].totalAnswersWithImpact++;
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

  toChartDatas(chartType, datas, id) {
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
      for (let id_impact in datas[id].impact) {
        let impact = AuditTools.impact.getImpact(id_impact)
        params.labels.push(impact.label);
        dataset.backgroundColor.push(impact.color);
        dataset.data.push(datas[id].impact[id_impact]);
      }
      params.options = {
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              return ' '+(data.datasets[0].data[tooltipItem.index] * 100 / datas[id].totalAnswersWithImpact).toFixed(1) + '% ('+data.datasets[0].data[tooltipItem.index]+')';
            }
          }
        },
        animation: {
          duration: 0,
          onComplete: function () {
            let chartInstance = this.chart,
                ctx = chartInstance.ctx;

            ctx.font = '16px Arial';
            ctx.textAlign = "center";
            ctx.fillStyle = "#000";

            this.data.datasets.forEach((dataset, datasetIndex) => {
                var meta = this.getDatasetMeta(datasetIndex),
                    total = 0, //total values to compute fraction
                    labelxy = [],
                    offset = Math.PI / 2, //start sector from top
                    radius,
                    centerx,
                    centery,
                    lastend = 0; //prev arc's end line: starting with 0

                for (var val of dataset.data) { total += val; }

                meta.data.forEach((element, index) => {
                    radius = 0.9 * element._model.outerRadius - element._model.innerRadius;
                    centerx = element._model.x;
                    centery = element._model.y;
                    var thispart = dataset.data[index],
                        arcsector = Math.PI * (2 * thispart / total);
                    if (element.hasValue() && dataset.data[index] > 0) {
                      labelxy.push(lastend + arcsector / 2 + Math.PI + offset);
                    }
                    else {
                      labelxy.push(-1);
                    }
                    lastend += arcsector;
                });

                var lradius = radius * 3 / 4;
                for (var idx in labelxy) {
                  if (labelxy[idx] === -1) continue;
                  let langle = labelxy[idx],
                      dx = centerx + lradius * Math.cos(langle),
                      dy = centery + lradius * Math.sin(langle),
                      val = Math.round(dataset.data[idx] / total * 100);
                  ctx.fillText(val + '%', dx, dy);
                }

            });
          }
        }
      }
      params.datasets.push(dataset);
    } else if (chartType == 'bar') {
      datas = [].concat(datas);
      let num = 0;
      params.labels.push('');
      params.options = {
        scaleSteps: 5,
        scales:{
          yAxes:[
            {
              ticks: { beginAtZero: true, min: 0, max: 100, stepSize: 10},
              stacked:true
            }
          ]
        },
        stacked: true
      };

      datas.forEach(d => {
        for (let id_impact in d[id].impact) {
          let impact = AuditTools.impact.getImpact(id_impact)
          let val = Math.round(d[id].impact[id_impact] * 100 / d[id].totalAnswersWithImpact);
          let dataset = {
            label: impact.label,
            backgroundColor: impact.color,
            data: [val],
            stack: num
          }
          params.datasets.push(dataset);
        }
        num++;
      });

    } else if (chartType == 'radar') {
      params.options = {
      }
      let colors = [
        {
          backgroundColor: "rgba(63, 136, 38, 0.02)",
          borderColor: "rgba(63, 136, 38, 1)",
          pointBackgroundColor: "rgba(63, 136, 38, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(63, 136, 38, 1)"
        },
        {
          backgroundColor: "rgba(173, 174, 186, 0.05)",
          borderColor: "rgba(173, 174, 186, 1)",
          pointBackgroundColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(173, 174, 186, 1)"
        }
      ]
      datas = [].concat(datas);
      let num = 0;
      // cycle through collections passed in argument
      datas.forEach(d => {
        // cycle through themes
        let dataset = {
          label: '',
          data: []
        };
        Object.assign(dataset, colors[num]);
        for(let theme_id in d) {
          dataset.label = d[theme_id].title;
          // if it matches the asked family
          if (d[theme_id].family == id) {
            // Set radar chart labels once
            if (num == 0) {
              params.labels.push(d[theme_id].title);
            }
            // for each impact of the theme
            let value = 0;
            for (let id_impact in d[theme_id].impact) {
              // only get "positive" impact
              if (parseInt(id_impact) == 1 || parseInt(id_impact) == 2) {
                value += d[theme_id].impact[id_impact];
              }
            }
            // set value
            dataset.data.push((value * 100 / d[theme_id].totalAnswersWithImpact).toFixed(2));
          }
          params.datasets.push(dataset);
        }
        num++;
      });
    }
    return params;
  }

  generateChartDatas(chartType, chartDatas) {
    for (let id_theme in chartDatas.themes) {
      Object.assign(chartDatas.themes[id_theme], AuditTools.instance.toChartDatas(chartType, chartDatas.themes, id_theme));
    }

    // Generate family impact datas
    for (let fam in chartDatas.families) {
      Object.assign(chartDatas.families[fam], AuditTools.instance.toChartDatas(chartType, chartDatas.families, fam));
    }
    return chartDatas;
  }

}
