import { TestBed } from '@angular/core/testing';

import { PokedexDataService } from './pokedex-data.service';

describe('PokedexDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokedexDataService = TestBed.get(PokedexDataService);
    expect(service).toBeTruthy();
  });
});
