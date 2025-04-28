import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf } from 'rxjs';

import { CertificadoOrigenComponent } from './certificado-origen.component';
import { FormBuilder } from '@angular/forms';
import { CertificadoDeService } from '../../services/certificado-de.service';
import { Tramite110222Store } from '../../estados/tramite110222.store';
import { Tramite110222Query } from '../../estados/tramite110222.query';
import { SeccionLibStore, SeccionLibQuery } from '@libs/shared/data-access-user/src';

@Injectable()
class MockCertificadoDeService {
  obtenerMenuDesplegable(fileName: string): Observable<any> {
    return observableOf([]); 
  }
}

@Injectable()
class MockTramite110222Store {}

@Injectable()
class MockcTramite110222Query {
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
        { provide: CertificadoDeService, useClass: MockCertificadoDeService },
        { provide: Tramite110222Store, useClass: MockTramite110222Store},
        { provide: Tramite110222Query, useClass: MockcTramite110222Query },
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

  it('should run #ngOnInit()', async () => {
    const query = TestBed.inject(Tramite110222Query);

    component.ngOnInit();

    expect(query.selectTramite$).toBeTruthy();
    expect(query.selectmercanciaTabla$).toBeTruthy();
  });
});