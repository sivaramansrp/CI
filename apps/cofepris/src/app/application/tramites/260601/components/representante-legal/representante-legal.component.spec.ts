import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RepresentanteLegalComponent } from './representante-legal.component';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { Tramite260601Store } from '../../estados/tramites/tramite260601.store';
import { Tramite260601Query } from '../../estados/queries/tramite260601.query';
import { ToastrService } from 'ngx-toastr';
import { of, Subject } from 'rxjs';
import { MSG_ERROR_REPRESENTANTE_LEGAL } from '../../constantes/aviso-enum';

describe('RepresentanteLegalComponent', () => {
  let component: RepresentanteLegalComponent;
  let fixture: ComponentFixture<RepresentanteLegalComponent>;
  let mockAvisoSanitarioService: Partial<AvisoSanitarioService>;
  let mockTramite260601Store: Partial<Tramite260601Store>;
  let mockTramite260601Query: Partial<Tramite260601Query>;
  let mockToastr: Partial<ToastrService>;

  beforeEach(async () => {
    mockAvisoSanitarioService = {
      buscarRfc: jest.fn().mockReturnValue(
        of({
          data: [
            {
              nombreOrazonsocial: 'Empresa S.A.',
              apellidoPaterno: 'Paterno',
              apellidoMaterno: 'Materno',
            },
          ],
        })
      ),
    };

    mockTramite260601Store = {
      setNombreOrazonsocial: jest.fn(),
      setApellidoPaterno: jest.fn(),
      setApellidoMaterno: jest.fn(),
      setRfc: jest.fn(),
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
        domicilioCorreoElectronico: 'email@proveedor.com'
      }),
    };

    mockToastr = {
      error: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RepresentanteLegalComponent],
      providers: [
        FormBuilder,
        { provide: AvisoSanitarioService, useValue: mockAvisoSanitarioService },
        { provide: Tramite260601Store, useValue: mockTramite260601Store },
        { provide: Tramite260601Query, useValue: mockTramite260601Query },
        { provide: ToastrService, useValue: mockToastr },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentanteLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form in crearFormulario', () => {
    component.crearFormulario();
    expect(component.representanteLegalForm).toBeDefined();
    expect(component.representanteLegalForm.get('rfc')).toBeDefined();
    expect(component.representanteLegalForm.get('nombreOrazonsocial')).toBeDefined();
  });

  it('should populate avisoSanitarioState in ngOnInit', () => {
    component.ngOnInit();
    expect(component.avisoSanitarioState.rfc).toBe('RFC123456');
    expect(component.avisoSanitarioState.nombreOrazonsocial).toBe('Empresa S.A.');
  });

  it('should show error and reset the form when RFC is invalid in obtenerRespuestaIDCPorRFC', () => {
    component.crearFormulario();
    component.representanteLegalForm.get('rfc')?.setValue('');
    component.obtenerRespuestaIDCPorRFC();

    expect(mockToastr.error).toHaveBeenCalledWith(MSG_ERROR_REPRESENTANTE_LEGAL);
    expect(component.representanteLegalForm.pristine).toBe(true);
  });

  it('should fetch and populate data when RFC is valid in obtenerRespuestaIDCPorRFC', () => {
    component.crearFormulario();
    component.representanteLegalForm.get('rfc')?.setValue('RFC123456');
    component.obtenerRespuestaIDCPorRFC();

    expect(mockAvisoSanitarioService.buscarRfc).toHaveBeenCalled();
    expect(component.representanteLegalForm.get('nombreOrazonsocial')?.value).toBe('Empresa S.A.');
    expect(component.representanteLegalForm.get('apellidoPaterno')?.value).toBe('Paterno');
    expect(component.representanteLegalForm.get('apellidoMaterno')?.value).toBe('Materno');
  });

  it('should update store values in tiendaCampoRepresentanteLegal', () => {
    component.crearFormulario();
    component.representanteLegalForm.get('nombreOrazonsocial')?.setValue('Empresa S.A.');
    component.representanteLegalForm.get('apellidoPaterno')?.setValue('Paterno');
    component.representanteLegalForm.get('apellidoMaterno')?.setValue('Materno');
    component.representanteLegalForm.get('rfc')?.setValue('RFC123456');

    component.tiendaCampoRepresentanteLegal();

    expect(mockTramite260601Store.setNombreOrazonsocial).toHaveBeenCalledWith('Empresa S.A.');
    expect(mockTramite260601Store.setApellidoPaterno).toHaveBeenCalledWith('Paterno');
    expect(mockTramite260601Store.setApellidoMaterno).toHaveBeenCalledWith('Materno');
    expect(mockTramite260601Store.setRfc).toHaveBeenCalledWith('RFC123456');
  });

  it('should set values in the store via setValoresStore', () => {
    component.crearFormulario();
    const form = component.representanteLegalForm;
    form.get('rfc')?.setValue('RFC123456');
    component.setValoresStore(form, 'rfc', 'setRfc');
    expect(mockTramite260601Store.setRfc).toHaveBeenCalledWith('RFC123456');
  });

  it('should unsubscribe in ngOnDestroy', () => {
    const spyNext = jest.spyOn(component['destruirNotificador$'], 'next');
    const spyComplete = jest.spyOn(component['destruirNotificador$'], 'complete');

    component.ngOnDestroy();

    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
