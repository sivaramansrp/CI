import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';
import { ElementRef } from '@angular/core';
import { Modal } from 'bootstrap';

import { DomicillioDelEstablecimientoSeccionComponent } from './domicillio-del-establecimiento-seccion.component';
import { EstablecimientoService } from '../../services/establecimiento/establecimiento.service';
import { DatosDelSolicituteSeccionQuery } from '../../estados/queries/datos-del-solicitute-seccion.query';
import { DatosDelSolicituteSeccionState, DatosDelSolicituteSeccionStateStore } from '../../estados/stores/datos-del-solicitute-seccion.store';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('DomicillioDelEstablecimientoSeccionComponent', () => {
  let component: DomicillioDelEstablecimientoSeccionComponent;
  let fixture: ComponentFixture<DomicillioDelEstablecimientoSeccionComponent>;
  let mockEstablecimientoService: jest.Mocked<EstablecimientoService>;
  let mockQuery: jest.Mocked<DatosDelSolicituteSeccionQuery>;
  let mockStore: jest.Mocked<DatosDelSolicituteSeccionStateStore>;

  beforeEach(async () => {
    mockEstablecimientoService = {
      getRegimenData: jest.fn(),
      getAduanaDeSalidaData: jest.fn(),
      getEstadoData: jest.fn(),
      getSciandata: jest.fn(),
    } as unknown as jest.Mocked<EstablecimientoService>;

    mockQuery = {
      select: jest.fn(),
    } as unknown as jest.Mocked<DatosDelSolicituteSeccionQuery>;

    mockStore = {
      update: jest.fn(),
    } as unknown as jest.Mocked<DatosDelSolicituteSeccionStateStore>;

    await TestBed.configureTestingModule({
      declarations: [DomicillioDelEstablecimientoSeccionComponent],
      imports: [CommonModule, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: EstablecimientoService, useValue: mockEstablecimientoService },
        { provide: DatosDelSolicituteSeccionQuery, useValue: mockQuery },
        { provide: DatosDelSolicituteSeccionStateStore, useValue: mockStore },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomicillioDelEstablecimientoSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    const mockState: DatosDelSolicituteSeccionState = {
      representanteRfc: 'RFC123456',
      representanteNombre: 'John',
      apellidoPaterno: 'Doe',
      apellidoMaterno: 'Smith',
      establecimientoDenominacionRazonSocial: 'Test Company',
      establecimientoCorreoElectronico: 'test@example.com',
      establecimientoDomicilioCodigoPostal: '12345',
      establecimientoDomicilioEstado: 'Estado Test',
      establecimientoMunicipioYAlcaldia: 'Municipio Test',
      establecimientoDomicilioLocalidad: 'Localidad Test',
      establecimientoDomicilioColonia: 'Colonia Test',
      establecimientoDomicilioCalle: 'Calle Test',
      establecimientoDomicilioLada: '123',
      establecimientoDomicilioTelefono: '1234567890',
      rfcDelProfesionalResponsable: 'RFCRESP123',
      nombreDelProfesionalResponsable: 'Responsable Test',
      informacionConfidencialRadio: 'Yes',
      propietarioData: [], // Assuming it's an empty array
    };
    mockQuery.select.mockReturnValue(of(mockState));
    component.ngOnInit();

    expect(component.domicilioEstablecimiento).toBeDefined();
    expect(component.domicilioEstablecimiento.get('establecimientoDomicilioEstado')?.value).toBe('Estado Test');
    expect(component.domicilioEstablecimiento.get('avisoDeFuncionamiento')?.value).toBe(true);
  });

  it('should load regimen data', () => {
    const mockRegimenData: Catalogo[] = [{ id: 1, descripcion: 'Regimen 1' }];
    mockEstablecimientoService.getRegimenData.mockReturnValue(of(mockRegimenData));

    component.loadRegimen();

    expect(component.regimenQueDestinara).toEqual(mockRegimenData);
  });

  it('should load aduana de salida data', () => {
    const mockAduanaData: Catalogo[] = [{ id: 1, descripcion: 'Aduana 1' }];
    mockEstablecimientoService.getAduanaDeSalidaData.mockReturnValue(of(mockAduanaData));

    component.loadAduanaDeSalida();

    expect(component.aduanaDeSalida).toEqual(mockAduanaData);
  });

  it('should load estado data', () => {
    const mockEstadoData: Catalogo[] = [{ id: 1, descripcion: 'Estado 1' }];
    mockEstablecimientoService.getEstadoData.mockReturnValue(of(mockEstadoData));

    component.loadEstado();

    expect(component.estadoJson).toEqual(mockEstadoData);
  });

  it('should load scian data', () => {
    const mockScianData: Catalogo[] = [{ id: 1, descripcion: 'SCIAN 1' }];
    mockEstablecimientoService.getSciandata.mockReturnValue(of(mockScianData));

    component.loadScian();

    expect(component.scianJson).toEqual(mockScianData);
  });

  it('should open and close the modal', () => {
    const mockShow = jest.fn();
    const mockHide = jest.fn();
    component.modalInstance = { show: mockShow, hide: mockHide } as unknown as Modal;

    component.openScianModal();
    expect(mockShow).toHaveBeenCalled();

    component.closeScianModal();
    expect(mockHide).toHaveBeenCalled();
  });

  it('should reset the scian form', () => {
    component.scianForm.patchValue({ scian: 'Test', descripcionScian: 'Test Description' });
    component.limpiarScianForm();

    expect(component.scianForm.value).toEqual({ scian: null, descripcionScian: null });
  });

  it('should add a new SCIAN entry and reset the form', () => {
    component.scianForm.patchValue({ scian: 'SCIAN123', descripcionScian: 'SCIAN Description' });
    component.guardarScian();

    expect(component.personaparas).toEqual([{ claveScian: 'SCIAN123', descripcionScian: 'SCIAN Description' }]);
    expect(component.scianForm.value).toEqual({ scian: null, descripcionScian: null });
  });

  it('should check if the checkbox is checked', () => {
    component.domicilioEstablecimiento.patchValue({ avisoDeFuncionamiento: true });
    expect(component.isCheckboxChecked()).toBe(true);

    component.domicilioEstablecimiento.patchValue({ avisoDeFuncionamiento: false });
    expect(component.isCheckboxChecked()).toBe(false);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});