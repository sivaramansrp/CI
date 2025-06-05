import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { PagoDerechosComponent } from './pago-Derechos.component';
import { AvisoImportacionService } from '../../services/parmiso-importacion.service';
import { AvisocalidadStore } from '../../estados/stores/aviso-calidad.store';
import { AvisocalidadQuery } from '../../estados/queries/aviso-calidad.query';
import { FECHA_DE_PAGO } from '../../models/pago-derechos.model';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

 const mockConsultaioQuery = {
    selectConsultaioState$: of({ readonly: true }),
  };

describe('PagoDerechosComponent', () => {
  let component: PagoDerechosComponent;
  let fixture: ComponentFixture<PagoDerechosComponent>;
  let mockService: any;
  let mockStore: any;
  let mockQuery: any;

  beforeEach(() => {
    mockService = {
      getDatos: jest.fn().mockReturnValue(of([{ id: 1, name: 'Derecho 1' }])),
    };
    mockStore = {
      setfechaPago: jest.fn(),
    };
    mockQuery = {
      selectSolicitud$: of({
        claveReferencia: '123',
        cadenaDependencia: 'ABC',
        banco: 'XYZ',
        llavePago: 'LLAVE123',
        fechaPago: '2023-01-01',
        importePago: 1000,
      }),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PagoDerechosComponent], // Add PagoDerechosComponent to imports
      providers: [
        FormBuilder,
        { provide: AvisoImportacionService, useValue: mockService },
        { provide: AvisocalidadStore, useValue: mockStore },
        { provide: AvisocalidadQuery, useValue: mockQuery },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },

      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and load data on ngOnInit', () => {
    expect(component.derechosForm.value).toEqual({
      claveReferencia: '123',
      cadenaDependencia: 'ABC',
      banco: 'XYZ',
      llavePago: 'LLAVE123',
      fechaPago: '2023-01-01',
      importePago: 1000,
    });
    expect(component.derechosList).toEqual([{ id: 1, name: 'Derecho 1' }]);
  });

  it('should update fechaPago in the form and store on cambioFechaIngreso', () => {
    component.cambioFechaIngreso('2023-02-01');
    expect(component.derechosForm.get('fechaPago')?.value).toBe('2023-02-01');
    expect(mockStore.setfechaPago).toHaveBeenCalledWith('2023-02-01');
  });

  it('should call setValoresStore with correct parameters', () => {
    const spy = jest.spyOn(mockStore, 'setfechaPago');
    component.setValoresStore(component.derechosForm, 'fechaPago', 'setfechaPago');
    expect(spy).toHaveBeenCalledWith('2023-01-01');
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const destroyed$Spy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(destroyed$Spy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should load derechos list from the service', () => {
    component.loadComboUnidadMedida();
    expect(mockService.getDatos).toHaveBeenCalled();
    expect(component.derechosList).toEqual([{ id: 1, name: 'Derecho 1' }]);
  });

  it('should have the correct initial value for fechaInicioInput', () => {
    expect(component.fechaInicioInput).toBe(FECHA_DE_PAGO);
  });

  it('should handle empty solicitudState gracefully', () => {
    mockQuery.selectSolicitud$ = of(null);
    component.ngOnInit();
    expect(component.derechosForm.value).toEqual({
      claveReferencia: null,
      cadenaDependencia: null,
      banco: null,
      llavePago: null,
      fechaPago: null,
      importePago: null,
    });
  });

  it('should handle loadComboUnidadMedida with empty data', () => {
    mockService.getDatos.mockReturnValue(of([]));
    component.loadComboUnidadMedida();
    expect(component.derechosList).toEqual([]);
  });

  it('should not call store method if form field is null in setValoresStore', () => {
    const spy = jest.spyOn(mockStore, 'setfechaPago');
    component.derechosForm.get('fechaPago')?.setValue(null);
    component.setValoresStore(component.derechosForm, 'fechaPago', 'setfechaPago');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should mark fechaPago as untouched after cambioFechaIngreso', () => {
    const fechaPagoControl = component.derechosForm.get('fechaPago');
    fechaPagoControl?.markAsTouched();
    component.cambioFechaIngreso('2023-03-01');
    expect(fechaPagoControl?.untouched).toBeTruthy();
  });

  it('should handle destroyed$ subject correctly on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith();
    expect(completeSpy).toHaveBeenCalled();
  });

   it('should set esFormularioSoloLectura from ConsultaioQuery and configure form on ngOnInit', () => {
      const configurarSpy = jest.spyOn(component, 'configurarGrupoForm');

      component.ngOnInit();

      expect(component.esFormularioSoloLectura).toBe(true);
      expect(configurarSpy).toHaveBeenCalled();
    });

    it('should initialize and disable the form when esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;

    component.configurarGrupoForm();

    const formValue = component.derechosForm.value;
    expect(formValue).toEqual({
      claveReferencia: 'ABC123',
      cadenaDependencia: 'Dependencia XYZ',
      banco: 'BANXICO',
      llavePago: 'LLAVE123',
      fechaPago: '2023-10-01',
      importePago: 1000
    });

    expect(component.derechosForm.disabled).toBe(true);
  });

  it('should initialize and enable the form when esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;

    component.configurarGrupoForm();

    expect(component.derechosForm.disabled).toBe(false);
  });
});
