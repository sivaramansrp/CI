import { TestBed } from '@angular/core/testing';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
import { Tramite260303Store } from '../../../../estados/tramites/260303/tramite260303.store';
import { Tramite260303Query } from '../../../../estados/queries/260303/tramite260303.query';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
 
describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: any;
  let certificadosLicenciasSvcMock: any;
  let tramite260303StoreMock: any;
  let tramite260303QueryMock: any;
 
  // Mock completo para ConsultaioState
  const consultaStateMock = {
    readonly: false,
    procedureId: '',
    parameter: '',
    department: '',
    folioTramite: '',
    tipoTramite: '',
    tipoModalidad: '',
    tipoSolicitud: '',
    tipoPersona: '',
    tipoDeTramite: '',
    estadoDeTramite: '',
    create: false,
    update: false,
    consultaioSolicitante: {
      folioDelTramite: '',
      fechaDeInicio: '',
      estadoDelTramite: ''
    },
  };
 
  beforeEach(async () => {
    certificadosLicenciasSvcMock = {
      getBancoDatos: jest.fn().mockReturnValue(of({ data: [{ id: 1, nombre: 'Banco Test' }] }))
    };
    tramite260303StoreMock = {
      setFechaDePago: jest.fn(),
      setClaveDeReferencia: jest.fn()
    };
    tramite260303QueryMock = {
      selectSolicitud$: of({
        claveDeReferencia: '123',
        cadenaDaLaDependencia: 'cadena',
        banco: 'BANAMEX',
        laveDePago: 'clave',
        fechaDePago: '2024-01-01',
        importeDePago: 100
      })
    };
 
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PagoDeDerechosComponent], // <-- aquí va el componente
      providers: [
        FormBuilder,
        { provide: CertificadosLicenciasPermisosService, useValue: certificadosLicenciasSvcMock },
        { provide: Tramite260303Store, useValue: tramite260303StoreMock },
        { provide: Tramite260303Query, useValue: tramite260303QueryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
 
    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    component.consultaState = { ...consultaStateMock };
    fixture.detectChanges();
  });
 
  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });
 
  it('debe inicializar el formulario con valores del estado', () => {
    component.cerrarPagoDerechosForm();
    expect(component.pagoDerechosForm.value.claveDeReferencia).toBe('123');
    expect(component.pagoDerechosForm.value.banco).toBe('BANAMEX');
  });
 
  it('debe obtener el catálogo de bancos', () => {
    component.getBancoCatalogDatos();
    expect(certificadosLicenciasSvcMock.getBancoDatos).toHaveBeenCalled();
    expect(component.bancoCatalogo).toEqual([{ id: 1, nombre: 'Banco Test' }]);
  });
 
  it('debe actualizar la fecha de pago y llamar al store', () => {
    component.cerrarPagoDerechosForm();
    component.cambioFechaFinal('2024-06-27');
    expect(component.pagoDerechosForm.get('fechaDePago')?.value).toBe('2024-06-27');
    expect(tramite260303StoreMock.setFechaDePago).toHaveBeenCalledWith('2024-06-27');
  });
 
  it('debe deshabilitar el formulario si consultaState.readonly es true', () => {
    component.cerrarPagoDerechosForm();
    component.consultaState = { ...consultaStateMock, readonly: true };
    component.deshabilitarFormularios();
    expect(component.pagoDerechosForm.disabled).toBe(true);
  });
 
  it('debe habilitar el formulario si consultaState.readonly es false', () => {
    component.cerrarPagoDerechosForm();
    component.consultaState = { ...consultaStateMock, readonly: false };
    component.deshabilitarFormularios();
    expect(component.pagoDerechosForm.enabled).toBe(true);
  });
 
  it('debe llamar al método correcto del store en setValoresStore', () => {
    component.cerrarPagoDerechosForm();
    component.pagoDerechosForm.get('claveDeReferencia')?.setValue('ABC123');
    component.setValoresStore(component.pagoDerechosForm, 'claveDeReferencia', 'setClaveDeReferencia');
    expect(tramite260303StoreMock.setClaveDeReferencia).toHaveBeenCalledWith('ABC123');
  });
 
  it('debe limpiar destroyNotifier$ en ngOnDestroy', () => {
    (component as any).destroyNotifier$ = { next: jest.fn(), complete: jest.fn() };
    component.ngOnDestroy();
    expect((component as any).destroyNotifier$.next).toHaveBeenCalled();
    expect((component as any).destroyNotifier$.complete).toHaveBeenCalled();
  });
});
 