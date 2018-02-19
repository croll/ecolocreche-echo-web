import { Injectable } from '@angular/core';
import { AuditTools } from '../common/abstracts/audit-tools';
import { saveAs } from 'file-saver';

@Injectable()
export class ExportCSVService {

  constructor() {}

  auditTools = AuditTools.getInstance();

  getContent(format, cachedAudit1Datas, cachedAudit2Datas?) {

    let aoa: string[][] = [];

    let header= ['THEME','RUBRIQUE','QUESTION'];
    let cols=[
      {wch:16},
      {wch:32},
      {wch:60},
    ];
    if (cachedAudit2Datas) {
      header.push('REPONSE AUDIT1'); cols.push({wch:60});
      header.push('IMPACT AUDIT1'); cols.push({wch:12});
      header.push('REPONSE AUDIT2'); cols.push({wch:60});
      header.push('IMPACT AUDIT2'); cols.push({wch:12});
    } else {
      header.push('REPONSE'); cols.push({wch:60});
      header.push('IMPACT'); cols.push({wch:12});
    }
    header.push('COMMENTAIRE'); cols.push({wch:60});

    aoa.push(header);

    let themeList = (cachedAudit2Datas) ? this.auditTools.merge(cachedAudit1Datas.chartDatas.themes, cachedAudit2Datas.chartDatas.themes) : this._asArray(cachedAudit1Datas.chartDatas.themes);
    let categoryList = (cachedAudit2Datas) ? Object.assign(cachedAudit1Datas.chartDatas.categories, cachedAudit2Datas.chartDatas.categories) : cachedAudit1Datas.chartDatas.categories;
    let mergedQuestionList = (cachedAudit2Datas) ? this.auditTools.merge(cachedAudit1Datas.questionList, cachedAudit2Datas.questionList) : this._asArray(cachedAudit1Datas.questionList);
    // console.log(themeList);
    // console.log(categoryList);
    // console.log(mergedQuestionList);
    // console.log(cachedAudit1Datas);
    // console.log(cachedAudit2Datas);

    // For each theme
    themeList.forEach(theme => {
      // For each cached question
      mergedQuestionList.forEach(question => {
        let addQuestion = false;
        let tmpLine=[];

        tmpLine.push(theme.title);
        tmpLine.push(categoryList[question.id_node_parent].title);
        tmpLine.push(question.title);

        let answer1 = null, answer2 = null;
        // If the question is of same theme
        if (cachedAudit1Datas.questionList[question.id_node] && cachedAudit1Datas.questionList[question.id_node].id_theme == theme.id_node) {
          addQuestion = true;
          answer1 = this.getAnswer(cachedAudit1Datas.questionList[question.id_node]);
          tmpLine.push(answer1.value);
          tmpLine.push(answer1.impact);
        } else {
          // If question does not exist in audit 1
          tmpLine.push('');
          tmpLine.push('');
        }

        // If we have 2 audits
        if (cachedAudit2Datas) {
          // If question does not exist in audit 2
          if (cachedAudit2Datas.questionList[question.id_node] && cachedAudit2Datas.questionList[question.id_node].id_theme == theme.id_node) {
            addQuestion = true;
            answer2 = this.getAnswer(cachedAudit2Datas.questionList[question.id_node]);
            tmpLine.push(answer2.value);
            tmpLine.push(answer2.impact);
          } else {
            // If question does not exist in audit 2
            tmpLine.push('');
            tmpLine.push('');
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
        tmpLine.push(comment);
        if (addQuestion) {
          aoa.push(tmpLine);
        }
      });

    });


    this.exportCSV(format, aoa, cols);

  }

  exportCSV(format, aoa: string[][], cols) {
    import('xlsx').then(XLSX => {

      /* generate worksheet */
      const ws = XLSX.utils.aoa_to_sheet(aoa);

      /*
      // convert cellules
      for (let k in ws) {

        // convert dates
        if (k!='H1' && k.startsWith('H')) {
          ws[k].t='d';
        }

        // convert cached_percent_complete
        if (k!='I1' && k.startsWith('I')) {
          ws[k].z='0%';
        }

        // convert cached_percent_ignored
        if (k!='J1' && k.startsWith('J')) {
          ws[k].z='0%';
        }

      }
      */

      // set col width
      ws['!cols'] = cols;

      /* generate workbook and add the worksheet */
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Audits');

      /* save to file */
      const wbout: string = XLSX.write(wb, { bookType: format == 'csv' ? 'csv' : 'xlsx', type: 'array' });
      saveAs(new Blob([wbout]), 'export.'+format);

    });
  }


  getAnswer(question):any {
    let obj = {value: '', impact: '', comment: ''};
    if (question.ignored) {
      obj.value = 'Question ignorée';
      return obj;
    }
    if (!question.value) {
      obj.value = 'Aucune réponse';
      return obj;
    }
    if (typeof(question.value) != 'object') {
      obj.value = question.value.toString();
      return obj;
    } else {
      question.value.forEach(val => {
        if (question.type == 'q_checkbox' || question.type == 'q_radio') {
          obj.value += val.title;
        } else if (question.type == 'q_percents') {
          obj.value += ''+val.value+'%,';
        }
        if (val.comment) {
          obj.comment += ''+val.comment+',';
        }
        if (val.impact) {
          obj.impact += ''+val.impact.label+',';
        }
      });
      if (obj.value) {
        obj.value = this._formatString(obj.value);
      }
      if (obj.impact) {
        obj.impact = this._formatString(obj.impact);
      }
    }
    if (question.comment) {
      obj.comment = this._formatString(question.comment);
    }
    return obj;
  }

  private _formatString(str) {
    str = str.toString().trim();
    if (str.substr(-1, 1) == ',') {
       str = str.substr(0, str.length-1);
     }
    return str;
  }

  private _asArray(obj) {
    let arr = [];
    for (let id in obj) {
      arr.push(obj[id]);
    }
    return arr;
  }



}
