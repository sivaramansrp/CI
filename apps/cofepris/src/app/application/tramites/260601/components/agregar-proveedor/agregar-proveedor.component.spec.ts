import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarProveedorComponent } from './agregar-proveedor.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  CatalogoSelectComponent,
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const mockTramite260601Store = {
  setTipoProducto: jest.fn(),
  setTercerosNacionalidad: jest.fn(),
  setTipoPersona: jest.fn(),
  setMostrarRfcBuscarBoton: jest.fn(),
  setMostrarCurpBuscarBoton: jest.fn(),
  setInhabilitarPais: jest.fn(),
  setRfcProveedorInhabilitar: jest.fn(() => of()),
  setCurpInhabilitar: jest.fn(),
  setProveedorNombre: jest.fn(),
  setProveedorPrimerApellido: jest.fn(),
  setProveedorSegundoApellido: jest.fn(),
  setProveedorRazonSocial: jest.fn(),
  setProveedorNombreInhabilitar: jest.fn(),
  setProveedorPrimerApellidoInhabilitar: jest.fn(),
  setProveedorSegundoApellidoInhabilitar: jest.fn(),
  setProveedorRazonSocialInhabilitar: jest.fn(),
  setPais: jest.fn(),
  setDomicilioEstado: jest.fn(),
  setAlcaldia: jest.fn(),
  setLocalidad: jest.fn(),
  setDomicilioCodigoPostal: jest.fn(),
  setColonia: jest.fn(),
  setDomicilioCalle: jest.fn(),
  setNumeroExterior: jest.fn(),
  setNumeroInterior: jest.fn(),
  setDomicilioLada: jest.fn(),
  setDomicilioTelefono: jest.fn(),
  setDomicilioCorreoElectronico: jest.fn(),
  setPaisInhabilitar: jest.fn(),
  setDomicilioEstadoInhabilitar: jest.fn(),
  setAlcaldiaInhabilitar: jest.fn(),
  setLocalidadInhabilitar: jest.fn(),
  setDomicilioCodigoPostalInhabilitar: jest.fn(),
  setColoniaInhabilitar: jest.fn(),
  setDomicilioCalleInhabilitar: jest.fn(),
  setNumeroExteriorInhabilitar: jest.fn(),
  setNumeroInteriorInhabilitar: jest.fn(),
  setDomicilioLadaInhabilitar: jest.fn(),
  setDomicilioTelefonoInhabilitar: jest.fn(),
  setDomicilioCorreoElectronicoInhabilitar: jest.fn(),
};

const mockTramite260601Query = {
  selectSeccionState$: of({
    tercerosNacionalidad: 'NACIONAL',
    tipoPersona: 'FISICA',
    rfcProveedor: 'RFC123',
    rfcProveedorInhabilitar: false,
    curp: 'CURP123',
    curpInhabilitar: false,
    proveedorNombre: 'Juan',
    proveedorNombreInhabilitar: false,
    proveedorPrimerApellido: 'Perez',
    proveedorPrimerApellidoInhabilitar: false,
    proveedorSegundoApellido: 'Lopez',
    proveedorSegundoApellidoInhabilitar: false,
    proveedorRazonSocial: 'Empresa SA',
    proveedorRazonSocialInhabilitar: false,
    cvePais: 'MEX',
    cvePaisInhabilitar: false,
    domicilioEstado: 'CDMX',
    domicilioEstadoInhabilitar: false,
    alcaldia: 'Benito Juarez',
    alcaldiaInhabilitar: false,
    localidad: 'Centro',
    localidadInhabilitar: false,
    domicilioCodigoPostal: '01234',
    domicilioCodigoPostalInhabilitar: false,
    colonia: 'Roma',
    coloniaInhabilitar: false,
    domicilioCalle: 'Insurgentes',
    domicilioCalleInhabilitar: false,
    numeroExterior: '123',
    numeroExteriorInhabilitar: false,
    numeroInterior: '4',
    numeroInteriorInhabilitar: false,
    domicilioLada: '55',
    domicilioLadaInhabilitar: false,
    domicilioTelefono: '12345678',
    domicilioTelefonoInhabilitar: false,
    domicilioCorreoElectronico: 'test@mail.com',
    domicilioCorreoElectronicoInhabilitar: false,
  }),
};

const mockAvisoSanitarioService = {
  getProductoClasificacion: jest
    .fn()
    .mockReturnValue(of({ data: [{ id: 'MEX', nombre: 'México' }] })),
};

const mockConsultaioQuery = {
  selectConsultaioState$: of({ readonly: false }),
};

describe('AgregarProveedorComponent', () => {
  let component: AgregarProveedorComponent;
  let fixture: ComponentFixture<AgregarProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TituloComponent,
        InputRadioComponent,
        CatalogoSelectComponent,
        AgregarProveedorComponent,
        HttpClientTestingModule,
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: 'Tramite260601Store', useValue: mockTramite260601Store },
        { provide: 'Tramite260601Query', useValue: mockTramite260601Query },
        {
          provide: 'AvisoSanitarioService',
          useValue: mockAvisoSanitarioService,
        },
        { provide: 'ConsultaioQuery', useValue: mockConsultaioQuery },
      ],
    })
      .overrideComponent(AgregarProveedorComponent, {
        set: {
          providers: [
            { provide: FormBuilder, useClass: FormBuilder },
            { provide: 'Tramite260601Store', useValue: mockTramite260601Store },
            { provide: 'Tramite260601Query', useValue: mockTramite260601Query },
            {
              provide: 'AvisoSanitarioService',
              useValue: mockAvisoSanitarioService,
            },
            { provide: 'ConsultaioQuery', useValue: mockConsultaioQuery },
          ],
        },
      })
      .compileComponents();
    fixture = TestBed.createComponent(AgregarProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and initialize the form', () => {
    expect(component).toBeTruthy();
    expect(component.agregarProveedorForm).toBeDefined();
    expect(component.datosGeneralesForm).toBeDefined();
    expect(component.datosPersonalesForm).toBeDefined();
    expect(component.domicilioForm).toBeDefined();
  });

  it('should call tramite260601Store.setTipoProducto on paisSeleccion', () => {
    component.domicilioForm.get('cvePais')?.setValue('MEX');
    component.paisSeleccion();
    expect(mockTramite260601Store.setTipoProducto).toHaveBeenCalledWith('MEX');
  });

  it('should reset forms and update store on onNacionalidadCambio', () => {
    jest.spyOn(component, 'resetDatosPersonalesForm');
    jest.spyOn(component, 'resetDomicilioForm');
    component.onNacionalidadCambio('EXTRANJERO');
    expect(component.resetDatosPersonalesForm).toHaveBeenCalled();
    expect(component.resetDomicilioForm).toHaveBeenCalled();
    expect(mockTramite260601Store.setTercerosNacionalidad).toHaveBeenCalledWith(
      'EXTRANJERO'
    );
    expect(mockTramite260601Store.setTipoPersona).toHaveBeenCalledWith('');
    expect(
      mockTramite260601Store.setMostrarRfcBuscarBoton
    ).toHaveBeenCalledWith(false);
    expect(
      mockTramite260601Store.setMostrarCurpBuscarBoton
    ).toHaveBeenCalledWith(false);
    expect(mockTramite260601Store.setInhabilitarPais).toHaveBeenCalledWith(
      true
    );
  });

  it('should call setTipoPersona and reset forms on onTipoPersonaCambio', () => {
    jest.spyOn(component, 'resetDatosPersonalesForm');
    jest.spyOn(component, 'resetDomicilioForm');
    // component.avisoSanitarioState = {
    //   ...mockTramite260601Query.selectSeccionState$['source']?._value,
    //   tercerosNacionalidad: 'NACIONAL',
    //   tipoPersona: 'FISICA',
    // };
    component.onTipoPersonaCambio('FISICA');
    expect(mockTramite260601Store.setTipoPersona).toHaveBeenCalledWith(
      'FISICA'
    );
    expect(component.resetDatosPersonalesForm).toHaveBeenCalled();
    expect(component.resetDomicilioForm).toHaveBeenCalled();
  });

  it('should disable and reset datosPersonalesForm on resetDatosPersonalesForm', () => {
    jest.spyOn(component, 'resetDatosPersonalesFormState');
    jest.spyOn(component, 'inhabilitarDatosPersonalesForm');
    component.resetDatosPersonalesForm();
    expect(component.resetDatosPersonalesFormState).toHaveBeenCalled();
    expect(component.inhabilitarDatosPersonalesForm).toHaveBeenCalledWith(true);
  });

  it('should call store setters in resetDatosPersonalesFormState', () => {
    component.resetDatosPersonalesFormState();
    expect(mockTramite260601Store.setProveedorNombre).toHaveBeenCalledWith('');
    expect(
      mockTramite260601Store.setProveedorPrimerApellido
    ).toHaveBeenCalledWith('');
    expect(
      mockTramite260601Store.setProveedorSegundoApellido
    ).toHaveBeenCalledWith('');
    expect(mockTramite260601Store.setProveedorRazonSocial).toHaveBeenCalledWith(
      ''
    );
  });

  it('should call store setters in inhabilitarDatosPersonalesForm', () => {
    component.inhabilitarDatosPersonalesForm(true);
    expect(
      mockTramite260601Store.setProveedorNombreInhabilitar
    ).toHaveBeenCalledWith(true);
    expect(
      mockTramite260601Store.setProveedorPrimerApellidoInhabilitar
    ).toHaveBeenCalledWith(true);
    expect(
      mockTramite260601Store.setProveedorSegundoApellidoInhabilitar
    ).toHaveBeenCalledWith(true);
    expect(
      mockTramite260601Store.setProveedorRazonSocialInhabilitar
    ).toHaveBeenCalledWith(true);
  });

  it('should disable and reset domicilioForm on resetDomicilioForm', () => {
    jest.spyOn(component, 'resetDomicilioFormState');
    jest.spyOn(component, 'inhabilitarDomicilioForm');
    component.resetDomicilioForm();
    expect(component.resetDomicilioFormState).toHaveBeenCalled();
    expect(component.inhabilitarDomicilioForm).toHaveBeenCalledWith(true);
  });

  it('should call store setters in resetDomicilioFormState', () => {
    component.resetDomicilioFormState();
    expect(mockTramite260601Store.setPais).toHaveBeenCalledWith('');
    expect(mockTramite260601Store.setDomicilioEstado).toHaveBeenCalledWith('');
    expect(mockTramite260601Store.setAlcaldia).toHaveBeenCalledWith('');
    expect(mockTramite260601Store.setLocalidad).toHaveBeenCalledWith('');
    expect(
      mockTramite260601Store.setDomicilioCodigoPostal
    ).toHaveBeenCalledWith('');
    expect(mockTramite260601Store.setColonia).toHaveBeenCalledWith('');
    expect(mockTramite260601Store.setDomicilioCalle).toHaveBeenCalledWith('');
    expect(mockTramite260601Store.setNumeroExterior).toHaveBeenCalledWith('');
    expect(mockTramite260601Store.setNumeroInterior).toHaveBeenCalledWith('');
    expect(mockTramite260601Store.setDomicilioLada).toHaveBeenCalledWith('');
    expect(mockTramite260601Store.setDomicilioTelefono).toHaveBeenCalledWith(
      ''
    );
    expect(
      mockTramite260601Store.setDomicilioCorreoElectronico
    ).toHaveBeenCalledWith('');
  });

  it('should call store setters in inhabilitarDomicilioForm', () => {
    component.inhabilitarDomicilioForm(true);
    expect(mockTramite260601Store.setPaisInhabilitar).toHaveBeenCalledWith(
      true
    );
    expect(
      mockTramite260601Store.setDomicilioEstadoInhabilitar
    ).toHaveBeenCalledWith(true);
    expect(mockTramite260601Store.setAlcaldiaInhabilitar).toHaveBeenCalledWith(
      true
    );
    expect(mockTramite260601Store.setLocalidadInhabilitar).toHaveBeenCalledWith(
      true
    );
    expect(
      mockTramite260601Store.setDomicilioCodigoPostalInhabilitar
    ).toHaveBeenCalledWith(true);
    expect(mockTramite260601Store.setColoniaInhabilitar).toHaveBeenCalledWith(
      true
    );
    expect(
      mockTramite260601Store.setDomicilioCalleInhabilitar
    ).toHaveBeenCalledWith(true);
    expect(
      mockTramite260601Store.setNumeroExteriorInhabilitar
    ).toHaveBeenCalledWith(true);
    expect(
      mockTramite260601Store.setNumeroInteriorInhabilitar
    ).toHaveBeenCalledWith(true);
    expect(
      mockTramite260601Store.setDomicilioLadaInhabilitar
    ).toHaveBeenCalledWith(true);
    expect(
      mockTramite260601Store.setDomicilioTelefonoInhabilitar
    ).toHaveBeenCalledWith(true);
    expect(
      mockTramite260601Store.setDomicilioCorreoElectronicoInhabilitar
    ).toHaveBeenCalledWith(true);
  });

  it('should call the correct store method in setValoresStore', () => {
    const form = component.datosGeneralesForm;
    form.get('rfcProveedor')?.setValue('RFC999');
    component.setValoresStore(
      form,
      'rfcProveedor',
      'setRfcProveedorInhabilitar'
    );
    expect(
      mockTramite260601Store.setRfcProveedorInhabilitar
    ).toHaveBeenCalledWith('RFC999');
  });

  it('should complete destruirNotificador$ on ngOnDestroy', () => {
    const spy = jest.spyOn(component.destruirNotificador$, 'next');
    const spyComplete = jest.spyOn(component.destruirNotificador$, 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
