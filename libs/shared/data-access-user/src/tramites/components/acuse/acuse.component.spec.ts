import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AcuseComponent } from './acuse.component';
import { DocumentoService } from '../../..';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Interface para las respuestas mock
interface MockResponse<T> {
  datos: T;
  codigo?: string;
  mensaje?: string;
  path?: string;
  timestamp?: string;
}

describe('AcuseComponent', () => {
  let component: AcuseComponent;
  let fixture: ComponentFixture<AcuseComponent>;
  
  // Mocks con tipado mejorado
  let mockDocumentoService: {
    generarDoc: jest.Mock;
    getVisualizarDoc: jest.Mock;
  };
  
  let mockRouter: {
    navigate: jest.Mock;
  };

  beforeEach(async () => {
    // Configuración de mocks
    mockDocumentoService = {
      generarDoc: jest.fn(),
      getVisualizarDoc: jest.fn()
    };

    mockRouter = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [AcuseComponent],
      providers: [
        { provide: DocumentoService, useValue: mockDocumentoService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AcuseComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('debería actualizar txtAlerta cuando cambia el input', () => {
      const cambios = {
        txtAlerta: {
          currentValue: 'Nueva alerta',
          previousValue: '',
          firstChange: false,
          isFirstChange: () => false
        }
      };

      component.ngOnChanges(cambios);
      expect(component.txtAlerta).toBe('Nueva alerta');
    });

    it('debería llamar a generarYMostrarDocumentos cuando cambia idSolicitud', () => {
      const spy = jest.spyOn(component, 'generarYMostrarDocumentos');
      
      const cambios = {
        idSolicitud: {
          currentValue: 123,
          previousValue: null,
          firstChange: true,
          isFirstChange: () => true
        }
      };

      component.ngOnChanges(cambios);
      expect(spy).toHaveBeenCalled();
    });

    it('no debería llamar a generarYMostrarDocumentos cuando cambian otros inputs', () => {
      const spy = jest.spyOn(component, 'generarYMostrarDocumentos');
      
      const cambios = {
        titulo: {
          currentValue: 'Nuevo título',
          previousValue: '',
          firstChange: true,
          isFirstChange: () => true
        }
      };

      component.ngOnChanges(cambios);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('generarYMostrarDocumentos', () => {
    it('debería generar y mostrar documentos correctamente', fakeAsync(() => {
      const mockGenResponse: MockResponse<{ llave_archivo: string }> = {
        datos: { llave_archivo: 'test-key' },
        codigo: '00',
        mensaje: 'Éxito'
      };

      const mockViewResponse: MockResponse<{ nombre_archivo: string; contenido: string }> = {
        datos: {
          nombre_archivo: 'documento.pdf',
          contenido: btoa('contenido-pdf')
        }
      };

      mockDocumentoService.generarDoc.mockReturnValue(of(mockGenResponse));
      mockDocumentoService.getVisualizarDoc.mockReturnValue(of(mockViewResponse));

      component.idSolicitud = 123;
      component.generarYMostrarDocumentos();
      tick();

      expect(mockDocumentoService.generarDoc).toHaveBeenCalled();
      expect(mockDocumentoService.getVisualizarDoc).toHaveBeenCalledWith('test-key');
      expect(component.datosTablaAcuse.length).toBe(1);
      expect(component.datosTablaAcuse[0].documento).toBe('documento.pdf');
    }));

    it('debería manejar errores al generar documentos', fakeAsync(() => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mockDocumentoService.generarDoc.mockReturnValue(throwError(() => new Error('Error de prueba')));

      component.idSolicitud = 123;
      component.generarYMostrarDocumentos();
      tick();

      expect(consoleSpy).toHaveBeenCalledWith('Error al generar documentos:', expect.any(Error));
      consoleSpy.mockRestore();
    }));

    it('debería manejar errores al visualizar documentos', fakeAsync(() => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      const mockGenResponse: MockResponse<{ llave_archivo: string }> = {
        datos: { llave_archivo: 'test-key' }
      };

      mockDocumentoService.generarDoc.mockReturnValue(of(mockGenResponse));
      mockDocumentoService.getVisualizarDoc.mockReturnValue(throwError(() => new Error('Error al visualizar')));

      component.idSolicitud = 123;
      component.generarYMostrarDocumentos();
      tick();

      expect(consoleSpy).toHaveBeenCalledWith('Error:', expect.any(Error));
      consoleSpy.mockRestore();
    }));
  });

  describe('crearUrlPdf', () => {
    it('debería crear una URL válida para PDF', () => {
      const mockBase64 = btoa('contenido-pdf');
      const url = component.crearUrlPdf(mockBase64);
      
      expect(url).toMatch(/^blob:/);
      expect(url).toBeTruthy();
    });
  });

  describe('verPdf', () => {
    it('debería abrir el PDF en nueva ventana', () => {
      const windowOpenSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
      const testUrl = 'http://ejemplo.com/doc.pdf';
      
      component.verPdf(testUrl);
      
      expect(windowOpenSpy).toHaveBeenCalledWith(testUrl, '_blank');
      windowOpenSpy.mockRestore();
    });
  });

  describe('salir', () => {
    it('debería navegar a /seleccion-tramite', () => {
      component.salir();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/seleccion-tramite']);
    });
  });
});