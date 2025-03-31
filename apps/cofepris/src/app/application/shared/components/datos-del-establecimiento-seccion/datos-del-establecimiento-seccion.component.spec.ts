import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { DatosDelSolicituteSeccionQuery } from '../../estados/queries/datos-del-solicitute-seccion.query';
import { DatosDelSolicituteSeccionState, DatosDelSolicituteSeccionStateStore } from '../../estados/stores/datos-del-solicitute-seccion.store';
import { DatosDelEstablecimientoSeccionComponent } from './Datos-del-establecimiento-seccion.component';
import { of, Subject } from 'rxjs';
import { ElementRef } from '@angular/core';
import { Modal } from 'bootstrap';

describe('DatosDelEstablecimientoSeccionComponent', () => {
  let component: DatosDelEstablecimientoSeccionComponent;
  let fixture: ComponentFixture<DatosDelEstablecimientoSeccionComponent>;
  let mockQuery: jest.Mocked<DatosDelSolicituteSeccionQuery>;
  let mockStore: jest.Mocked<DatosDelSolicituteSeccionStateStore>;

  beforeEach(async () => {
    mockQuery = {
      select: jest.fn(),
    } as unknown as jest.Mocked<DatosDelSolicituteSeccionQuery>;

    mockStore = {
      update: jest.fn(),
    } as unknown as jest.Mocked<DatosDelSolicituteSeccionStateStore>;

    await TestBed.configureTestingModule({
      declarations: [DatosDelEstablecimientoSeccionComponent],
      imports: [CommonModule, ReactiveFormsModule, FormsModule, TituloComponent],
      providers: [
        { provide: DatosDelSolicituteSeccionQuery, useValue: mockQuery },
        { provide: DatosDelSolicituteSeccionStateStore, useValue: mockStore },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDelEstablecimientoSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    // Mock the full state object
    const mockState: DatosDelSolicituteSeccionState = {
      establecimientoDenominacionRazonSocial: 'Test',
      establecimientoCorreoElectronico: 'test@example.com',
      representanteRfc: 'RFC123456',
      representanteNombre: 'John',
      apellidoPaterno: 'Doe',
      apellidoMaterno: 'Smith',
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
      propietarioData: [],
    };
  
    mockQuery.select.mockReturnValue(of(mockState)); // Return the full mock state
    component.ngOnInit();
  
    expect(component.detosEstablecimiento).toBeDefined();
    expect(component.detosEstablecimiento.get('establecimientoDenominacionRazonSocial')?.value).toBe('Test');
    expect(component.detosEstablecimiento.get('establecimientoCorreoElectronico')?.value).toBe('test@example.com');
  });
  it('should update the store when form value changes', () => {
    component.ngOnInit();
    component.detosEstablecimiento.patchValue({
      establecimientoDenominacionRazonSocial: 'Updated Name',
      establecimientoCorreoElectronico: 'updated@example.com',
    });
    expect(mockStore.update).toHaveBeenCalledWith({
      establecimientoDenominacionRazonSocial: 'Updated Name',
      establecimientoCorreoElectronico: 'updated@example.com',
    });
  });

  it('should initialize the modal instance in ngAfterViewInit', () => {
    const mockElement = document.createElement('button');
    component.establecimientoModalButton = { nativeElement: mockElement } as ElementRef;
    component.ngAfterViewInit();
    expect(component.establecimientoModalInstance).toBeDefined();
  });

  it('should open the modal when openEstablecimientoModal is called', () => {
    const mockShow = jest.fn();
    component.establecimientoModalInstance = { show: mockShow } as unknown as Modal;
    component.openEstablecimientoModal();
    expect(mockShow).toHaveBeenCalled();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});