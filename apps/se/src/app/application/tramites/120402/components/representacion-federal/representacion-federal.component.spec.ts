import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RepresentacionFederalComponent } from './representacion-federal.component';
import { of, Subject } from 'rxjs';

describe('RepresentacionFederalComponent', () => {
  let component: RepresentacionFederalComponent;
  let mockService: any;
  let mockStore: any;
  let mockQuery: any;
  let mockConsultaioQuery: any;

  beforeEach(() => {
    mockService = {
      getEntidad: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Entidad 1' }])),
      getRepresentacion: jest.fn().mockReturnValue(of([
        { id: 1, nombre: 'Rep 1', relacionadaUmtId: 1 },
        { id: 2, nombre: 'Rep 2', relacionadaUmtId: 2 }
      ])),
    };
    mockStore = {
      setTramite120402State: jest.fn(),
    };
    mockQuery = {
      selectSolicitud$: of({}),
    };
    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false }),
    };

    component = new RepresentacionFederalComponent(
      new FormBuilder(),
      mockService,
      mockStore,
      mockQuery,
      mockConsultaioQuery
    );
    component['destroyed$'] = new Subject<void>();
    component['destroyNotifier$'] = new Subject<void>();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize form, load entidad and representacion, and call inicializarEstadoFormulario', () => {
      const spyInit = jest.spyOn(component, 'inicializarEstadoFormulario');
      component.ngOnInit();
      expect(component.representacionForm).toBeDefined();
      expect(mockService.getEntidad).toHaveBeenCalled();
      expect(mockService.getRepresentacion).toHaveBeenCalled();
      expect(spyInit).toHaveBeenCalled();
    });

    it('should subscribe to entidad valueChanges and reset representacion', () => {
      component.ngOnInit();
      component.representacionForm.get('entidad')?.setValue('1');
      expect(component.representacionForm.get('representacion')?.value).toBe('');
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete destroyed$', () => {
      const spy = jest.spyOn(component['destroyed$'], 'complete');
      component.ngOnDestroy();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('initializeForm', () => {
    it('should initialize the form with required controls', () => {
      component['initializeForm']();
      expect(component.representacionForm.contains('entidad')).toBe(true);
      expect(component.representacionForm.contains('representacion')).toBe(true);
    });
  });

  describe('loadEntidad', () => {
    it('should load entidad from service', () => {
      component.loadEntidad();
      expect(mockService.getEntidad).toHaveBeenCalled();
    });
  });

  describe('loadRepresentacion', () => {
    it('should load representacion and update options', () => {
      const spy = jest.spyOn(component, 'updateRepresentacionOptions');
      component.representacionForm = new FormBuilder().group({ entidad: [''] });
      component.loadRepresentacion();
      expect(mockService.getRepresentacion).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('updateRepresentacionOptions', () => {
    beforeEach(() => {
      component.allRepresentaciones = [
        { id: 1, descripcion: 'Rep 1', relacionadaUmtId: 1 },
        { id: 2, descripcion: 'Rep 2', relacionadaUmtId: 2 }
      ];
    });

    it('should filter representacion by selectedEntidad', () => {
      component.updateRepresentacionOptions('1' as any);
      expect(component.representacion.length).toBe(1);
    });

    it('should set representacion to empty if no entidad', () => {
      component.updateRepresentacionOptions(null);
      expect(component.representacion).toEqual([]);
    });
  });

  describe('setValoresStore', () => {
    it('should call the store method with form value', () => {
      const form = new FormBuilder().group({ test: ['value'] });
      mockStore['setTramite120402State'] = jest.fn();
      component.setValoresStore(form, 'test', 'setTramite120402State');
      expect(mockStore.setTramite120402State).toHaveBeenCalledWith('value');
    });
  });

  describe('esInvalido', () => {
    it('should return true if control is invalid and touched', () => {
      component.representacionForm = new FormBuilder().group({
        test: ['', Validators.required]
      });
      const control = component.representacionForm.get('test');
      control?.markAsTouched();
      expect(component.esInvalido('test')).toBe(true);
    });

    it('should return false if control is valid', () => {
      component.representacionForm = new FormBuilder().group({
        test: ['ok', Validators.required]
      });
      expect(component.esInvalido('test')).toBe(false);
    });

    it('should return false if control does not exist', () => {
      component.representacionForm = new FormBuilder().group({});
      expect(component.esInvalido('nope')).toBe(false);
    });
  });

  describe('setValorStore', () => {
    it('should update store with control value', () => {
      const form = new FormBuilder().group({ test: ['value'] });
      component.setValorStore(form, 'test');
      expect(mockStore.setTramite120402State).toHaveBeenCalledWith({ test: 'value' });
    });
  });

  describe('inicializarEstadoFormulario', () => {
    it('should call guardarDatosFormulario if esFormularioSoloLectura is true', () => {
      component.esFormularioSoloLectura = true;
      const spy = jest.spyOn(component, 'guardarDatosFormulario');
      component.inicializarEstadoFormulario();
      expect(spy).toHaveBeenCalled();
    });

    it('should call initializeForm if esFormularioSoloLectura is false', () => {
      component.esFormularioSoloLectura = false;
      const spy = jest.spyOn(component as any, 'initializeForm');
      component.inicializarEstadoFormulario();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('guardarDatosFormulario', () => {
    beforeEach(() => {
      component.representacionForm = new FormBuilder().group({
        entidad: [''],
        representacion: ['']
      });
    });

    it('should disable form if esFormularioSoloLectura is true', () => {
      component.esFormularioSoloLectura = true;
      component.guardarDatosFormulario();
      expect(component.representacionForm.disabled).toBe(true);
    });

    it('should enable form if esFormularioSoloLectura is false', () => {
      component.esFormularioSoloLectura = false;
      component.guardarDatosFormulario();
      expect(component.representacionForm.enabled).toBe(true);
    });
  });
});