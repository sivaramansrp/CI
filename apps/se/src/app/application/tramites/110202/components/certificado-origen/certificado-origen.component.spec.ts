import { ComponentFixture, TestBed } from '@angular/core/testing';
 
import { CertificadoOrigenComponent } from './certificado-origen.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SeccionLibQuery, SeccionLibStore } from '@libs/shared/data-access-user/src';
import { ToastrService, provideToastr } from 'ngx-toastr';
import { Tramite110202Query } from '../../estados/tramite110202.query';
import { Tramite110202Store } from '../../estados/tramite110202.store';
import { CertificadoValidacionService } from '../../services/certificado-validacion.service';
import { Observable, of as observableOf, throwError } from 'rxjs';
 
@Injectable()
class MockTramite110202Store {
  setBloque() {}
  setaltaPlanta() {}
  setBloqueSeleccion() {}
}
 
@Injectable()
class MockTramite110202Query {
  formCertificado$ = observableOf({});
  selectAltaPlanta$ = {};
  selectPaisBloque$ = {};
  selectBuscarMercancia$ = {};
  selectmercanciaTabla$ = {};
 
}
 
describe('CertificadoOrigenComponent', () => {
  let component: CertificadoOrigenComponent;
  let fixture: ComponentFixture<CertificadoOrigenComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
     imports: [ FormsModule, ReactiveFormsModule,HttpClientTestingModule ],
          schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
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
 
    fixture = TestBed.createComponent(CertificadoOrigenComponent);
    component = fixture.componentInstance;
    component.datosTabla$ = observableOf([]);
    component.estados$ = observableOf([])
    component.pais$ = observableOf([])
    component.datos1$ = observableOf([])
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });
 
  it('should run #obtenerDatosFormulario()', async () => {
    component.store = component.store || {};
    component.store.setFormCertificado = jest.fn();
    component.obtenerDatosFormulario({});
  });
 
 
 
  it('should run #ngOnInit()', async () => {
    component.cargarTratadoAcuerdo = jest.fn();
    component.cargarBloque = jest.fn();
    component.ngOnInit();
    expect(component.cargarTratadoAcuerdo).toHaveBeenCalled();
    expect(component.cargarBloque).toHaveBeenCalled();
  });
 
  it('should run #cargarTratadoAcuerdo()', async () => {
    component.certificadoService = component.certificadoService || {};
    component.certificadoService.obtenerListaTratadoAcuerdo = jest.fn().mockReturnValue(observableOf({}));
    component.store = component.store || {};
    component.store.setaltaPlanta = jest.fn();
    component.cargarTratadoAcuerdo();
    expect(component.certificadoService.obtenerListaTratadoAcuerdo).toHaveBeenCalled();
    expect(component.store.setaltaPlanta).toHaveBeenCalled();
  });
 
 
 
  it('should run #cargarBloque()', async () => {
    component.certificadoService = component.certificadoService || {};
    component.certificadoService.obtenerPaisBloque = jest.fn().mockReturnValue(observableOf({}));
    component.store = component.store || {};
    component.store.setBloque = jest.fn();
    component.cargarBloque();
    expect(component.certificadoService.obtenerPaisBloque).toHaveBeenCalled();
    expect(component.store.setBloque).toHaveBeenCalled();
  });
 
  it('should run #tipoEstadoSeleccion()', async () => {
    component.store = component.store || {};
    component.store.setEstado = jest.fn();
    component.tipoSeleccion({id: 1, descripcion: 'someValue'});
  });
 
  it('should run #tipoSeleccion()', async () => {
    component.store = component.store || {};
    component.store.setBloqueSeleccion = jest.fn();
    component.tipoSeleccion({id: 1, descripcion: 'someValue'});
    expect(component.store.setBloqueSeleccion).toHaveBeenCalled();
  });
 
  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });
 
  it('should run #buscarrMercancia()', async () => {
    component.certificadoService = component.certificadoService || {};
    component.certificadoService.obtenerMercancia = jest.fn().mockReturnValue(observableOf({}));
    component.store = component.store || {};
    component.store.setbuscarMercancia = jest.fn();
    component.buscarrMercancia();
    expect(component.certificadoService.obtenerMercancia).toHaveBeenCalled();
    expect(component.store.setbuscarMercancia).toHaveBeenCalled();
  });
 
  it('should run #abrirModificarModal()', async () => {
    component.store = component.store || {};
    component.store.setFormMercancia = jest.fn();
    component.modalInstance = component.modalInstance || {};
    component.modalInstance.show = jest.fn();
    component.abrirModificarModal({
      id: '1',
      fraccionArancelaria: 'someValue',
      numeroDeRegistrodeProductos: 'someValue',
      fechaExpedicion: '2024-02-02',
      fechaVencimiento: '2024-02-02',
      umc: 'someValue',
      cantidad: 'someValue',  
      tipoFactura: 'someValue',
      valorMercancia: 'someValue',
      fechaFinalInput: '2024-02-02',
      numeroFactura: 'someValue',
      normaOrigen: 'someValue',
      nombreTecnico: 'someValue',
      nombreComercial: 'someValue',
    });
    expect(component.store.setFormMercancia).toHaveBeenCalled();
    expect(component.modalInstance.show).toHaveBeenCalled();
  });
 
  it('should run #cerrarModificarModal()', async () => {
    component.modalInstance = component.modalInstance || {};
    component.modalInstance.hide = jest.fn();
    component.cerrarModificarModal();
    expect(component.modalInstance.hide).toHaveBeenCalled();
  });
 
});