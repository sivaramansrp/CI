import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf } from 'rxjs';

import { CertificadoOrigenComponent } from './certificado-origen.component';
import { FormBuilder } from '@angular/forms';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { camCertificadoStore } from '../../estados/cam-certificado.store';
import { camCertificadoQuery } from '../../estados/cam-certificado.query';
import { SeccionLibStore, SeccionLibQuery } from '@libs/shared/data-access-user/src';

@Injectable()
class MockCamCertificadoService {
  obtenerMenuDesplegable(fileName: string): Observable<any> {
    return observableOf([]); // Mock implementation
  }
}

@Injectable()
class MockcamCertificadoStore {}

@Injectable()
class MockcamCertificadoQuery {
  selectCam$ = observableOf({});
  selectmercanciaTabla$ = observableOf({});
  formCertificado$ = observableOf({});
}

describe('CertificadoOrigenComponent', () => {
  let fixture: ComponentFixture<CertificadoOrigenComponent>;
  let component: CertificadoOrigenComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule,CertificadoOrigenComponent],
      declarations: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: CamCertificadoService, useClass: MockCamCertificadoService },
        { provide: camCertificadoStore, useClass: MockcamCertificadoStore },
        { provide: camCertificadoQuery, useClass: MockcamCertificadoQuery },
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
    const query = TestBed.inject(camCertificadoQuery);

    component.ngOnInit();

    expect(query.selectCam$).toBeTruthy();
    expect(query.selectmercanciaTabla$).toBeTruthy();
  });
});