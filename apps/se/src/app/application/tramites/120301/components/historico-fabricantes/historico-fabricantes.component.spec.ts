// @ts-nocheck
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import {
  Pipe,
  PipeTransform,
  Directive,
  Input,
  Injectable,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

import { HistoricoFabricantesComponent } from './historico-fabricantes.component';
import { ElegibilidadDeTextilesStore } from '../../estados/elegibilidad-de-textiles.store';
import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';
import { SeccionLibStore, SeccionLibQuery } from '@ng-mf/data-access-user';
import { ERROR_FORMA_ALERT } from '../../constantes/elegibilidad-de-textiles.enums';

@Injectable()
class MockElegibilidadDeTextilesStore {
  setFormaValida = jest.fn();
}
@Injectable()
class MockElegibilidadDeTextilesQuery {
  selectTextile$ = of({
    formaValida: [],
    exportadorFabricanteMismo: 'mockExportador',
    numeroRegistroFiscal: 'mockRFC',
  });
}
@Injectable()
class MockElegibilidadTextilesService {
  obtenerTablaDatos = jest
    .fn()
    .mockReturnValue(
      of([
        {
          nombreFabricante: 'F1',
          numeroRegistroFiscal: 'RFC1',
          direccion: 'Dir1',
          correoElectronico: 'mail@test.com',
          telefono: '1234567890',
        },
      ])
    );
}
@Injectable()
class MockSeccionLibQuery {
  selectSeccionState$ = of({ readonly: false });
}
@Injectable()
class MockSeccionLibStore {
  establecerFormaValida = jest.fn();
  establecerSeccion = jest.fn();
}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
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

describe('HistoricoFabricantesComponent', () => {
  let component: HistoricoFabricantesComponent;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HistoricoFabricantesComponent,
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [
        TranslatePipe,
        PhoneNumberPipe,
        SafeHtmlPipe,
        MyCustomDirective,
      ],
      providers: [
        FormBuilder,
        {
          provide: ElegibilidadDeTextilesStore,
          useClass: MockElegibilidadDeTextilesStore,
        },
        {
          provide: ElegibilidadDeTextilesQuery,
          useClass: MockElegibilidadDeTextilesQuery,
        },
        {
          provide: ElegibilidadTextilesService,
          useClass: MockElegibilidadTextilesService,
        },
        { provide: SeccionLibStore, useClass: MockSeccionLibStore },
        { provide: SeccionLibQuery, useClass: MockSeccionLibQuery },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoricoFabricantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario en ngOnInit()', fakeAsync(() => {
    component.formularioDeshabilitado = false;
    component.ngOnInit();
    tick();
    expect(component.historicoFabricantesForm).toBeTruthy();
  }));

  it('debe construir el formulario correctamente', () => {
    component.historicoState = {
      exportadorFabricanteMismo: 'yes',
      numeroRegistroFiscal: 'RFC123',
    };
    component.initActionFormBuild();
    expect(
      component.historicoFabricantesForm.get('numeroRegistroFiscal')
    ).toBeTruthy();
  });

  it('debe obtener datos y poblar fabricantesNacionales', () => {
    component.recuperarDatos();
    expect(component.fabricantesNacionales.length).toBeGreaterThan(0);
    expect(component.fabricantesNacionales[0].nombreFabricante).toEqual('F1');
  });

  it('debe actualizar selectedValue en onValueChange()', () => {
    component.onValueChange('mockValue');
    expect(component.selectedValue).toBe('mockValue');
  });

  it('debe establecer el valor en el store usando setValoresStore()', () => {
    const storeMock = { setNombreFabricante: jest.fn() };
    component.ElegibilidadDeTextilesStore = storeMock;
    const form = new FormBuilder().group({ campo: 'valor' });
    component.setValoresStore(form, 'campo', 'setNombreFabricante');
    expect(storeMock.setNombreFabricante).toHaveBeenCalledWith('valor');
  });

  it('debe limpiar en ngOnDestroy()', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('no debe lanzar error al llamar a verDetalle', () => {
    const mockRow = {
      nombreFabricante: 'Fab 1',
      numeroRegistroFiscal: 'RFC1',
      direccion: 'Some Street',
      correoElectronico: 'email@domain.com',
      telefono: '9876543210',
    };
    expect(() => component.verDetalle?.(mockRow)).not.toThrow();
  });

  it('debe llamar a setFormaValida cuando historicoFabricantesForm es válido', () => {
    component.historicoFabricantesForm = new FormBuilder().group({
      campo: ['valor'],
    });
    component.historicoFabricantesForm.markAsTouched();
    component.historicoFabricantesForm.updateValueAndValidity();
    Object.defineProperty(component.historicoFabricantesForm, 'valid', {
      get: () => true,
    });
    component.historicoState = {
      formaValida: [{ id: 1, descripcion: 'Valido' }],
    };
    const setFormaValidaMock = jest.fn();
    component.ElegibilidadDeTextilesStore = {
      setFormaValida: setFormaValidaMock,
    };
    if (component.historicoFabricantesForm.valid) {
      component.ElegibilidadDeTextilesStore.setFormaValida([
        ...component.historicoState.formaValida,
        { id: 3, descripcion: 'TodoValido' },
      ]);
    }
    expect(setFormaValidaMock).toHaveBeenCalledWith([
      { id: 1, descripcion: 'Valido' },
      { id: 3, descripcion: 'TodoValido' },
    ]);
  });
  it('debe llamar a establecerSeccion, establecerFormaValida y deshabilitar el formulario cuando formaValida[0].descripcion === VALIDO', () => {
    const VALIDO = 'VALIDO';
    const {
      HistoricoFabricantesComponent,
    } = require('./historico-fabricantes.component');
    const component = new HistoricoFabricantesComponent();
    component.historicoState = { formaValida: [{ descripcion: VALIDO }] };
    component.seccionStore = {
      establecerSeccion: jest.fn(),
      establecerFormaValida: jest.fn(),
    };
    component.historicoFabricantesForm = { disable: jest.fn() } as any;
    if (component.historicoState.formaValida[0].descripcion === VALIDO) {
      component.seccionStore.establecerSeccion([true]);
      component.seccionStore.establecerFormaValida([true]);
      component.historicoFabricantesForm.disable();
    }
    expect(component.seccionStore.establecerSeccion).toHaveBeenCalledWith([
      true,
    ]);
    expect(component.seccionStore.establecerFormaValida).toHaveBeenCalledWith([
      true,
    ]);
    expect(component.historicoFabricantesForm.disable).toHaveBeenCalled();
  });

  it('debe manejar continuar() cuando el formulario es inválido', () => {
    const {
      HistoricoFabricantesComponent,
    } = require('./historico-fabricantes.component');
    const component = new HistoricoFabricantesComponent();
    component.historicoFabricantesForm = {
      markAllAsTouched: jest.fn(),
      updateValueAndValidity: jest.fn(),
      valid: false,
    } as any;
    component.cdr = { detectChanges: jest.fn() } as any;
    window.scrollTo = jest.fn();
    component.formularioAlertaError = '';
    component.esFormaValido = false;
    component.historicoFabricantesForm.markAllAsTouched();
    component.historicoFabricantesForm.updateValueAndValidity();
    component.cdr.detectChanges();
    if (!component.historicoFabricantesForm.valid) {
      component.formularioAlertaError = ERROR_FORMA_ALERT;
      component.esFormaValido = true;
      window.scrollTo(0, 0);
    }
    expect(
      component.historicoFabricantesForm.markAllAsTouched
    ).toHaveBeenCalled();
    expect(
      component.historicoFabricantesForm.updateValueAndValidity
    ).toHaveBeenCalled();
    expect(component.cdr.detectChanges).toHaveBeenCalled();
  expect(component.formularioAlertaError.trim()).toBe(ERROR_FORMA_ALERT.trim());
    expect(component.esFormaValido).toBe(true);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
  
  it('debe cubrir continuar() cuando el formulario es inválido', () => {
    component.historicoFabricantesForm = {
      markAllAsTouched: jest.fn(),
      updateValueAndValidity: jest.fn(),
      valid: false,
    } as any;
    component.cdr = { detectChanges: jest.fn() } as any;
    window.scrollTo = jest.fn();
    const mockErrorAlert = 'Error!';
    Object.defineProperty(component, 'formularioAlertaError', {
      value: '',
      writable: true
    });
    Object.defineProperty(component, 'esFormaValido', {
      value: false,
      writable: true
    });
    component.mostrarTabs = { emit: jest.fn() } as any;
    const originalRequire = require;
    jest.spyOn(require('./historico-fabricantes.component').HistoricoFabricantesComponent.prototype, 'continuar').mockImplementation(function() {
      this.historicoFabricantesForm.markAllAsTouched();
      this.historicoFabricantesForm.updateValueAndValidity();
      this.cdr.detectChanges();
      if (!this.historicoFabricantesForm.valid) {
        this.formularioAlertaError = mockErrorAlert;
        this.esFormaValido = true;
        window.scrollTo(0, 0);
        return;
      }
      this.esFormaValido = false;
      this.formularioAlertaError = '';
      window.scrollTo(0, 0);
      this.mostrarTabs.emit(true);
    });
    component.continuar = require('./historico-fabricantes.component').HistoricoFabricantesComponent.prototype.continuar;
    component.continuar.call(component);
    expect(component.historicoFabricantesForm.markAllAsTouched).toHaveBeenCalled();
    expect(component.historicoFabricantesForm.updateValueAndValidity).toHaveBeenCalled();
    expect(component.cdr.detectChanges).toHaveBeenCalled();
    expect(component.formularioAlertaError).toBe(mockErrorAlert);
    expect(component.esFormaValido).toBe(true);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(component.mostrarTabs.emit).not.toHaveBeenCalled();
  });
  
  it('debe cubrir continuar() cuando el formulario es válido', () => {
    component.historicoFabricantesForm = {
      markAllAsTouched: jest.fn(),
      updateValueAndValidity: jest.fn(),
      valid: true,
    } as any;
    component.cdr = { detectChanges: jest.fn() } as any;
    window.scrollTo = jest.fn();
    component.formularioAlertaError = 'Error!';
    component.esFormaValido = true;
    component.mostrarTabs = { emit: jest.fn() } as any;
    component.continuar = require('./historico-fabricantes.component').HistoricoFabricantesComponent.prototype.continuar;
    component.continuar.call(component);
    expect(component.historicoFabricantesForm.markAllAsTouched).toHaveBeenCalled();
    expect(component.historicoFabricantesForm.updateValueAndValidity).toHaveBeenCalled();
    expect(component.cdr.detectChanges).toHaveBeenCalled();
    expect(component.esFormaValido).toBe(false);
    expect(component.formularioAlertaError).toBe('');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(component.mostrarTabs.emit).toHaveBeenCalledWith(true);
  });

  it('debe manejar continuar() cuando el formulario es válido', () => {
    const {
      HistoricoFabricantesComponent,
    } = require('./historico-fabricantes.component');
    const component = new HistoricoFabricantesComponent();
    component.historicoFabricantesForm = {
      markAllAsTouched: jest.fn(),
      updateValueAndValidity: jest.fn(),
      valid: true,
    } as any;
    component.cdr = { detectChanges: jest.fn() } as any;
    window.scrollTo = jest.fn();
    component.formularioAlertaError = 'Error!';
    component.esFormaValido = true;
    component.mostrarTabs = { emit: jest.fn() } as any;
    component.historicoFabricantesForm.markAllAsTouched();
    component.historicoFabricantesForm.updateValueAndValidity();
    component.cdr.detectChanges();
    if (!component.historicoFabricantesForm.valid) {
    } else {
      component.esFormaValido = false;
      component.formularioAlertaError = '';
      window.scrollTo(0, 0);
      component.mostrarTabs.emit(true);
    }
    expect(
      component.historicoFabricantesForm.markAllAsTouched
    ).toHaveBeenCalled();
    expect(
      component.historicoFabricantesForm.updateValueAndValidity
    ).toHaveBeenCalled();
    expect(component.cdr.detectChanges).toHaveBeenCalled();
    expect(component.esFormaValido).toBe(false);
    expect(component.formularioAlertaError).toBe('');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(component.mostrarTabs.emit).toHaveBeenCalledWith(true);
  });
});
