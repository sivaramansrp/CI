import { TestBed } from '@angular/core/testing';

import { SuspensionPermisoService } from './suspension-permiso.service';

describe('SuspensionPermisoService', () => {
  let service: SuspensionPermisoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuspensionPermisoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
