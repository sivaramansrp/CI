import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CantidadSolicitadaComponent } from './cantidad-solicitada.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

import { Tramite120402Query } from '../../estados/tramite120402.query';
import { Tramite120402Store } from '../../estados/tramite120402.store';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

describe('CantidadSolicitadaComponent', () => {
  let component: CantidadSolicitadaComponent;
  let fixture: ComponentFixture<CantidadSolicitadaComponent>;

  let mockTramiteQuery: any;
  let mockTramiteStore: any;
  let mockConsultaioQuery: any;

  const solicitudStateMock = {
    cantidadSolicitada: 10
  };

  const readonlyState = {
    readonly: true
  };

  beforeEach(async () => {
    mockTramiteQuery = {
      selectSolicitud$: of(solicitudStateMock)
    };

    mockTramiteStore = {
      setTramite120402State: jest.fn()
    };

    mockConsultaioQuery = {
      selectConsultaioState$: new Subject()
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, CantidadSolicitadaComponent,TituloComponent],
      declarations: [],
      providers: [
        { provide: Tramite120402Query, useValue: mockTramiteQuery },
        { provide: Tramite120402Store, useValue: mockTramiteStore },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CantidadSolicitadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
  });

  it('should set solicitudState and create form correctly', () => {
    component.crearFormulario();
    expect(component.solicitudState).toEqual(solicitudStateMock);
    expect(component.form.get('cantidadSolicitada')).toBeTruthy();
  });

  it('should disable form in readonly mode', () => {
    component.esFormularioSoloLectura = true;
    component.crearFormulario();
    component.guardarDatosFormulario();
    expect(component.form.disabled).toBe(true);
  });

  it('should enable form in editable mode', () => {
    component.esFormularioSoloLectura = false;
    component.crearFormulario();
    component.guardarDatosFormulario();
    expect(component.form.enabled).toBe(true);
  });

  it('should return true if control is invalid and touched or dirty', () => {
    component.crearFormulario();
    const control = component.form.get('cantidadSolicitada');
    control?.markAsTouched();
    control?.setValue(null);
    expect(component.esInvalido('cantidadSolicitada')).toBe(true);
  });

  it('should return false if control is valid', () => {
    component.crearFormulario();
    component.form.get('cantidadSolicitada')?.setValue(5);
    expect(component.esInvalido('cantidadSolicitada')).toBe(false);
  });

  it('should mark form as touched if invalid on submit', () => {
    component.crearFormulario();
    const spy = jest.spyOn(component.form, 'markAllAsTouched');
    component.form.get('cantidadSolicitada')?.setValue(null);
    component.validarYEnviarFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should get value from store', () => {
    const select$ = new Subject<any>();
    mockTramiteQuery.selectSolicitud$ = select$;
    select$.next(solicitudStateMock);
    expect(component.solicitudState).toEqual(solicitudStateMock);
  });

  it('should set value in store using setValorStore', () => {
    component.crearFormulario();
    component.form.get('cantidadSolicitada')?.setValue(20);
    component.setValorStore(component.form, 'cantidadSolicitada');
    expect(mockTramiteStore.setTramite120402State).toHaveBeenCalledWith({
      cantidadSolicitada: 20
    });
  });

it('should call inicializarEstadoFormulario when consultaio state changes', () => {
  const spy = jest.spyOn(CantidadSolicitadaComponent.prototype as any, 'inicializarEstadoFormulario');
  // Re-create the component so the spy is active during constructor subscription
  fixture = TestBed.createComponent(CantidadSolicitadaComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();

  mockConsultaioQuery.selectConsultaioState$.next(readonlyState);

  expect(spy).toHaveBeenCalled();
});
});
