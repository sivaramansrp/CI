import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirmaElectronicaComponent } from './firma-electronica.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirmaElectronicaService } from '../../../core/services/shared/firma-electronica/firma-electronica.service';
import { ToastrService } from 'ngx-toastr';
import { ValidacionesFormularioService } from '../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
import { LOGIN } from '../../constantes/constantes';

describe('FirmaElectronicaComponent', () => {
  let component: FirmaElectronicaComponent;
  let fixture: ComponentFixture<FirmaElectronicaComponent>;
  let mockFirmaService: jest.Mocked<FirmaElectronicaService>;
  let mockToastrService: jest.Mocked<ToastrService>;
  let mockFormValidator: jest.Mocked<ValidacionesFormularioService>;

  beforeEach(async () => {
    mockFirmaService = {
      firmarCadena: jest.fn()
    } as unknown as jest.Mocked<FirmaElectronicaService>;

    mockToastrService = {
      error: jest.fn(),
      success: jest.fn()
    } as unknown as jest.Mocked<ToastrService>;

    mockFormValidator = {
      isValid: jest.fn()
    } as unknown as jest.Mocked<ValidacionesFormularioService>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule],
      declarations: [FirmaElectronicaComponent],
      providers: [
        FormBuilder,
        { provide: FirmaElectronicaService, useValue: mockFirmaService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: ValidacionesFormularioService, useValue: mockFormValidator }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FirmaElectronicaComponent);
    component = fixture.componentInstance;
    component.tipo = 'firma'; // Valor por defecto para pruebas
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inputs and Outputs', () => {
    it('should have required tipo input', () => {
      expect(() => {
        component.tipo = '';
        fixture.detectChanges();
      }).toThrowError();
    });

    it('should accept cadenaOriginal input', () => {
      const testCadena = 'test cadena';
      component.cadenaOriginal = testCadena;
      expect(component.cadenaOriginal).toBe(testCadena);
    });
  });

  describe('login getter', () => {
    it('should return true when tipo is LOGIN', () => {
      component.tipo = LOGIN;
      expect(component.login).toBe(true);
    });

    it('should return false when tipo is not LOGIN', () => {
      component.tipo = 'firma';
      expect(component.login).toBe(false);
    });
  });

  describe('isValid', () => {
    it('should call formValidator.isValid with correct parameters', () => {
      const fieldName = 'password';
      component.isValid(fieldName);
      expect(mockFormValidator.isValid).toHaveBeenCalledWith(component.FormCertificado, fieldName);
    });
  });

  describe('handleFile', () => {
    it('should set certFileObj when valid cer file is provided', () => {
      const mockFile = new File([''], 'test.cer', { type: 'application/x-x509-ca-cert' });
      const mockEvent = {
        target: {
          files: [mockFile]
        }
      } as unknown as Event;

      component.handleFile('cer', mockEvent);
      expect(component.certFileObj).toBe(mockFile);
    });

    it('should show error when invalid cer file is provided', () => {
      const mockFile = new File([''], 'test.txt', { type: 'text/plain' });
      const mockEvent = {
        target: {
          files: [mockFile]
        }
      } as unknown as Event;

      component.handleFile('cer', mockEvent);
      expect(mockToastrService.error).toHaveBeenCalledWith('El archivo debe ser un certificado (.cer)');
      expect(component.certFileObj).toBeUndefined();
    });

    it('should set keyFileObj when valid key file is provided', () => {
      const mockFile = new File([''], 'test.key', { type: 'application/x-pem-file' });
      const mockEvent = {
        target: {
          files: [mockFile]
        }
      } as unknown as Event;

      component.handleFile('key', mockEvent);
      expect(component.keyFileObj).toBe(mockFile);
    });

    it('should show error when invalid key file is provided', () => {
      const mockFile = new File([''], 'test.txt', { type: 'text/plain' });
      const mockEvent = {
        target: {
          files: [mockFile]
        }
      } as unknown as Event;

      component.handleFile('key', mockEvent);
      expect(mockToastrService.error).toHaveBeenCalledWith('El archivo debe ser una llave privada (.key)');
      expect(component.keyFileObj).toBeUndefined();
    });
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      // Configurar elementos del DOM simulados
      component.cerInputElement = document.createElement('input');
      component.keyInputElement = document.createElement('input');
      component.passwordInputElement = document.createElement('input');
      component.passwordInputElement.id = 'password';
      component.FormCertificado.get('password')?.setValue('testpassword');
    });

    it('should show error when form is invalid', async () => {
      component.FormCertificado.get('password')?.setValue('');
      await component.onSubmit();
      expect(mockToastrService.error).toHaveBeenCalledWith('Por favor complete todos los campos');
      expect(component.isLoading).toBe(false);
    });

    it('should show error when required inputs are missing', async () => {
      component.cerInputElement = undefined;
      await component.onSubmit();
      expect(mockToastrService.error).toHaveBeenCalledWith('Por favor complete todos los campos');
      expect(component.isLoading).toBe(false);
    });

    it('should handle login case successfully', async () => {
      component.tipo = LOGIN;
      mockFirmaService.firmarCadena.mockResolvedValue({
        certificado: 'serial123',
        serialNumber: 'serial123',
        rfc: 'TEST123456',
        fechaFin: '2025-12-31'
      });

      const validoSpy = jest.spyOn(component.valido, 'emit');

      await component.onSubmit();

      expect(mockFirmaService.firmarCadena).toHaveBeenCalled();
      expect(validoSpy).toHaveBeenCalledWith(true);
      expect(component.isLoading).toBe(false);
    });

    it('should handle firma case successfully', async () => {
      component.cadenaOriginal = 'test cadena';
      mockFirmaService.firmarCadena.mockResolvedValue({
        firma: 'firmaBase64',
        certificado: 'serial123',
        serialNumber: 'serial123',
        rfc: 'TEST123456',
        fechaFin: '2025-12-31'
      });

      const validoSpy = jest.spyOn(component.valido, 'emit');
      const firmaSpy = jest.spyOn(component.datosFirma, 'emit');

      await component.onSubmit();

      expect(mockFirmaService.firmarCadena).toHaveBeenCalled();
      expect(validoSpy).toHaveBeenCalledWith(true);
      expect(firmaSpy).toHaveBeenCalledWith({
        firma: 'firmaBase64',
        certSerialNumber: 'serial123',
        rfc: 'TEST123456',
        fechaFin: '2025-12-31'
      });
      expect(mockToastrService.success).toHaveBeenCalledWith('Firma electrónica generada correctamente');
      expect(component.isLoading).toBe(false);
    });

    it('should handle error case', async () => {
      const testError = new Error('Test error');
      mockFirmaService.firmarCadena.mockRejectedValue(testError);

      const validoSpy = jest.spyOn(component.valido, 'emit');

      await component.onSubmit();

      expect(mockFirmaService.firmarCadena).toHaveBeenCalled();
      expect(validoSpy).toHaveBeenCalledWith(false);
      expect(mockToastrService.error).toHaveBeenCalledWith('Test error');
      expect(component.isLoading).toBe(false);
    });

    it('should handle error when no firma is generated', async () => {
      component.cadenaOriginal = 'test cadena';
      mockFirmaService.firmarCadena.mockResolvedValue({
        certificado: 'serial123',
        serialNumber: 'serial123',
        rfc: 'TEST123456',
        fechaFin: '2025-12-31'
      });

      await component.onSubmit();

      expect(mockToastrService.error).toHaveBeenCalledWith('No se generó la firma electrónica');
      expect(component.isLoading).toBe(false);
    });
  });
});