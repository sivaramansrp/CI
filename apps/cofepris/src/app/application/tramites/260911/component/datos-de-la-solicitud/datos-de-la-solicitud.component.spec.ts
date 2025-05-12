import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite260911Query } from '../../estados/queries/tramite260911.query';
import { Tramite260911Store } from '../../estados/store/tramite260911.store';
import { of } from 'rxjs';

describe('DatosDeLaSolicitud260904Component', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let tramite260904Query: jest.Mocked<Tramite260911Query>;
  let tramite260904Store: jest.Mocked<Partial<Tramite260911Store>>;

  beforeEach(async () => {
    const queryMock = {
      btonDeRadio$: of('option1'),
      justificacion$: of('justification'),
      rfcDel$: of('RFC123'),
      denominacion$: of('Denomination'),
      correo$: of('test@example.com'),
    } as jest.Mocked<Tramite260911Query>;

    const storeMock = {
      setBtonDeRadio: jest.fn(),
      setJustificacion: jest.fn(),
      setRfcDel: jest.fn(),
      setDenominacion: jest.fn(),
      setCorreo: jest.fn(),
    } as jest.Mocked<Partial<Tramite260911Store>>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite260911Query, useValue: queryMock },
        { provide: Tramite260911Store, useValue: storeMock },
      ],
      declarations:[DatosDeLaSolicitudComponent]
    }).compileComponents();

    tramite260904Query = TestBed.inject(
      Tramite260911Query
    ) as jest.Mocked<Tramite260911Query>;
    tramite260904Store = TestBed.inject(
      Tramite260911Store
    ) as jest.Mocked<Partial<Tramite260911Store>>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
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
    expect(component.form.get('justificacion')?.value).toBe('justification');
    expect(component.datosDelEstablecimiento.get('rfcDel')?.value).toBe('RFC123');
    expect(component.datosDelEstablecimiento.get('denominacion')?.value).toBe('Denomination');
    expect(component.datosDelEstablecimiento.get('correo')?.value).toBe('test@example.com');
  });

  it('should call store methods on get methods', () => {
    component.getBtonDeRadio();
    expect(tramite260904Store.setBtonDeRadio).toHaveBeenCalledWith('option1');

    component.getJustificacion();
    expect(tramite260904Store.setJustificacion).toHaveBeenCalledWith('justification');

    component.getRfcDel();
    expect(tramite260904Store.setRfcDel).toHaveBeenCalledWith('RFC123');

    component.getDenominacion();
    expect(tramite260904Store.setDenominacion).toHaveBeenCalledWith('Denomination');

    component.getCorreo();
    expect(tramite260904Store.setCorreo).toHaveBeenCalledWith('test@example.com');
  });
});