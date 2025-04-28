import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf } from 'rxjs';

import { CertificadoOrigenComponent } from './certificado-origen.component';
import { FormBuilder } from '@angular/forms';
import { Tramite110205Store } from '../../estados/tramite110205.store';
import { Tramite110205Query } from '../../estados/tramite110205.query';
import { PeruCertificadoService } from '../../services/peru-certificado.service';
import { SeccionLibStore, SeccionLibQuery } from '@libs/shared/data-access-user/src';

@Injectable()
class MockPeruCertificadoService {
  obtenerMenuDesplegable(fileName: string): Observable<any> {
    return observableOf([]); 
  }
}

@Injectable()
class MockTramite110205Store {}

@Injectable()
class MockTramite110205Query {
  selectCam$ = observableOf({});
  selectmercanciaTabla$ = observableOf({});
  formCertificado$ = observableOf({});
}

describe('CertificadoOrigenComponent', () => {
  let fixture: ComponentFixture<CertificadoOrigenComponent>;
  let component: CertificadoOrigenComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [CertificadoOrigenComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: PeruCertificadoService, useClass: MockPeruCertificadoService },
        { provide: Tramite110205Store, useClass: MockTramite110205Store },
        { provide: Tramite110205Query, useClass: MockTramite110205Query },
        SeccionLibStore,
        SeccionLibQuery,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificadoOrigenComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function () {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

});