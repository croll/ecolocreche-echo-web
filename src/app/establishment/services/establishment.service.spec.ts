/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EstablishmentService } from './establishment.service';

describe('EstablishmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstablishmentService]
    });
  });

  it('should ...', inject([EstablishmentService], (service: EstablishmentService) => {
    expect(service).toBeTruthy();
  }));
});
