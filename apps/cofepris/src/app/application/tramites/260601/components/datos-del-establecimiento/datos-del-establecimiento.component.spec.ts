import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatosDelEstablecimientoComponent } from './datos-del-establecimiento.component';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { Tramite260601Store } from '../../estados/tramites/tramite260601.store';
import { Tramite260601Query } from '../../estados/queries/tramite260601.query';
import { of } from 'rxjs';
import { Modal } from 'bootstrap';
import { ElementRef } from '@angular/core';

describe('DatosDelEstablecimientoComponent', () => {
  let component: DatosDelEstablecimientoComponent;
  let fixture: ComponentFixture<DatosDelEstablecimientoComponent>;
  let mockAvisoSanitarioService: Partial<AvisoSanitarioService>;
  let mockTramite260601Store: Partial<Tramite260601Store>;
  let mockTramite260601Query: Partial<Tramite260601Query>;

  beforeEach(async () => {
    mockAvisoSanitarioService = {
      getEstado: jest.fn().mockReturnValue(of({ data: [{ label: 'Estado 1', value: 'estado1' }] })),
      getClaveScian: jest.fn().mockReturnValue(of({ data: [{ label: 'Clave SCIAN 1', value: 'scian1' }] })),
      getDescripcionScian: jest.fn().mockReturnValue(of({ data: [{ descripcion: 'Descripcion SCIAN 1' }] })),
      getRegimenes: jest.fn().mockReturnValue(of({ data: [{ label: 'Regimen 1', value: 'regimen1' }] })),
      getAduanas: jest.fn().mockReturnValue(of({ data: [{ label: 'Aduana 1', value: 'aduana1' }] })),
      getManifiestos: jest.fn().mockReturnValue(of({ data: [{ manifiestoDeclaracion: true }] })),
    };

    mockTramite260601Store = {
      setClaveScian: jest.fn(),
      setDescripcionScian: jest.fn(),
      setCveRegimenes: jest.fn(),
      setCveAduanas: jest.fn(),
      setSeleccionadaManifiesto: jest.fn(),
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
        curp: 'CURP123',
        proveedorNombre: 'Nombre Proveedor',
        proveedorPrimerApellido: 'Primer Apellido',
        proveedorSegundoApellido: 'Segundo Apellido',
        proveedorRazonSocial: 'Razón Social Proveedor',
        cvePais: 'Pais1',
        domicilioEstado: 'Estado1',
        alcaldia: 'Alcaldía1',
        localidad: 'Localidad1',
        domicilioCodigoPostal: '12345',
        colonia: 'Colonia1',
        domicilioCalle: 'Calle1',
        numeroExterior: 'Exterior1',
        numeroInterior: 'Interior1',
        domicilioLada: 'Lada1',
        domicilioTelefono: 'Telefono1',
        domicilioCorreoElectronico: 'email@proveedor.com',
        mostrarRfcBuscarBoton: false,
        mostrarCurpBuscarBoton: false,
        inhabilitarPais: true,
        mostrarRfcFabricanteBuscarBoton: false,
        mostrarCurpFabricanteBuscarBoton: false,
        inhabilitarPaisFabricante: true,
      }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DatosDelEstablecimientoComponent],
      providers: [
        FormBuilder,
        { provide: AvisoSanitarioService, useValue: mockAvisoSanitarioService },
        { provide: Tramite260601Store, useValue: mockTramite260601Store },
        { provide: Tramite260601Query, useValue: mockTramite260601Query },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should populate estado catalog in ngOnInit', () => {
    component.ngOnInit();
    expect(component.estado).toEqual([{ label: 'Estado 1', value: 'estado1' }]);
  });

  it('should create forms in crearFormulario', () => {
    component.crearFormulario();
    expect(component.datosDelEstablecimientoForm).toBeDefined();
    expect(component.domicilloDelEstablecimientoForm).toBeDefined();
    expect(component.scianForm).toBeDefined();
    expect(component.manifiestosForm).toBeDefined();
  });

  it('should fetch SCIAN table data in obtenerSCIAN', () => {
    component.obtenerSCIAN();
    expect(component.scianHeaderData).toEqual(component.getSCIANTableData.tableHeader);
    expect(component.scianBodyData).toEqual(component.getSCIANTableData.tableBody);
  });

  it('should fetch product table data in obtenerProducto', () => {
    component.obtenerProducto();
    expect(component.productoHeaderData).toEqual(component.getProductoTableData.tableHeader);
    expect(component.productoBodyData).toEqual(component.getProductoTableData.tableBody);
  });

  it('should handle claveScianSeleccion correctly', () => {
    const spySetClaveScian = jest.spyOn(mockTramite260601Store, 'setClaveScian');
    const spySetDescripcionScian = jest.spyOn(mockTramite260601Store, 'setDescripcionScian');
    component.crearFormulario();
    component.scianForm.get('cveSCIAN')?.setValue('scian1');
    component.claveScianSeleccion();
    expect(spySetClaveScian).toHaveBeenCalledWith('scian1');
    expect(spySetDescripcionScian).toHaveBeenCalledWith('Descripcion SCIAN 1');
  });

  it('should handle descripcionScianSeleccion correctly', () => {
    const spySetDescripcionScian = jest.spyOn(mockTramite260601Store, 'setDescripcionScian');
    component.crearFormulario();
    component.scianForm.get('cveSCIANDescripcion')?.setValue('Descripcion SCIAN 1');
    component.descripcionScianSeleccion();
    expect(spySetDescripcionScian).toHaveBeenCalledWith('Descripcion SCIAN 1');
  });

  it('should handle regimenesSeleccion correctly', () => {
    const spySetCveRegimenes = jest.spyOn(mockTramite260601Store, 'setCveRegimenes');
    component.crearFormulario();
    component.domicilloDelEstablecimientoForm.get('cveRegimenes')?.setValue('regimen1');
    component.regimenesSeleccion();
    expect(spySetCveRegimenes).toHaveBeenCalledWith('regimen1');
  });

  it('should handle aduanaSeleccion correctly', () => {
    const spySetCveAduanas = jest.spyOn(mockTramite260601Store, 'setCveAduanas');
    component.crearFormulario();
    component.domicilloDelEstablecimientoForm.get('cveAduanas')?.setValue('aduana1');
    component.aduanaSeleccion();
    expect(spySetCveAduanas).toHaveBeenCalledWith('aduana1');
  });

  it('should fetch manifiestos data in obtenerManifiestos', () => {
    component.obtenerManifiestos();
    expect(component.manifiestos).toEqual([{ manifiestoDeclaracion: true }]);
  });

  it('should handle modal display in seleccionarEstablecimiento', () => {
    component.modalElement = { nativeElement: document.createElement('div') } as ElementRef;
    jest.spyOn(Modal.prototype, 'show');
    component.seleccionarEstablecimiento();
    expect(Modal.prototype.show).toHaveBeenCalled();
  });

  it('should handle enabling forms in aceptar', () => {
    component.crearFormulario();
    component.aceptar();
    expect(component.datosDelEstablecimientoForm.enabled).toBe(true);
    expect(component.domicilloDelEstablecimientoForm.enabled).toBe(true);
    expect(component.habilitarEstado).toBe(false);
  });

  it('should handle checkbox change in onManifiestoCheckboxCambiar', () => {
    const spySetSeleccionadaManifiesto = jest.spyOn(mockTramite260601Store, 'setSeleccionadaManifiesto');
    component.crearFormulario();
    const mockEvent = { target: { checked: true } } as unknown as Event;
    component.onManifiestoCheckboxCambiar(mockEvent, 0);
    expect(component.seleccionadaManifiesto.controls[0].value).toBe(true);
    expect(spySetSeleccionadaManifiesto).toHaveBeenCalled();
  });

  it('should close modal in cerrarModal', () => {
    const mockClick = jest.fn();
    component.closeModal = { nativeElement: { click: mockClick } } as ElementRef;
    component.cerrarModal();
    expect(mockClick).toHaveBeenCalled();
  });

  it('should unsubscribe in ngOnDestroy', () => {
    const spyNext = jest.spyOn(component['destruirNotificador$'], 'next');
    const spyComplete = jest.spyOn(component['destruirNotificador$'], 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});