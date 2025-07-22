import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudDatosComponent } from './solicitud-datos.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Solicitud260101Store } from '../../estados/tramites260101.store';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { AlertComponent, CatalogoSelectComponent, ConsultaioQuery, InputRadioComponent, TablaDinamicaComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModificarMercanciasComponent } from '../modificar-mercancias/modificar-mercancias.component';
import { CommonModule } from '@angular/common';

describe('SolicitudDatosComponent', () => {
  let component: SolicitudDatosComponent;
  let fixture: ComponentFixture<SolicitudDatosComponent>;

  // Mocks
  let mockSolicitudDatosService: any;
  let mockSolicitud260101Store: any;
  let mockSolicitud260101Query: any;
  let mockConsultaioQuery: any;

  beforeEach(async () => {
    mockSolicitudDatosService = {
      obtenerSolicitud: jest.fn().mockReturnValue(of({
        razonSocial: 'Test S.A.',
        correoElectronico: 'test@example.com',
        codigoPostal: '12345',
        municipio: 'Test City',
        localidad: 'Test Locality',
        colonia: 'Test Colony',
        calle: 'Test Street',
        lada: '01',
        telefono: '1234567890',
        legalRazonSocial: 'Legal S.A.',
        apellidoPaterno: 'Paterno',
        apellidoMeterno: 'Materno',
      })),
      obtenerEstadoCatalogo: jest.fn().mockReturnValue(of({})),
      obtenerDatosDeSolicitud: jest.fn().mockReturnValue(of({
        tablaFilaDatos: [],
        hacerlosRadioOptions: [],
      })),
      obtenerMercanciaListo: jest.fn().mockReturnValue(of([])),
      obtenerRegimenDestinaraListo: jest.fn().mockReturnValue(of({})),
      obtenerAduanaListo: jest.fn().mockReturnValue(of({}))
    };

    mockSolicitud260101Store = {
      setRazonSocial: jest.fn(),
      setCorreoElectronico: jest.fn(),
      setCodigoPostal: jest.fn(),
      setMunicipio: jest.fn(),
      setLocalidad: jest.fn(),
      setColonia: jest.fn(),
      setCalle: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setLegalRazonSocial: jest.fn(),
      setApellidoPaterno: jest.fn(),
      setApellidoMeterno: jest.fn(),
      setMercanciasDatos: jest.fn(),
      setEstado: jest.fn(),
      setLicenciaSanitaria: jest.fn(),
      setRegimen: jest.fn(),
      setAduana: jest.fn(),
      setHacerlos: jest.fn(),
      setRfc: jest.fn(),
      removeMercanciaDatos: jest.fn(),
      setLiveFreshFrozen: jest.fn(),
      setAvisoDeFuncionamiento: jest.fn(),
      setManifesto: jest.fn()
    };

    mockSolicitud260101Query = {
      seleccionarSolicitud$: of({ mercanciasDatos: [], razonSocial: 'Test' })
    };

    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false })
    };

    await TestBed.configureTestingModule({
      imports: [SolicitudDatosComponent,
        ReactiveFormsModule,
              FormsModule,
              CommonModule,
              InputRadioComponent,
              TablaDinamicaComponent,
              CatalogoSelectComponent,
              TableComponent,
              AlertComponent,
              TituloComponent,
              ModificarMercanciasComponent
      ],
      providers: [
        { provide: SolicitudDatosService, useValue: mockSolicitudDatosService },
        { provide: Solicitud260101Store, useValue: mockSolicitud260101Store },
        { provide: Solicitud260101Query, useValue: mockSolicitud260101Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements in template
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    expect(component.solicitudForm).toBeDefined();
  });

  it('should call inicializarFormulario on ngOnInit', () => {
  const spy = jest.spyOn(component, 'inicializarFormulario');
  component.ngOnInit();
  expect(spy).toHaveBeenCalled();
});


  it('should toggle colapsable when mostrarColapsable is called', () => {
    const initial = component.colapsable;
    component.mostrarColapsable();
    expect(component.colapsable).toBe(!initial);
  });

  it('should call setRegimen on store', () => {
    component.setRegimen({ id: '1' } as any);
    expect(mockSolicitud260101Store.setRegimen).toHaveBeenCalledWith('1');
  });

  it('should call setAduana on store', () => {
    component.setAduana({ id: '2' } as any);
    expect(mockSolicitud260101Store.setAduana).toHaveBeenCalledWith('2');
  });

  it('should call setEstado on store', () => {
    component.setEstado({ id: '3' } as any);
    expect(mockSolicitud260101Store.setEstado).toHaveBeenCalledWith('3');
  });

  it('should call setHacerlos on store', () => {
    component.setHacerlos(1);
    expect(mockSolicitud260101Store.setHacerlos).toHaveBeenCalledWith(1);
  });

  it('should call setRFC on store', () => {
    const mockEvent = { target: { value: 'RFC123' } } as any;
    component.setRFC(mockEvent);
    expect(mockSolicitud260101Store.setRfc).toHaveBeenCalledWith('RFC123');
  });

  it('should call eliminarMercancias and remove first item', () => {
    component.selectedMercanciasDatos = [{ fraccionArancelaria: 'test' } as any];
    component.eliminarMercancias();
    expect(mockSolicitud260101Store.removeMercanciaDatos).toHaveBeenCalled();
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    const spy = jest.spyOn((component as any).destroyNotifier$, 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

});
