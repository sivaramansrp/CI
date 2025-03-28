import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RepresentanteLegalComponent } from './representante-legal-rfc.component';
import { DatosDomicilioLegalStore } from '../../estados/stores/datos-domicilio-legal.store';
import { DatosDomicilioLegalQuery } from '../../estados/queries/datos-domicilio-legal.query';
import { Subject, of } from 'rxjs';

describe('RepresentanteLegalComponent', () => {
  let component: RepresentanteLegalComponent;
  let fixture: ComponentFixture<RepresentanteLegalComponent>;
  let mockStore: jest.Mocked<DatosDomicilioLegalStore>;
  let mockQuery: jest.Mocked<DatosDomicilioLegalQuery>;

  beforeEach(async () => {
    mockStore = {
      setRfc: jest.fn(),
      setNombre: jest.fn(),
      setApellidoPaterno: jest.fn(),
      setApellidoMaterno: jest.fn(),
    } as unknown as jest.Mocked<DatosDomicilioLegalStore>;

    mockQuery = {
      selectSolicitud$: of({
        rfc: 'RFC123456',
      }),
    } as unknown as jest.Mocked<DatosDomicilioLegalQuery>;

    await TestBed.configureTestingModule({
      declarations: [RepresentanteLegalComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: DatosDomicilioLegalStore, useValue: mockStore },
        { provide: DatosDomicilioLegalQuery, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentanteLegalComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and solicitudState on ngOnInit', () => {
    component.ngOnInit();

    expect(component.solicitudState).toEqual({
      rfc: 'RFC123456',
    });

    expect(component.representante.value).toEqual({
      rfc: 'RFC123456',
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
    });
  });

  it('should call the appropriate store method when setValoresStore is called', () => {
    component.ngOnInit();
    component.setValoresStore(component.representante, 'rfc', 'setRfc');
    expect(mockStore.setRfc).toHaveBeenCalledWith('RFC123456');

    component.setValoresStore(component.representante, 'nombre', 'setNombre');
    expect(mockStore.setNombre).toHaveBeenCalledWith('');

    component.setValoresStore(component.representante, 'apellidoPaterno', 'setApellidoPaterno');
    expect(mockStore.setApellidoPaterno).toHaveBeenCalledWith('');

    component.setValoresStore(component.representante, 'apellidoMaterno', 'setApellidoMaterno');
    expect(mockStore.setApellidoMaterno).toHaveBeenCalledWith('');
  });

  it('should patch values to the form when obtenerValor is called', () => {
    component.ngOnInit();
    component.obtenerValor();

    expect(component.representante.value).toEqual({
      rfc: 'RFC123456',
      nombre: 47875,
      apellidoPaterno: 'Paterno',
      apellidoMaterno: 'Materno',
    });
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
