import { Injectable } from '@angular/core';
import { AuditTools } from './components/abstracts/audit-tools';

@Injectable()
export class ExportCSVService {

  constructor() {}

  auditTools = AuditTools.getInstance();

  getContent(cachedAudit1Datas, cachedAudit2Datas?) {

    let outp = 'THEME;QUESTION;';
    if (cachedAudit2Datas) {
      outp += 'REPONSE AUDIT1;IMPACT AUDIT1;REPONSE AUDIT2;IMPACT AUDIT2;'
    } else {
      outp += 'REPONSE;IMPACT;'
    }
    outp +=  "COMMENTAIRE\r\n";
    let themeList = (cachedAudit2Datas) ? this.auditTools.merge(cachedAudit1Datas.chartDatas.themes, cachedAudit2Datas.chartDatas.themes) : cachedAudit1Datas.chartDatas.themes;
    let mergedQuestionList = (cachedAudit2Datas) ? this.auditTools.merge(cachedAudit1Datas.questionList, cachedAudit2Datas.questionList) : cachedAudit1Datas.questionList;
    console.log(themeList);
    console.log(mergedQuestionList);
    // console.log(cachedAudit1Datas);
    // console.log(cachedAudit2Datas);

    // For each theme
    themeList.forEach(theme => {
      // For each cached question
      mergedQuestionList.forEach(question => {
        let addQuestion = false;
        let tmpOutp = '';
        tmpOutp += '"'+theme.title.replace(/"/g, '`')+'";"'+question.title.replace(/"/g, '`')+'";';
        let answer1 = null, answer2 = null;
        // If the question is of same theme
        if (cachedAudit1Datas.questionList[question.id_node] && cachedAudit1Datas.questionList[question.id_node].id_theme == theme.id_node) {
          addQuestion = true;
          answer1 = this.getAnswer(cachedAudit1Datas.questionList[question.id_node]);
          tmpOutp += answer1.value+';'+answer1.impact+';'
        } else {
          // If question does not exist in audit 1
          tmpOutp += ';;';
        }
        // If we have 2 audits
        if (cachedAudit2Datas) {
          // If question does not exist in audit 2
          if (cachedAudit2Datas.questionList[question.id_node] && cachedAudit2Datas.questionList[question.id_node].id_theme == theme.id_node) {
            addQuestion = true;
            answer2 = this.getAnswer(cachedAudit2Datas.questionList[question.id_node]);
            tmpOutp += answer2.value+';'+answer2.impact+';'
          } else {
            // If question does not exist in audit 2
            tmpOutp += ';;';
          }
        }
        // Question comment
        let comment = '';
        if (answer1 && answer1.comment) {
          comment += answer1.comment;
        }
        if (cachedAudit2Datas && answer2 && answer2.comment && answer1.comment != answer2.comment) {
          comment += answer2.comment;
        }
        tmpOutp += comment+"\n";
        if (addQuestion) {
          outp += tmpOutp;
        }
      });

    });

      // For each audit 1 question list

    this.triggerDownload(outp);

  }

  getAnswer(question):any {
    console.log(question);
    let obj = {value: '', impact: '', comment: ''};
    if (question.ignored) {
      obj.value = 'Question ignorée';
      return obj;
    }
    if (!question.value) {
      obj.value = 'Aucune réponse';
      return obj;
    }
    console.log(typeof(question.value));
    if (typeof(question.value) != 'object') {
      obj.value = '"'+question.value.toString().replace(/"/g, '`')+'"';
      return obj;
    } else {
      question.value.forEach(val => {
        if (question.type == 'q_checkbox' || question.type == 'q_radio') {
          obj.value += '"'+val.title.replace(/"/g, '`')+',"'
        } else if (question.type == 'q_percents') {
          obj.value += val.value+'%,"'
        }
        if (val.comment) {
          obj.comment += '"'+val.comment.replace(/"/g, '`')+',"';
        }
        if (val.impact) {
          obj.impact += '"'+val.impact.label.replace(/"/g, '`')+',"';
        }
      });
    }
    return obj;
  }

  triggerDownload(content) {

    let proposedFileName = 'export.csv';

    var blob = new Blob([content], {type : 'text/csv'});

    if (typeof window.navigator.msSaveBlob !== 'undefined'){
      window.navigator.msSaveBlob(blob, proposedFileName);
    } else {
      var downloadUrl = URL.createObjectURL(blob);

      // build and open link - use HTML5 a[download] attribute to specify filename
      var a = document.createElement("a");

      // safari doesn't support this yet
      if (typeof a.download === 'undefined') {
          window.open(downloadUrl);
      }

      var link = document.createElement('a');
      link.href = downloadUrl;
      link.download = proposedFileName;
      document.body.appendChild(link);
      var event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });
      link.dispatchEvent(event);
      document.body.removeChild(link);
    }
  }



}
