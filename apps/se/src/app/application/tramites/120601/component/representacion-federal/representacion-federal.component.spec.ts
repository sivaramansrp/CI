import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Subject } from 'rxjs';
import { RepresentacionFederalComponent } from './representacion-federal.component';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { Tramite120601Query } from '../../estados/tramite-120601.query';
import { Tramite120601Store } from '../../estados/tramite-120601.store';
import { 
  Catalogo, 
  ConsultaioQuery,
  ConsultaioState 
} from '@ng-mf/data-access-user';
import { RepresentacionFederal } from '../../modelos/datos-empresa.model';

describe('RepresentacionFederalComponent', () => {
  let component: RepresentacionFederalComponent;
  let fixture: ComponentFixture<RepresentacionFederalComponent>;
  let mockDatosEmpresaService: jest.Mocked<DatosEmpresaService>;
  let mockTramite120601Query: jest.Mocked<Tramite120601Query>;
  let mockTramite120601Store: jest.Mocked<Tramite120601Store>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;
  let formBuilder: FormBuilder;

  // Datos mock
  const mockEstados: Catalogo[] = [
    { id: 1, descripcion: 'Estado 1' },
    { id: 2, descripcion: 'Estado 2' }
  ];

  const mockRepresentaciones: Catalogo[] = [
    { id: 1, descripcion: 'Representación 1'},
    { id: 2, descripcion: 'Representación 2' }
  ];

   const mockDatosSocios: RepresentacionFederal[] = [
    {
      calle: 'Calle Principal 123',
      numeroExterior: '123',
      numeroInterior: 'A',
      codigoPostal: '12345',
      colonia: 'Centro',
      municipio: 'Ciudad de México',
      estado: 'CDMX'
    },
    {
      calle: 'Avenida Reforma 456',
      numeroExterior: '456',
      numeroInterior: 'B',
      codigoPostal: '67890',
      colonia: 'Polanco',
      municipio: 'Miguel Hidalgo',
      estado: 'CDMX'
    }
  ];

  const mockConsultaioState: ConsultaioState = {
    readonly: false,
    // Agregar otras propiedades según sea necesario
  } as ConsultaioState;

  const mockEstadoSeleccionado: Catalogo = {
    id: 1,
    descripcion: 'Estado Seleccionado',
    
  };

  const mockRepresentacionSeleccionada: Catalogo = {
    id: 1,
    descripcion: 'Representación Seleccionada',
    
  };

  beforeEach(async () => {
    // Mock para DatosEmpresaService
    mockDatosEmpresaService = {
      obtenerEstado: jest.fn(() => of(mockEstados)),
      obtenerDatosDeRepresentacionFederal: jest.fn(() => of(mockRepresentaciones)),
      ObtenerTablaDeRepresentaciónFederal: jest.fn(() => of(mockDatosSocios))
    } as unknown as jest.Mocked<DatosEmpresaService>;

    // Mock para Tramite120601Query
    mockTramite120601Query = {
      selectEstado$: of(mockEstadoSeleccionado),
      selectRepresentacion$: of(mockRepresentacionSeleccionada)
    } as unknown as jest.Mocked<Tramite120601Query>;

    // Mock para Tramite120601Store
    mockTramite120601Store = {
      setEstado: jest.fn(),
      setRepresentacion: jest.fn()
    } as unknown as jest.Mocked<Tramite120601Store>;

    // Mock para ConsultaioQuery
    mockConsultaioQuery = {
      selectConsultaioState$: of(mockConsultaioState)
    } as unknown as jest.Mocked<ConsultaioQuery>;

    await TestBed.configureTestingModule({
      imports: [RepresentacionFederalComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: DatosEmpresaService, useValue: mockDatosEmpresaService },
        { provide: Tramite120601Query, useValue: mockTramite120601Query },
        { provide: Tramite120601Store, useValue: mockTramite120601Store },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentacionFederalComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
  });

  // Pruebas de inicialización y constructor
  describe('Inicialización del componente', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar las propiedades con valores por defecto', () => {
      expect(component.tableHeaderData).toEqual([]);
      expect(component.tableBodyData).toEqual([]);
      expect(component.selectedRow).toBe(1);
      expect(component.datosSocios).toEqual([]);
      expect(component.esFormularioSoloLectura).toBe(false);
      expect(component['destroyed$']).toBeInstanceOf(Subject);
    });

    it('debería inyectar correctamente los servicios en el constructor', () => {
      expect(component['fb']).toBeDefined();
      expect(component['query']).toBeDefined();
      expect(component['store']).toBeDefined();
      expect(component['datosEmpresaService']).toBeDefined();
      expect(component['consultaioQuery']).toBeDefined();
    });

    it('debería suscribirse al estado de consultaio en el constructor', () => {
      const spy = jest.spyOn(mockConsultaioQuery.selectConsultaioState$, 'pipe');
      
      // Crear nuevo componente para activar constructor
      const newFixture = TestBed.createComponent(RepresentacionFederalComponent);
      const newComponent = newFixture.componentInstance;
      
      expect(spy).toHaveBeenCalled();
      expect(newComponent.esFormularioSoloLectura).toBe(mockConsultaioState.readonly);
    });

    it('debería establecer esFormularioSoloLectura cuando readonly es true', () => {
      const readonlyState = { ...mockConsultaioState, readonly: true };
      mockConsultaioQuery.selectConsultaioState$ = of(readonlyState);
      
      const newFixture = TestBed.createComponent(RepresentacionFederalComponent);
      const newComponent = newFixture.componentInstance;
      
      expect(newComponent.esFormularioSoloLectura).toBe(true);
    });
  });

  // Pruebas para ngOnInit
  describe('ngOnInit', () => {
    beforeEach(() => {
      jest.spyOn(component, 'crearFormulario');
      jest.spyOn(component, 'getEntidadFederativa');
      jest.spyOn(component, 'getRepresentacionFederal');
      jest.spyOn(component, 'getDatosSocios');
    });

    it('debería llamar a todos los métodos de inicialización', () => {
      component.ngOnInit();
      
      expect(component.crearFormulario).toHaveBeenCalled();
      expect(component.getEntidadFederativa).toHaveBeenCalled();
      expect(component.getRepresentacionFederal).toHaveBeenCalled();
      expect(component.getDatosSocios).toHaveBeenCalled();
    });

    it('debería suscribirse al selectEstado$ y actualizar el formulario', () => {
      component.ngOnInit();
      
      expect(component.formulario.get('estado')?.value).toEqual(mockEstadoSeleccionado);
    });

    it('debería suscribirse al selectRepresentacion$ y actualizar el formulario', () => {
      component.ngOnInit();
      
      expect(component.formulario.get('representacion')?.value).toEqual(mockRepresentacionSeleccionada);
    });
  });

  // Pruebas para crearFormulario
  describe('crearFormulario', () => {
    it('debería crear el formulario con los controles correctos', () => {
      component.crearFormulario();
      
      expect(component.formulario).toBeDefined();
      expect(component.formulario.get('estado')).toBeDefined();
      expect(component.formulario.get('representacion')).toBeDefined();
    });

    it('debería establecer validación requerida para representacion', () => {
      component.crearFormulario();
      
      const representacionControl = component.formulario.get('representacion');
      expect(representacionControl?.hasError('required')).toBe(true);
      
      representacionControl?.setValue('valor');
      expect(representacionControl?.hasError('required')).toBe(false);
    });

    it('no debería establecer validación requerida para estado', () => {
      component.crearFormulario();
      
      const estadoControl = component.formulario.get('estado');
      expect(estadoControl?.hasError('required')).toBe(false);
    });
  });

  // Pruebas para getEntidadFederativa
  describe('getEntidadFederativa', () => {
    it('debería llamar al servicio y establecer los estados', () => {
      component.getEntidadFederativa();
      
      expect(mockDatosEmpresaService.obtenerEstado).toHaveBeenCalled();
      expect(component.estado).toEqual(mockEstados);
    });

    it('debería manejar respuesta vacía del servicio', () => {
      mockDatosEmpresaService.obtenerEstado.mockReturnValue(of([]));
      
      component.getEntidadFederativa();
      
      expect(component.estado).toEqual([]);
    });
  });

  // Pruebas para getRepresentacionFederal
  describe('getRepresentacionFederal', () => {
    it('debería llamar al servicio y establecer las representaciones', () => {
      component.getRepresentacionFederal();
      
      expect(mockDatosEmpresaService.obtenerDatosDeRepresentacionFederal).toHaveBeenCalled();
      expect(component.representacion).toEqual(mockRepresentaciones);
    });

    it('debería manejar respuesta vacía del servicio', () => {
      mockDatosEmpresaService.obtenerDatosDeRepresentacionFederal.mockReturnValue(of([]));
      
      component.getRepresentacionFederal();
      
      expect(component.representacion).toEqual([]);
    });
  });

  // Pruebas para getDatosSocios
  describe('getDatosSocios', () => {
    it('debería llamar al servicio y establecer los datos de socios', () => {
      component.getDatosSocios();
      
      expect(mockDatosEmpresaService.ObtenerTablaDeRepresentaciónFederal).toHaveBeenCalled();
      expect(component.datosSocios).toEqual(mockDatosSocios);
    });

    it('debería manejar respuesta vacía del servicio', () => {
      mockDatosEmpresaService.ObtenerTablaDeRepresentaciónFederal.mockReturnValue(of([]));
      
      component.getDatosSocios();
      
      expect(component.datosSocios).toEqual([]);
    });
  });

  // Pruebas para docSeleccionado
  describe('docSeleccionado', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('debería llamar al store con el valor del estado seleccionado', () => {
      const mockEvent = new Event('change');
      const estadoValue = mockEstados[0];
      component.formulario.get('estado')?.setValue(estadoValue);
      
      component.docSeleccionado(mockEvent);
      
      expect(mockTramite120601Store.setEstado).toHaveBeenCalledWith(estadoValue);
    });

    it('debería manejar valor null del formulario', () => {
      const mockEvent = new Event('change');
      component.formulario.get('estado')?.setValue(null);
      
      component.docSeleccionado(mockEvent);
      
      expect(mockTramite120601Store.setEstado).toHaveBeenCalledWith(null);
    });

    it('debería manejar valor undefined del formulario', () => {
      const mockEvent = new Event('change');
      component.formulario.get('estado')?.setValue(undefined);
      
      component.docSeleccionado(mockEvent);
      
      expect(mockTramite120601Store.setEstado).toHaveBeenCalledWith(undefined);
    });
  });

  // Pruebas para validarRepresentacionFederalIDCSECEROR_
  describe('validarRepresentacionFederalIDCSECEROR_', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('debería llamar al store con el valor de representación seleccionada', () => {
      const mockEvent = new Event('change');
      const representacionValue = mockRepresentaciones[0];
      component.formulario.get('representacion')?.setValue(representacionValue);
      
      component.validarRepresentacionFederalIDCSECEROR_(mockEvent);
      
      expect(mockTramite120601Store.setRepresentacion).toHaveBeenCalledWith(representacionValue);
    });

    it('debería manejar valor null del formulario', () => {
      const mockEvent = new Event('change');
      component.formulario.get('representacion')?.setValue(null);
      
      component.validarRepresentacionFederalIDCSECEROR_(mockEvent);
      
      expect(mockTramite120601Store.setRepresentacion).toHaveBeenCalledWith(null);
    });

    it('debería manejar valor undefined del formulario', () => {
      const mockEvent = new Event('change');
      component.formulario.get('representacion')?.setValue(undefined);
      
      component.validarRepresentacionFederalIDCSECEROR_(mockEvent);
      
      expect(mockTramite120601Store.setRepresentacion).toHaveBeenCalledWith(undefined);
    });
  });

  // Pruebas para ngOnDestroy
  describe('ngOnDestroy', () => {
    it('debería llamar next() en destroyed$', () => {
      const nextSpy = jest.spyOn(component['destroyed$'], 'next');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalled();
    });

    it('debería llamar complete() en destroyed$', () => {
      const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
      
      component.ngOnDestroy();
      
      expect(completeSpy).toHaveBeenCalled();
    });

    it('debería limpiar correctamente los recursos para evitar fugas de memoria', () => {
      const nextSpy = jest.spyOn(component['destroyed$'], 'next');
      const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalledTimes(1);
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });
  });

  // Pruebas de integración y flujo completo
  describe('Flujo completo del componente', () => {
    it('debería ejecutar el flujo completo de inicialización', () => {
      const crearFormularioSpy = jest.spyOn(component, 'crearFormulario');
      const getEntidadSpy = jest.spyOn(component, 'getEntidadFederativa');
      const getRepresentacionSpy = jest.spyOn(component, 'getRepresentacionFederal');
      const getDatosSociosSpy = jest.spyOn(component, 'getDatosSocios');
      
      component.ngOnInit();
      
      expect(crearFormularioSpy).toHaveBeenCalled();
      expect(getEntidadSpy).toHaveBeenCalled();
      expect(getRepresentacionSpy).toHaveBeenCalled();
      expect(getDatosSociosSpy).toHaveBeenCalled();
      
      expect(component.formulario).toBeDefined();
      expect(component.estado).toEqual(mockEstados);
      expect(component.representacion).toEqual(mockRepresentaciones);
      expect(component.datosSocios).toEqual(mockDatosSocios);
    });

    it('debería actualizar formulario con datos de los observables', () => {
      component.ngOnInit();
      
      expect(component.formulario.get('estado')?.value).toEqual(mockEstadoSeleccionado);
      expect(component.formulario.get('representacion')?.value).toEqual(mockRepresentacionSeleccionada);
    });
  });

  // Pruebas para casos edge y manejo de errores
  describe('Casos límite y manejo de errores', () => {
    it('debería manejar servicios que devuelven observables que no emiten', () => {
      mockDatosEmpresaService.obtenerEstado.mockReturnValue(new Subject<Catalogo[]>().asObservable());
      mockDatosEmpresaService.obtenerDatosDeRepresentacionFederal.mockReturnValue(new Subject<Catalogo[]>().asObservable());
      mockDatosEmpresaService.ObtenerTablaDeRepresentaciónFederal.mockReturnValue(new Subject<RepresentacionFederal[]>().asObservable());
      
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('debería manejar queries que devuelven observables que no emiten', () => {
      mockTramite120601Query.selectEstado$ = new Subject<string>().asObservable();
      mockTramite120601Query.selectRepresentacion$ = new Subject<string>().asObservable();
      
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('debería manejar formulario no inicializado en docSeleccionado', () => {
      component.formulario = undefined as any;
      const mockEvent = new Event('change');
      
      expect(() => component.docSeleccionado(mockEvent)).not.toThrow();
    });

    it('debería manejar formulario no inicializado en validarRepresentacionFederalIDCSECEROR_', () => {
      component.formulario = undefined as any;
      const mockEvent = new Event('change');
      
      expect(() => component.validarRepresentacionFederalIDCSECEROR_(mockEvent)).not.toThrow();
    });
  });

  // Pruebas de la template
  describe('Interacciones con la template', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('debería renderizar el título correctamente', () => {
      const compiled = fixture.nativeElement;
      const titulo = compiled.querySelector('ng-titulo');
      expect(titulo).toBeTruthy();
    });

    it('debería renderizar el formulario con los controles correctos', () => {
      const compiled = fixture.nativeElement;
      const form = compiled.querySelector('form');
      const catalogoSelects = compiled.querySelectorAll('app-catalogo-select');
      
      expect(form).toBeTruthy();
      expect(catalogoSelects.length).toBe(2);
    });

    it('debería pasar las propiedades correctas al selector de estado', () => {
      component.estado = mockEstados;
      component.esFormularioSoloLectura = true;
      fixture.detectChanges();
      
      const estadoSelect = fixture.nativeElement.querySelector('app-catalogo-select[name="estado"]');
      expect(estadoSelect).toBeTruthy();
    });

    it('debería pasar las propiedades correctas al selector de representación', () => {
      component.representacion = mockRepresentaciones;
      component.esFormularioSoloLectura = false;
      fixture.detectChanges();
      
      const representacionSelect = fixture.nativeElement.querySelector('app-catalogo-select[name="representacion"]');
      expect(representacionSelect).toBeTruthy();
    });

    it('debería renderizar la tabla dinámica', () => {
      const compiled = fixture.nativeElement;
      const tablaDinamica = compiled.querySelector('app-tabla-dinamica');
      expect(tablaDinamica).toBeTruthy();
    });

    it('debería pasar los datos correctos a la tabla dinámica', () => {
      component.datosSocios = mockDatosSocios;
      fixture.detectChanges();
      
      const tablaDinamica = fixture.nativeElement.querySelector('app-tabla-dinamica');
      expect(tablaDinamica).toBeTruthy();
    });

    it('debería mostrar el encabezado de selección de sucursal', () => {
      const compiled = fixture.nativeElement;
      const encabezado = compiled.querySelector('h6');
      expect(encabezado?.textContent?.trim()).toBe('Selección de sucursal');
    });
  });

  // Pruebas de validación del formulario
  describe('Validación del formulario', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('debería marcar el formulario como inválido cuando representación está vacía', () => {
      component.formulario.get('representacion')?.setValue('');
      expect(component.formulario.valid).toBeFalsy();
    });

    it('debería marcar el formulario como válido cuando representación tiene valor', () => {
      component.formulario.get('representacion')?.setValue(mockRepresentaciones[0]);
      expect(component.formulario.valid).toBeTruthy();
    });

    it('debería permitir estado vacío sin afectar la validación', () => {
      component.formulario.get('estado')?.setValue('');
      component.formulario.get('representacion')?.setValue(mockRepresentaciones[0]);
      expect(component.formulario.valid).toBeTruthy();
    });
  });

  // Pruebas para los observables y suscripciones
  describe('Suscripciones y observables', () => {
    it('debería usar takeUntil para evitar fugas de memoria en constructor', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockConsultaioState));
      mockConsultaioQuery.selectConsultaioState$ = {
        pipe: mockPipe
      } as any;
      
      const newFixture = TestBed.createComponent(RepresentacionFederalComponent);
      
      expect(mockPipe).toHaveBeenCalledWith(expect.anything(), expect.anything());
    });

    it('debería usar takeUntil para evitar fugas de memoria en ngOnInit para selectEstado$', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockEstadoSeleccionado));
      mockTramite120601Query.selectEstado$ = {
        pipe: mockPipe
      } as any;
      
      component.ngOnInit();
      
      expect(mockPipe).toHaveBeenCalledWith(expect.anything());
    });

    it('debería usar takeUntil para evitar fugas de memoria en ngOnInit para selectRepresentacion$', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockRepresentacionSeleccionada));
      mockTramite120601Query.selectRepresentacion$ = {
        pipe: mockPipe
      } as any;
      
      component.ngOnInit();
      
      expect(mockPipe).toHaveBeenCalledWith(expect.anything());
    });
  });
});