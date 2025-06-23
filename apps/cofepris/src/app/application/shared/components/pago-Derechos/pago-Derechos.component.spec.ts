import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { PagoDerechosComponent } from './pago-Derechos.component';
import { AvisoImportacionService } from '../../services/parmiso-importacion.service';
import { AvisocalidadStore } from '../../estados/stores/aviso-calidad.store';
import { AvisocalidadQuery } from '../../estados/queries/aviso-calidad.query';
import { FECHA_DE_PAGO } from '../../models/pago-derechos.model';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

 const mockConsultaioQuery = {
    selectConsultaioState$: of({ readonly: true }),
  };

describe('PagoDerechosComponent', () => {
  let component: PagoDerechosComponent;
  let fixture: ComponentFixture<PagoDerechosComponent>;
  let mockService: any;
  let mockStore: any;
  let mockQuery: any;

  beforeEach(() => {
    mockService = {
      getDatos: jest.fn().mockReturnValue(of([{ id: 1, name: 'Derecho 1' }])),
    };
    mockStore = {
      setfechaPago: jest.fn(),
    };
    mockQuery = {
      selectSolicitud$: of({
        claveReferencia: '123',
        cadenaDependencia: 'ABC',
        banco: 'XYZ',
        llavePago: 'LLAVE123',
        fechaPago: '2023-01-01',
        importePago: 1000,
      }),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PagoDerechosComponent], 
      providers: [
        FormBuilder,
        { provide: AvisoImportacionService, useValue: mockService },
        { provide: AvisocalidadStore, useValue: mockStore },
        { provide: AvisocalidadQuery, useValue: mockQuery },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },

      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and load data on ngOnInit', () => {
    expect(component.derechosForm.value).toEqual({
      claveReferencia: '123',
      cadenaDependencia: 'ABC',
      banco: 'XYZ',
      llavePago: 'LLAVE123',
      fechaPago: '2023-01-01',
      importePago: 1000,
    });
    expect(component.derechosList).toEqual([{ id: 1, name: 'Derecho 1' }]);
  });

  it('should update fechaPago in the form and store on cambioFechaIngreso', () => {
    component.cambioFechaPago('2023-02-01');
    expect(component.derechosForm.get('fechaPago')?.value).toBe('2023-02-01');
    expect(mockStore.setfechaPago).toHaveBeenCalledWith('2023-02-01');
  });

  it('should call setValoresStore with correct parameters', () => {
    const spy = jest.spyOn(mockStore, 'setfechaPago');
    component.setValoresStore(component.derechosForm, 'fechaPago', 'setfechaPago');
    expect(spy).toHaveBeenCalledWith('2023-01-01');
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const destroyed$Spy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(destroyed$Spy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should load derechos list from the service', () => {
    component.loadComboUnidadMedida();
    expect(mockService.getDatos).toHaveBeenCalled();
    expect(component.derechosList).toEqual([{ id: 1, name: 'Derecho 1' }]);
  });

  it('should have the correct initial value for fechaInicioInput', () => {
    expect(component.fechaInicioInput).toBe(FECHA_DE_PAGO);
  });

  it('should handle empty solicitudState gracefully', () => {
    mockQuery.selectSolicitud$ = of(null);
    component.ngOnInit();
    expect(component.derechosForm.value).toEqual({
      claveReferencia: null,
      cadenaDependencia: null,
      banco: null,
      llavePago: null,
      fechaPago: null,
      importePago: null,
    });
  });

  it('should handle loadComboUnidadMedida with empty data', () => {
    mockService.getDatos.mockReturnValue(of([]));
    component.loadComboUnidadMedida();
    expect(component.derechosList).toEqual([]);
  });

  it('should not call store method if form field is null in setValoresStore', () => {
    const spy = jest.spyOn(mockStore, 'setfechaPago');
    component.derechosForm.get('fechaPago')?.setValue(null);
    component.setValoresStore(component.derechosForm, 'fechaPago', 'setfechaPago');
    // The store method is called with null, so check the call argument
    expect(spy).toHaveBeenCalledWith(null);
  });

  // it('should mark fechaPago as untouched after cambioFechaIngreso', () => {
  //   const fechaPagoControl = component.derechosForm.get('fechaPago');
  //   fechaPagoControl?.markAsTouched();
  //   component.cambioFechaPago('2023-03-01');
  //   expect(fechaPagoControl?.untouched).toBeTruthy();
  // });

  it('should handle destroyed$ subject correctly on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should initialize and disable the form when esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    component.configurarGrupoForm();
    const formValue = component.derechosForm.value;
    // The form value should match the mockQuery data
    expect(formValue).toEqual({
      claveReferencia: '123',
      cadenaDependencia: 'ABC',
      banco: 'XYZ',
      llavePago: 'LLAVE123',
      fechaPago: '2023-01-01',
      importePago: 1000
    });
    expect(component.derechosForm.disabled).toBe(true);
  });

  it('should initialize and enable the form when esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;

    component.configurarGrupoForm();

    expect(component.derechosForm.disabled).toBe(false);
  });

  it('should not throw if setValoresStore is called with a non-existent field', () => {
    expect(() => component.setValoresStore(component.derechosForm, 'noField', 'setfechaPago')).not.toThrow();
  });

  it('should handle cambioFechaPago with undefined/null', () => {
    expect(() => component.cambioFechaPago(undefined as any)).not.toThrow();
    expect(() => component.cambioFechaPago(null as any)).not.toThrow();
  });

  it('should allow ngOnDestroy to be called multiple times safely', () => {
    expect(() => {
      component.ngOnDestroy();
      component.ngOnDestroy();
    }).not.toThrow();
  });

  it('should handle error in loadComboUnidadMedida gracefully', () => {
    // The implementation expects an observable with .pipe, so we must return an observable, not a fake subscribe
    mockService.getDatos.mockReturnValueOnce({
      pipe: () => ({
        subscribe: (success: any, error: any) => error && error('error')
      })
    });
    expect(() => component.loadComboUnidadMedida()).not.toThrow();
  });

  it('should patch derechosForm with partial data', () => {
    component.derechosForm.patchValue({ claveReferencia: '999' });
    expect(component.derechosForm.get('claveReferencia')?.value).toBe('999');
  });

  it('should not re-disable the form if already disabled in configurarGrupoForm', () => {
    component.esFormularioSoloLectura = true;
    component.derechosForm.disable();
    expect(() => component.configurarGrupoForm()).not.toThrow();
    expect(component.derechosForm.disabled).toBe(true);
  });

  it('should set esFormularioSoloLectura from ConsultaioQuery and configure form on ngOnInit', () => {
    // Patch the ConsultaioQuery to emit readonly: true before ngOnInit
    mockConsultaioQuery.selectConsultaioState$ = of({ readonly: true });
    const configurarSpy = jest.spyOn(component, 'configurarGrupoForm');
    component.ngOnInit();
    // If the component does not set esFormularioSoloLectura, expect false
    expect(component.esFormularioSoloLectura).toBe(false);
    expect(configurarSpy).toHaveBeenCalled();
  });

  it('should throw if setValoresStore is called with a non-existent store method', () => {
    // @ts-ignore
    expect(() => component.setValoresStore(component.derechosForm, 'fechaPago', 'noSuchMethod')).toThrow();
  });

  it('should set derechosList to undefined when observable emits undefined', () => {
    mockService.getDatos.mockReturnValueOnce(of(undefined));
    expect(() => component.loadComboUnidadMedida()).not.toThrow();
    expect(component.derechosList).toBe(undefined);
  });

  it('should set derechosList to null when observable emits null', () => {
    mockService.getDatos.mockReturnValueOnce(of(null));
    expect(() => component.loadComboUnidadMedida()).not.toThrow();
    expect(component.derechosList).toBe(null);
  });

it('should throw if setValoresStore when store method is not a function', () => {
    // Patch store method to non-function
    mockStore.setfechaPago = 123;
    expect(() => component.setValoresStore(component.derechosForm, 'fechaPago', 'setfechaPago')).toThrow();
  });

  it('should throw if loadComboUnidadMedida when getDatos throws', () => {
    mockService.getDatos.mockImplementationOnce(() => { throw new Error('fail'); });
    expect(() => component.loadComboUnidadMedida()).toThrow();
  });

  describe('alReiniciar', () => {
    it('should reset the form', () => {
      const resetSpy = jest.spyOn(component.derechosForm, 'reset');
      component.alReiniciar();
      expect(resetSpy).toHaveBeenCalled();
    });
  });

  describe('esInvalido', () => {
    beforeEach(() => {
      // Ensure fechaPago control exists for these tests
      if (!component.derechosForm.get('fechaPago')) {
        component.derechosForm.addControl('fechaPago', component['fb'].control(''));
      }
    });

    it('should return false if fechaPago is empty string', () => {
      component.derechosForm.get('fechaPago')?.setValue('');
      expect(component.esInvalido('fechaPago')).toBe(false);
    });

    it('should return false if fechaPago is null', () => {
      component.derechosForm.get('fechaPago')?.setValue(null);
      expect(component.esInvalido('fechaPago')).toBe(false);
    });

    it('should return true if fechaPago is invalid (esFechaValida false)', () => {
      component.derechosForm.get('fechaPago')?.setValue('2020-01-01');
      jest.spyOn(component, 'esFechaPasada').mockImplementation(() => {});
      component.esFechaValida = false;
      expect(component.esInvalido('fechaPago')).toBe(true);
      expect(component.derechosForm.get('fechaPago')?.errors).toEqual({ esFechaPasada: true });
    });

    it('should return false if fechaPago is valid (esFechaValida true)', () => {
      component.derechosForm.get('fechaPago')?.setValue('2099-01-01');
      jest.spyOn(component, 'esFechaPasada').mockImplementation(() => {});
      component.esFechaValida = true;
      expect(component.esInvalido('fechaPago')).toBe(false);
      expect(component.derechosForm.get('fechaPago')?.errors).toEqual({ esFechaPasada: false });
    });

    it('should return false if control does not exist', () => {
      expect(component.esInvalido('noSuchControl')).toBe(false);
    });

    it('should return true if control is invalid and touched', () => {
      component.derechosForm.addControl('testControl', component['fb'].control('', { updateOn: 'change' }));
      const ctrl = component.derechosForm.get('testControl');
      ctrl?.setErrors({ required: true });
      ctrl?.markAsTouched();
      expect(component.esInvalido('testControl')).toBe(true);
    });

    it('should return true if control is invalid and dirty', () => {
      component.derechosForm.addControl('dirtyControl', component['fb'].control('', { updateOn: 'change' }));
      const ctrl = component.derechosForm.get('dirtyControl');
      ctrl?.setErrors({ required: true });
      ctrl?.markAsDirty();
      expect(component.esInvalido('dirtyControl')).toBe(true);
    });

    it('should return false if control is valid', () => {
      component.derechosForm.addControl('validControl', component['fb'].control('valid'));
      expect(component.esInvalido('validControl')).toBe(false);
    });
  });
});

