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

  constructor(private restService: RestService, private route: ActivatedRoute) {
    this.list = this.route.snapshot.data['infos'];
    this.filteredList = this.list;
  }

  ngOnInit() {
  }

  filterList(filterString, filterCompleted) {
    let filteredList = this.list;
    if (filterString && filterString.length > 0)
      filteredList = filteredList.filter(item => item.establishment.name.toLocaleLowerCase().indexOf(filterString.toLocaleLowerCase()) != -1)
    if (filterCompleted)
      filteredList = filteredList.filter(item => item.cached_percent_complete < 0.999)
    this.filteredList = filteredList;
  }

  exportCSV() {
    import('xlsx').then(XLSX => {
      let data = [];
      data.push([
        "ID",
        "clef de recap action",
        "Etablissement",
        "Type",
        "Statut",
        "Code postal",
        "mail",
        "date recap_action",
        "% fait",
        "% ignoré",
      ]);
      this.filteredList.forEach(function(recap_action) {
        //console.log("recap_action: ", recap_action);
        data.push([
          recap_action.id,
          recap_action.key,
          recap_action.establishment.name,
          recap_action.establishment.type,
          recap_action.establishment.status,
          recap_action.establishment.postalcode,
          recap_action.establishment.mail,
          recap_action.date_start,
          recap_action.cached_percent_complete,
          recap_action.cached_percent_ignored,
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
      XLSX.utils.book_append_sheet(wb, ws, 'RecapActions');

      /* save to file */
      const wbout: string = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      saveAs(new Blob([wbout]), 'recap_actions.xlsx');

    });
  }
}
