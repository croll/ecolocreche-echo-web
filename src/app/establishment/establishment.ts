export class Establishment {

  public id: number
  public name: string
  public address: string
  public postalcode: string
  public city: string
  public phone: string
  public mail: string
  public type: number
  public status: number

  public typeList: {}[] = [
      {id: 'creche', label: 'Crèche'},
      {id: 'halte-garderie', label: 'Halte-garderie'},
      {id: 'micro-creche', label: 'Micro crèche'},
      {id: 'multi-accueil', label: 'Multi accueil'},
      {id: 'relais-d-assistante', label: 'Relais d\'assistante'},
      {id: 'autre', label: 'Autre'}
    ];
  public statusList: {}[] = [
      {id: 'association', label: 'Association'},
      {id: 'association-parentale', label: 'Association parentale'},
      {id: 'entreprise', label: 'Entreprise'},
      {id: 'publique', label: 'Publique'},
      {id: 'indetermine', label: 'Indéterminé'},
      {id: 'autre', label: 'Autre'}
    ];
}
