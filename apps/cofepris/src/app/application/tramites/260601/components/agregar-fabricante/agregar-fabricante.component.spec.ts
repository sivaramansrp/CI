import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AgregarFabricanteComponent } from './agregar-fabricante.component';
import { Tramite260601Store } from '../../estados/tramites/tramite260601.store';
import { Tramite260601Query } from '../../estados/queries/tramite260601.query';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { of, Subject } from 'rxjs';

describe('AgregarFabricanteComponent', () => {
  let component: AgregarFabricanteComponent;
  let fixture: ComponentFixture<AgregarFabricanteComponent>;
  let mockAvisoSanitarioService: Partial<AvisoSanitarioService>;
  let mockTramite260601Store: Partial<Tramite260601Store>;
  let mockTramite260601Query: Partial<Tramite260601Query>;
  let fb: FormBuilder;

  beforeEach(async () => {
    mockAvisoSanitarioService = {
      getProductoClasificacion: jest.fn().mockReturnValue(of({ data: [{ value: 'producto1', label: 'Producto 1' }] })),
    };

    mockTramite260601Store = {
      setTipoProducto: jest.fn(),
      setTercerosNacionalidadFabricante: jest.fn(),
      setTipoPersonaFabricante: jest.fn(),
      setFabricanteNombre: jest.fn(),
      setMostrarRfcFabricanteBuscarBoton: jest.fn(),
      setMostrarCurpFabricanteBuscarBoton: jest.fn(),
      setInhabilitarPaisFabricante: jest.fn(),
      setRfcFabricanteInhabilitar: jest.fn(),
      setCurpFabricanteInhabilitar: jest.fn(),
      setFabricanteNombreInhabilitar: jest.fn(),
      setFabricantePrimerApellido: jest.fn(),
      setFabricantePrimerApellidoInhabilitar: jest.fn(),
      setFabricanteSegundoApellidoInhabilitar: jest.fn(),
      setFabricanteRazonSocialInhabilitar: jest.fn(),
      setPaisFabricanteInhabilitar: jest.fn(),
      setEstadoFabricanteInhabilitar: jest.fn(),
      setAlcaldiaFabricanteInhabilitar: jest.fn(),
      setLocalidadFabricanteInhabilitar: jest.fn(),
      setCodigoPostalInhabilitar: jest.fn(),
      setColoniaFabricanteInhabilitar: jest.fn(),
      setCalleFabricanteInhabilitar: jest.fn(),
      setNumeroExteriorFabricanteInhabilitar: jest.fn(),
      setNumeroInteriorFabricanteInhabilitar: jest.fn(),
      setLadaFabricanteInhabilitar: jest.fn(),
      setTelefonoFabricanteInhabilitar: jest.fn(),
      setCorreoElectronicoFabricanteInhabilitar: jest.fn(),
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
      }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AgregarFabricanteComponent],
      providers: [
        FormBuilder,
        { provide: AvisoSanitarioService, useValue: mockAvisoSanitarioService },
        { provide: Tramite260601Store, useValue: mockTramite260601Store },
        { provide: Tramite260601Query, useValue: mockTramite260601Query },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarFabricanteComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize agregarFabricanteForm in crearFormulario', () => {
    component.crearFormulario();
    expect(component.agregarFabricanteForm).toBeDefined();
    expect(component.agregarFabricanteForm.get('datosGeneralesForm')).toBeDefined();
    expect(component.agregarFabricanteForm.get('datosPersonalesForm')).toBeDefined();
    expect(component.agregarFabricanteForm.get('domicilioForm')).toBeDefined();
  });

  it('should update store value for paisSeleccion', () => {
    component.crearFormulario();
    component.domicilioForm.get('cvePaisFabricante')?.setValue('producto1');
    component.paisSeleccion();
    expect(mockTramite260601Store.setTipoProducto).toHaveBeenCalledWith('producto1');
  });

  it('should handle nacionalidad change correctly in onNacionalidadCambio', () => {
    component.onNacionalidadCambio('nacional');
    expect(mockTramite260601Store.setTercerosNacionalidadFabricante).toHaveBeenCalledWith('nacional');
    expect(mockTramite260601Store.setTipoPersonaFabricante).toHaveBeenCalledWith('');
    expect(mockTramite260601Store.setMostrarRfcFabricanteBuscarBoton).toHaveBeenCalledWith(false);
    expect(mockTramite260601Store.setInhabilitarPaisFabricante).toHaveBeenCalledWith(true);

    component.onNacionalidadCambio('extranjero');
    expect(component.tipoPersonaOpciones).toEqual(
      component.inicialTipoPersonaOpciones.filter((option) => option.value !== 'noContribuyente')
    );
  });

  it('should handle tipoPersona change correctly in onTipoPersonaCambio', () => {
    component.crearFormulario();
    component.onTipoPersonaCambio('fisica');
    expect(mockTramite260601Store.setTipoPersonaFabricante).toHaveBeenCalledWith('fisica');
    expect(mockTramite260601Store.setRfcFabricanteInhabilitar).toHaveBeenCalledWith(false);
    expect(mockTramite260601Store.setMostrarRfcFabricanteBuscarBoton).toHaveBeenCalledWith(true);
    expect(mockTramite260601Store.setMostrarCurpFabricanteBuscarBoton).toHaveBeenCalledWith(false);
  });

  it('should reset datosPersonalesForm in resetDatosPersonalesForm', () => {
    component.crearFormulario();
    component.resetDatosPersonalesForm();
    expect(component.datosGeneralesForm.get('rfcFabricante')?.disabled).toBeTruthy();
    expect(component.datosGeneralesForm.get('curpFabricante')?.disabled).toBeTruthy();
    expect(mockTramite260601Store.setRfcFabricanteInhabilitar).toHaveBeenCalledWith(true);
    expect(mockTramite260601Store.setCurpFabricanteInhabilitar).toHaveBeenCalledWith(true);
    expect(mockTramite260601Store.setFabricanteNombre).toHaveBeenCalledWith('');
    expect(mockTramite260601Store.setFabricantePrimerApellido).toHaveBeenCalledWith('');
  });

  it('should reset domicilioForm in resetDomicilioForm', () => {
    component.crearFormulario();
    component.resetDomicilioForm();
    expect(mockTramite260601Store.setPaisFabricante).toHaveBeenCalledWith('');
    expect(mockTramite260601Store.setEstadoFabricante).toHaveBeenCalledWith('');
    expect(component.domicilioForm.get('cvePaisFabricante')?.disabled).toBeTruthy();
  });

  it('should update domicilioForm disabled state in inhabilitarDomicilioForm', () => {
    component.crearFormulario();
    component.inhabilitarDomicilioForm(true);
    expect(mockTramite260601Store.setPaisFabricanteInhabilitar).toHaveBeenCalledWith(true);
    expect(mockTramite260601Store.setEstadoFabricanteInhabilitar).toHaveBeenCalledWith(true);
  });

  it('should update datosPersonalesForm disabled state in inhabilitarDatosPersonalesForm', () => {
    component.crearFormulario();
    component.inhabilitarDatosPersonalesForm(false);
    expect(mockTramite260601Store.setFabricanteNombreInhabilitar).toHaveBeenCalledWith(false);
    expect(mockTramite260601Store.setFabricantePrimerApellidoInhabilitar).toHaveBeenCalledWith(false);
  });

  it('should unsubscribe in ngOnDestroy', () => {
    const spyNext = jest.spyOn(component['destruirNotificador$'], 'next');
    const spyComplete = jest.spyOn(component['destruirNotificador$'], 'complete');

    component.ngOnDestroy();

    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
