import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DatosDeLaComponent } from './datos-solicitud.component';
import { DatosDomicilioLegalStore } from '../../estados/stores/datos-domicilio-legal.store';
import { DatosDomicilioLegalQuery } from '../../estados/queries/datos-domicilio-legal.query';
import { Subject, of } from 'rxjs';

describe('DatosDeLaComponent', () => {
  let component: DatosDeLaComponent;
  let fixture: ComponentFixture<DatosDeLaComponent>;
  let mockStore: jest.Mocked<DatosDomicilioLegalStore>;
  let mockQuery: jest.Mocked<DatosDomicilioLegalQuery>;

  beforeEach(async () => {
    mockStore = {
      setRfcDel: jest.fn(),
      setDenominacion: jest.fn(),
      setCorreo: jest.fn(),
    } as unknown as jest.Mocked<DatosDomicilioLegalStore>;

    mockQuery = {
      selectSolicitud$: of({
        rfcDel: 'RFC123456',
        denominacion: 'Empresa XYZ',
        correo: 'correo@empresa.com',
      }),
    } as unknown as jest.Mocked<DatosDomicilioLegalQuery>;

    await TestBed.configureTestingModule({
      declarations: [DatosDeLaComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: DatosDomicilioLegalStore, useValue: mockStore },
        { provide: DatosDomicilioLegalQuery, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and solicitudState on ngOnInit', () => {
    component.ngOnInit();
    expect(component.solicitudState).toEqual({
      rfcDel: 'RFC123456',
      denominacion: 'Empresa XYZ',
      correo: 'correo@empresa.com',
    });
    expect(component.forma.value).toEqual({
      rfcDel: 'RFC123456',
      denominacion: 'Empresa XYZ',
      correo: 'correo@empresa.com',
    });
  });

  it('should disable all form controls on initialization', () => {
    component.ngOnInit();
    expect(component.forma.get('rfcDel')?.disabled).toBe(true);
    expect(component.forma.get('denominacion')?.disabled).toBe(true);
    expect(component.forma.get('correo')?.disabled).toBe(true);
  });

  it('should enable all form controls when alternarControlesDeFormulario is called', () => {
    component.ngOnInit();
    component.alternarControlesDeFormulario();
    expect(component.forma.get('rfcDel')?.enabled).toBe(true);
    expect(component.forma.get('denominacion')?.enabled).toBe(true);
    expect(component.forma.get('correo')?.enabled).toBe(true);
  });

  it('should call the appropriate store method when setValoresStore is called', () => {
    component.ngOnInit();
    component.setValoresStore(component.forma, 'rfcDel', 'setRfcDel');
    expect(mockStore.setRfcDel).toHaveBeenCalledWith('RFC123456');

    component.setValoresStore(component.forma, 'denominacion', 'setDenominacion');
    expect(mockStore.setDenominacion).toHaveBeenCalledWith('Empresa XYZ');

    component.setValoresStore(component.forma, 'correo', 'setCorreo');
    expect(mockStore.setCorreo).toHaveBeenCalledWith('correo@empresa.com');
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
