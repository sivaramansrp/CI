import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { DatosDomicilioLegalStore } from '../../estados/stores/datos-domicilio-legal.store';
import { DatosDomicilioLegalQuery } from '../../estados/queries/datos-domicilio-legal.query';
import { RepresentanteLegalRfcComponent } from './representante-legal-rfc.component';

describe('RepresentanteLegalRfcComponent', () => {
  let component: RepresentanteLegalRfcComponent;
  let mockStore: jest.Mocked<DatosDomicilioLegalStore>;
  let mockQuery: jest.Mocked<DatosDomicilioLegalQuery>;

  beforeEach(() => {
    mockStore = {
      setNombre: jest.fn(),
      setApellidoPaterno: jest.fn(),
      setApellidoMaterno: jest.fn(),
    } as unknown as jest.Mocked<DatosDomicilioLegalStore>;

    mockQuery = {
      selectSolicitud$: of({
        rfc: 'ABC123456789',
      }),
    } as unknown as jest.Mocked<DatosDomicilioLegalQuery>;

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: DatosDomicilioLegalStore, useValue: mockStore },
        { provide: DatosDomicilioLegalQuery, useValue: mockQuery },
      ],
    });

    const fb = TestBed.inject(FormBuilder);
    component = new RepresentanteLegalRfcComponent(fb, mockStore, mockQuery);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and state on ngOnInit', () => {
    component.ngOnInit();

    expect(component.solicitudState).toEqual({ rfc: 'ABC123456789' });
    expect(component.representante).toBeDefined();
    expect(component.representante.get('rfc')?.value).toBe('ABC123456789');
    expect(component.representante.get('nombre')?.disabled).toBe(true);
  });

  it('should patch form values in obtenerValor', () => {
    component.ngOnInit();
    component.obtenerValor();

    expect(component.representante.get('nombre')?.value).toBe(47875);
    expect(component.representante.get('apellidoPaterno')?.value).toBe('Paterno');
    expect(component.representante.get('apellidoMaterno')?.value).toBe('Materno');
  });

  it('should call the correct store method in setValoresStore', () => {
    component.ngOnInit();
    component.representante.patchValue({ nombre: 'John' });

    component.setValoresStore(component.representante, 'nombre', 'setNombre');
    expect(mockStore.setNombre).toHaveBeenCalledWith('John');
  });

  it('should clean up observables on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});