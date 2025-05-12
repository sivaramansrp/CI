import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosEmpresaComponent } from './datos-empresa.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite260912Query } from '../../estados/tramite-260912.query';
import { Tramite260912Store } from '../../estados/tramite-260912.store';
import { of } from 'rxjs';

describe('DatosEmpresaComponent', () => {
  let component: DatosEmpresaComponent;
  let fixture: ComponentFixture<DatosEmpresaComponent>;
  let tramite260912QueryMock: jest.Mocked<Tramite260912Query>;
  let tramite260912StoreMock: jest.Mocked<Partial<Tramite260912Store>>;

  beforeEach(async () => {
    const queryMock = {
      btonDeRadio$: of('option1'),
      justificacion$: of('justification'),
      rfcDel$: of('RFC123'),
      denominacion$: of('Denomination'),
      correo$: of('test@example.com'),
      selectTramite260912$: of({
        btonDeRadio: 'option1',
        justificacion: 'justification',
        rfcDel: 'RFC123',
        denominacion: 'Denomination',
        correo: 'test@example.com',
      }), // Mocking selectTramite260912$
    } as jest.Mocked<Tramite260912Query>;

    const storeMock = {
      setBtonDeRadio: jest.fn(),
      setJustificacion: jest.fn(),
      setRfcDel: jest.fn(),
      setDenominacion: jest.fn(),
      setCorreo: jest.fn(),
    } as jest.Mocked<Partial<Tramite260912Store>>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosEmpresaComponent],
      providers: [
        FormBuilder,
        { provide: Tramite260912Query, useValue: queryMock },
        { provide: Tramite260912Store, useValue: storeMock },
      ],
    }).compileComponents();

    tramite260912QueryMock = TestBed.inject(
      Tramite260912Query
    ) as jest.Mocked<Tramite260912Query>;
    tramite260912StoreMock = TestBed.inject(
      Tramite260912Store
    ) as jest.Mocked<Partial<Tramite260912Store>>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosEmpresaComponent);
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
    expect(tramite260912StoreMock.setBtonDeRadio).toHaveBeenCalledWith('option1');

    component.getJustificacion();
    expect(tramite260912StoreMock.setJustificacion).toHaveBeenCalledWith('justification');

    component.getRfcDel();
    expect(tramite260912StoreMock.setRfcDel).toHaveBeenCalledWith('RFC123');

    component.getDenominacion();
    expect(tramite260912StoreMock.setDenominacion).toHaveBeenCalledWith('Denomination');

    component.getCorreo();
    expect(tramite260912StoreMock.setCorreo).toHaveBeenCalledWith('test@example.com');
  });
});