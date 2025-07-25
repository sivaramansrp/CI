import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AgregardestinatariofinalComponent } from './agregardestinatariofinal.component';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';
import { AcuiculturaStore } from '../../estados/220203/sanidad-certificado.store';
import { TercerosrelacionadosService } from '../../../../shared/components/services/tercerosrelacionados/tercerosrelacionados.service';
import { Acuicultura, DestinatarioForm } from '../../models/220203/importacion-de-acuicultura.module';
import { TercerosrelacionadosdestinoTable } from '../../../../shared/models/tercerosrelacionados.model';
import { OPCION_DE_BOTON_DE_RADIO } from '../../../../shared/constantes/tercerosrelacionados.enum';

/**
 * @fileoverview
 * Archivo de pruebas unitarias para AgregardestinatariofinalComponent.
 * Incluye pruebas para inicialización, formularios reactivos, validaciones dinámicas, 
 * gestión de catálogos, operaciones CRUD y manejo de eventos.
 * Cobertura completa de todos los métodos públicos y casos edge del componente.
 */
describe('AgregardestinatariofinalComponent', () => {
  let component: AgregardestinatariofinalComponent;
  let fixture: ComponentFixture<AgregardestinatariofinalComponent>;
  let mockImportacionService: jest.Mocked<ImportacionDeAcuiculturaService>;
  let mockAcuiculturaStore: jest.Mocked<AcuiculturaStore>;
  let mockTercerosService: jest.Mocked<TercerosrelacionadosService>;
  let mockRouter: jest.Mocked<Router>;
  let mockActivatedRoute: jest.Mocked<ActivatedRoute>;
  let formBuilder: FormBuilder;

  // Mock data para las pruebas
  const mockCatalogData = [
    { id: 1, nombre: 'México', descripcion: 'País México' },
    { id: 2, nombre: 'Estados Unidos', descripcion: 'País Estados Unidos' },
    { id: 3, nombre: 'Canadá', descripcion: 'País Canadá' }
  ];

  const mockDestinatarioData: DestinatarioForm = {
    tipoMercancia: 'yes',
    nombre: 'Juan',
    primerApellido: 'Pérez',
    segundoApellido: 'García',
    razonSocial: 'Empresa Test S.A.',
    pais: 'México',
    domicilio: 'Calle Test 123',
    lada: '55',
    telefono: '12345678',
    correo: 'test@example.com'
  };

  const mockAcuiculturaState: Partial<Acuicultura> = {
    seletedExdora: mockDestinatarioData,
    datosForma: [mockDestinatarioData],
    tercerosRelacionados: [],
    mercanciaGroup: [],
    formularioMovilizacion: {} as any,
    realizarGroup: {} as any,
    pagoDeDerechos: {} as any,
    selectedmercanciaGroupDatos: {} as any,
    selectedTerceros: {} as any
  };

  beforeEach(async () => {
    // Crear mocks de los servicios
    mockImportacionService = {
      getAllDatosForma: jest.fn()
    } as any;

    mockAcuiculturaStore = {
      updatedatosForma: jest.fn(),
      actualizarSelectedExdora: jest.fn()
    } as any;

    mockTercerosService = {
      obtenerSelectorList: jest.fn()
    } as any;

    mockRouter = {
      navigate: jest.fn()
    } as any;

    mockActivatedRoute = {
      params: of({}),
      queryParams: of({})
    } as any;

    await TestBed.configureTestingModule({
      imports: [AgregardestinatariofinalComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ImportacionDeAcuiculturaService, useValue: mockImportacionService },
        { provide: AcuiculturaStore, useValue: mockAcuiculturaStore },
        { provide: TercerosrelacionadosService, useValue: mockTercerosService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    // Configurar mocks por defecto
    mockImportacionService.getAllDatosForma.mockReturnValue(of(mockAcuiculturaState as Acuicultura));
    mockTercerosService.obtenerSelectorList.mockReturnValue(of(mockCatalogData));

    fixture = TestBed.createComponent(AgregardestinatariofinalComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
  });

  describe('Inicialización del Componente', () => {
    it('debería crear el componente correctamente', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar las propiedades por defecto', () => {
      expect(component.esFormularioSoloLectura).toBe(false);
      expect(component.opcionDeBotonDeRadio).toEqual(OPCION_DE_BOTON_DE_RADIO);
      expect(component.pairsCatalog).toEqual([]);
      expect(component.estadoCatalog).toEqual([]);
      expect(component.municipioCatalog).toEqual([]);
      expect(component.coloniaCatalog).toEqual([]);
    });

    it('debería tener los EventEmitter definidos', () => {
      expect(component.guardarDestinatario).toBeDefined();
      expect(component.cerrar).toBeDefined();
    });

    it('debería tener DESTROY_NOTIFIER$ configurado', () => {
      expect(component['DESTROY_NOTIFIER$']).toBeDefined();
      expect(component['DESTROY_NOTIFIER$'].closed).toBe(false);
    });
  });

  describe('ngOnInit - Inicialización del Formulario', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('debería crear el formulario con la estructura correcta', () => {
      expect(component.destinatarioForm).toBeDefined();
      expect(component.destinatarioForm.get('tipoMercancia')).toBeDefined();
      expect(component.destinatarioForm.get('nombre')).toBeDefined();
      expect(component.destinatarioForm.get('primerApellido')).toBeDefined();
      expect(component.destinatarioForm.get('segundoApellido')).toBeDefined();
      expect(component.destinatarioForm.get('razonSocial')).toBeDefined();
      expect(component.destinatarioForm.get('pais')).toBeDefined();
      expect(component.destinatarioForm.get('domicilio')).toBeDefined();
      expect(component.destinatarioForm.get('lada')).toBeDefined();
      expect(component.destinatarioForm.get('telefono')).toBeDefined();
      expect(component.destinatarioForm.get('correo')).toBeDefined();
    });

    it('debería establecer valores por defecto correctos', () => {
      expect(component.destinatarioForm.get('tipoMercancia')?.value).toBe('yes');
      expect(component.destinatarioForm.get('nombre')?.value).toBe('');
      expect(component.destinatarioForm.get('primerApellido')?.value).toBe('');
      expect(component.destinatarioForm.get('segundoApellido')?.value).toBe('');
      expect(component.destinatarioForm.get('razonSocial')?.value).toBe('');
    });

    it('debería configurar validadores correctamente', () => {
      const tipoMercanciaControl = component.destinatarioForm.get('tipoMercancia');
      const paisControl = component.destinatarioForm.get('pais');
      const domicilioControl = component.destinatarioForm.get('domicilio');
      const correoControl = component.destinatarioForm.get('correo');

      // Validadores requeridos
      expect(tipoMercanciaControl?.hasError('required')).toBeFalsy();
      expect(paisControl?.hasError('required')).toBeTruthy();
      expect(domicilioControl?.hasError('required')).toBeTruthy();

      // Validador de email
      correoControl?.setValue('email-invalido');
      expect(correoControl?.hasError('email')).toBeTruthy();
    });

    it('debería suscribirse a getAllDatosForma y actualizar el formulario', () => {
      expect(mockImportacionService.getAllDatosForma).toHaveBeenCalled();
      
      // Verificar que se actualizó el formulario con los datos mock
      expect(component.destinatarioForm.get('nombre')?.value).toBe(mockDestinatarioData.nombre);
      expect(component.destinatarioForm.get('primerApellido')?.value).toBe(mockDestinatarioData.primerApellido);
      expect(component.destinatarioForm.get('razonSocial')?.value).toBe(mockDestinatarioData.razonSocial);
    });

    it('debería manejar datos de destinatario nulos sin errores', () => {
      const mockStateWithoutDestinatario = { ...mockAcuiculturaState, seletedExdora: undefined };
      mockImportacionService.getAllDatosForma.mockReturnValue(of(mockStateWithoutDestinatario as unknown as Acuicultura));

      expect(() => component.ngOnInit()).not.toThrow();
    });
  });

  describe('ngAfterViewInit - Inicialización de Vista', () => {
    it('debería llamar a pairsCatalogChange después de la inicialización de la vista', () => {
      const pairsCatalogChangeSpy = jest.spyOn(component, 'pairsCatalogChange');
      
      component.ngAfterViewInit();
      
      expect(pairsCatalogChangeSpy).toHaveBeenCalled();
    });
  });

  describe('pairsCatalogChange - Carga de Catálogos', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('debería cargar el catálogo de países correctamente', () => {
      component.pairsCatalogChange();

      expect(mockTercerosService.obtenerSelectorList).toHaveBeenCalledWith('paisprocedencia.json');
      expect(component.pairsCatalog).toEqual(mockCatalogData);
    });

    it('debería manejar errores en la carga del catálogo', () => {
      mockTercerosService.obtenerSelectorList.mockReturnValue(throwError('Error de red'));

      expect(() => component.pairsCatalogChange()).not.toThrow();
    });
  });

  describe('onGuardarDestinatarioFinal - Guardar Destinatario', () => {
    beforeEach(() => {
      component.ngOnInit();
      // Hacer el formulario válido
      component.destinatarioForm.patchValue({
        tipoMercancia: 'yes',
        razonSocial: 'Empresa Test',
        pais: 'México',
        domicilio: 'Calle Test 123'
      });
    });

    it('debería guardar cuando el formulario es válido', () => {
      const cerrarSpy = jest.spyOn(component.cerrar, 'emit');
      const resetSpy = jest.spyOn(component.destinatarioForm, 'reset');

      component.onGuardarDestinatarioFinal();

      expect(mockAcuiculturaStore.updatedatosForma).toHaveBeenCalled();
      expect(mockAcuiculturaStore.actualizarSelectedExdora).toHaveBeenCalledWith({} as DestinatarioForm);
      expect(resetSpy).toHaveBeenCalled();
      expect(cerrarSpy).toHaveBeenCalled();
    });

    it('debería actualizar el store con los datos del formulario', () => {
      const formData = {
        tipoMercancia: 'yes',
        razonSocial: 'Empresa Test',
        pais: 'México',
        domicilio: 'Calle Test 123'
      };
      
      component.destinatarioForm.patchValue(formData);
      component.onGuardarDestinatarioFinal();

      const updateCall = mockAcuiculturaStore.updatedatosForma.mock.calls[0][0];
      expect(updateCall).toHaveLength(1);
      expect(updateCall[0]).toMatchObject(formData);
    });

    it('debería marcar campos como tocados cuando el formulario es inválido', () => {
      // Hacer el formulario inválido
      component.destinatarioForm.patchValue({
        pais: '', // Campo requerido vacío
        domicilio: '' // Campo requerido vacío
      });

      const markAllAsTouchedSpy = jest.spyOn(component.destinatarioForm, 'markAllAsTouched');

      component.onGuardarDestinatarioFinal();

      expect(markAllAsTouchedSpy).toHaveBeenCalled();
      expect(mockAcuiculturaStore.updatedatosForma).not.toHaveBeenCalled();
    });
  });

  describe('onLimpiarDestinatario - Limpiar Formulario', () => {
    beforeEach(() => {
      component.ngOnInit();
      // Llenar el formulario con datos
      component.destinatarioForm.patchValue({
        nombre: 'Juan',
        primerApellido: 'Pérez',
        razonSocial: 'Empresa Test'
      });
      component.destinatarioForm.markAsDirty();
      component.destinatarioForm.markAsTouched();
    });

    it('debería resetear el formulario completamente', () => {
      component.onLimpiarDestinatario();

      expect(component.destinatarioForm.get('nombre')?.value).toBeFalsy();
      expect(component.destinatarioForm.get('primerApellido')?.value).toBeFalsy();
      expect(component.destinatarioForm.get('razonSocial')?.value).toBeFalsy();
    });

    it('debería restablecer el estado del formulario', () => {
      component.onLimpiarDestinatario();

      expect(component.destinatarioForm.pristine).toBe(true);
      expect(component.destinatarioForm.untouched).toBe(true);
    });

    it('debería establecer tipoMercancia como "yes" después del reset', () => {
      component.onLimpiarDestinatario();

      expect(component.destinatarioForm.get('tipoMercancia')?.value).toBe('yes');
    });
  });

  describe('onCancelarDestinatario - Cancelar Operación', () => {
    it('debería emitir evento de cierre', () => {
      const cerrarSpy = jest.spyOn(component.cerrar, 'emit');

      component.onCancelarDestinatario();

      expect(cerrarSpy).toHaveBeenCalled();
    });
  });

  describe('enCambioValorRadio - Validaciones Dinámicas', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('debería configurar validaciones para persona física (tipoMercancia = "no")', () => {
      component.destinatarioForm.patchValue({ tipoMercancia: 'no' });
      
      component.enCambioValorRadio();

      const razonSocialControl = component.destinatarioForm.get('razonSocial');
      const nombreControl = component.destinatarioForm.get('nombre');
      const primerApellidoControl = component.destinatarioForm.get('primerApellido');

      // Razón social no debe ser requerida
      expect(razonSocialControl?.hasError('required')).toBeFalsy();
      
      // Nombre y primer apellido deben ser requeridos
      expect(nombreControl?.hasError('required')).toBeTruthy();
      expect(primerApellidoControl?.hasError('required')).toBeTruthy();
    });

    it('debería configurar validaciones para persona moral (tipoMercancia = "yes")', () => {
      component.destinatarioForm.patchValue({ tipoMercancia: 'yes' });
      
      component.enCambioValorRadio();

      const razonSocialControl = component.destinatarioForm.get('razonSocial');
      const nombreControl = component.destinatarioForm.get('nombre');
      const primerApellidoControl = component.destinatarioForm.get('primerApellido');

      // Razón social debe ser requerida
      expect(razonSocialControl?.hasError('required')).toBeTruthy();
      
      // Nombre y primer apellido no deben ser requeridos
      nombreControl?.setValue('');
      primerApellidoControl?.setValue('');
      expect(nombreControl?.hasError('required')).toBeFalsy();
      expect(primerApellidoControl?.hasError('required')).toBeFalsy();
    });

    it('debería actualizar la validez de los controles después del cambio', () => {
      const updateValueAndValiditySpy = jest.spyOn(component.destinatarioForm.get('razonSocial')!, 'updateValueAndValidity');
      
      component.destinatarioForm.patchValue({ tipoMercancia: 'no' });
      component.enCambioValorRadio();

      expect(updateValueAndValiditySpy).toHaveBeenCalled();
    });
  });

  describe('Validaciones de Formulario', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('debería validar correctamente el campo de correo electrónico', () => {
      const correoControl = component.destinatarioForm.get('correo');
      
      // Email válido
      correoControl?.setValue('test@example.com');
      expect(correoControl?.hasError('email')).toBeFalsy();
      
      // Email inválido
      correoControl?.setValue('email-invalido');
      expect(correoControl?.hasError('email')).toBeTruthy();
      
      // Email vacío (debería ser válido ya que no es requerido)
      correoControl?.setValue('');
      expect(correoControl?.hasError('email')).toBeFalsy();
    });

    it('debería validar la longitud máxima de los campos', () => {
      const ladaControl = component.destinatarioForm.get('lada');
      const telefonoControl = component.destinatarioForm.get('telefono');
      const correoControl = component.destinatarioForm.get('correo');

      // Lada - máximo 5 caracteres
      ladaControl?.setValue('123456');
      expect(ladaControl?.hasError('maxlength')).toBeTruthy();

      // Teléfono - máximo 30 caracteres
      telefonoControl?.setValue('1'.repeat(31));
      expect(telefonoControl?.hasError('maxlength')).toBeTruthy();

      // Correo - máximo 320 caracteres
      correoControl?.setValue('a'.repeat(310) + '@email.com');
      expect(correoControl?.hasError('maxlength')).toBeTruthy();
    });

    it('debería validar campos requeridos', () => {
      const tipoMercanciaControl = component.destinatarioForm.get('tipoMercancia');
      const paisControl = component.destinatarioForm.get('pais');
      const domicilioControl = component.destinatarioForm.get('domicilio');

      // Limpiar valores
      tipoMercanciaControl?.setValue('');
      paisControl?.setValue('');
      domicilioControl?.setValue('');

      expect(tipoMercanciaControl?.hasError('required')).toBeTruthy();
      expect(paisControl?.hasError('required')).toBeTruthy();
      expect(domicilioControl?.hasError('required')).toBeTruthy();
    });
  });

  describe('Propiedades de Input/Output', () => {
    it('debería aceptar la propiedad esFormularioSoloLectura', () => {
      component.esFormularioSoloLectura = true;
      expect(component.esFormularioSoloLectura).toBe(true);
    });

    it('debería emitir eventos correctamente', () => {
      const guardarSpy = jest.spyOn(component.guardarDestinatario, 'emit');
      const cerrarSpy = jest.spyOn(component.cerrar, 'emit');

      const mockTercero = {} as TercerosrelacionadosdestinoTable;
      component.guardarDestinatario.emit(mockTercero);
      component.cerrar.emit();

      expect(guardarSpy).toHaveBeenCalledWith(mockTercero);
      expect(cerrarSpy).toHaveBeenCalled();
    });
  });

  describe('Manejo de Errores y Casos Edge', () => {
    it('debería manejar errores en el servicio de datos', () => {
      mockImportacionService.getAllDatosForma.mockReturnValue(throwError('Error del servicio'));

      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('debería manejar datos parciales del destinatario', () => {
      const datosIncompletos: Partial<DestinatarioForm> = {
        nombre: 'Juan',
        // Faltan otros campos
      };

      const mockStateIncompleto = {
        ...mockAcuiculturaState,
        seletedExdora: datosIncompletos as DestinatarioForm
      };

      mockImportacionService.getAllDatosForma.mockReturnValue(of(mockStateIncompleto as Acuicultura));

      component.ngOnInit();

      expect(component.destinatarioForm.get('nombre')?.value).toBe('Juan');
      expect(component.destinatarioForm.get('primerApellido')?.value).toBe('');
    });

    it('debería manejar el cambio de validaciones cuando el control no existe', () => {
      // Simular un formulario sin el control razonSocial
      const incompleteForm = formBuilder.group({
        tipoMercancia: ['yes']
      });
      component.destinatarioForm = incompleteForm;

      expect(() => component.enCambioValorRadio()).not.toThrow();
    });
  });

  describe('Integración de Servicios', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('debería interactuar correctamente con todos los servicios', () => {
      // Verificar interacción con ImportacionDeAcuiculturaService
      expect(mockImportacionService.getAllDatosForma).toHaveBeenCalled();

      // Verificar interacción con TercerosrelacionadosService
      component.pairsCatalogChange();
      expect(mockTercerosService.obtenerSelectorList).toHaveBeenCalledWith('paisprocedencia.json');

      // Verificar interacción con AcuiculturaStore
      component.destinatarioForm.patchValue({
        tipoMercancia: 'yes',
        razonSocial: 'Test',
        pais: 'México',
        domicilio: 'Test'
      });
      component.onGuardarDestinatarioFinal();
      
      expect(mockAcuiculturaStore.updatedatosForma).toHaveBeenCalled();
      expect(mockAcuiculturaStore.actualizarSelectedExdora).toHaveBeenCalled();
    });
  });
});
