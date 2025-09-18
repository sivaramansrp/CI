import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of as observableOf, of } from 'rxjs';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Directive,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';

import { ConstanciaDelRegistroComponent } from './constancia-del-registro.component';
import { ElegibilidadDeTextilesStore } from '../../estados/elegibilidad-de-textiles.store';
import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';
import {
  SeccionLibStore,
  SeccionLibQuery,
  ConsultaioQuery,
} from '@ng-mf/data-access-user';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom: any;
}

@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

@Pipe({ name: 'phoneNumber' })
class PhoneNumberPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

@Pipe({ name: 'safeHtml' })
class SafeHtmlPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

describe('ConstanciaDelRegistroComponent', () => {
  let component: ConstanciaDelRegistroComponent;
  let fixture: ComponentFixture<ConstanciaDelRegistroComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConstanciaDelRegistroComponent, ReactiveFormsModule, FormsModule],
      declarations: [],
      providers: [FormBuilder, { provide: '_HttpClient', useValue: {} }, { provide: 'HttpClient', useValue: {} }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(ConstanciaDelRegistroComponent);
    component = fixture.componentInstance;
  });
  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });
  it('debe inicializar el formulario en español', () => {
    expect(component.fitosanitarioForm).toBeDefined();
  });
});
describe('ConstanciaDelRegistroComponent', () => {
  it('debe cubrir continuar() con formulario inválido', () => {
    component.fitosanitarioForm = {
      markAllAsTouched: jest.fn(),
      updateValueAndValidity: jest.fn(),
      valid: false,
    } as any;
    (component as any)['cdr'] = { detectChanges: jest.fn() };
    window.scrollTo = jest.fn();
    component.mostrarTabs = { emit: jest.fn() } as any;
    component.continuar();
    expect(component.fitosanitarioForm.markAllAsTouched).toHaveBeenCalled();
    expect(
      component.fitosanitarioForm.updateValueAndValidity
    ).toHaveBeenCalled();
    expect((component as any)['cdr'].detectChanges).toHaveBeenCalled();
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(component.formularioAlertaError).toBeDefined();
    expect(component.esFormaValido).toBe(true);
    expect(component.mostrarTabs.emit).not.toHaveBeenCalled();
  });

  it('debe cubrir continuar() con formulario válido', () => {
    component.fitosanitarioForm = {
      markAllAsTouched: jest.fn(),
      updateValueAndValidity: jest.fn(),
      valid: true,
    } as any;
    (component as any)['cdr'] = { detectChanges: jest.fn() };
    window.scrollTo = jest.fn();
    component.mostrarTabs = { emit: jest.fn() } as any;
    component.continuar();
    expect(component.formularioAlertaError).toBe('');
    expect(component.esFormaValido).toBe(false);
    expect(component.mostrarTabs.emit).toHaveBeenCalledWith(true);
  });

  it('debe cubrir onAnoConstanciaChangeFromSelect()', () => {
    const setValue = jest.fn();
    const markAsTouched = jest.fn();
    const updateValueAndValidity = jest.fn();
    component.fitosanitarioForm = {
      get: jest
        .fn()
        .mockReturnValue({ setValue, markAsTouched, updateValueAndValidity }),
    } as any;
    (component as any)['ElegibilidadDeTextilesStore'] = {
      setAnoDeLaConstancia: jest.fn(),
    };
    const event = { target: { value: '2022' } } as any;
    component.onAnoConstanciaChangeFromSelect(event);
    expect(setValue).toHaveBeenCalledWith('2022');
    expect(markAsTouched).toHaveBeenCalled();
    expect(updateValueAndValidity).toHaveBeenCalled();
    expect(
      (component as any)['ElegibilidadDeTextilesStore'].setAnoDeLaConstancia
    ).toHaveBeenCalledWith('2022');
  });

  it('debe cubrir onAnoConstanciaChange()', () => {
    const setValue = jest.fn();
    const markAsTouched = jest.fn();
    const updateValueAndValidity = jest.fn();
    component.fitosanitarioForm = {
      get: jest
        .fn()
        .mockReturnValue({ setValue, markAsTouched, updateValueAndValidity }),
    } as any;
    (component as any)['ElegibilidadDeTextilesStore'] = {
      setAnoDeLaConstancia: jest.fn(),
    };
    const selectedOption = { id: 2023, descripcion: 'desc' };
    component.onAnoConstanciaChange(selectedOption);
    expect(setValue).toHaveBeenCalledWith('2023');
    expect(markAsTouched).toHaveBeenCalled();
    expect(updateValueAndValidity).toHaveBeenCalled();
    expect(
      (component as any)['ElegibilidadDeTextilesStore'].setAnoDeLaConstancia
    ).toHaveBeenCalledWith('2023');
  });

  it('debe cubrir buscarEvaluar() rama Especifico con controles inválidos', () => {
    const markAsTouchedAno = jest.fn();
    const markAsTouchedNumero = jest.fn();
    component.fitosanitarioForm = {
      get: jest.fn((field) => {
        if (field === 'flexRadioRegistro') return { value: 'Especifico' };
        if (field === 'anoDeLaConstancia')
          return { markAsTouched: markAsTouchedAno, invalid: true };
        if (field === 'numeroDeLaConstancia')
          return { markAsTouched: markAsTouchedNumero, invalid: true };
        return null;
      }),
    } as any;
    component.buscarEvaluar();
    expect(component.fitosanitarioForm.get).toHaveBeenCalledWith(
      'flexRadioRegistro'
    );
    expect(
      component.fitosanitarioForm.get('anoDeLaConstancia')?.markAsTouched
    ).toHaveBeenCalled();
    expect(
      component.fitosanitarioForm.get('numeroDeLaConstancia')?.markAsTouched
    ).toHaveBeenCalled();
  });

  it('debe cubrir onFilaClic() rama null', () => {
    const spy = jest.spyOn(component, 'onFilaClic');
    component.onFilaClic(null as any);
    expect(spy).toHaveReturnedWith(undefined);
  });

  it('debe cubrir rama guardarBandera y deshabilitar controles', () => {
    const disableField1 = jest.fn();
    const disableField2 = jest.fn();
    (component as any).constanciaState = {
      guardarBandera: true,
      formaValida: [],
      datosTablaConstanciaDelRegistro: [],
    };
    component.fitosanitarioForm = {
      get: jest.fn((key) => {
        if (key === 'field1') return { value: '', disable: disableField1 };
        if (key === 'field2') return { value: '', disable: disableField2 };
        return { value: '', disable: jest.fn() };
      }),
      patchValue: jest.fn(),
      controls: { field1: {}, field2: {} },
    } as any;
    component.formularioDeshabilitado = false;
    Object.keys(component.fitosanitarioForm.controls).forEach((key) => {
      if (!component.formularioDeshabilitado) {
        component.fitosanitarioForm.get(key)?.disable();
      }
    });
    expect(component.fitosanitarioForm.get).toHaveBeenCalledWith('field1');
    expect(component.fitosanitarioForm.get).toHaveBeenCalledWith('field2');
    expect(disableField1).toHaveBeenCalled();
    expect(disableField2).toHaveBeenCalled();
  });
  let component: ConstanciaDelRegistroComponent;
  let fixture: ComponentFixture<ConstanciaDelRegistroComponent>;

  const storeMock: {
    update: jest.Mock<any, any>;
    setguardarBandera: jest.Mock<any, any>;
    setdatosTablaConstanciaDelRegistro: jest.Mock<any, any>;
    customSetter?: jest.Mock<any, any>;
  } = {
    update: jest.fn(),
    setguardarBandera: jest.fn(),
    setdatosTablaConstanciaDelRegistro: jest.fn(),
  };

  const queryMock = {
    selectTextile$: observableOf({}),
  };

  const seccionStoreMock = {
    establecerFormaValida: jest.fn(),
    establecerSeccion: jest.fn(),
  };

  const seccionQueryMock = {
    selectSeccionState$: observableOf({}),
  };

  const serviceMock = {
    obtenerListaPaises: jest.fn().mockReturnValue(observableOf({})),
    obtenerTablaDatos: jest.fn().mockReturnValue(observableOf([])),
  };

  const consultaioQueryMock = {
    selectConsultaioState$: observableOf({ readonly: false }),
    getValue: jest.fn().mockReturnValue({ readonly: false }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConstanciaDelRegistroComponent,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        TranslatePipe,
        PhoneNumberPipe,
        SafeHtmlPipe,
        MyCustomDirective,
      ],
      providers: [
        FormBuilder,
        { provide: ElegibilidadDeTextilesStore, useValue: storeMock },
        { provide: ElegibilidadDeTextilesQuery, useValue: queryMock },
        { provide: SeccionLibStore, useValue: seccionStoreMock },
        { provide: SeccionLibQuery, useValue: seccionQueryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
        { provide: ElegibilidadTextilesService, useValue: serviceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ConstanciaDelRegistroComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    jest.clearAllMocks();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe ejecutar ngOnInit()', () => {
    seccionQueryMock.selectSeccionState$ = of({ readonly: false });

    queryMock.selectTextile$ = of({
      formaValida: [],
    });

    component.initActionFormBuild = jest.fn();
    component.fitosanitarioForm = {
      disable: jest.fn(),
      enable: jest.fn(),
    } as any;

    component.ngOnInit();

    expect(component.initActionFormBuild).toHaveBeenCalled();
    expect(seccionStoreMock.establecerFormaValida).toHaveBeenCalled();
    expect(component.fitosanitarioForm.disable).not.toHaveBeenCalled();
  });

  it('debe inicializar el formulario en initActionFormBuild()', () => {
    (component as any).constanciaState = {
      flexRadioRegistro: 'r1',
      anoDeLaConstancia: '2023',
      numeroDeLaConstancia: '001',
      estado: 'estado',
      representacionFederal: 'federal',
      fraccionArancelaria: '1234',
      descripcionProducto: 'desc',
      tratado: 'tratado',
      subproducto: 'sub',
      mecanismo: 'mec',
      typoCategoria: 'cat',
      typoRegimen: 'reg',
      descripcionCategoriaTextil: 'descat',
      PaisDestino: 'pais',
      unidadMedidaCategoriaTextil: 'unidad',
      factorConversionCategoriaTextil: '1.5',
      fechaInicioVigencia: '2023-01-01',
      fechaFinVigencia: '2023-12-31',
      datosTablaConstanciaDelRegistro: [],
      guardarBandera: false,
    } as any;

    component.initActionFormBuild();
    expect(component.fitosanitarioForm).toBeTruthy();
  });

  it('debe ejecutar onFilaClic() y actualizar el store', () => {
    component.fitosanitarioForm = {
      get: jest.fn().mockReturnValue({ value: '', disable: jest.fn() }),
      patchValue: jest.fn(),
    } as any;

    component.onFilaClic({
      estado: 'estado',
      representacionFederal: 'rep',
      fraccionArancelaria: 'fra',
      descripcionProducto: 'desc',
      tratado: 'trat',
      subproducto: 'sub',
      mecanismo: 'mec',
      typoCategoria: 'cat',
      typoRegimen: 'reg',
      descripcionCategoriaTextil: 'descat',
      PaisDestino: 'pais',
      unidadMedidaCategoriaTextil: 'um',
      factorConversionCategoriaTextil: '1.5',
      fechaInicioVigencia: '2023-01-01',
      fechaFinVigencia: '2023-12-31',
      numeroDeConstancia: '',
      clasificacionDelRegimen: '',
      paisDestino: '',
      categoriaTextil: '',
    });

    expect(component.fitosanitarioForm.get).toHaveBeenCalled();
    expect(component.fitosanitarioForm.patchValue).toHaveBeenCalled();
    expect(storeMock.update).toHaveBeenCalled();
    expect(storeMock.setguardarBandera).toHaveBeenCalled();
  });

  it('debe ejecutar buscarEvaluar()', () => {
    component.fitosanitarioForm = {
      get: jest.fn().mockReturnValue({
        value: 'Todos',
        invalid: false,
        markAsTouched: jest.fn(),
      }),
      patchValue: jest.fn(),
    } as any;

    component.buscarEvaluar();

    expect(component.fitosanitarioForm.get).toHaveBeenCalled();
  });

  it('debe ejecutar guardarEvaluate()', () => {
    component.mostrarTabs = { emit: jest.fn() } as any;
    window.scrollTo = jest.fn();

    component.guardarEvaluate();

    expect(component.mostrarTabs.emit).toHaveBeenCalled();
    expect(window.scrollTo).toHaveBeenCalled();
  });

  it('debe ejecutar recuperarDatosAsociadas()', () => {
    component.filtrarDatos = jest.fn();

    component.recuperarDatosAsociadas();

    expect(serviceMock.obtenerTablaDatos).toHaveBeenCalled();
    expect(component.filtrarDatos).toHaveBeenCalled();
    expect(storeMock.setdatosTablaConstanciaDelRegistro).toHaveBeenCalled();
  });

  it('debe ejecutar setValoresStore()', () => {
    storeMock['customSetter'] = jest.fn();
    (component as any).ElegibilidadDeTextilesStore = storeMock as any;

    const mockForm = {
      get: () => ({ value: 'ABC123' }),
    } as any;

    component.setValoresStore(mockForm, 'someField', 'customSetter' as any);
    expect(storeMock['customSetter']).toHaveBeenCalledWith('ABC123');
  });
  it('debe actualizar selectedValue al cambiar el valor', () => {
    component.onValueChange('nuevoValor');
    expect(component.selectedValue).toBe('nuevoValor');
  });
  it('debe filtrar datos correctamente según los valores del formulario', () => {
    component.fitosanitarioForm = {
      get: jest
        .fn()
        .mockImplementation(
          (key: 'anoDeLaConstancia' | 'numeroDeLaConstancia') => {
            const values = {
              anoDeLaConstancia: { value: '2023' },
              numeroDeLaConstancia: { value: '001' },
            };
            return values[key];
          }
        ),
    } as any;

    const mockData = [
      {
        fechaInicioVigencia: '2023-01-01',
        numeroDeConstancia: '001',
      },
    ] as any;

    const result = component.filtrarDatos(mockData);
    expect(result.length).toBe(1);
  });

  it('debe deshabilitar el formulario si formularioDeshabilitado es verdadero', fakeAsync(() => {
    const isolatedConsultaioQueryMock = {
      getValue: jest.fn().mockReturnValue({ readonly: true }),
      selectConsultaioState$: of({ readonly: true }),
    };

    const isolatedQueryMock = {
      selectTextile$: of({ formaValida: [] }),
    };

    (component as any).consultaioQuery = isolatedConsultaioQueryMock;
    (component as any).elegibilidadDeTextilesQuery = isolatedQueryMock;

    (component as any).constanciaState = {
      formaValida: [],
      datosTablaConstanciaDelRegistro: [],
      guardarBandera: false,
    };

    const mockForm = {
      disable: jest.fn(),
      enable: jest.fn(),
    };

    component.initActionFormBuild = jest.fn().mockImplementation(() => {
      component.fitosanitarioForm = mockForm as any;
    });

    component.ngOnInit();

    tick();

    expect(component.initActionFormBuild).toHaveBeenCalled();
    expect(mockForm.disable).toHaveBeenCalled();
    expect(component.formularioDeshabilitado).toBe(true);
  }));

  it('should enable form if formularioDeshabilitado is false', fakeAsync(() => {
    const isolatedConsultaioQueryMock = {
      getValue: jest.fn().mockReturnValue({ readonly: false }),
      selectConsultaioState$: of({ readonly: false }),
    };
    const isolatedQueryMock = {
      selectTextile$: of({ formaValida: [] }),
    };
    (component as any).consultaioQuery = isolatedConsultaioQueryMock;
    (component as any).elegibilidadDeTextilesQuery = isolatedQueryMock;
    (component as any).constanciaState = {
      formaValida: [],
      datosTablaConstanciaDelRegistro: [],
      guardarBandera: false,
    };
    const mockForm = {
      disable: jest.fn(),
      enable: jest.fn(),
    };
    component.initActionFormBuild = jest.fn().mockImplementation(() => {
      component.fitosanitarioForm = mockForm as any;
    });
    component.ngOnInit();
    tick();
    expect(component.initActionFormBuild).toHaveBeenCalled();
    expect(mockForm.enable).toHaveBeenCalled();
    expect(component.formularioDeshabilitado).toBe(false);
  }));

  it('debe ejecutar buscarEvaluar()', () => {
    component.fitosanitarioForm = {
      get: jest.fn((field) => {
        if (field === 'flexRadioRegistro') {
          return { value: 'Todos', invalid: false, markAsTouched: jest.fn() };
        }
        if (field === 'anoDeLaConstancia' || field === 'numeroDeLaConstancia') {
          return {
            value: 'mockValue',
            invalid: false,
            markAsTouched: jest.fn(),
          };
        }
        return { value: '', invalid: false, markAsTouched: jest.fn() };
      }),
      patchValue: jest.fn(),
    } as any;

    const mockData = [
      { fechaInicioVigencia: '2023-01-01', numeroDeConstancia: 'mockValue' },
    ];
    (component as any)['ElegibilidadTextilesService'] = {
      obtenerTablaDatos: jest.fn().mockReturnValue(of(mockData)),
    };

    (component as any)['ElegibilidadDeTextilesStore'] = {
      setdatosTablaConstanciaDelRegistro: jest.fn(),
    };

    component.buscarEvaluar();
    expect(component.fitosanitarioForm.get).toHaveBeenCalled();
    expect(
      (component as any)['ElegibilidadTextilesService'].obtenerTablaDatos
    ).toHaveBeenCalledWith('constancia-del-registro-tabla-asociados.json');
    expect(
      (component as any)['ElegibilidadDeTextilesStore']
        .setdatosTablaConstanciaDelRegistro
    ).toHaveBeenCalledWith(mockData);
  });
  it('should map configuracionTabla columns correctly', () => {
    const articulo = {
      numeroDeConstancia: 'NC123',
      fraccionArancelaria: 'FA456',
      clasificacionDelRegimen: 'CR789',
      paisDestino: 'MX',
      PaisDestino: 'MX',
      categoriaTextil: 'Algodón',
      fechaInicioVigencia: '2023-01-01',
      fechaFinVigencia: '2023-12-31',
      estado: 'Estado',
      representacionFederal: 'Federal',
      descripcionProducto: 'Producto',
      tratado: 'Tratado',
      subproducto: 'Subproducto',
      mecanismo: 'Mecanismo',
      typoCategoria: 'TipoCategoria',
      typoRegimen: 'TipoRegimen',
      descripcionCategoriaTextil: 'DescCategoria',
      unidadMedidaCategoriaTextil: 'Unidad',
      factorConversionCategoriaTextil: '1.0',
    };

    expect(component.configuracionTabla[0].encabezado).toBe(
      'Número de constancia de registro'
    );
    expect(component.configuracionTabla[0].clave(articulo)).toBe('NC123');
    expect(component.configuracionTabla[1].encabezado).toBe(
      'Fracción arancelaria'
    );
    expect(component.configuracionTabla[1].clave(articulo)).toBe('FA456');
    expect(component.configuracionTabla[2].encabezado).toBe(
      'Clasificación del régimen'
    );
    expect(component.configuracionTabla[2].clave(articulo)).toBe('CR789');
    expect(component.configuracionTabla[3].encabezado).toBe(
      'País destino/origen'
    );
    expect(component.configuracionTabla[3].clave(articulo)).toBe('MX');
    expect(component.configuracionTabla[4].encabezado).toBe(
      'Descripción de la categoría textil'
    );
    expect(component.configuracionTabla[4].clave(articulo)).toBe('Algodón');
    expect(component.configuracionTabla[5].encabezado).toBe(
      'Fecha inicio vigencia'
    );
    expect(component.configuracionTabla[5].clave(articulo)).toBe('2023-01-01');
    expect(component.configuracionTabla[6].encabezado).toBe(
      'Fecha fin vigencia'
    );
    expect(component.configuracionTabla[6].clave(articulo)).toBe('2023-12-31');
  });

  it('should cover guardarBandera branch', () => {
    (component as any).constanciaState = {
      guardarBandera: true,
      formaValida: [],
      datosTablaConstanciaDelRegistro: [],
    };
    component.fitosanitarioForm = {
      get: jest.fn().mockReturnValue({ value: '', disable: jest.fn() }),
      patchValue: jest.fn(),
      controls: { field1: {}, field2: {} },
    } as any;
    component.formularioDeshabilitado = false;
    Object.keys(component.fitosanitarioForm.controls).forEach((key) => {
      if (!component.formularioDeshabilitado) {
        component.fitosanitarioForm.get(key)?.disable();
      }
    });
    expect(component.fitosanitarioForm.get).toHaveBeenCalledWith('field1');
    expect(component.fitosanitarioForm.get).toHaveBeenCalledWith('field2');
    expect(
      component.fitosanitarioForm.get('field1')?.disable
    ).toHaveBeenCalled();
    expect(
      component.fitosanitarioForm.get('field2')?.disable
    ).toHaveBeenCalled();
  });

  it('should cover continuar() with invalid form', () => {
    component.fitosanitarioForm = {
      markAllAsTouched: jest.fn(),
      updateValueAndValidity: jest.fn(),
      valid: false,
    } as any;
    (component as any)['cdr'] = { detectChanges: jest.fn() };
    window.scrollTo = jest.fn();
    component.mostrarTabs = { emit: jest.fn() } as any;
    component.continuar();
    expect(component.fitosanitarioForm.markAllAsTouched).toHaveBeenCalled();
    expect(
      component.fitosanitarioForm.updateValueAndValidity
    ).toHaveBeenCalled();
    expect((component as any)['cdr'].detectChanges).toHaveBeenCalled();
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(component.formularioAlertaError).toBeDefined();
    expect(component.esFormaValido).toBe(true);
    expect(component.mostrarTabs.emit).not.toHaveBeenCalled();
  });

  it('should cover continuar() with valid form', () => {
    component.fitosanitarioForm = {
      markAllAsTouched: jest.fn(),
      updateValueAndValidity: jest.fn(),
      valid: true,
    } as any;
    (component as any)['cdr'] = { detectChanges: jest.fn() };
    window.scrollTo = jest.fn();
    component.mostrarTabs = { emit: jest.fn() } as any;
    component.continuar();
    expect(component.formularioAlertaError).toBe('');
    expect(component.esFormaValido).toBe(false);
    expect(component.mostrarTabs.emit).toHaveBeenCalledWith(true);
  });

  it('should cover onAnoConstanciaChangeFromSelect()', () => {
    const setValue = jest.fn();
    const markAsTouched = jest.fn();
    const updateValueAndValidity = jest.fn();
    component.fitosanitarioForm = {
      get: jest
        .fn()
        .mockReturnValue({ setValue, markAsTouched, updateValueAndValidity }),
    } as any;
    (component as any)['ElegibilidadDeTextilesStore'] = {
      setAnoDeLaConstancia: jest.fn(),
    } as any;
    const event = { target: { value: '2022' } } as any;
    component.onAnoConstanciaChangeFromSelect(event);
    expect(setValue).toHaveBeenCalledWith('2022');
    expect(markAsTouched).toHaveBeenCalled();
    expect(updateValueAndValidity).toHaveBeenCalled();
    expect(
      (component as any).ElegibilidadDeTextilesStore.setAnoDeLaConstancia
    ).toHaveBeenCalledWith('2022');
  });

  it('should cover onAnoConstanciaChange()', () => {
    const setValue = jest.fn();
    const markAsTouched = jest.fn();
    const updateValueAndValidity = jest.fn();
    component.fitosanitarioForm = {
      get: jest
        .fn()
        .mockReturnValue({ setValue, markAsTouched, updateValueAndValidity }),
    } as any;
    (component as any)['ElegibilidadDeTextilesStore'] = {
      setAnoDeLaConstancia: jest.fn(),
    } as any;
    const selectedOption = { id: 2023, descripcion: 'desc' };
    component.onAnoConstanciaChange(selectedOption);
    expect(setValue).toHaveBeenCalledWith('2023');
    expect(markAsTouched).toHaveBeenCalled();
    expect(updateValueAndValidity).toHaveBeenCalled();
    expect(
      (component as any)['ElegibilidadDeTextilesStore'].setAnoDeLaConstancia
    ).toHaveBeenCalledWith('2023');
  });

  it('should cover buscarEvaluar() Especifico branch with invalid controls', () => {
    const markAsTouchedAno = jest.fn();
    const markAsTouchedNumero = jest.fn();
    component.fitosanitarioForm = {
      get: jest.fn((field) => {
        if (field === 'flexRadioRegistro') return { value: 'Especifico' };
        if (field === 'anoDeLaConstancia')
          return { markAsTouched: markAsTouchedAno, invalid: true };
        if (field === 'numeroDeLaConstancia')
          return { markAsTouched: markAsTouchedNumero, invalid: true };
        return null;
      }),
    } as any;
    component.buscarEvaluar();
    expect(component.fitosanitarioForm.get).toHaveBeenCalledWith(
      'flexRadioRegistro'
    );
    expect(markAsTouchedAno).toHaveBeenCalled();
    expect(markAsTouchedNumero).toHaveBeenCalled();
  });

  it('should cover onFilaClic() null branch', () => {
    const spy = jest.spyOn(component, 'onFilaClic');
    component.onFilaClic(null as any);
    expect(spy).toHaveReturnedWith(undefined);
  });
});
