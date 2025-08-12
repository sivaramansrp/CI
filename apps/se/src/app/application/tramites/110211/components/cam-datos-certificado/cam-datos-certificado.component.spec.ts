import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf } from 'rxjs';

import { FormBuilder } from '@angular/forms';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { camCertificadoQuery } from '../../estados/cam-certificado.query';
import { camCertificadoStore } from '../../estados/cam-certificado.store';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { CamDatosCertificadoComponent } from './cam-datos-certificado.component';

@Injectable()
class SERVICIO_MOCK_CAM_CERTIFICADO { }

@Injectable()
class STORE_MOCK_CAM_CERTIFICADO { }

@Injectable()
class QUERY_MOCK_CAM_CERTIFICADO {
  formDatosCertificado$ = observableOf({});
}

describe('CamDatosCertificadoComponent', () => {
  let fixture: ComponentFixture<CamDatosCertificadoComponent>;
  let componente: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, CamDatosCertificadoComponent],
      declarations: [
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: CamCertificadoService, useClass: SERVICIO_MOCK_CAM_CERTIFICADO },
        { provide: camCertificadoStore, useClass: STORE_MOCK_CAM_CERTIFICADO },
        { provide: camCertificadoQuery, useClass: QUERY_MOCK_CAM_CERTIFICADO },
        ConsultaioQuery
      ]
    }).overrideComponent(CamDatosCertificadoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(CamDatosCertificadoComponent);
    componente = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    componente.ngOnDestroy = function () { };
    fixture.destroy();
  });

  it('debe ejecutar el constructor', async () => {
    expect(componente).toBeTruthy();
  });

  it('debe ejecutar ngOnInit', async () => {
    componente.idiomOpcion = jest.fn();
    componente.entidadFederativasOpcion = jest.fn();
    componente.representacionFederalOpcion = jest.fn();
    componente.ngOnInit();
  });

  it('debe ejecutar setValoresStore', async () => {
    componente.store = componente.store || {};
    componente.store.setFormCertificadoGenric = jest.fn();
    componente.setValoresStore({});
  });

  it('debe ejecutar idiomOpcion', async () => {
    componente.camCertificadoService = componente.camCertificadoService || {};
    componente.camCertificadoService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    componente.idiomOpcion();
  });

  it('debe ejecutar entidadFederativasOpcion', async () => {
    componente.camCertificadoService = componente.camCertificadoService || {};
    componente.camCertificadoService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    componente.entidadFederativasOpcion();
  });

  it('debe ejecutar representacionFederalOpcion', async () => {
    componente.camCertificadoService = componente.camCertificadoService || {};
    componente.camCertificadoService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    componente.representacionFederalOpcion();
  });

  it('debe ejecutar obtenerDatosFormulario', async () => {
    componente.store = componente.store || {};
    componente.store.setFormDatosCertificado = jest.fn();
    componente.obtenerDatosFormulario({});
  });

  it('debe ejecutar idiomaSeleccion', async () => {
    componente.store = componente.store || {};
    componente.store.setIdiomaSeleccion = jest.fn();
    componente.idiomaSeleccion({});
  });

  it('debe ejecutar entidadFederativaSeleccion', async () => {
    componente.store = componente.store || {};
    componente.store.setEntidadFederativaSeleccion = jest.fn();
    componente.entidadFederativaSeleccion({});
  });

  it('debe ejecutar representacionFederalSeleccion', async () => {
    componente.store = componente.store || {};
    componente.store.setRepresentacionFederalDatosSeleccion = jest.fn();
    componente.representacionFederalSeleccion({});
  });

  it('debe ejecutar setFormValida', async () => {
    componente.store = componente.store || {};
    componente.store.setFormValida = jest.fn();
    componente.setFormValida({});
  });

  it('debe ejecutar ngOnDestroy', async () => {
    componente.destroyNotifier$ = componente.destroyNotifier$ || {};
    componente.destroyNotifier$.next = jest.fn();
    componente.destroyNotifier$.complete = jest.fn();
    componente.ngOnDestroy();
  });
});