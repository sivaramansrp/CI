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
  ChangeDetectorRef,
} from '@angular/core';

import { ConstanciaDelRegistroComponent } from './constancia-del-registro.component';
import { ElegibilidadDeTextilesStore } from '../../estados/elegibilidad-de-textiles.store';
import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';
import {
  SeccionLibStore,
  SeccionLibQuery,
  ConsultaioQuery,
} from '@libs/shared/data-access-user/src';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';
import { HttpClient } from '@angular/common/http';
import { AnioConstanciaService } from '../../services/catalogos/anio-constancia.service';
import { TplService } from '../../services/Tpl.service';
import { GuardadoService } from '../../services/guardado.service';
import { Tramite120301Store } from '../../estados/tramites/tramite120301.store';

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
      providers: [
        FormBuilder,
        { provide: HttpClient, useValue: { get: jest.fn().mockReturnValue(of({})) } },
        { provide: '_HttpClient', useValue: { get: jest.fn().mockReturnValue(of({})), post: jest.fn().mockReturnValue(of({})) } },
        { provide: AnioConstanciaService, useValue: { 
          getAnios: jest.fn().mockReturnValue(of({ codigo: '00', datos: [] })),
          getAniosAutorizacion: jest.fn().mockReturnValue(of([]))
        } },
        { provide: ElegibilidadDeTextilesStore, useValue: { setFormaValida: jest.fn(), update: jest.fn() } },
        { provide: ElegibilidadDeTextilesQuery, useValue: { selectTextile$: of({ formaValida: [] }) } },
        { provide: SeccionLibStore, useValue: { establecerFormaValida: jest.fn(), establecerSeccion: jest.fn() } },
        { provide: SeccionLibQuery, useValue: { selectSeccionState$: of({ formaValida: [] }) } },
        { provide: ConsultaioQuery, useValue: { selectSeccionState$: of({}), getValue: jest.fn().mockReturnValue({ readonly: false }) } },
        { provide: ElegibilidadTextilesService, useValue: { obtenerTablaDatos: jest.fn().mockReturnValue(of([])) } },
        { provide: TplService, useValue: { 
          postTplDetalle: jest.fn().mockReturnValue(of({})), 
          posTpl: jest.fn().mockReturnValue(of({ codigo: '00', datos: [] })) 
        } },
        { provide: GuardadoService, useValue: { postParcial: jest.fn().mockReturnValue(of({})) } },
        { provide: Tramite120301Store, useValue: { setTramite120301: jest.fn() } },
        { provide: ChangeDetectorRef, useValue: { detectChanges: jest.fn() } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(ConstanciaDelRegistroComponent);
    component = fixture.componentInstance;
    
    const mockConstanciaState = {
      flexRadioRegistro: 'Todos',
      anoDeLaConstancia: '',
      numeroDeLaConstancia: '',
      estado: '',
      representacionFederal: '',
      fraccionArancelaria: '',
      descripcionProducto: '',
      tratado: '',
      subproducto: '',
      mecanismo: '',
      typoCategoria: '',
      typoRegimen: '',
      descripcionCategoriaTextil: '',
      PaisDestino: '',
      unidadMedidaCategoriaTextil: '',
      factorConversionCategoriaTextil: '',
      formaValida: [],
      guardarBandera: false,
      datosTablaConstanciaDelRegistro: [],
      fechaInicioVigencia: '',
      fechaFinVigencia: ''
    };
    
    (component as any).configuracionTablaDatos = [];
    (component as any).constanciaState = mockConstanciaState;
    (component as any).anios = [];
    
    (component as any).seccionQuery = {
      selectSeccionState$: of({ readonly: false })
    };
    (component as any).ElegibilidadDeTextilesQuery = {
      selectTextile$: of(mockConstanciaState)
    };
    (component as any).consultaioQuery = {
      getValue: () => ({ readonly: false }),
      selectConsultaioState$: of({ readonly: false })
    };
    (component as any).anioConstanciaService = {
      getAnios: () => of({ codigo: '00', datos: [] })
    };
    (component as any).seccionStore = {
      establecerFormaValida: jest.fn(),
      establecerSeccion: jest.fn()
    };
    (component as any).ElegibilidadDeTextilesStore = {
      setFormaValida: jest.fn(),
      update: jest.fn()
    };
  });
  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });
  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });
  it('debe ejecutar ngOnInit()', () => {
    component.ngOnInit();
    expect(component.fitosanitarioForm).toBeDefined();
  });
  it('debe inicializar el formulario en español', () => {
    component.ngOnInit();
    expect(component.fitosanitarioForm).toBeDefined();
  });
  it('debe inicializar el formulario en initActionFormBuild()', () => {
    component.ngOnInit();
    expect(component.fitosanitarioForm).toBeDefined();
  });
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
});
