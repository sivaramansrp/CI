import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, Subject } from 'rxjs';
import { ElementRef } from '@angular/core';
import { Modal } from 'bootstrap';

import { PropietarioComponent } from './propietario.component';
import { DatosDelSolicituteSeccionQuery } from '../../estados/queries/datos-del-solicitute-seccion.query';
import { DatosDelSolicituteSeccionState, DatosDelSolicituteSeccionStateStore } from '../../estados/stores/datos-del-solicitute-seccion.store';

describe('PropietarioComponent', () => {
  let component: PropietarioComponent;
  let fixture: ComponentFixture<PropietarioComponent>;
  let mockQuery: jest.Mocked<DatosDelSolicituteSeccionQuery>;
  let mockStore: jest.Mocked<DatosDelSolicituteSeccionStateStore>;

  beforeEach(async () => {
    mockQuery = {
      select: jest.fn().mockReturnValue(of({})), // Ensure select returns an observable
    } as unknown as jest.Mocked<DatosDelSolicituteSeccionQuery>;

    mockStore = {
      update: jest.fn(),
    } as unknown as jest.Mocked<DatosDelSolicituteSeccionStateStore>;

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PropietarioComponent
     
      ],
    
      providers: [
        { provide: DatosDelSolicituteSeccionQuery, useValue: mockQuery },
        { provide: DatosDelSolicituteSeccionStateStore, useValue: mockStore },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropietarioComponent);
    component = fixture.componentInstance;

    // Mock destroy$
    component['destroy$'] = new Subject<void>(); // Ensure destroy$ is properly initialized
    component.ngOnInit(); // Call ngOnInit to initialize component state

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the forms on ngOnInit', () => {
    component.ngOnInit();

    expect(component.propietarioradioForm).toBeDefined();
    expect(component.formTercerosDatos).toBeDefined();
    expect(component.propietarioradioForm.get('tercerosRfc')).toBeTruthy();
    expect(component.formTercerosDatos.get('tercerosDenominacionRazonSocial')).toBeTruthy();
  });

  it('should load propietario data from the store', () => {
    const mockState: DatosDelSolicituteSeccionState = {
      representanteRfc: '',
      representanteNombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      establecimientoDenominacionRazonSocial: '',
      establecimientoCorreoElectronico: '',
      establecimientoDomicilioCodigoPostal: '',
      establecimientoDomicilioEstado: '',
      establecimientoMunicipioYAlcaldia: '',
      establecimientoDomicilioLocalidad: '',
      establecimientoDomicilioColonia: '',
      establecimientoDomicilioCalle: '',
      establecimientoDomicilioLada: '',
      establecimientoDomicilioTelefono: '',
      rfcDelProfesionalResponsable: '',
      nombreDelProfesionalResponsable: '',
      informacionConfidencialRadio: '',
      propietarioData: [
        {
          NombredenominacionORazonSocial: 'Test',
          rfc: 'RFC123',
          curp: 'CURP123',
          telefono: '1234567890',
          CorreoElectronico: 'test@example.com',
          calle: 'Test Street',
          numeroExterior: '123',
          numeroInterior: 'A',
          pais: 'Mexico',
          colonia: 'Colonia Test',
          municipioOAlcaldia: 'Municipio Test',
          localidad: 'Localidad Test',
          entidadFederativa: 'Estado Test',
          estadoLocalidad: 'Estado Test',
          codigoPostal: '12345',
        },
      ],
      establecimientoData: []
    };
  
    mockQuery.select.mockReturnValue(of(mockState));
  
    component.ngOnInit();
  
    expect(component.propietarioData).toEqual(mockState.propietarioData);
  });

  it('should open and close the modal', () => {
    const mockShow = jest.fn();
    const mockHide = jest.fn();
    component.modalInstance = { show: mockShow, hide: mockHide } as unknown as Modal;

    component.openPropietarioModal();
    expect(mockShow).toHaveBeenCalled();

    component.closePropietarioModal();
    expect(mockHide).toHaveBeenCalled();
  });

  it('should add a new propietario and reset the form', () => {
    component.formTercerosDatos.patchValue({
      tercerosDenominacionRazonSocial: 'Test Name',
      tercerosPais: 'Mexico',
      tercerosEstadoLocalidad: 'Estado Test',
      tercerosMunicipioAlcaldia: 'Municipio Test',
      tercerosLocalidad: 'Localidad Test',
      tercerosColonia: 'Colonia Test',
      tercerosCodigoPostal: '12345',
      tercerosCalle: 'Test Street',
      tercerosNumeroExterior: '123',
      tercerosNumeroInterior: 'A',
      tercerosTelefono: '1234567890',
      tercerosCorreoElectronico: 'test@example.com',
    });
    component.propietarioradioForm.patchValue({
      tercerosRfc: 'RFC123',
      tercerosCurp: 'CURP123',
    });

    component.guardarPropietario();

    expect(mockStore.update).toHaveBeenCalledWith({
      propietarioData: [
        {
          NombredenominacionORazonSocial: 'Test Name',
          rfc: 'RFC123',
          curp: 'CURP123',
          telefono: '1234567890',
          CorreoElectronico: 'test@example.com',
          calle: 'Test Street',
          numeroExterior: '123',
          numeroInterior: 'A',
          pais: 'Mexico',
          colonia: 'Colonia Test',
          municipioOAlcaldia: 'Municipio Test',
          localidad: 'Localidad Test',
          entidadFederativa: 'Estado Test',
          estadoLocalidad: 'Estado Test',
          codigoPostal: '12345',
        },
      ],
    });
    expect(component.formTercerosDatos.value).toEqual({
      tercerosDenominacionRazonSocial: null,
      tercerosPais: null,
      tercerosEstadoLocalidad: null,
      tercerosMunicipioAlcaldia: null,
      tercerosLocalidad: null,
      tercerosColonia: null,
      tercerosCodigoPostal: null,
      tercerosCalle: null,
      tercerosNumeroExterior: null,
      tercerosNumeroInterior: null,
      tercerosTelefono: null,
      tercerosCorreoElectronico: null,
      tercerosLada: null,
      tercerosNombre: null,
      tercerosSegundoApellido: null,
      tercerosPrimerApellido: null,
    });
    expect(component.propietarioradioForm.value).toEqual({
      tercerosTipoPersona: null,
      tercerosCurp: null,
      tercerosNacionalidad: null,
      tercerosRfc: null,
    });
  });

  it('should toggle showDatosPersonales on radio change', () => {
    component.onRadioChange('Nacional');
    expect(component.showDatosPersonales).toBe(true);

    component.onRadioChange('Extranjero');
    expect(component.showDatosPersonales).toBe(false);
  });

  it('should toggle showBuscarButton on selection change', () => {
    component.onSelectionChange('value');
    expect(component.showBuscarButton).toBe(true);

    component.onSelectionChange('');
    expect(component.showBuscarButton).toBe(false);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});