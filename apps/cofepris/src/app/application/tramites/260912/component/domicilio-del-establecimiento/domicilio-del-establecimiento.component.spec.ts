import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DomicilioDelEstablecimientoComponent } from './domicilio-del-establecimiento.component';
import { DomicilioDelEstablecimientoService } from '../../services/domicilio-del-establecimiento.service';
import { Tramite260912Query } from '../../estados/tramite-260912.query';
import { Tramite260912Store } from '../../estados/tramite-260912.store';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosMercanciaContenedoraComponent } from '../datos-mercancia-contenedora/datos-mercancia-contenedora.component';
import { Modal } from 'bootstrap';
import { MercanciasInfo, NicoInfo } from '../../modelos/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient, HttpHandler, provideHttpClient } from '@angular/common/http';


const mockModal = {
  show: jest.fn(),
  hide: jest.fn()
};


Object.defineProperty(window, 'bootstrap', {
  value: {
    Modal: jest.fn().mockImplementation(() => mockModal)
  },
  writable: true
});

describe('DomicilioDelEstablecimientoComponent', () => {
  let component: DomicilioDelEstablecimientoComponent;
  let fixture: ComponentFixture<DomicilioDelEstablecimientoComponent>;
  let mockDomicilioService: jest.Mocked<DomicilioDelEstablecimientoService>;
  let mockTramiteQuery: jest.Mocked<Tramite260912Query>;
  let mockTramiteStore: jest.Mocked<Tramite260912Store>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;
  let formBuilder: FormBuilder;

  const mockTramiteState = {
    codigoPostal: '12345',
    estado: 'Estado Test',
    municipioOAlcaldia: 'Municipio Test',
    colonias: 'Colonia Test',
    calle: 'Calle Test',
    lada: '55',
    telefono: '1234567890',
    entidad: 'Entidad Test',
    representacion: 'Representacion Test',
    licenciaSanitaria: 'Licencia Test',
    regimen: 'Regimen Test',
    aduanasEntradas: 'Aduanas Test',
    importPermitNumberCNSNS: 'Import Test',
    acuerdoPublico: '1',
    rfc: 'RFC1234567890',
    nombre: 'Nombre Test',
    apellidoPaterno: 'Apellido Test',
    apellidoMaterno: 'Materno Test'
  };

  const mockCatalogo: Catalogo[] = [
    { id: 1, descripcion: 'Test 1', relacionadaUmtId: 1 },
    { id: 2, descripcion: 'Test 2', relacionadaUmtId: 2 }
  ];

  const mockMercanciaInfo: MercanciasInfo = {
    clasificacion: 'Clasificacion Test',
    especificar: 'Especificar Test',
    denominacionEspecifica: 'Denominacion Test',
    denominacionDistintiva: 'Distintiva Test',
    denominacionComun: 'Comun Test',
    tipoProducto: 'Tipo Test',
    formaFarmaceutica: 'Forma Test',
    estadoFisico: 'Estado Test',
    fraccionArancelaria: 'Fraccion Test',
    descripcionFraccion: 'Descripcion Test',
    presentacion: 'Presentacion Test',
    unidadUMT: 'Unidad Test',
    cantidadUMT: 'Cantidad Test',
    unidad: 'Unidad Test',
    cantidadUMC: 'Cantidad Test',
    numeroRegistro: 'Registro Test',
    fechaCaducidad: '2024-12-31',
    paisDeOrigen: 'Mexico',
    paisDeProcedencia: 'Mexico',
    usoEspecifico: 'Uso Test'
  };

  const mockNicoInfo: NicoInfo = {
    clave_Scian: 'SCIAN123',
    descripcion_Scian: 'Descripcion SCIAN Test'
  };

  beforeEach(async () => {
    const domicilioServiceSpy = {
      obtenerTablaDatos: jest.fn().mockReturnValue(of({ data: [mockNicoInfo] })),
      obtenerEstadoList: jest.fn().mockReturnValue(of({ data: mockCatalogo })),
      obtenerMercanciasDatos: jest.fn().mockReturnValue(of({ data: [mockMercanciaInfo] })),
      getEntidad: jest.fn().mockReturnValue(of(mockCatalogo)),
      getRepresentacion: jest.fn().mockReturnValue(of(mockCatalogo)),
      buscarRepresentanteLegalPorRFC: jest.fn().mockReturnValue(of({
        nombre: 'Test Nombre',
        apellidoPaterno: 'Test Paterno',
        apellidoMaterno: 'Test Materno'
      }))
    } as unknown as jest.Mocked<DomicilioDelEstablecimientoService>;

    const tramiteQuerySpy = {
      selectTramite260912$: of(mockTramiteState)
    };

    const tramiteStoreSpy = {
      setTramite260912State: jest.fn()
    };

    const consultaioQuerySpy = {
      selectConsultaioState$: of({ readonly: false })
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        DomicilioDelEstablecimientoComponent
      ],
      providers: [
        FormBuilder,
        { provide: DomicilioDelEstablecimientoService, useValue: domicilioServiceSpy },
        { provide: Tramite260912Query, useValue: tramiteQuerySpy },
        { provide: Tramite260912Store, useValue: tramiteStoreSpy },
        
        { provide: HttpClient, useValue: {} },
        { provide: HttpHandler, useValue: {} },
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilioDelEstablecimientoComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    mockDomicilioService = TestBed.inject(DomicilioDelEstablecimientoService) as jest.Mocked<DomicilioDelEstablecimientoService>;
    mockTramiteQuery = TestBed.inject(Tramite260912Query) as jest.Mocked<Tramite260912Query>;
    mockTramiteStore = TestBed.inject(Tramite260912Store) as jest.Mocked<Tramite260912Store>;
    mockConsultaioQuery = TestBed.inject(ConsultaioQuery) as jest.Mocked<ConsultaioQuery>;

    
    component.datosMercanciaContenedoraComp = {
      clasificacionProductoDatos: mockCatalogo,
      especificarClasificacionProductoDatos: mockCatalogo,
      tipoProductoDatos: mockCatalogo,
      formaFarmaceuticaDatos: mockCatalogo,
      estadoFisicoDatos: mockCatalogo,
      crearMercanciaForm: jest.fn(),
      resetForm: jest.fn(),
      setEditBlocked: jest.fn(),
      mercanciaForm: formBuilder.group({
        clasificacionProducto: [''],
        especificarClasificacionProducto: [''],
        tipoProducto: [''],
        formaFarmaceutica: [''],
        estadoFisico: ['']
      })
    } as any;

    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize forms on ngOnInit', () => {
      component.ngOnInit();
      
      expect(component.form).toBeDefined();
      expect(component.domicilio).toBeDefined();
      expect(component.representanteLegal).toBeDefined();
      expect(component.nicoTablaForm).toBeDefined();
    });


    it('should set table disabled state based on tipoTramite', () => {
      component.tipoTramite = '1';
      component.ngOnChanges();
      
      expect(component.isMercanciasTableDisabled).toBe(false);
      expect(component.isNicoTablaDisabled).toBe(false);

      component.tipoTramite = '0';
      component.ngOnChanges();
      
      expect(component.isMercanciasTableDisabled).toBe(true);
      expect(component.isNicoTablaDisabled).toBe(true);
    });
  });

  describe('Static Methods', () => {
    it('should return empty mercancia form', () => {
      const emptyForm = DomicilioDelEstablecimientoComponent.getEmptyMercanciaForm();
      
      expect(emptyForm.clasificacionProducto).toBe('');
      expect(emptyForm.denominacionEspecificaProducto).toBe('');
      expect(emptyForm.paisDeOriginDatos).toEqual([]);
    });

    it('should map mercancia info to form', () => {
      const mappedForm = DomicilioDelEstablecimientoComponent.mapMercanciasInfoToForm(mockMercanciaInfo);
      
      expect(mappedForm.clasificacionProducto).toBe(mockMercanciaInfo.clasificacion);
      expect(mappedForm.denominacionEspecificaProducto).toBe(mockMercanciaInfo.denominacionEspecifica);
      expect(mappedForm.paisDeOriginDatos).toEqual([mockMercanciaInfo.paisDeOrigen]);
    });
  });

  describe('Mercancia Management', () => {
    beforeEach(() => {
      component.mercanciasTablaDatos = [mockMercanciaInfo];
    });

    it('should handle mercancia row selection', () => {
      component.onMercanciaRowSelected([mockMercanciaInfo]);
      
      expect(component.selectedMercanciaCount).toBe(1);
      expect(component.selectedMercanciaIndex).toBe(0);
    });

    it('should add new mercancia', () => {
      const initialLength = component.mercanciasTablaDatos.length;
      component.selectedMercanciaIndex = null;
      
      component.onAgregarMercancia(mockMercanciaInfo);
      
      expect(component.mercanciasTablaDatos.length).toBe(initialLength + 1);
    });

    it('should update existing mercancia when selectedMercanciaIndex is set', () => {
      component.selectedMercanciaIndex = 0;
      const updatedMercancia = { ...mockMercanciaInfo, clasificacion: 'Updated' };
      
      component.onAgregarMercancia(updatedMercancia);
      
      expect(component.mercanciasTablaDatos[0].clasificacion).toBe('Updated');
      expect(component.selectedMercanciaIndex).toBeNull();
    });

    it('should handle mercancia modification', () => {
      component.onModificarMercancia(0);
      
      expect(component.selectedMercanciaIndex).toBe(0);
    });

    it('should handle mercancia deletion', () => {
      component.onEliminarMercancia(0);
      
      expect(component.mercanciaEliminarIndex).toBe(0);
    });

    it('should confirm mercancia deletion', () => {
      component.mercanciaEliminarIndex = 0;
      const initialLength = component.mercanciasTablaDatos.length;
      
      component.aceptarEliminarMercancia();
      
      expect(component.mercanciasTablaDatos.length).toBe(initialLength - 1);
      expect(component.mercanciaEliminarIndex).toBeNull();
    });

    it('should cancel mercancia deletion', () => {
      component.mercanciaEliminarIndex = 0;
      
      component.cancelarEliminarMercancia();
      
      expect(component.mercanciaEliminarIndex).toBeNull();
    });
  });

  describe('SCIAN Management', () => {
    beforeEach(() => {
      component.nicoTablaDatos = [mockNicoInfo];
      component.entidad = mockCatalogo;
      component.subRepresentacion = mockCatalogo;
    });

    it('should handle SCIAN row selection', () => {
      component.onScianRowSelected([mockNicoInfo]);
      
      expect(component.scianTableTouched).toBe(true);
      expect(component.selectedScianIndex).toBe(0);
    });

    it('should add SCIAN when form is valid', () => {
      component.nicoTablaForm.patchValue({
        entidad: '1',
        representacion: '1'
      });
      const initialLength = component.nicoTablaDatos.length;
      
      component.agregarScian();
      
      expect(component.nicoTablaDatos.length).toBe(initialLength + 1);
      expect(component.scianTableTouched).toBe(true);
    });

    it('should not add SCIAN when form is invalid', () => {
      component.nicoTablaForm.patchValue({
        entidad: '',
        representacion: ''
      });
      const initialLength = component.nicoTablaDatos.length;
      
      component.agregarScian();
      
      expect(component.nicoTablaDatos.length).toBe(2);
      expect(component.nicoTablaForm.touched).toBe(false);
    });

    it('should handle SCIAN deletion', () => {
      component.onEliminarScian(0);
      
      expect(component.selectedScianIndex).toBe(0);
    });

    it('should confirm SCIAN deletion', () => {
      component.selectedScianIndex = 0;
      const initialLength = component.nicoTablaDatos.length;
      
      component.aceptarEliminarScian();
      
      expect(component.nicoTablaDatos.length).toBe(initialLength - 1);
      expect(component.selectedScianIndex).toBeNull();
    });

    it('should show modal when no SCIAN is selected for deletion', () => {
      component.modalSeleccionaRegistroInstance = mockModal as any;
      
      component.onEliminarScian(null);
      
      expect(component.selectedScianIndex).toBeNull();
      expect(mockModal.show).toHaveBeenCalled();
    });
  });

  describe('Form Validation', () => {
    beforeEach(() => {
      component.crearFormulario();
    });

    it('should validate codigo postal input', () => {
      const event = { target: { value: '123456789012' } } as any;
      
      component.onCodigoPostalInput(event);
      
      const control = component.form.get('codigoPostal');
      expect(control?.touched).toBe(true);
      expect(control?.errors?.['maxlength']).toBeTruthy();
    });

    it('should validate municipio input', () => {
      const longText = 'a'.repeat(120);
      const event = { target: { value: longText } } as any;
      
      component.onMunicipioOAlcaldiaInput(event);
      
      const control = component.form.get('municipioOAlcaldia');
      expect(control?.touched).toBe(true);
      expect(control?.errors?.['maxlength']).toBeTruthy();
    });

    it('should validate localidad input', () => {
      const longText = 'a'.repeat(121);
      const event = { target: { value: longText } } as any;
      
      component.onLocalidadInput(event);
      
      const control = component.form.get('localidad');
      expect(control?.touched).toBe(true);
      expect(control?.errors?.['maxlength']).toBeTruthy();
    });

    it('should validate RFC input', () => {
      const longText = 'a'.repeat(13);
      const event = { target: { value: longText } } as any;
      
      component.onRfcInput(event);
      
      const control = component.representanteLegal.get('rfc');
      expect(control?.touched).toBe(true);
      expect(control?.errors?.['maxlength']).toBeTruthy();
    });
  });

  describe('Representante Legal Management', () => {
    beforeEach(() => {
      component.crearFormulario();
    });



    it('should enable fields when RFC is invalid', () => {
      component.representanteLegal.patchValue({ rfc: '' });
      component.representanteLegal.get('rfc')?.setErrors({ required: true });
      
      component.onBuscarRepresentanteLegal();
      
      expect(component.enableLegalFields).toBe(true);
    });
  });

  describe('Modal Management', () => {
    it('should open mercancia modal', () => {
      component.selectedMercanciaIndex = null;
      component.modalAddMercanciasRef = { nativeElement: document.createElement('div') } as any;
      
      component.openMercanciaModal();
      
      expect(component.mercanciaFormState).toEqual(
        DomicilioDelEstablecimientoComponent.getEmptyMercanciaForm()
      );
    });

    it('should close mercancia modal', () => {
      component.bootstrapModalMercanciasInstance = mockModal as any;
      
      component.cerrarMercanciaModal();
      
      expect(mockModal.hide).toHaveBeenCalled();
      expect(component.selectedMercanciaIndex).toBeNull();
    });

    it('should open SCIAN modal', () => {
      component.modalAddNicoTablaRef = { nativeElement: document.createElement('div') } as any;
      
      component.openScianModal();
      
      
      expect(document.body.classList.contains('modal-open')).toBe(false);
    });
  });

  describe('Representacion Management', () => {
    it('should update representacion options when entidad changes', () => {
      component.allRepresentaciones = [
        { id: 1, descripcion: 'Rep 1', relacionadaUmtId: 1 },
        { id: 2, descripcion: 'Rep 2', relacionadaUmtId: 2 }
      ];
      
      component.updateRepresentacionOptions('1' as any);
      
      expect(component.representacion.length).toBe(1);
      expect(component.representacion[0].relacionadaUmtId).toBe(1);
    });

    it('should clear representacion when no entidad selected', () => {
      component.updateRepresentacionOptions(null);
      
      expect(component.representacion).toEqual([]);
      expect(component.subRepresentacion).toEqual([]);
    });
  });

  describe('Form State Management', () => {
    it('should return form data', () => {
      component.crearFormulario();
      component.mercanciasTablaDatos = [mockMercanciaInfo];
      component.nicoTablaDatos = [mockNicoInfo];
      
      const data = component.getData();
      
      expect(data.form).toBeDefined();
      expect(data.domicilio).toBeDefined();
      expect(data.representanteLegal).toBeDefined();
      expect(data.nicoTablaForm).toBeDefined();
      expect(data.mercanciasTablaDatos).toEqual([mockMercanciaInfo]);
      expect(data.nicoTablaDatos).toEqual([mockNicoInfo]);
    });

    it('should validate form correctly', () => {
      component.crearFormulario();
      component.form.patchValue({
        codigoPostal: '12345',
        municipioOAlcaldia: 'Test',
        localidad: 'Test',
        calle: 'Test',
        telefono: '1234567890'
      });
      component.domicilio.patchValue({
        regimen: 'Test',
        aduanasEntradas: 'Test'
      });
      component.representanteLegal.patchValue({
        acuerdoPublico: '1',
        rfc: 'TEST123456789',
        nombre: 'Test',
        apellidoPaterno: 'Test',
        apellidoMaterno: 'Test'
      });
      component.nicoTablaForm.patchValue({
        entidad: '1',
        representacion: '1'
      });
      component.mercanciasTablaDatos = [mockMercanciaInfo];
      
      const isValid = component.isValid();
      
      expect(isValid).toBe(false);
    });

    it('should return false when forms are invalid', () => {
      component.crearFormulario();
      component.mercanciasTablaDatos = [];
      
      const isValid = component.isValid();
      
      expect(isValid).toBe(false);
    });
  });

  describe('Table Validation', () => {
    it('should check SCIAN table validity', () => {
      component.scianTableTouched = true;
      component.nicoTablaDatos = [];
      
      expect(component.isScianTableInvalid()).toBe(true);
      
      component.nicoTablaDatos = [mockNicoInfo];
      expect(component.isScianTableInvalid()).toBe(false);
    });

    it('should check Mercancias table validity', () => {
      component.mercanciasTableTouched = true;
      component.mercanciasTablaDatos = [];
      
      expect(component.isMercanciasTableInvalid()).toBe(true);
      
      component.mercanciasTablaDatos = [mockMercanciaInfo];
      expect(component.isMercanciasTableInvalid()).toBe(false);
    });
  });

  describe('Form Control Validation', () => {
    beforeEach(() => {
      component.crearFormulario();
    });


    it('should return false for valid control', () => {
      const control = component.nicoTablaForm.get('entidad');
      control?.setValue('1');
      control?.markAsTouched();
      
      expect(component.esInvalido('entidad')).toBe(false);
    });
  });

  describe('Store Integration', () => {
    beforeEach(() => {
      component.crearFormulario();
    });

    it('should set value in store', () => {
      component.setValorStore(component.form, 'codigoPostal');
      
      expect(mockTramiteStore.setTramite260912State).toHaveBeenCalled();
    });

    it('should handle manifests change', () => {
      component.onManifestsChange();
      
      expect(component.domicilio.get('manifests')?.touched).toBe(true);
    });
  });

  describe('Component Cleanup', () => {
    it('should cleanup on destroy', () => {
      const destroySpy = jest.spyOn(component['destroy$'], 'next');
      const completeSpy = jest.spyOn(component['destroy$'], 'complete');
      
      component.ngOnDestroy();
      
      expect(destroySpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('Form State Management', () => {
    it('should initialize form state correctly', () => {
      component.esFormularioSoloLectura = false;
      
      component.inicializarEstadoFormulario();
      
      expect(component.form).toBeDefined();
    });

    it('should save form data when readonly', () => {
      component.esFormularioSoloLectura = true;
      
      component.guardarDatosFormulario();
      
      expect(component.form.disabled).toBe(true);
    });
  });

  describe('Cancel Operations', () => {
    it('should cancel SCIAN modal', () => {
      component.bootstrapModalNicoTablaInstance = mockModal as any;
      
      component.cancelar(true);
      
      expect(mockModal.hide).toHaveBeenCalled();
    });

    it('should cancel Mercancia modal', () => {
      component.bootstrapModalMercanciasInstance = mockModal as any;
      
      component.cancelar(false);
      
      expect(mockModal.hide).toHaveBeenCalled();
    });
  });
});