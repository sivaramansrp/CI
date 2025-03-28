import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { CamDatosCertificadoComponent } from './cam-datos-certificado.component';
import { FormBuilder } from '@angular/forms';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { camCertificadoStore } from '../../estados/cam-certificado.store';
import { camCertificadoQuery } from '../../estados/cam-certificado.query';

@Injectable()
class MockCamCertificadoService {}

@Injectable()
class MockcamCertificadoStore {}

@Injectable()
class MockcamCertificadoQuery {
  selectCam$ = observableOf({});
  selectmercanciaTabla$ = observableOf({});
  formDatosCertificado$ = observableOf({});
}

describe('CamDatosCertificadoComponent', () => {
  let fixture: ComponentFixture<CamDatosCertificadoComponent>;
  let component: CamDatosCertificadoComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        CamDatosCertificadoComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: CamCertificadoService, useClass: MockCamCertificadoService },
        { provide: camCertificadoStore, useClass: MockcamCertificadoStore },
        { provide: camCertificadoQuery, useClass: MockcamCertificadoQuery }
      ]
    }).overrideComponent(CamDatosCertificadoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(CamDatosCertificadoComponent);
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
    // expect(component.idiomOpcion).toHaveBeenCalled();
    // expect(component.entidadFederativasOpcion).toHaveBeenCalled();
    // expect(component.representacionFederalOpcion).toHaveBeenCalled();
  });

});