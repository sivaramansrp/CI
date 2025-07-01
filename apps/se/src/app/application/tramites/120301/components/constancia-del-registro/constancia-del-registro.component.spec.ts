import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of as observableOf, of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Pipe, PipeTransform } from '@angular/core';

import { ConstanciaDelRegistroComponent } from './constancia-del-registro.component';
import { ElegibilidadDeTextilesStore } from '../../estados/elegibilidad-de-textiles.store';
import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';
import { SeccionLibStore, SeccionLibQuery } from '@ng-mf/data-access-user';
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

  const storeMock: {
    update: jest.Mock<any, any>;
    setguardarBandera: jest.Mock<any, any>;
    setdatosTablaConstanciaDelRegistro: jest.Mock<any, any>;
    customSetter?: jest.Mock<any, any>;
  } = {
    update: jest.fn(),
    setguardarBandera: jest.fn(),
    setdatosTablaConstanciaDelRegistro: jest.fn()
  };

  const queryMock = {
    selectTextile$: observableOf({})
  };

  const seccionStoreMock = {
    establecerFormaValida: jest.fn(),
    establecerSeccion: jest.fn()
  };

  const seccionQueryMock = {
    selectSeccionState$: observableOf({})
  };

  const serviceMock = {
    obtenerListaPaises: jest.fn().mockReturnValue(observableOf({})),
    obtenerTablaDatos: jest.fn().mockReturnValue(observableOf([]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstanciaDelRegistroComponent, FormsModule, ReactiveFormsModule],
      declarations: [TranslatePipe, PhoneNumberPipe, SafeHtmlPipe, MyCustomDirective],
      providers: [
        FormBuilder,
        { provide: ElegibilidadDeTextilesStore, useValue: storeMock },
        { provide: ElegibilidadDeTextilesQuery, useValue: queryMock },
        { provide: SeccionLibStore, useValue: seccionStoreMock },
        { provide: SeccionLibQuery, useValue: seccionQueryMock },
        { provide: ElegibilidadTextilesService, useValue: serviceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ConstanciaDelRegistroComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

it('should run ngOnInit()', () => {
  seccionQueryMock.selectSeccionState$ = of({ readonly: false });

  queryMock.selectTextile$ = of({
    formaValida: [],
  });

  component.initActionFormBuild = jest.fn();
  component.fitosanitarioForm = { disable: jest.fn() } as any;

  component.ngOnInit();

  expect(component.initActionFormBuild).toHaveBeenCalled();
  expect(seccionStoreMock.establecerFormaValida).toHaveBeenCalled();
  expect(component.fitosanitarioForm.disable).not.toHaveBeenCalled();
});


  it('should initialize form in initActionFormBuild()', () => {
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
  guardarBandera: false
} as any;

    component.initActionFormBuild();
    expect(component.fitosanitarioForm).toBeTruthy();
  });

  it('should run onFilaClic() and update store', () => {
    component.fitosanitarioForm = {
      get: jest.fn().mockReturnValue({ value: '', disable: jest.fn() }),
      patchValue: jest.fn()
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
      categoriaTextil: ''
    });

    expect(component.fitosanitarioForm.get).toHaveBeenCalled();
    expect(component.fitosanitarioForm.patchValue).toHaveBeenCalled();
    expect(storeMock.update).toHaveBeenCalled();
    expect(storeMock.setguardarBandera).toHaveBeenCalled();
  });

  it('should run buscarEvaluar()', () => {
    component.fitosanitarioForm = {
      get: jest.fn().mockReturnValue({
        value: 'someValue',
        invalid: false,
        markAsTouched: jest.fn()
      })
    } as any;

    component.recuperarDatosAsociadas = jest.fn();

    component.buscarEvaluar();

    expect(component.fitosanitarioForm.get).toHaveBeenCalled();
    expect(component.recuperarDatosAsociadas).toHaveBeenCalled();
    expect(storeMock.update).toHaveBeenCalled();
  });

  it('should run guardarEvaluate()', () => {
    component.mostrarTabs = { emit: jest.fn() } as any;
    window.scrollTo = jest.fn();

    component.guardarEvaluate();

    expect(component.mostrarTabs.emit).toHaveBeenCalled();
    expect(window.scrollTo).toHaveBeenCalled();
  });

  it('should run recuperarDatosAsociadas()', () => {
    component.filtrarDatos = jest.fn();

    component.recuperarDatosAsociadas();

    expect(serviceMock.obtenerTablaDatos).toHaveBeenCalled();
    expect(component.filtrarDatos).toHaveBeenCalled();
    expect(storeMock.setdatosTablaConstanciaDelRegistro).toHaveBeenCalled();
  });

it('should run setValoresStore()', () => {
  storeMock['customSetter'] = jest.fn();
  (component as any).ElegibilidadDeTextilesStore = storeMock as any;

  const mockForm = {
    get: () => ({ value: 'ABC123' })
  } as any;

  component.setValoresStore(mockForm, 'someField', 'customSetter' as any);
  expect(storeMock['customSetter']).toHaveBeenCalledWith('ABC123');
});
it('should update selectedValue on value change', () => {
  component.onValueChange('nuevoValor');
  expect(component.selectedValue).toBe('nuevoValor');
});
it('should filter datos correctly based on form values', () => {
  component.fitosanitarioForm = {
    get: jest.fn().mockImplementation((key: 'anoDeLaConstancia' | 'numeroDeLaConstancia') => {
      const values = {
        anoDeLaConstancia: { value: '2023' },
        numeroDeLaConstancia: { value: '001' }
      };
      return values[key];
    })
  } as any;

  const mockData = [{
    fechaInicioVigencia: '2023-01-01',
    numeroDeConstancia: '001'
  }] as any;

  const result = component.filtrarDatos(mockData);
  expect(result.length).toBe(1);
});

  it('should disable form if formularioDeshabilitado is true', () => {
  component.formularioDeshabilitado = true;
  component.fitosanitarioForm = { disable: jest.fn() } as any;

  (component as any).constanciaState = {
    formaValida: [],
    datosTablaConstanciaDelRegistro: [],
    guardarBandera: false
  };

  component.initActionFormBuild = jest.fn();
  component.ngOnInit();

  expect(component.fitosanitarioForm.disable).toHaveBeenCalled();
});

});
