import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MercanciasTableFormComponent } from './mercancias-table-form.component';
import { SolicitudService } from '../../services/solicitud.service';
import { of } from 'rxjs';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Tramite260212Query } from '../../estados/tramite260212.query';
import { Tramite260212Store } from '../../estados/tramite260212.store';

describe('MercanciasTableFormComponent', () => {
  let component: MercanciasTableFormComponent;
  let fixture: ComponentFixture<MercanciasTableFormComponent>;
  let mockSolicitudService: any;
  let mockTramite260212Query: any;
  let mockTramite260212Store: any;
  let mockValidacionesService: any;

  beforeEach(async () => {
    mockTramite260212Query = {
      selecteDespecificarClasificacion$: of({ id: 99, descripcion: 'patched' }),
      selectedDescripcion$: of(null)
    };

    mockTramite260212Store = {
      setDespecificarClasificacion: jest.fn()
    };

    mockValidacionesService = {
      isValid: jest.fn().mockReturnValue(true)
    };

    mockSolicitudService = {
      getClave: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Test Catalogo' }])),
      getClasificacionProducto: jest.fn().mockReturnValue(of([])),
      getTestadoFisico: jest.fn().mockReturnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MercanciasTableFormComponent],
      declarations: [],
      providers: [
        { provide: SolicitudService, useValue: mockSolicitudService },
        { provide: Tramite260212Query, useValue: mockTramite260212Query },
        { provide: Tramite260212Store, useValue: mockTramite260212Store },
        { provide: ValidacionesFormularioService, useValue: mockValidacionesService }
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(MercanciasTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar datosMercanciaForm correctamente', () => {
    expect(component.datosMercanciaForm).toBeDefined();
    const formControls = component.datosMercanciaForm.controls;

    expect(formControls['clasificacion']).toBeTruthy();
    expect(formControls['clasificacion'].validator).toBeDefined();
    expect(formControls['clasificacion'].hasError('required')).toBeTruthy();
  });

  it('debe emitir el evento Cancelar cuando se llama cerrarMercanciasTableForm', () => {
    jest.spyOn(component.Cancelar, 'emit');
    component.cerrarMercanciasTableForm();
    expect(component.Cancelar.emit).toHaveBeenCalled();
  });

  it('debe poblar "especificarClasificacion"', () => {
    expect(mockSolicitudService.getClave).toHaveBeenCalled();
    expect(component.especificarClasificacion).toEqual([{ id: 1, descripcion: 'Test Catalogo' }]);
  });

  it('debe establecer valores del formulario y marcar campos como requeridos', () => {
    component.datosMercanciaForm.setValue({
      clasificacion: 'Test Classification',
      especificarClasificacion: 'Test Specification',
      especificaDelProducto: 'Test Product Details',
      denominacionDistintiva: 'Distinctive Denomination',
      nombreCientifico: 'Scientific Name',
      tipoDeProducto: 'Product Type',
      estadoFisico: 'Physical State',
      fraccionArancelaria: 'Tariff Fraction',
      descripcionFraccion: 'Fraction Description',
      cantidadUMT: '10',
      UMT: 'Unit Measure T',
      cantidadUMC: '5',
      UMC: 'Unit Measure C',
      tipoDeEnvase: 'Container Type',
    });

    expect(component.datosMercanciaForm.valid).toBeTruthy();
  });

  it('debe ser inválido el formulario cuando faltan campos requeridos', () => {
    component.datosMercanciaForm.reset();
    expect(component.datosMercanciaForm.invalid).toBe(true);
    expect(component.datosMercanciaForm.get('clasificacion')?.hasError('required')).toBe(true);
  });

  it('debe llamar a getClasificacionProducto y getTestadoFisico en ngOnInit', () => {
    // Llama explícitamente a ngOnInit para cobertura
    component.ngOnInit();
    expect(mockSolicitudService.getClasificacionProducto).toHaveBeenCalled();
    expect(mockSolicitudService.getTestadoFisico).toHaveBeenCalled();
  });

  it('debe limpiar correctamente al destruir el componente si existe ngOnDestroy', () => {
    if (typeof component.ngOnDestroy === 'function') {
      expect(() => component.ngOnDestroy()).not.toThrow();
    }
  });

  it('debe ejecutar cerrarMercanciasTableForm y emitir el evento Cancelar', () => {
    const spy = jest.spyOn(component.Cancelar, 'emit');
    component.cerrarMercanciasTableForm();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit agregarDatos and close form if form is valid on agregar()', () => {
  const spyAgregar = jest.spyOn(component.agregarDatos, 'emit');
  const spyCancelar = jest.spyOn(component.Cancelar, 'emit');

  component.datosMercanciaForm.setValue({
    clasificacion: 'Test',
    especificarClasificacion: 'Test',
    especificaDelProducto: 'Detail',
    denominacionDistintiva: 'Brand',
    nombreCientifico: 'Scientific',
    tipoDeProducto: 'Type',
    estadoFisico: 'Solid',
    fraccionArancelaria: '12345678',
    descripcionFraccion: 'Some description',
    cantidadUMT: '10',
    UMT: 'Kg',
    cantidadUMC: '20',
    UMC: 'Box',
    tipoDeEnvase: 'Plastic',
  });

  component.agregar();
  expect(spyAgregar).toHaveBeenCalledWith({ form: component.datosMercanciaForm.value });
  expect(spyCancelar).toHaveBeenCalled();
});

it('should mark form as touched if invalid on agregar()', () => {
  const markAllSpy = jest.spyOn(component.datosMercanciaForm, 'markAllAsTouched');
  component.datosMercanciaForm.reset();
  component.agregar();
  expect(markAllSpy).toHaveBeenCalled();
});

it('should reset form on limpiar()', () => {
  const resetSpy = jest.spyOn(component.datosMercanciaForm, 'reset');
  component.limpiar();
  expect(resetSpy).toHaveBeenCalled();
});

it('should validate form control using esValido()', () => {
  const mockValidaciones = TestBed.inject(ValidacionesFormularioService);
  jest.spyOn(mockValidaciones, 'isValid').mockReturnValue(true);
  expect(component.esValido('clasificacion')).toBe(true);
});

it('should disable form in readonly mode', () => {
  component.esFormularioSoloLectura = true;
  component.guardarDatosFormulario();
  expect(component.datosMercanciaForm.disabled).toBe(true);
});

it('should enable form in edit mode', () => {
  component.esFormularioSoloLectura = false;
  component.guardarDatosFormulario();
  expect(component.datosMercanciaForm.enabled).toBe(true);
});

});
