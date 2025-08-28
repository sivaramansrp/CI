import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DatosMercanciaComponent } from './datos-mercancia.component';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { Tramite260601Store } from '../../../../estados/tramites/tramite260601.store';
import { Tramite260601Query } from '../../../../estados/queries/tramite260601.query';
import { of } from 'rxjs';

fdescribe('DatosMercanciaComponent', () => {
  let component: DatosMercanciaComponent;
  let fixture: ComponentFixture<DatosMercanciaComponent>;
  let mockAvisoSanitarioService: Partial<AvisoSanitarioService>;
  let mockTramite260601Store: Partial<Tramite260601Store>;
  let mockTramite260601Query: Partial<Tramite260601Query>;

  beforeEach(async () => {
    mockAvisoSanitarioService = {
      getProductoClasificacion: jest.fn().mockReturnValue(of({ data: [{ label: 'Clasificación 1', value: 'c1' }] })),
      getEspecificoProductoClasificacion: jest.fn().mockReturnValue(of({ data: [{ label: 'Específico 1', value: 'e1' }] })),
      getTipoProducto: jest.fn().mockReturnValue(of({ data: [{ label: 'Tipo 1', value: 't1' }] })),
      getPaisDestino: jest.fn().mockReturnValue(of({ data: [{ label: 'País 1', value: 'p1' }] })),
      obtenerMercanciaCrosslist: jest.fn().mockReturnValue(
        of({
          paisOrigenCrossList: { label: { izquierda: 'Izquierda', derecha: 'Derecha' }, fechas: ['01/01/2023'] },
          paisProcedencisCrossList: { label: { izquierda: 'Izquierda', derecha: 'Derecha' }, fechas: ['02/01/2023'] },
          usoEspecificoCrossList: { label: { izquierda: 'Izquierda', derecha: 'Derecha' }, fechas: ['03/01/2023'] },
        })
      ),
      autocompletarDescripcion: jest.fn().mockReturnValue(
        of({ data: [{ descripcion: 'Descripción Fracción' }] })
      ),
    };

    mockTramite260601Store = {
      setProductoClasificacion: jest.fn(),
      setEspecificoProductoClasificacion: jest.fn(),
      setTipoProducto: jest.fn(),
      setPaisDestino: jest.fn(),
      setFraccionArancelariaDescripcion: jest.fn(),
    };

    mockTramite260601Query = {
      selectSeccionState$: of({
        RFCResponsableSanitario: 'RFC123456',
        razonSocial: 'Empresa S.A.',
        correoElectronico: 'contacto@empresa.com',
        codigoPostal: '12345',
        cveEstado: 'Estado1',
        descripcionMunicipio: 'Municipio1',
        informacionExtra: 'Extra info',
        descripcionColonia: 'Colonia1',
        calle: 'Calle1',
        lada: null,
        telefono: null,
        cveSCIAN: 'SCIAN123',
        cveSCIANDescripcion: 'Descripción SCIAN',
        cveSCIANID: 123,
        avisoFuncionamiento: true,
        cveRegimenes: 'Regimen1',
        cveAduanas: 'Aduana1',
        cveProductoClasificacion: 'Clasificación1',
        cveEspecificoProductoClasifi: 'Especificación1',
        nombreProducto: 'Producto1',
        marca: 'Marca1',
        cveTipoProducto: 'Tipo1',
        fraccionArancelaria: 'Fracción1',
        fraccionArancelariaDescripcion: 'Descripción Fracción',
        modelo: 'Modelo1',
        productoDescripcion: 'Descripción Producto',
        cvePaisDestino: 'PaisDestino1',
        seleccionadaManifiesto: [false],
        informacionConfidencial: 'Confidencial',
        rfc: 'RFCProveedor1',
        nombreOrazonsocial: 'Razón Social Proveedor',
        apellidoPaterno: 'Apellido Paterno',
        apellidoMaterno: 'Apellido Materno',
        tercerosNacionalidad: 'Nacionalidad1',
        tipoPersona: 'Física',
        rfcProveedor: 'RFC123',
        rfcProveedorInhabilitar: true,
        curp: 'CURP123',
        curpInhabilitar: true,
        proveedorNombre: 'Nombre Proveedor',
        proveedorNombreInhabilitar: true,
        proveedorPrimerApellido: 'Primer Apellido',
        proveedorPrimerApellidoInhabilitar: true,
        proveedorSegundoApellido: 'Segundo Apellido',
        proveedorSegundoApellidoInhabilitar: true,
        proveedorRazonSocial: 'Razón Social Proveedor',
        proveedorRazonSocialInhabilitar: true,
        cvePais: 'Pais1',
        cvePaisInhabilitar: true,
        domicilioEstado: 'Estado1',
        domicilioEstadoInhabilitar: true,
        alcaldia: 'Alcaldía1',
        alcaldiaInhabilitar: true,
        localidad: 'Localidad1',
        localidadInhabilitar: true,
        domicilioCodigoPostal: '12345',
        domicilioCodigoPostalInhabilitar: true,
        colonia: 'Colonia1',
        coloniaInhabilitar: true,
        domicilioCalle: 'Calle1',
        domicilioCalleInhabilitar: true,
        numeroExterior: 'Exterior1',
        numeroExteriorInhabilitar: true,
        numeroInterior: 'Interior1',
        numeroInteriorInhabilitar: true,
        domicilioLada: 'Lada1',
        domicilioLadaInhabilitar: true,
        domicilioTelefono: 'Telefono1',
        domicilioTelefonoInhabilitar: true,
        domicilioCorreoElectronico: 'email@proveedor.com',
        domicilioCorreoElectronicoInhabilitar: true,
        mostrarRfcBuscarBoton: false,
        mostrarCurpBuscarBoton: false,
        inhabilitarPais: true,

        tercerosNacionalidadFabricante: 'nacional',
        tipoPersonaFabricante: 'fisica',
        rfcFabricante: 'RFC12345',
        rfcFabricanteInhabilitar: true,
        curpFabricante: 'CURP12345',        
        curpFabricanteInhabilitar: true,
        fabricanteNombre: 'Nombre Fabricante',
        fabricanteNombreInhabilitar: true,
        fabricantePrimerApellido: 'Primer Apellido',
        fabricantePrimerApellidoInhabilitar: true,
        fabricanteSegundoApellido: 'Segundo Apellido',
        fabricanteSegundoApellidoInhabilitar: true,
        fabricanteRazonSocial: 'Razón Social Proveedor',
        fabricanteRazonSocialInhabilitar: true,
        cvePaisFabricante: 'Pais1',
        cvePaisFabricanteInhabilitar: true,
        estadoFabricante: 'Estado1',
        estadoFabricanteInhabilitar: true,
        alcaldiaFabricante: 'Alcaldía1',
        alcaldiaFabricanteInhabilitar: true,
        localidadFabricante: 'Localidad1',
        localidadFabricanteInhabilitar: true,
        codigoPostalFabricante: '12345',
        codigoPostalFabricanteInhabilitar: true,
        coloniaFabricante: 'Colonia1',
        coloniaFabricanteInhabilitar: true,
        calleFabricante: 'Calle1',
        calleFabricanteInhabilitar: true,
        numeroExteriorFabricante: 'Exterior1',
        numeroExteriorFabricanteInhabilitar: true,
        numeroInteriorFabricante: 'Interior1',
        numeroInteriorFabricanteInhabilitar: true,
        ladaFabricante: 'Lada1',
        ladaFabricanteInhabilitar: true,
        telefonoFabricante: 'Telefono',
        telefonoFabricanteInhabilitar: true,
        correoElectronicoFabricante: 'email@fabricante.com',
        correoElectronicoFabricanteInhabilitar: true,        
        mostrarRfcFabricanteBuscarBoton: false,
        mostrarCurpFabricanteBuscarBoton: false,
        inhabilitarPaisFabricante: true,
        proveedorTablaDatos: [],
        fabricanteTablaDatos: [],
        scianBodyData: [],
        productoBodyData: [],
        cvePaisDeOrigen: ['PaisOrigen1'],
        cvePaisDeProcedencia: ['PaisProcedencia1'],
        cveUsoEspecifico: ['UsoEspecifico1'],
      }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosMercanciaComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: AvisoSanitarioService, useValue: mockAvisoSanitarioService },
        { provide: Tramite260601Store, useValue: mockTramite260601Store },
        { provide: Tramite260601Query, useValue: mockTramite260601Query },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should populate estado catalog in ngOnInit', () => {
    component.ngOnInit();
  });

  it('should create the form in crearFormulario', () => {
    component.crearFormulario();
    expect(component.agregarMercanciaForm).toBeDefined();
    expect(component.agregarMercanciaForm.get('cveProductoClasificacion')).toBeDefined();
    expect(component.agregarMercanciaForm.get('cvePaisDestino')).toBeDefined();
  });

  it('should fetch and populate catalog data in inicializaCatalogos', () => {
    component.ngOnInit();
    expect(mockAvisoSanitarioService.getProductoClasificacion).toHaveBeenCalled();
    expect(mockAvisoSanitarioService.getEspecificoProductoClasificacion).toHaveBeenCalled();
    expect(mockAvisoSanitarioService.getTipoProducto).toHaveBeenCalled();
    expect(mockAvisoSanitarioService.getPaisDestino).toHaveBeenCalled();
  });

  it('should handle productoClasificacionSeleccion correctly', () => {
    const spySetProductoClasificacion = jest.spyOn(mockTramite260601Store, 'setProductoClasificacion');
    component.crearFormulario();
    component.agregarMercanciaForm.get('cveProductoClasificacion')?.setValue('c1');
    component.productoClasificacionSeleccion();
    expect(spySetProductoClasificacion).toHaveBeenCalledWith('c1');
  });

  it('should handle especificoProductoClasificacionSeleccion correctly', () => {
    const spySetEspecificoProductoClasificacion = jest.spyOn(mockTramite260601Store, 'setEspecificoProductoClasificacion');
    component.crearFormulario();
    component.agregarMercanciaForm.get('cveEspecificoProductoClasifi')?.setValue('e1');
    component.especificoProductoClasificacionSeleccion();
    expect(spySetEspecificoProductoClasificacion).toHaveBeenCalledWith('e1');
  });

  it('should handle tipoProductoSeleccion correctly', () => {
    const spySetTipoProducto = jest.spyOn(mockTramite260601Store, 'setTipoProducto');
    component.crearFormulario();
    component.agregarMercanciaForm.get('cveTipoProducto')?.setValue('t1');
    component.tipoProductoSeleccion();
    expect(spySetTipoProducto).toHaveBeenCalledWith('t1');
  });

  it('should handle paisDestinoSeleccion correctly', () => {
    const spySetPaisDestino = jest.spyOn(mockTramite260601Store, 'setPaisDestino');
    component.crearFormulario();
    component.agregarMercanciaForm.get('cvePaisDestino')?.setValue('p1');
    component.paisDestinoSeleccion();
    expect(spySetPaisDestino).toHaveBeenCalledWith('p1');
  });

  it('should handle mostrar_colapsable correctly', () => {
    const index = 0;
    component.panels = [{ label: 'Panel 1', isCollapsed: true }, { label: 'Panel 2', isCollapsed: true }];
    component.mostrar_colapsable(index);
    expect(component.panels[index].isCollapsed).toBe(false);
    expect(component.panels[1].isCollapsed).toBe(true);
  });

  it('should fetch and populate crosslist data in obtenerMercanciaCrosslist', () => {
    component.obtenerMercanciaCrosslist();
    expect(component.paisOrigenCrosslistDatos).toEqual({ label: { izquierda: 'Izquierda', derecha: 'Derecha' }, fechas: ['01/01/2023'] });
    expect(component.paisProcedencisCrosslistDatos).toEqual({ label: { izquierda: 'Izquierda', derecha: 'Derecha' }, fechas: ['02/01/2023'] });
    expect(component.usoEspecificoCrosslistDatos).toEqual({ label: { izquierda: 'Izquierda', derecha: 'Derecha' }, fechas: ['03/01/2023'] });
  });

  it('should toggle colapsable state in mostrar_uso_especifico_colapsable', () => {
    expect(component.colapsable).toBe(false);
    component.mostrar_uso_especifico_colapsable();
    expect(component.colapsable).toBe(true);
  });

  it('should autocomplete description in autocompletarDescripcion', () => {
    const spySetDescripcion = jest.spyOn(mockTramite260601Store, 'setFraccionArancelariaDescripcion');
    component.crearFormulario();
    component.autocompletarDescripcion();
    expect(component.agregarMercanciaForm.get('fraccionArancelariaDescripcion')?.value).toBe('Descripción Fracción');
    expect(spySetDescripcion).toHaveBeenCalledWith('Descripción Fracción');
  });

  it('should unsubscribe in ngOnDestroy', () => {
    const spyNext = jest.spyOn(component['destruirNotificador$'], 'next');
    const spyComplete = jest.spyOn(component['destruirNotificador$'], 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});