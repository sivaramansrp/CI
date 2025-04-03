import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { DatosDeLaComponent } from './datos-solicitud.component';
import { DatosDomicilioLegalStore } from '../../estados/stores/datos-domicilio-legal.store';
import { DatosDomicilioLegalQuery } from '../../estados/queries/datos-domicilio-legal.query';

describe('DatosDeLaComponent', () => {
  let component: DatosDeLaComponent;
  let mockStore: jest.Mocked<DatosDomicilioLegalStore>;
  let mockQuery: jest.Mocked<DatosDomicilioLegalQuery>;

  beforeEach(() => {
    mockStore = {
      setRfcDel: jest.fn(),
      setDenominacion: jest.fn(),
      setCorreo: jest.fn(),
    } as unknown as jest.Mocked<DatosDomicilioLegalStore>;

    mockQuery = {
      selectSolicitud$: of({
        rfcDel: 'RFC123456',
        denominacion: 'Test Denominacion',
        correo: 'test@example.com',
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
    component = new DatosDeLaComponent(fb, mockStore, mockQuery);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize solicitudState and form', () => {
      component.ngOnInit();

      expect(component.solicitudState).toEqual({
        rfcDel: 'RFC123456',
        denominacion: 'Test Denominacion',
        correo: 'test@example.com',
      });

      expect(component.forma.value).toEqual({
        rfcDel: 'RFC123456',
        denominacion: 'Test Denominacion',
        correo: 'test@example.com',
      });
    });
  });

  describe('alternarControlesDeFormulario', () => {
    it('should enable all disabled controls in the form', () => {
      component.ngOnInit();
      component.forma.controls['rfcDel'].disable();
      component.forma.controls['denominacion'].disable();
      component.forma.controls['correo'].disable();

      component.alternarControlesDeFormulario();

      expect(component.forma.controls['rfcDel'].enabled).toBe(true);
      expect(component.forma.controls['denominacion'].enabled).toBe(true);
      expect(component.forma.controls['correo'].enabled).toBe(true);
    });
  });

  describe('setValoresStore', () => {
    it('should call the correct store method with the control value', () => {
      component.ngOnInit();
      component.setValoresStore(component.forma, 'rfcDel', 'setRfcDel');
      component.setValoresStore(component.forma, 'denominacion', 'setDenominacion');
      component.setValoresStore(component.forma, 'correo', 'setCorreo');

      expect(mockStore.setRfcDel).toHaveBeenCalledWith('RFC123456');
      expect(mockStore.setDenominacion).toHaveBeenCalledWith('Test Denominacion');
      expect(mockStore.setCorreo).toHaveBeenCalledWith('test@example.com');
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete the destroyNotifier$ subject', () => {
      const destroySpy = jest.spyOn(component['destroyNotifier$'], 'complete');
      component.ngOnDestroy();
      expect(destroySpy).toHaveBeenCalled();
    });
  });
});