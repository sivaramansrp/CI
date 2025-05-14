import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosCertificadoComponent } from './datos-certificado.component';
import { FormBuilder } from '@angular/forms';
import { ValidarInicialmenteCertificadoService } from '../../services/validar-inicialmente-certificado.service';
import { Tramite110222Store } from '../../estados/tramite110222.store';
import { Tramite110222Query } from '../../estados/tramite110222.query';

@Injectable()
class MockValidarInicialmenteCertificadoService {}

@Injectable()
class MockcamCertificadoStore {}

@Injectable()
class MockcamCertificadoQuery {
  selectCam$ = observableOf({});
  selectmercanciaTabla$ = observableOf({});
  formDatosCertificado$ = observableOf({});
}

describe('DatosCertificadoComponent', () => {
  let fixture: ComponentFixture<DatosCertificadoComponent>;
  let component: DatosCertificadoComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        DatosCertificadoComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: ValidarInicialmenteCertificadoService, useClass: MockValidarInicialmenteCertificadoService },
        { provide: Tramite110222Store, useClass: MockcamCertificadoStore },
        { provide: Tramite110222Query, useClass: MockcamCertificadoQuery }
      ]
    }).overrideComponent(DatosCertificadoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosCertificadoComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.idiomOpcion = jest.fn();
    component.entidadFederativasOpcion = jest.fn();
    component.representacionFederalOpcion = jest.fn();
    component.ngOnInit();
    expect(component.idiomOpcion).toHaveBeenCalled();
    expect(component.entidadFederativasOpcion).toHaveBeenCalled();
    expect(component.representacionFederalOpcion).toHaveBeenCalled();
  });

});