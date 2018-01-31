import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../../../rest.service';
import { Audit } from '../../../common/models/audit';
import { saveAs } from 'file-saver';

@Component({
  templateUrl: './active-list.component.html',
  styleUrls: ['./active-list.component.scss'],
})
export class ActiveListComponent implements OnInit {

  list: any[] = [];
  filteredList: any[] = [];
  errorMessage: string;
  inquiryforms: any[] = [];

  constructor(private restService: RestService, private route: ActivatedRoute) {
    this.list = this.route.snapshot.data['infos'];
    this.filteredList = this.list;

    let self=this;
    let ids=[];
    this.list.forEach(function(audit) {
      let inquiryform = audit.inquiryform;
      if (!(audit.inquiryform.id_inquiryform in ids)) {
        ids.push(audit.inquiryform.id_inquiryform);
        if (audit.inquiryform.deletedAt) {
          audit.inquiryform.title+=" (supprimé)";
        }
        self.inquiryforms.push(audit.inquiryform);
      }
    });
  }

  ngOnInit() {
  }

  filterList(filterString, filterCompleted, filterInquiryform) {
    let filteredList = this.list;
    if (filterString && filterString.length > 0)
      filteredList = filteredList.filter(item => item.establishment.name.toLocaleLowerCase().indexOf(filterString.toLocaleLowerCase()) != -1);
    if (filterCompleted)
      filteredList = filteredList.filter(item => item.cached_percent_complete < 0.999);
    if (filterInquiryform)
      filteredList = filteredList.filter(item => item.id_inquiryform == filterInquiryform);
    this.filteredList = filteredList;
  }

  exportCSV(format: string) {
    import('xlsx').then(XLSX => {
      let data = [];
      data.push([
        "ID",
        "clef d'audit",
        "Etablissement",
        "Type",
        "Statut",
        "Code postal",
        "mail",
        "date audit",
        "% fait",
        "% ignoré",
      ]);
      this.filteredList.forEach(function(audit) {
        //console.log("audit: ", audit);
        data.push([
          audit.id,
          audit.key,
          audit.establishment.name,
          audit.establishment.type,
          audit.establishment.status,
          audit.establishment.postalcode,
          audit.establishment.mail,
          audit.date_start,
          audit.cached_percent_complete,
          audit.cached_percent_ignored,
        ]);
      });

      /* generate worksheet */
      const ws = XLSX.utils.aoa_to_sheet(data);

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

      // set col width
      ws['!cols'] = [
        {wch:4},
        {wch:36},
        {wch:40},
        {wch:12},
        {wch:12},
        {wch:8},
        {wch:32},
        {wch:10},
        {wch:6},
        {wch:6},
      ];


      /* generate workbook and add the worksheet */
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Audits');

      /* save to file */
      const wbout: string = XLSX.write(wb, { bookType: format == 'csv' ? 'csv' : 'xlsx', type: 'array' });
      saveAs(new Blob([wbout]), 'audits.'+format);

    });
  }
}
