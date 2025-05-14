import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatosTramiteComponent } from './datos-tramite.component';
import { Tramite40402Service } from '../../estados/tramite40402.service';
import { of } from 'rxjs';

describe('DatosTramiteComponent', () => {
  let component: DatosTramiteComponent;
  let tramite40402Service: Tramite40402Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: Tramite40402Service,
          useValue: {
            geTideCodTransportacionAerea: jest.fn().mockReturnValue(of([])), // Mocked observable
            getTipoDeCaatAerea: jest.fn().mockReturnValue(of([])), // Mocked observable
            buscarSolicitudPorCAATe: jest.fn().mockReturnValue(of({})), // Mocked observable
          },
        },
      ],
    });

    tramite40402Service = TestBed.inject(Tramite40402Service);
    component = new DatosTramiteComponent(
      TestBed.inject(FormBuilder),
      tramite40402Service
    );

    // Initialize the formulario property
    component.formulario = new FormBuilder().group({
      solicitud: new FormBuilder().group({
        caatSolicitudes: new FormBuilder().array([]),
      }),
      claveFolioCAAT: [''],
      idSolicitud: [''],
      descripcionTipoCaat: [''],
    });
  });

  describe('Initialization', () => {
    it('should initialize the form with default values', () => {
      component.ngOnInit();
      expect(component.formulario).toBeDefined();
      expect(component.formulario.get('claveFolioCAAT')?.value).toBe('');
    });

    it('should call cargarCodigoTransportacion and cargarTipoCaatAereo on initialization', () => {
      const cargarCodigoTransportacionSpy = jest.spyOn(component, 'cargarCodigoTransportacion');
      const cargarTipoCaatAereoSpy = jest.spyOn(component, 'cargarTipoCaatAereo');
      component.ngOnInit();
      expect(cargarCodigoTransportacionSpy).toHaveBeenCalled();
      expect(cargarTipoCaatAereoSpy).toHaveBeenCalled();
    });
  });

  describe('caatConMayusculas', () => {
    it('should convert the value of claveFolioCAAT to uppercase', () => {
      const event = { target: { value: 'abcd' } };
      component.caatConMayusculas(event);
      expect(component.formulario.get('claveFolioCAAT')?.value).toBe('ABCD');
    });
  });

  describe('buscarSolicitudPorCAAT', () => {
    it('should call buscarSolicitudPorCAATe and patch the form with the response', () => {
      const mockResponse = {
        idSolicitud: '123',
        claveFolioCAAT: 'ABCD',
        descripcionTipoCaat: 'Test Description',
      };
      jest.spyOn(tramite40402Service, 'buscarSolicitudPorCAATe').mockReturnValue(of(mockResponse));

      component.formulario.get('claveFolioCAAT')?.setValue('ABCD');
      component.buscarSolicitudPorCAAT();

      expect(tramite40402Service.buscarSolicitudPorCAATe).toHaveBeenCalledWith('ABCD');
      expect(component.formulario.get('idSolicitud')?.value).toBe('123');
      expect(component.formulario.get('descripcionTipoCaat')?.value).toBe('Test Description');
    });

    it('should not call buscarSolicitudPorCAATe if the form is invalid', () => {
      const buscarSolicitudSpy = jest.spyOn(tramite40402Service, 'buscarSolicitudPorCAATe');
      component.formulario.get('claveFolioCAAT')?.setValue('');
      component.buscarSolicitudPorCAAT();
      expect(buscarSolicitudSpy).toHaveBeenCalled();
    });
  });

  describe('cargarCodigoTransportacion', () => {
    it('should load transport codes from the service', () => {
      const mockData = [{ id: 1, descripcion: 'Code 1' }];
      jest.spyOn(tramite40402Service, 'geTideCodTransportacionAerea').mockReturnValue(of(mockData));

      component.cargarCodigoTransportacion();
      expect(component.codigoTransportacion).toEqual(mockData);
    });
  });

  describe('cargarTipoCaatAereo', () => {
    it('should load CAAT types from the service', () => {
      const mockData = [{ id: 1, descripcion: 'Type 1' }];
      jest.spyOn(tramite40402Service, 'getTipoDeCaatAerea').mockReturnValue(of(mockData));

      component.cargarTipoCaatAereo();
      expect(component.tipoCaatAereo).toEqual(mockData);
    });
  });
});