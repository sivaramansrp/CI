import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AgregarProveedorComponent } from './agregar-proveedor.component';
import { Tramite260601Store } from '../../estados/tramites/tramite260601.store';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { of, Subject } from 'rxjs';

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
      imports: [ReactiveFormsModule],
      declarations: [AgregarProveedorComponent],
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

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should populate pais catalog in ngOnInit', () => {
    component.ngOnInit();
    expect(component.pais).toEqual([{ label: 'País 1', value: 'pais1' }]);
  });

  it('should initialize the form', () => {
    component.crearFormulario();
    expect(component.agregarProveedorForm).toBeDefined();
    expect(component.datosGeneralesForm).toBeDefined();
    expect(component.datosPersonalesForm).toBeDefined();
    expect(component.domicilioForm).toBeDefined();
  });

  it('should handle paisSeleccion correctly', () => {
    const spy = jest.spyOn(tramite260601StoreMock, 'setTipoProducto');
    component.crearFormulario();
    component.domicilioForm.get('cvePais')?.setValue('pais1');
    component.paisSeleccion();
    expect(spy).toHaveBeenCalledWith('pais1');
  });

  it('should handle onNacionalidadCambio correctly for extranjero', () => {
    component.crearFormulario();
    component.onNacionalidadCambio('extranjero');
    expect(component.nacionalidad).toEqual('extranjero');
    expect(component.tipoPersonaOpciones.some(option => option.value === 'noContribuyente')).toBe(false);
    expect(component.inhabilitarPais).toBe(true);
  });

  it('should handle onNacionalidadCambio correctly for nacional', () => {
    component.crearFormulario();
    component.onNacionalidadCambio('nacional');
    expect(component.nacionalidad).toEqual('nacional');
    expect(component.tipoPersonaOpciones).toEqual(component.inicialTipoPersonaOpciones);
    expect(component.inhabilitarPais).toBe(true);
  });

  it('should handle onTipoPersonaCambio correctly for nacional (fisica)', () => {
    component.crearFormulario();
    component.nacionalidad = 'nacional';
    component.onTipoPersonaCambio('fisica');
    expect(component.tipoPersona).toEqual('fisica');
    expect(component.datosGeneralesForm.get('rfcProveedor')?.disabled).toBeFalsy();
    expect(component.mostrarCurpBuscarBoton).toBe(false);
    expect(component.mostrarRfcBuscarBoton).toBe(true);
  });

  it('should handle onTipoPersonaCambio correctly for nacional (noContribuyente)', () => {
    component.crearFormulario();
    component.nacionalidad = 'nacional';
    component.onTipoPersonaCambio('noContribuyente');
    expect(component.tipoPersona).toEqual('noContribuyente');
    expect(component.datosGeneralesForm.get('curp')?.disabled).toBeFalsy();
    expect(component.mostrarCurpBuscarBoton).toBe(true);
    expect(component.mostrarRfcBuscarBoton).toBe(false);
  });

  it('should handle onTipoPersonaCambio correctly for extranjero (fisica)', () => {
    component.crearFormulario();
    component.nacionalidad = 'extranjero';
    component.onTipoPersonaCambio('fisica');
    expect(component.tipoPersona).toEqual('fisica');
    expect(component.datosPersonalesForm.disabled).toBeFalsy();
    expect(component.domicilioForm.disabled).toBeFalsy();
    expect(component.inhabilitarPais).toBe(false);
  });

  it('should resetDatosPersonalesForm correctly', () => {
    component.crearFormulario();
    component.resetDatosPersonalesForm();
    expect(component.datosGeneralesForm.get('rfcProveedor')?.disabled).toBeTruthy();
    expect(component.datosGeneralesForm.get('curp')?.disabled).toBeTruthy();
    Object.keys(component.datosPersonalesForm.controls).forEach(key => {
      expect(component.datosPersonalesForm.get(key)?.disabled).toBeTruthy();
    });
  });

  it('should resetDomicilioForm correctly', () => {
    component.crearFormulario();
    component.resetDomicilioForm();
    Object.keys(component.domicilioForm.controls).forEach(key => {
      expect(component.domicilioForm.get(key)?.disabled).toBeTruthy();
    });
  });

  it('should call setValoresStore with correct parameters', () => {
    const spy = jest.spyOn(tramite260601StoreMock, 'setTipoProducto');
    component.crearFormulario();
    const mockForm = component.datosGeneralesForm;
    mockForm.get('tercerosNacionalidad')?.setValue('extranjero');
    component.setValoresStore(mockForm, 'tercerosNacionalidad', 'setTipoProducto');
    expect(spy).toHaveBeenCalledWith('extranjero');
  });

  it('should unsubscribe in ngOnDestroy', () => {
    const spy = jest.spyOn(component['destruirNotificador$'], 'next');
    const spyComplete = jest.spyOn(component['destruirNotificador$'], 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
