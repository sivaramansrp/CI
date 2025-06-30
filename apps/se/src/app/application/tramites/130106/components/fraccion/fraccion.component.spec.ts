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
      umt: 1,
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
    bloqueControl?.setValue('some value');

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

  it('should handle missing control gracefully in setValoresStore', () => {
    const fb = TestBed.inject(FormBuilder);
    const form = fb.group({});
    expect(() => component.setValoresStore(form, 'missing', 'updateCantidad' as keyof Tramite130106Store)).not.toThrow();
  });

  it('should clean up on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should move selected date from fechasDatos to fechasSeleccionadas', () => {
    component.fechasDatos = ['20240601', '20240602', '20240603'];
    component.fechasSeleccionadas = [];
    component.fecha.setValue(['1']); // selects '20240602'
    component.agregar('');
    expect(component.fechasSeleccionadas).toEqual(['20240602']);
    expect(component.fechasDatos).toEqual(['20240601', '20240603']);
  });

  it('should move selected date from fechasSeleccionadas to fechasDatos', () => {
    component.fechasSeleccionadas = ['20240610', '20240611', '20240612'];
    component.fechasDatos = [];
    component.fechaSeleccionada.setValue(['0']); // selects '20240610'
    component.quitar('');
    expect(component.fechasDatos).toEqual(['20240610']);
    expect(component.fechasSeleccionadas).toEqual(['20240611', '20240612']);
  });

  it('should generate a new partida and patch form values', () => {
    component.fraccionForm.patchValue({
      cantidad: 10,
      umt: 1,
      fraccion: 1,
      descripcion: 'Test desc',
      UMT: 1, // Add this line if 'UMT' is required by generarPartidas
    });

    component.generarPartidas();

    expect(component.partidas.length).toBe(1);
    expect(component.fraccionForm.get('cantidadTotal')?.value).toBe(10);
    expect(component.fraccionForm.get('valorTotal')?.value).toBe(10);
  });

  it('should disable cantidadTotal and valorTotal fields', () => {
    component.updateformfied();
    expect(component.fraccionForm.get('cantidadTotal')?.disabled).toBe(true);
    expect(component.fraccionForm.get('valorTotal')?.disabled).toBe(true);
  });

  it('should call guardarDatosFormulario if solo lectura is true', () => {
    component.esFormularioSoloLectura = true;
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.inicializarCertificadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should call inicializarFormulario if solo lectura is false', () => {
    component.esFormularioSoloLectura = false;
    const spy = jest.spyOn(component, 'inicializarFormulario');
    component.inicializarCertificadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should mark "cantidad" control as invalid when value is non-numeric', () => {
    component.fraccionForm.get('cantidad')?.setValue('abc');
    expect(component.fraccionForm.get('cantidad')?.valid).toBe(false);
  });
});
