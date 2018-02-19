import { Audit } from '../common/models/audit';
import { LabelingFile } from '../common/models/labeling-file';

export class Establishment {

  public id: number
  public name: string
  public address: string = '';
  public postalcode: string = '';
  public city: string = '';
  public phone: string = '';
  public mail: string = '';
  public labelcode: string = '';
  public type: number
  public status: number

  public typeList: {}[] = [
      {id: 'creche', label: 'Crèche'},
      {id: 'halte-garderie', label: 'Halte-garderie'},
      {id: 'micro-creche', label: 'Micro crèche'},
      {id: 'multi-accueil', label: 'Multi accueil'},
      {id: 'relais-d-assistante', label: 'Relais d\'assistante'},
      {id: 'assistant-maternel', label: 'Assistant maternel'},
      {id: 'autre', label: 'Autre'},
    ];
  public statusList: {}[] = [
      {id: 'association', label: 'Association'},
      {id: 'association-parentale', label: 'Association parentale'},
      {id: 'entreprise', label: 'Entreprise'},
      {id: 'publique', label: 'Publique'},
      {id: 'indetermine', label: 'Indéterminé'},
      {id: 'domicile', label: 'À domicile'},
      {id: 'creche-familiale', label: 'Crèche familiale'},
      {id: 'mam', label: 'MAM'},
      {id: 'ram', label: 'RAM'},
      {id: 'autre', label: 'Autre'},
    ];
}

export class EstablishmentExt extends Establishment {
  public audits: Audit[] = [];
  public recap_actions: Audit[] = [];
  public labeling_files: LabelingFile[] = [];
}
