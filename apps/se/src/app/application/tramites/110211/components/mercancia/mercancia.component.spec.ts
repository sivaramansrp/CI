import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf } from 'rxjs';

import { FormBuilder } from '@angular/forms';
import { SeccionLibQuery, SeccionLibStore } from '@ng-mf/data-access-user';
import { camCertificadoQuery } from '../../estados/cam-certificado.query';
import { camCertificadoStore } from '../../estados/cam-certificado.store';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { MercanciaComponent } from './mercancia.component';

@Injectable()
class SERVICIO_MOCK_CAM_CERTIFICADO { }

@Injectable()
class STORE_MOCK_CAM_CERTIFICADO { }

@Injectable()
class QUERY_MOCK_CAM_CERTIFICADO { }

describe('MercanciaComponent', () => {
  let fixture: ComponentFixture<MercanciaComponent>;
  let componente: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MercanciaComponent],
      declarations: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: CamCertificadoService, useClass: SERVICIO_MOCK_CAM_CERTIFICADO },
        { provide: camCertificadoStore, useClass: STORE_MOCK_CAM_CERTIFICADO },
        { provide: camCertificadoQuery, useClass: QUERY_MOCK_CAM_CERTIFICADO },
        SeccionLibStore,
        SeccionLibQuery
      ]
    }).overrideComponent(MercanciaComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(MercanciaComponent);
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
    componente.seccionQuery = componente.seccionQuery || {};
    componente.seccionQuery.selectSeccionState$ = observableOf({});
    componente.query = componente.query || {};
    componente.query.selectCam$ = observableOf({});
    componente.umcOpcion = jest.fn();
    componente.facturasOpcion = jest.fn();
    componente.initActionFormBuild = jest.fn();
    componente.ngOnInit();
  });

  it('debe ejecutar ngAfterViewInit', async () => {
    componente.mercanciaForm = componente.mercanciaForm || {};
    componente.mercanciaForm.disable = jest.fn();
    componente.mercanciaForm.enable = jest.fn();
    componente.ngAfterViewInit();
  });

  it('debe ejecutar initActionFormBuild', async () => {
    componente.fb = componente.fb || {};
    componente.fb.group = jest.fn();
    componente.mercanciaState = componente.mercanciaState || {};
    componente.mercanciaState.fraccionArancelaria = 'fraccionArancelaria';
    componente.mercanciaState.nombreComercialMercancia = 'nombreComercialMercancia';
    componente.mercanciaState.nombreTecnico = 'nombreTecnico';
    componente.mercanciaState.nombreIngles = 'nombreIngles';
    componente.mercanciaState.criterioClasificacion = 'criterioClasificacion';
    componente.mercanciaState.cantidad = 'cantidad';
    componente.mercanciaState.umc = 'umc';
    componente.mercanciaState.valorMercancia = 'valorMercancia';
    componente.mercanciaState.complementoClasificacion = 'complementoClasificacion';
    componente.mercanciaState.numeroFactura = 'numeroFactura';
    componente.mercanciaState.tipoFactura = 'tipoFactura';
    componente.initActionFormBuild();
  });

  it('debe ejecutar cerrarModal', async () => {
    componente.cerrarClicado = componente.cerrarClicado || {};
    componente.cerrarClicado.emit = jest.fn();
    componente.cerrarModal();
  });

  it('debe ejecutar activarModal', async () => {
    componente.activarModal();
  });

  it('debe ejecutar umcOpcion', async () => {
    componente.camCertificadoService = componente.camCertificadoService || {};
    componente.camCertificadoService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    componente.umcOpcion();
  });

  it('debe ejecutar facturasOpcion', async () => {
    componente.camCertificadoService = componente.camCertificadoService || {};
    componente.camCertificadoService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    componente.facturasOpcion();
  });

  it('debe ejecutar aceptar', async () => {
    componente.guardarClicado = componente.guardarClicado || {};
    componente.guardarClicado.emit = jest.fn();
    componente.mercanciaForm = componente.mercanciaForm || {};
    componente.mercanciaForm.value = 'valor';
    componente.store = componente.store || {};
    componente.store.setmercanciaTabla = jest.fn();
    componente.cerrarModal = jest.fn();
    componente.tablaSeleccionEvent = componente.tablaSeleccionEvent || {};
    componente.tablaSeleccionEvent.emit = jest.fn();
    componente.aceptar();
  });

  it('debe ejecutar ngOnDestroy', async () => {
    componente.destroyNotifier$ = componente.destroyNotifier$ || {};
    componente.destroyNotifier$.next = jest.fn();
    componente.destroyNotifier$.complete = jest.fn();
    componente.ngOnDestroy();
  });
});