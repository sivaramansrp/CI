jest.mock('@libs/shared/theme/assets/json/250101/banco.json', () => ({
  __esModule: true,
  default: {
    medio: [
      { id: 1, descripcion: 'Medio 1' },
      { id: 2, descripcion: 'Medio 2' }
    ],
      requisito: [
      { id: 1, descripcion: 'requisito 1' },
      { id: 2, descripcion: 'requisito 2' }
    ],
    // Add other properties if your component uses them
  }
}), { virtual: true });

// Mock reuisitosDatosDummy
jest.mock('@libs/shared/theme/assets/json/250101/requisitos-datos-dummy.json', () => ({
  __esModule: true,
  default: {
  numeroIdentificacion: 'ABC123',
  numeroEconomico: 'ECO456',
  placa: 'XYZ789',
  No: '1',
  Fecha: '2024-01-01',
  Tipo: 'Permiso'
  }
}), { virtual: true });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Requisitos250101Component } from './requisitos250101.component';
import { Tramite250101Query } from '../../estados/tramite250101.query';
import { Tramite250101Store } from '../../estados/tramite250101.store';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Mock Tramite250101Store
class Tramite250101StoreMock {
  setFechas = jest.fn();
}

// Mock Tramite250101Query
class Tramite250101QueryMock {
  selectSolicitud$ = of({
    medio: 1,
    identificacion: 'ID123',
    economico: 'ECO456',
    placa: 'PLACA789',
    numero: 'NUM001',
    fechas: '2024-01-01',
    requisito: 1
  });
}

// Mock ConsultaioQuery
class ConsultaioQueryMock {
  selectConsultaioState$ = of({ readonly: false });
}

describe('Requisitos250101Component', () => {
  let component: Requisitos250101Component;
  let fixture: ComponentFixture<Requisitos250101Component>;
  let storeMock: any;

  const mockState = {
    medio: 2,
    identificacion: 'ABC123',
    economico: 'ECO456',
    placa: 'XYZ789',
    numero: '001',
    fechas: '2025-04-01',
    requisito: 3,
  };


  
  beforeEach(async () => {
    storeMock = {
      setMedio: jest.fn(),
      setIdentificacion: jest.fn(),
      setEconomico: jest.fn(),
      setPlaca: jest.fn(),
      setNumero: jest.fn(),
      setFechas: jest.fn(),
      setRequisito: jest.fn(),
    };

    
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, Requisitos250101Component],
      providers: [
        FormBuilder,
        { provide: Tramite250101Query, useValue: { selectSolicitud$: of(mockState) } },
        { provide: Tramite250101Store, useValue: storeMock },
        { provide: 'ConsultaioQuery', useClass: ConsultaioQueryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Avoid errors for unknown elements
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Requisitos250101Component);
    component = fixture.componentInstance;

    // (component as any).consultaioQuery = TestBed.inject('ConsultaioQuery');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit with store values', () => {
    component.ngOnInit();
    expect(component.transporteForm.value.identificacion).toBe('ABC123');
    expect(component.transporteForm.value.medio).toBe(2);
    expect(component.transporteForm.value.requisito).toBe(3);
  });

  it('should toggle transporte modal visibility', () => {
    expect(component.showtransporteModal).toBe(false);
    component.transporte();
    expect(component.showtransporteModal).toBe(true);
    component.transporte();
    expect(component.showtransporteModal).toBe(false);
  });

  it('should toggle requisitos modal visibility', () => {
    expect(component.showrequisitosModal).toBe(false);
    component.requisitos();
    expect(component.showrequisitosModal).toBe(true);
    component.requisitos();
    expect(component.showrequisitosModal).toBe(false);
  });

  it('should push requisito data and close modal', () => {
    component.transporteForm.setValue({
      medio: 2,
      identificacion: 'ID123',
      economico: 'ECO789',
      placa: 'PLA001',
      numero: '123',
      fechas: '2025-04-17',
      requisito: 2,
    });

    component.showrequisitosModal = true;
    component.requisitosDatos();
    expect(component.requisitosTabla.length).toBe(1);
    expect(component.showrequisitosModal).toBe(false);
  });

  it('should push transporte data and close modal', () => {
    component.transporteForm.setValue({
      medio: 2,
      identificacion: 'ID456',
      economico: 'ECO123',
      placa: 'PLA002',
      numero: '456',
      fechas: '2025-04-18',
      requisito: 3,
    });

    component.showtransporteModal = true;
    component.transporteDatos();
    expect(component.showtransporteModal).toBe(false);
  });

  it('should call correct store method with setValoresStore()', () => {
    component.transporteForm.controls['medio'].setValue(5);
    component.setValoresStore(component.transporteForm, 'medio', 'setMedio');
    expect(storeMock.setMedio).toHaveBeenCalledWith(5);
  });

  it('should clean up resources on destroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

    it('should disable form in readonly mode (guardarDatosFormulario)', () => {
      component.esFormularioSoloLectura = true;
      component.guardarDatosFormulario();
      expect(component.transporteForm.disabled).toBe(true);
    });
  
    it('should enable form in editable mode (guardarDatosFormulario)', () => {
      component.esFormularioSoloLectura = false;
      component.guardarDatosFormulario();
      expect(component.transporteForm.enabled).toBe(true);
    });
  
    it('should clean up observables on destroy', () => {
      (component as any).destroyNotifier$ = new Subject<void>();
      const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
      const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
      component.ngOnDestroy();
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
});
