import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FraccionComponent } from './fraccion.component';
import { FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { Tramite130106Store } from '../../../../estados/tramites/tramite130106.store';
import { Tramite130106Query } from '../../../../estados/queries/tramite130106.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';

describe('FraccionComponent', () => {
  let component: FraccionComponent;
  let fixture: ComponentFixture<FraccionComponent>;

  const mockStore = {
    updateSelectRangoDias: jest.fn(),
    updateCantidad: jest.fn(),
    updateFraccion: jest.fn(),
  };

  const mockQuery = {
    selectSolicitud$: of({
      fraccion: '1234',
      cantidad: 5,
      factura: 100,
      umt: 'Pieza',
      especifico: 'Esp',
      justificacion: 'Just',
      observaciones: '',
      entidad: 1,
      representacion: 1,
      bloque: 1,
      disponible: [],
      seleccionado: [],
    }),
  };

  const mockConsultaioQuery = {
    selectConsultaioState$: of({ readonly: false }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FraccionComponent],
      providers: [
        FormBuilder,
        { provide: Tramite130106Store, useValue: mockStore },
        { provide: Tramite130106Query, useValue: mockQuery },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: ValidacionesFormularioService, useValue: {} },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
  const spy = jest.spyOn(component, 'inicializarCertificadoFormulario');
  component.ngOnInit();

  const bloqueControl = component.fraccionForm.get('bloque');
  bloqueControl?.setValue('some value'); // trigger valueChanges

  expect(spy).toHaveBeenCalled();
  expect(component.selectRangoDias).toEqual(["ESTADOS UNIDOS DE AMERICA CANADA"]);
});


  it('should initialize the form with expected controls', () => {
    component.inicializarFormulario();
    expect(component.fraccionForm.contains('fraccion')).toBeTruthy();
    expect(component.fraccionForm.contains('cantidad')).toBeTruthy();
    expect(component.fraccionForm.contains('factura')).toBeTruthy();
  });

  it('should call updateSelectRangoDias on bloque change', () => {
    component.inicializarFormulario();
    component.fraccionForm.get('bloque')?.setValue('mockValue');
    expect(mockStore.updateSelectRangoDias).toHaveBeenCalledWith(["ESTADOS UNIDOS DE AMERICA CANADA"]);
  });

  it('should call agregar with tipo "t"', () => {
    component.selectRangoDias = ['2025-01-01', '2025-01-02'];
    component.agregar('t');
    expect(component.fechasSeleccionadas).toEqual(['2025-01-01', '2025-01-02']);
    expect(component.fechasDatos).toEqual([]);
  });

  it('should call quitar with tipo "t"', () => {
    component.fechasSeleccionadas = ['2025-01-01', '2025-01-02'];
    component.quitar('t');
    expect(component.fechasSeleccionadas).toEqual([]);
    expect(component.fechasDatos).toEqual(['2025-01-01', '2025-01-02']);
  });

  it('should disable form if solo lectura is true', () => {
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.fraccionForm.disabled).toBe(true);
  });

  it('should enable form if solo lectura is false', () => {
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.fraccionForm.enabled).toBe(true);
  });

  it('should set value to store using setValoresStore', () => {
    const fb = TestBed.inject(FormBuilder);
    const form = fb.group({ cantidad: [5] });
    component.setValoresStore(form, 'cantidad', 'updateCantidad' as keyof Tramite130106Store);
    expect(mockStore.updateCantidad).toHaveBeenCalledWith(5);
  });

  it('should clean up on ngOnDestroy', () => {
    const spy = jest.spyOn(component.destroyNotifier$, 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(component.destroyNotifier$.closed).toBe(false);
  });
  it('should move selected dates from fechasDatos to fechasSeleccionadas', () => {
  // Setup fechasDatos with mock values
  component.fechasDatos = ['20240601', '20240602', '20240603']; // available dates
  component.fechasSeleccionadas = []; // initially empty

  // Mock fecha form control value (selecting index 1 → '20240602')
  component.fecha.setValue(['1']);

  // Call the method that includes this logic
  component.agregar(''); // assuming the logic is inside agregar('')

  // Verify fechasSeleccionadas now includes '20240602'
  expect(component.fechasSeleccionadas).toEqual(['20240602']);

  // Verify '20240602' was removed from fechasDatos
  expect(component.fechasDatos).toEqual(['20240601', '20240603']);
});
it('should move selected dates from fechasSeleccionadas back to fechasDatos', () => {
  // Initial mock setup
  component.fechasSeleccionadas = ['20240610', '20240611', '20240612'];
  component.fechasDatos = [];

  // Simulate selecting index 0 → '20240610'
  component.fechaSeleccionada.setValue(['0']);

  // Call the method containing the logic
  component.quitar(''); // or whatever method includes the posted logic

  // Check that '20240610' was moved back to fechasDatos
  expect(component.fechasDatos).toEqual(['20240610']);

  // Check that it was removed from fechasSeleccionadas
  expect(component.fechasSeleccionadas).toEqual(['20240611', '20240612']);
});


});
