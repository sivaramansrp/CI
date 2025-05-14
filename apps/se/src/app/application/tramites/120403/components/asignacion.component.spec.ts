import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AsignacionComponent } from './asignacion.component';
import { CuposService } from '../services/cupos.service';
import { Tramite120403Store } from '../state/Tramite120403.store';
import { Tramite120403Query } from '../state/Tramite120403.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { of } from 'rxjs';

describe('AsignacionComponent', () => {
  let component: AsignacionComponent;
  let fixture: ComponentFixture<AsignacionComponent>;
  let cuposServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;
  let validacionesServiceMock: any;

  beforeEach(async () => {
    cuposServiceMock = {
      obtenerDatosAno: jest.fn().mockReturnValue(of([{ id: 1, descripcion: '2023' }])),
    };

    tramiteStoreMock = {
      setAsignacionRadio: jest.fn(),
      setAsignacionsolitud: jest.fn(),
      setNumTramite: jest.fn(),
      setFechaFin: jest.fn(),
      setAmpliar: jest.fn(),
    };

    tramiteQueryMock = {
      selectSolicitud$: of({
        asignacionRadio: 'vigencia',
        asignacionsolitud: '2023',
        numTramite: '12345',
        fechaFin: '2023-12-31',
        ampliar: '100',
      }),
    };

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,AsignacionComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: CuposService, useValue: cuposServiceMock },
        { provide: Tramite120403Store, useValue: tramiteStoreMock },
        { provide: Tramite120403Query, useValue: tramiteQueryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and fetch data on ngOnInit', () => {
    jest.spyOn(component, 'donanteDomicilio');
    jest.spyOn(component, 'obtenerDatosEstado');

    component.ngOnInit();

    expect(component.donanteDomicilio).toHaveBeenCalled();
    expect(component.obtenerDatosEstado).toHaveBeenCalled();
    expect(component.asignacionForm).toBeDefined();
  });

  it('should fetch data for año catalogo', () => {
    component.obtenerDatosEstado();
    expect(cuposServiceMock.obtenerDatosAno).toHaveBeenCalled();
    expect(component.anoCatalogo.catalogos).toEqual([{ id: 1, descripcion: '2023' }]);
  });

  it('should handle buscar for "vigencia"', () => {
    component.asignacionForm.patchValue({ asignacionRadio: 'vigencia' });
    component.buscar();

    expect(component.mostrarVigencia).toBe(true);
    expect(component.mostrarMonto).toBe(false);
  });

  it('should handle buscar for "monto"', () => {
    component.asignacionForm.patchValue({ asignacionRadio: 'monto' });
    component.buscar();

    expect(component.mostrarVigencia).toBe(false);
    expect(component.mostrarMonto).toBe(true);
  });

  it('should update fechaFin on cambioFechaPago', () => {
    const nuevoFechaPago = '2023-12-31';
    component.cambioFechaPago(nuevoFechaPago);

    expect(component.asignacionForm.get('fechaFin')?.value).toBe(nuevoFechaPago);
    expect(tramiteStoreMock.setFechaFin).toHaveBeenCalledWith(nuevoFechaPago);
  });

  it('should validate the form and mark all fields as touched if invalid', () => {
    jest.spyOn(component.asignacionForm, 'markAllAsTouched');
    component.asignacionForm.patchValue({ asignacionsolitud: '', numTramite: '' });

    component.validarDestinatarioFormulario();

    expect(component.asignacionForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should check if a form field is valid using esValido', () => {
    const result = component.esValido(component.asignacionForm, 'asignacionsolitud');
    expect(validacionesServiceMock.isValid).toHaveBeenCalledWith(component.asignacionForm, 'asignacionsolitud');
    expect(result).toBe(true);
  });

  it('should update store values using setValoresStore', () => {
    component.setValoresStore(component.asignacionForm, 'asignacionsolitud', 'setAsignacionsolitud');
    expect(tramiteStoreMock.setAsignacionsolitud).toHaveBeenCalledWith(component.asignacionForm.get('asignacionsolitud')?.value);
  });

  it('should initialize the form with state values in donanteDomicilio', () => {
    component.donanteDomicilio();

    expect(component.asignacionForm.get('asignacionRadio')?.value).toBe('vigencia');
    expect(component.asignacionForm.get('asignacionsolitud')?.value).toBe('2023');
    expect(component.asignacionForm.get('numTramite')?.value).toBe('12345');
    expect(component.asignacionForm.get('fechaFin')?.value).toBe('2023-12-31');
    expect(component.asignacionForm.get('ampliar')?.value).toBe('100');
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});