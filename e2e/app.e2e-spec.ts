import { EcolocrecheEchosPage } from './app.po';

describe('ecolocreche-echos App', function() {
  let page: EcolocrecheEchosPage;

  beforeEach(() => {
    page = new EcolocrecheEchosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
