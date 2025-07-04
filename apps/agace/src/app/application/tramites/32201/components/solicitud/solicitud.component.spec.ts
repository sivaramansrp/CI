import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudComponent } from './solicitud.component';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values on ngOnInit', () => {
    const mockState = {
      regimen_0: false,
      regimen_1: false,
      regimen_2: false,
      regimen_3: false,
      manifiesto: false,
    };

    jest
      .spyOn(component['tramite32201Query'], 'select') // Replace 'selectSolicitud$' with a valid method like 'select'
      .mockReturnValue({
        pipe: jest.fn().mockReturnValue({
          subscribe: jest.fn((callback) => callback(mockState)),
        }),
      } as any);

    component.ngOnInit();

    expect(component.solicitudForm.value).toEqual({
      regimen_0: false,
      regimen_1: false,
      regimen_2: false,
      regimen_3: false,
      manifiesto: false,
    });
  });

  it('should call setValoresStore with correct parameters', () => {
      const mockForm = new FormGroup({
        testField: new FormControl('testValue'),
      });
      const mockMethod = jest.fn();
      component['tramite32201Store'] = { testMethod: mockMethod } as any;

      component.setValoresStore(mockForm, 'testField', 'testMethod' as any);

      expect(mockMethod).toHaveBeenCalledWith('testValue');
    });

    it('should set archivoMedicamentos and elgirDeArchivo on file change', () => {
      const file = new File(['dummy'], 'test.xlsx');
      const event = {
        target: {
          files: [file]
        }
      } as any;
      component.onCambioDeArchivo(event);
      expect(component.archivoMedicamentos).toBe(file);
      expect(component.elgirDeArchivo).toBe('test.xlsx');
    });

    it('should set elgirDeArchivo from elgirArchivo if no files', () => {
      component.elgirArchivo = { value: 'someValue' } as any;
      const event = {
        target: {
          files: []
        }
      } as any;
      component.onCambioDeArchivo(event);
      expect(component.elgirDeArchivo).toBe('someValue');
    });

    it('should set confirmarNotificacion in confirmarModal', () => {
      component.confirmarModal();
      expect(component.confirmarNotificacion).toBeDefined();
      expect(component.confirmarNotificacion.mensaje).toContain('Los registros se realizaron correctamente');
    });

    it('should set errorNotificacion in errorModal', () => {
      component.errorModal();
      expect(component.errorNotificacion).toBeDefined();
      expect(component.errorNotificacion.mensaje).toContain('El número de columnas del archivo es incorrecto');
    });

    it('should disable form if esFormularioSoloLectura is true in inicializarEstadoFormulario', () => {
      component.solicitudForm = new FormGroup({
        test: new FormControl('val')
      });
      component.esFormularioSoloLectura = true;
      const disableSpy = jest.spyOn(component.solicitudForm, 'disable');
      component.inicializarEstadoFormulario();
      expect(disableSpy).toHaveBeenCalled();
    });

    it('should enable form if esFormularioSoloLectura is false in inicializarEstadoFormulario', () => {
      component.solicitudForm = new FormGroup({
        test: new FormControl('val')
      });
      component.esFormularioSoloLectura = false;
      const enableSpy = jest.spyOn(component.solicitudForm, 'enable');
      component.inicializarEstadoFormulario();
      expect(enableSpy).toHaveBeenCalled();
    });

    it('should complete destroyNotifier$ on ngOnDestroy', () => {
      const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
      const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
      component.ngOnDestroy();
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });

    it('should not throw if cargarProveedores called without file', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.id = 'cargarProveedores';
      document.body.appendChild(input);
      expect(() => component.cargarProveedores()).not.toThrow();
      document.body.removeChild(input);
    });

  });
