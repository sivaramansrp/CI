import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PermisoImportacionService } from './permiso-importacion.service';

describe('PermisoImportacionService', () => {
  let service: PermisoImportacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PermisoImportacionService]
    });
    service = TestBed.inject(PermisoImportacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});