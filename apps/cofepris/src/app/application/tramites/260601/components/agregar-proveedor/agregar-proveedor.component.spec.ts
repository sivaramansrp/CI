import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AgregarProveedorComponent } from './agregar-proveedor.component';
import { Tramite260601Store } from '../../estados/tramites/tramite260601.store';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { DATOS_CATEGORIAS_TERCEROS } from '../../constantes/aviso-enum';
import { CommonModule } from '@angular/common';
import { CatalogoSelectComponent, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';

describe('AgregarProveedorComponent', () => {
  let component: AgregarProveedorComponent;
  let fixture: ComponentFixture<AgregarProveedorComponent>;
  let avisoSanitarioServiceMock: Partial<AvisoSanitarioService>;
  let tramite260601StoreMock: Partial<Tramite260601Store>;

  beforeEach(async () => {
    avisoSanitarioServiceMock = {
      getProductoClasificacion: jest.fn().mockReturnValue(of({ data: [{ label: 'País 1', value: 'pais1' }] })),
    };

    tramite260601StoreMock = {
      setTipoProducto: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TituloComponent,
        InputRadioComponent,
        CatalogoSelectComponent,
        AgregarProveedorComponent
      ],
      declarations: [],
      providers: [
        { provide: FormBuilder, useValue: new FormBuilder() },
        { provide: AvisoSanitarioService, useValue: avisoSanitarioServiceMock },
        { provide: Tramite260601Store, useValue: tramite260601StoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
    component.ngOnDestroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should populate pais catalog in ngOnInit', () => {
    component.ngOnInit();
    expect(component.pais).toEqual([{ label: 'País 1', value: 'pais1' }]);
    expect(avisoSanitarioServiceMock.getProductoClasificacion).toHaveBeenCalledTimes(1);
  });

  it('should initialize the form with nested groups', () => {
    component.crearFormulario();
    expect(component.agregarProveedorForm).toBeDefined();
    expect(component.datosGeneralesForm).toBeDefined();
    expect(component.datosPersonalesForm).toBeDefined();
    expect(component.domicilioForm).toBeDefined();
  });

  it('should handle paisSeleccion correctly', () => {
    component.crearFormulario();
    const spy = jest.spyOn(tramite260601StoreMock, 'setTipoProducto');
    component.domicilioForm.get('cvePais')?.setValue('pais1');
    component.paisSeleccion();
    expect(spy).toHaveBeenCalledWith('pais1');
  });

  it('should handle onNacionalidadCambio for extranjero', () => {
    component.crearFormulario();
    component.onNacionalidadCambio(DATOS_CATEGORIAS_TERCEROS.EXTRANJERO);
    expect(component.tipoPersonaOpciones.some(option => option.value === DATOS_CATEGORIAS_TERCEROS.NO_CONTRIBUYENTE)).toBe(false);
    expect(component.inhabilitarPais).toBe(true);
  });

  it('should handle onNacionalidadCambio for nacional', () => {
    component.crearFormulario();
    component.onNacionalidadCambio(DATOS_CATEGORIAS_TERCEROS.NACIONAL);
    expect(component.tipoPersonaOpciones).toEqual(component.inicialTipoPersonaOpciones);
    expect(component.inhabilitarPais).toBe(true);
  });

  it('should handle onTipoPersonaCambio for fisica', () => {
    component.crearFormulario();
    component.onTipoPersonaCambio(DATOS_CATEGORIAS_TERCEROS.FISICA);
    expect(component.datosGeneralesForm.get('rfcProveedor')?.enabled).toBeTruthy();
    expect(component.mostrarCurpBuscarBoton).toBe(false);
    expect(component.mostrarRfcBuscarBoton).toBe(true);
  });

  it('should handle onTipoPersonaCambio for no contribuyente', () => {
    component.crearFormulario();
    component.onTipoPersonaCambio(DATOS_CATEGORIAS_TERCEROS.NO_CONTRIBUYENTE);
    expect(component.datosGeneralesForm.get('curp')?.enabled).toBeTruthy();
    expect(component.mostrarCurpBuscarBoton).toBe(true);
    expect(component.mostrarRfcBuscarBoton).toBe(false);
  });

  it('should reset datosPersonalesForm correctly', () => {
    component.crearFormulario();
    component.resetDatosPersonalesForm();
    expect(component.datosGeneralesForm.get('rfcProveedor')?.disabled).toBeTruthy();
    expect(component.datosGeneralesForm.get('curp')?.disabled).toBeTruthy();
    Object.keys(component.datosPersonalesForm.controls).forEach(key => {
      expect(component.datosPersonalesForm.get(key)?.disabled).toBeTruthy();
    });
  });

  it('should reset domicilioForm correctly', () => {
    component.crearFormulario();
    component.resetDomicilioForm();
    Object.keys(component.domicilioForm.controls).forEach(key => {
      expect(component.domicilioForm.get(key)?.disabled).toBeTruthy();
    });
  });

  it('should call setValoresStore with correct parameters', () => {
    component.crearFormulario();
    const spy = jest.spyOn(tramite260601StoreMock, 'setTipoProducto');
    component.datosGeneralesForm.get('tercerosNacionalidad')?.setValue(DATOS_CATEGORIAS_TERCEROS.EXTRANJERO);
    component.setValoresStore(component.datosGeneralesForm, 'tercerosNacionalidad', 'setTipoProducto');
    expect(spy).toHaveBeenCalledWith(DATOS_CATEGORIAS_TERCEROS.EXTRANJERO);
  });

  it('should reset and disable DatosPersonalesForm in resetDatosPersonalesForm', () => {
    component.resetDatosPersonalesForm();

    expect(component.datosGeneralesForm.get('rfcProveedor')?.disabled).toBeTruthy();
    expect(component.datosGeneralesForm.get('curp')?.disabled).toBeTruthy();

    expect(tramite260601StoreMock.setRfcProveedorInhabilitar).toHaveBeenCalledWith(true);
    expect(tramite260601StoreMock.setCurpInhabilitar).toHaveBeenCalledWith(true);

    Object.keys(component.datosPersonalesForm.controls).forEach((key) => {
      expect(component.datosPersonalesForm.get(key)?.value).toBeNull();
      expect(component.datosPersonalesForm.get(key)?.disabled).toBeTruthy();
    });

    expect(tramite260601StoreMock.setProveedorNombre).toHaveBeenCalledWith('');
    expect(tramite260601StoreMock.setProveedorPrimerApellido).toHaveBeenCalledWith('');
    expect(tramite260601StoreMock.setProveedorSegundoApellido).toHaveBeenCalledWith('');
    expect(tramite260601StoreMock.setProveedorRazonSocial).toHaveBeenCalledWith('');
  });

  it('should disable DatosPersonalesForm in inhabilitarDatosPersonalesForm', () => {
    component.inhabilitarDatosPersonalesForm(true);

    expect(tramite260601StoreMock.setProveedorNombreInhabilitar).toHaveBeenCalledWith(true);
    expect(tramite260601StoreMock.setProveedorPrimerApellidoInhabilitar).toHaveBeenCalledWith(true);
    expect(tramite260601StoreMock.setProveedorSegundoApellidoInhabilitar).toHaveBeenCalledWith(true);
    expect(tramite260601StoreMock.setProveedorRazonSocialInhabilitar).toHaveBeenCalledWith(true);
  });

  it('should reset and disable DomicilioForm in resetDomicilioForm', () => {
    component.resetDomicilioForm();

    expect(tramite260601StoreMock.setPais).toHaveBeenCalledWith('');
    expect(tramite260601StoreMock.setDomicilioEstado).toHaveBeenCalledWith('');
    expect(tramite260601StoreMock.setAlcaldia).toHaveBeenCalledWith('');
    expect(tramite260601StoreMock.setLocalidad).toHaveBeenCalledWith('');
    expect(tramite260601StoreMock.setDomicilioCodigoPostal).toHaveBeenCalledWith('');
    expect(tramite260601StoreMock.setColonia).toHaveBeenCalledWith('');
    expect(tramite260601StoreMock.setDomicilioCalle).toHaveBeenCalledWith('');
    expect(tramite260601StoreMock.setNumeroExterior).toHaveBeenCalledWith('');
    expect(tramite260601StoreMock.setNumeroInterior).toHaveBeenCalledWith('');
    expect(tramite260601StoreMock.setDomicilioLada).toHaveBeenCalledWith('');
    expect(tramite260601StoreMock.setDomicilioTelefono).toHaveBeenCalledWith('');
    expect(tramite260601StoreMock.setDomicilioCorreoElectronico).toHaveBeenCalledWith('');

    Object.keys(component.domicilioForm.controls).forEach((key) => {
      expect(component.domicilioForm.get(key)?.disabled).toBeTruthy();
    });
  });

  it('should disable DomicilioForm in inhabilitarDomicilioForm', () => {
    component.inhabilitarDatosPersonalesForm(true);

    expect(tramite260601StoreMock.setProveedorNombreInhabilitar).toHaveBeenCalledWith(true);
    expect(tramite260601StoreMock.setProveedorPrimerApellidoInhabilitar).toHaveBeenCalledWith(true);
    expect(tramite260601StoreMock.setProveedorSegundoApellidoInhabilitar).toHaveBeenCalledWith(true);
    expect(tramite260601StoreMock.setProveedorRazonSocialInhabilitar).toHaveBeenCalledWith(true);
  });

  it('should unsubscribe in ngOnDestroy', () => {
    const spyNext = jest.spyOn(component['destruirNotificador$'], 'next');
    const spyComplete = jest.spyOn(component['destruirNotificador$'], 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});