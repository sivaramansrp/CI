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
      .spyOn(component['tramite32201Query'], 'select') 
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

    // it('should call guardarDatosFormulario when esFormularioSoloLectura is true in inicializarEstadoFormulario', () => {
    //   component.esFormularioSoloLectura = true;
      
    //   component.solicitudState = {
    //     regimen_0: false,
    //     regimen_1: false,
    //     regimen_2: false,
    //     regimen_3: false,
    //     manifiesto: false
    //   };
      
    //   const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario').mockImplementation();
    //   component.inicializarEstadoFormulario();
    //   expect(guardarSpy).toHaveBeenCalled();
    // });

    // it('should call donanteDomicilio when esFormularioSoloLectura is false in inicializarEstadoFormulario', () => {
    //   component.esFormularioSoloLectura = false;
      
    //   component.solicitudState = {
    //     regimen_0: false,
    //     regimen_1: false,
    //     regimen_2: false,
    //     regimen_3: false,
    //     manifiesto: false
    //   };
      
    //   const donanteSpy = jest.spyOn(component, 'donanteDomicilio').mockImplementation();
    //   component.inicializarEstadoFormulario();
    //   expect(donanteSpy).toHaveBeenCalled();
    // });

    it('should complete destroyNotifier$ on ngOnDestroy', () => {
      const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
      const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
      component.ngOnDestroy();
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });

    // it('should create form with disabled controls when esFormularioSoloLectura is true in donanteDomicilio', () => {
    //   component.esFormularioSoloLectura = true;
    //   component.solicitudState = {
    //     regimen_0: true,
    //     regimen_1: false,
    //     regimen_2: true,
    //     regimen_3: false,
    //     manifiesto: true
    //   };
      
    //   component.donanteDomicilio();
      
    //   expect(component.solicitudForm).toBeDefined();
    //   expect(component.solicitudForm.get('regimen_0')?.disabled).toBe(true);
    //   expect(component.solicitudForm.get('regimen_1')?.disabled).toBe(true);
    //   expect(component.solicitudForm.get('manifiesto')?.disabled).toBe(true);
    // });

    // it('should create form with enabled controls when esFormularioSoloLectura is false in donanteDomicilio', () => {
    //   component.esFormularioSoloLectura = false;
    //   component.solicitudState = {
    //     regimen_0: true,
    //     regimen_1: false,
    //     regimen_2: true,
    //     regimen_3: false,
    //     manifiesto: true
    //   };
      
    //   component.donanteDomicilio();
      
    //   expect(component.solicitudForm).toBeDefined();
    //   expect(component.solicitudForm.get('regimen_0')?.disabled).toBe(false);
    //   expect(component.solicitudForm.get('regimen_1')?.disabled).toBe(false);
    //   expect(component.solicitudForm.get('manifiesto')?.disabled).toBe(false);
    // });

    // it('should disable form in guardarDatosFormulario when esFormularioSoloLectura is true', () => {
    //   component.esFormularioSoloLectura = true;
    //   component.solicitudState = {
    //     regimen_0: false,
    //     regimen_1: false,
    //     regimen_2: false,
    //     regimen_3: false,
    //     manifiesto: false
    //   };
      
    //   component.guardarDatosFormulario();
      
    //   expect(component.solicitudForm).toBeDefined();
    //   expect(component.solicitudForm.disabled).toBe(true);
    // });

    it('should not throw if cargarProveedores called without file', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.id = 'cargarProveedores';
      document.body.appendChild(input);
      expect(() => component.cargarProveedores()).not.toThrow();
      document.body.removeChild(input);
    });    describe('Régimen aduanero validation', () => {
      beforeEach(() => {
        component.esFormularioSoloLectura = false;
        component.solicitudState = {
          regimen_0: false,
          regimen_1: false,
          regimen_2: false,
          regimen_3: false,
          manifiesto: false,
          radio_1: '',
          radio_2: '',
          radio_3: '',
          valorAduana: '',
          textoGenerico10: 0,
          textoGenerico11: 0,
          textoGenerico12: 0,
          textoGenerico13: 0,
          textoGenerico14: 0,
          textoGenerico15: 0,
          textoGenerico16: 0,
          textoGenerico17: 0,
          textoGenerico18: 0,
          textoGenerico19: 0,
          textoGenerico20: 0,
          textoGenerico21: 0,
          textoGenerico22: 0,
          textoGenerico23: 0,
          textoGenerico24: 0
        };
        component.donanteDomicilio();
      });      it('should show popup when regimen_0 is selected but NO other regimes are selected', () => {
        const showPopupSpy = jest.spyOn(component, 'mostrarPopupRegimenAduanero');
        
        // Set regimen_0 to true and all others to false
        component.solicitudForm.patchValue({
          regimen_0: true,
          regimen_1: false,
          regimen_2: false,
          regimen_3: false
        });

        expect(showPopupSpy).toHaveBeenCalled();
      });

      it('should NOT show popup when regimen_0 is selected and regimen_1 is also selected', () => {
        const showPopupSpy = jest.spyOn(component, 'mostrarPopupRegimenAduanero');
        
        // Set regimen_0 and regimen_1 to true
        component.solicitudForm.patchValue({
          regimen_0: true,
          regimen_1: true,
          regimen_2: false,
          regimen_3: false
        });

        expect(showPopupSpy).not.toHaveBeenCalled();
      });

      it('should NOT show popup when regimen_0 is selected and regimen_2 is also selected', () => {
        const showPopupSpy = jest.spyOn(component, 'mostrarPopupRegimenAduanero');
        
        // Set regimen_0 and regimen_2 to true
        component.solicitudForm.patchValue({
          regimen_0: true,
          regimen_1: false,
          regimen_2: true,
          regimen_3: false
        });

        expect(showPopupSpy).not.toHaveBeenCalled();
      });

      it('should NOT show popup when regimen_0 is selected and regimen_3 is also selected', () => {
        const showPopupSpy = jest.spyOn(component, 'mostrarPopupRegimenAduanero');
        
        // Set regimen_0 and regimen_3 to true
        component.solicitudForm.patchValue({
          regimen_0: true,
          regimen_1: false,
          regimen_2: false,
          regimen_3: true
        });

        expect(showPopupSpy).not.toHaveBeenCalled();
      });

      it('should NOT show popup when regimen_0 is selected and multiple others are also selected', () => {
        const showPopupSpy = jest.spyOn(component, 'mostrarPopupRegimenAduanero');
        
        // Set regimen_0 and multiple others to true
        component.solicitudForm.patchValue({
          regimen_0: true,
          regimen_1: true,
          regimen_2: true,
          regimen_3: false
        });

        expect(showPopupSpy).not.toHaveBeenCalled();
      });

      it('should NOT show popup when regimen_0 is selected and all others are also selected', () => {
        const showPopupSpy = jest.spyOn(component, 'mostrarPopupRegimenAduanero');
        
        // Set all regimes to true
        component.solicitudForm.patchValue({
          regimen_0: true,
          regimen_1: true,
          regimen_2: true,
          regimen_3: true
        });

        expect(showPopupSpy).not.toHaveBeenCalled();
      });

      it('should NOT show popup when regimen_0 is not selected', () => {
        const showPopupSpy = jest.spyOn(component, 'mostrarPopupRegimenAduanero');
        
        // Set regimen_0 to false
        component.solicitudForm.patchValue({
          regimen_0: false,
          regimen_1: false,
          regimen_2: false,
          regimen_3: false
        });

        expect(showPopupSpy).not.toHaveBeenCalled();
      });

      it('should set correct notification properties in mostrarPopupRegimenAduanero', () => {
        component.mostrarPopupRegimenAduanero();

        expect(component.confirmarNotificacion).toBeDefined();
        expect(component.confirmarNotificacion.tipoNotificacion).toBe('alert');
        expect(component.confirmarNotificacion.categoria).toBe('warning');
        expect(component.confirmarNotificacion.modo).toBe('action');
        expect(component.confirmarNotificacion.titulo).toBe('Advertencia - Régimen Aduanero');
        expect(component.confirmarNotificacion.mensaje).toContain('Ha seleccionado "Importación temporal IMMEX"');
        expect(component.confirmarNotificacion.txtBtnAceptar).toBe('Entendido');
        expect(component.confirmarNotificacion.tiempoDeEspera).toBe(5000);
      });

      it('should not configure validation when form is readonly', () => {
        component.esFormularioSoloLectura = true;        component.solicitudState = {
          regimen_0: false,
          regimen_1: false,
          regimen_2: false,
          regimen_3: false,
          manifiesto: false,
          radio_1: '',
          radio_2: '',
          radio_3: '',
          valorAduana: '',
          textoGenerico10: 0,
          textoGenerico11: 0,
          textoGenerico12: 0,
          textoGenerico13: 0,
          textoGenerico14: 0,
          textoGenerico15: 0,
          textoGenerico16: 0,
          textoGenerico17: 0,
          textoGenerico18: 0,
          textoGenerico19: 0,
          textoGenerico20: 0,
          textoGenerico21: 0,
          textoGenerico22: 0,
          textoGenerico23: 0,
          textoGenerico24: 0
        };
        
        const showPopupSpy = jest.spyOn(component, 'mostrarPopupRegimenAduanero');
        component.donanteDomicilio();
        
        // Even if we set invalid combination, popup should not show because form is readonly
        component.solicitudForm.patchValue({
          regimen_0: true,
          regimen_1: false,
          regimen_2: false,
          regimen_3: false
        });

        expect(showPopupSpy).not.toHaveBeenCalled();
      });
    });

  });
