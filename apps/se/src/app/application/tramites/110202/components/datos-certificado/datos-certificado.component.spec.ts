import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of as observableOf } from 'rxjs';
import { DatosCertificadoComponent } from './datos-certificado.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SeccionLibQuery, SeccionLibStore } from '@libs/shared/data-access-user/src';
import { ToastrService, provideToastr } from 'ngx-toastr';
import { CertificadoValidacionService } from '../../services/certificado-validacion.service';
import { Tramite110202Store } from '../../estados/tramite110202.store';
import { Tramite110202Query } from '../../estados/tramite110202.query';
 
@Injectable()
class MockTramite110202Store {
  setDatosCertificado() { }
  setIdiomaDatos() { }
  setEntidadFederativaDatos() { }
  setRepresentacionFederalDatos() { }
  setFormDatosCertificado() { }
  setBloqueSeleccion() { }
  setEntidadFederativaSeleccion(){};
  setRepresentacionFederalSeleccion(){};
  setIdiomaSeleccion(){};
}
 
@Injectable()
class MockTramite110202Query {
  formDatosCertificado$ = observableOf({});
  selectIdioma$ = {};
  selectEntidadFederativa$ = {};
  selectrepresentacionFederal$ = {};
  representacionFederal$ = {};
  entidadFederativa$ = {};
 
 
}
 
describe('DatosCertificadoComponent', () => {
  let component: DatosCertificadoComponent;
  let fixture: ComponentFixture<DatosCertificadoComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ToastrService,
        provideToastr({
          positionClass: 'toast-top-right',
        }),
        FormBuilder,
        CertificadoValidacionService,
        { provide: Tramite110202Store, useClass: MockTramite110202Store },
        { provide: Tramite110202Query, useClass: MockTramite110202Query },
        SeccionLibQuery,
        SeccionLibStore
      ]
    })
      .compileComponents();
 
    fixture = TestBed.createComponent(DatosCertificadoComponent);
    component = fixture.componentInstance;
    component.representacionFederal$ = observableOf([]);
    component.entidadFederativas$ = observableOf([])
    component.idiomaDatos$ = observableOf([])
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });
 
  it('should run GetterDeclaration #formularioControl', async () => {
    component.formDatosCertificado = component.formDatosCertificado || {};
    component.formDatosCertificado.get = jest.fn();
    const formularioControl = component.formularioControl;
    expect(component.formDatosCertificado.get).toHaveBeenCalled();
  });
 
 
 
  it('should run #ngOnInit()', async () => {
    component.cargarIdioma = jest.fn();
    component.cargarEntidadFederativa = jest.fn();
    component.cargarRepresentacionFederal = jest.fn();
    component.ngOnInit();
    expect(component.cargarIdioma).toHaveBeenCalled();
    expect(component.cargarEntidadFederativa).toHaveBeenCalled();
    expect(component.cargarRepresentacionFederal).toHaveBeenCalled();
  });
 
  it('should run #idiomaSeleccion()', async () => {
    component.store = component.store || {};
    component.store.setIdiomaSeleccion = jest.fn();
    component.idiomaSeleccion({ id: 1, descripcion: 'someValue' });
    expect(component.store.setIdiomaSeleccion).toHaveBeenCalled();
  });
 
  it('should run #obtenerDatosFormulario()', async () => {
    component.store = component.store || {};
    component.store.setFormDatosCertificado = jest.fn();
    component.obtenerDatosFormulario({});
    expect(component.store.setFormDatosCertificado).toHaveBeenCalled();
  });
 
  it('should run #entidadFederativaSeleccion()', async () => {
    component.store = component.store || {};
    component.store.setEntidadFederativaSeleccion = jest.fn();
    component.entidadFederativaSeleccion({ id: 1, descripcion: 'someValue' });
    expect(component.store.setEntidadFederativaSeleccion).toHaveBeenCalled();
  });
 
  it('should run #representacionFederalSeleccion()', async () => {
    component.store = component.store || {};
    component.store.setRepresentacionFederalDatosSeleccion = jest.fn();
    component.representacionFederalSeleccion({ id: 1, descripcion: 'someValue' });
    expect(component.store.setRepresentacionFederalDatosSeleccion).toHaveBeenCalled();
  });
 
  it('should run #cargarIdioma()', async () => {
    component.certificadoService = component.certificadoService || {};
    component.certificadoService.obtenerIdioma = jest.fn().mockReturnValue(observableOf({}));
    component.store = component.store || {};
    component.store.setIdiomaDatos = jest.fn();
    component.cargarIdioma();
    expect(component.certificadoService.obtenerIdioma).toHaveBeenCalled();
    expect(component.store.setIdiomaDatos).toHaveBeenCalled();
  });
 
  it('should run #cargarRepresentacionFederal()', async () => {
    component.certificadoService = component.certificadoService || {};
    component.certificadoService.obtenerRepresentacionFederal = jest.fn().mockReturnValue(observableOf({}));
    component.store = component.store || {};
    component.store.setRepresentacionFederalDatos = jest.fn();
    component.cargarRepresentacionFederal();
    expect(component.certificadoService.obtenerRepresentacionFederal).toHaveBeenCalled();
    expect(component.store.setRepresentacionFederalDatos).toHaveBeenCalled();
  });
 
  it('should run #cargarEntidadFederativa()', async () => {
    component.certificadoService = component.certificadoService || {};
    component.certificadoService.obtenerEntidadFederativa = jest.fn().mockReturnValue(observableOf({}));
    component.store = component.store || {};
    component.store.setEntidadFederativaDatos = jest.fn();
    component.cargarEntidadFederativa();
    expect(component.certificadoService.obtenerEntidadFederativa).toHaveBeenCalled();
    expect(component.store.setEntidadFederativaDatos).toHaveBeenCalled();
  });
 
  it('should run #idiomaSeleccion()', async () => {
    component.store = component.store || {};
    component.store.setIdiomaSeleccion = jest.fn();
    component.idiomaSeleccion({id: 1, descripcion: 'someValue'});
    expect(component.store.setIdiomaSeleccion).toHaveBeenCalled();
  });
 
  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });
 
});