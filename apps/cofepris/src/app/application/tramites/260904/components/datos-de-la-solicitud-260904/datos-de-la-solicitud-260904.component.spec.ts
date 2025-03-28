import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitud260904Component } from './datos-de-la-solicitud-260904.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite260904Query } from '../../estados/queries/tramite260904.query';
import { Tramite260904Store } from '../../estados/tramites/tramite260904.store';
import { of } from 'rxjs';

describe('DatosDeLaSolicitud260904Component', () => {
  let component: DatosDeLaSolicitud260904Component;
  let fixture: ComponentFixture<DatosDeLaSolicitud260904Component>;
  let tramite260904Query: jest.Mocked<Tramite260904Query>;
  let tramite260904Store: jest.Mocked<Partial<Tramite260904Store>>;

  beforeEach(async () => {
    const queryMock = {
      btonDeRadio$: of('option1'),
      justificación$: of('justification'),
      rfcDel$: of('RFC123'),
      denominacion$: of('Denomination'),
      correo$: of('test@example.com'),
    } as jest.Mocked<Tramite260904Query>;

    const storeMock = {
      setBtonDeRadio: jest.fn(),
      setJustificación: jest.fn(),
      setRfcDel: jest.fn(),
      setDenominacion: jest.fn(),
      setCorreo: jest.fn(),
    } as jest.Mocked<Partial<Tramite260904Store>>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosDeLaSolicitud260904Component],
      providers: [
        FormBuilder,
        { provide: Tramite260904Query, useValue: queryMock },
        { provide: Tramite260904Store, useValue: storeMock },
      ],
    }).compileComponents();

    tramite260904Query = TestBed.inject(
      Tramite260904Query
    ) as jest.Mocked<Tramite260904Query>;
    tramite260904Store = TestBed.inject(
      Tramite260904Store
    ) as jest.Mocked<Partial<Tramite260904Store>>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDeLaSolicitud260904Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.datosDelEstablecimiento).toBeDefined();
  });

  it('should toggle colapsable state', () => {
    const initialState = component.colapsable;
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(!initialState);
  });

  it('should set form values from observables', () => {
    component.ngOnInit();
    expect(component.form.get('btonDeRadio')?.value).toBe('option1');
    expect(component.form.get('justificación')?.value).toBe('justification');
    expect(component.datosDelEstablecimiento.get('rfcDel')?.value).toBe('RFC123');
    expect(component.datosDelEstablecimiento.get('denominacion')?.value).toBe('Denomination');
    expect(component.datosDelEstablecimiento.get('correo')?.value).toBe('test@example.com');
  });

  it('should call store methods on get methods', () => {
    component.getBtonDeRadio();
    expect(tramite260904Store.setBtonDeRadio).toHaveBeenCalledWith('option1');

    component.getJustificacion();
    expect(tramite260904Store.setJustificación).toHaveBeenCalledWith('justification');

    component.getRfcDel();
    expect(tramite260904Store.setRfcDel).toHaveBeenCalledWith('RFC123');

    component.getDenominacion();
    expect(tramite260904Store.setDenominacion).toHaveBeenCalledWith('Denomination');

    component.getCorreo();
    expect(tramite260904Store.setCorreo).toHaveBeenCalledWith('test@example.com');
  });
});