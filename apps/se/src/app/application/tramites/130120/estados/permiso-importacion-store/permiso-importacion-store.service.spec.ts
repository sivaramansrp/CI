import { TestBed } from '@angular/core/testing';

import { PermisoImportacionStoreService } from './permiso-importacion-store.service';

describe('PermisoImportacionStoreService', () => {
  let service: PermisoImportacionStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisoImportacionStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
