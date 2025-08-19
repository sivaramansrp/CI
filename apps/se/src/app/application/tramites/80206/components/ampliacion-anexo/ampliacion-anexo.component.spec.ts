import { CUSTOM_ELEMENTS_SCHEMA, Directive, Injectable, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';

import { AmpliacionAnexoComponent } from './ampliacion-anexo.component';
import { FormBuilder } from '@angular/forms';
import { AmpliacionServiciosService } from '../../services/ampliacion-servicios.service';
import { AmpliacionServiciosQuery } from '../../estados/tramite80206.query';
import { Tramite80206Store } from '../../estados/tramite80206.store';
import { HttpClient } from '@angular/common/http';

class TranslatePipe implements PipeTransform {
  transform(v: any) {
    return v;
  }
}
@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom: any;
}

@Injectable()
class MockAmpliacionServiciosService {
  getDatos = jest.fn(() =>
    of({
      data: {
        infoServicios: {
          seleccionaLaModalidad: 'MOD-A',
          folio: 'F-123',
          ano: '2025',
        },
      },
    })
  );
}

@Injectable()
class MockAmpliacionServiciosQuery {
  private _solicitud$ = new Subject<any>();
  selectSolicitudTramite$ = this._solicitud$.asObservable();

  __emit(value: any) {
    this._solicitud$.next(value);
  }
}

@Injectable()
class MockTramite80206Store {
  setInfoRegistro = jest.fn();
  setFraccionArancelaria = jest.fn();
  setRfcEmpresa = jest.fn();
  setCantidad = jest.fn();
  setValor = jest.fn();
  setImportacion = jest.fn();
  setDatosImmex = jest.fn();
  setDatosImportacion = jest.fn();
}

@Injectable()
class MockHttpClient {
  post() {}
}

describe('AmpliacionAnexoComponent (Jest)', () => {
  let fixture: ComponentFixture<AmpliacionAnexoComponent>;
  let component: AmpliacionAnexoComponent;
  let mockService: MockAmpliacionServiciosService;
  let mockQuery: MockAmpliacionServiciosQuery;
  let mockStore: MockTramite80206Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [AmpliacionAnexoComponent, TranslatePipe, MyCustomDirective],
      providers: [
        FormBuilder,
        { provide: AmpliacionServiciosService, useClass: MockAmpliacionServiciosService },
        { provide: AmpliacionServiciosQuery, useClass: MockAmpliacionServiciosQuery },
        { provide: Tramite80206Store, useClass: MockTramite80206Store },
        { provide: HttpClient, useClass: MockHttpClient },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AmpliacionAnexoComponent);
    component = fixture.componentInstance;

    mockService = TestBed.inject(AmpliacionServiciosService) as any;
    mockQuery = TestBed.inject(AmpliacionServiciosQuery) as any;
    mockStore = TestBed.inject(Tramite80206Store) as any;

    component['destroyNotifier$'] = new Subject<void>();
  });

  afterEach(() => {
    fixture.destroy();
    jest.clearAllMocks();
  });

  it('debe crearse el componente (constructor)', () => {
    expect(component).toBeTruthy();
  });

  it('debe ejecutar ngOnInit y llamar a métodos de carga/suscripción', () => {
    const spyGet = jest.spyOn(component, 'getDatos');
    const spyImmex = jest.spyOn(component, 'suscribirseADatosImmex');
    const spyFields = jest.spyOn(component, 'suscribirseAFields');

    component.ngOnInit();

    expect(spyGet).toHaveBeenCalled();
    expect(spyImmex).toHaveBeenCalled();
    expect(spyFields).toHaveBeenCalled();
  });

  it('debe activar el modal de alerta', () => {
    component.mostrarAlerta = false;
    component.activarModal();
    expect(component.mostrarAlerta).toBe(true);
  });

  it('debe aceptar/cerrar el modal usando aceptar()', () => {
    component.mostrarAlerta = true;
    component.aceptar();
    expect(component.mostrarAlerta).toBe(false);
  });

  it('debe cerrar el modal usando cerrarModal()', () => {
    component.mostrarAlerta = true;
    component.cerrarModal();
    expect(component.mostrarAlerta).toBe(false);
  });

  it('debe propagar cambios para fraccionArancelaria', () => {
    component.enCambioDeCampo('fraccionArancelaria', '9999.99.99');
    expect(mockStore.setFraccionArancelaria).toHaveBeenCalledWith('9999.99.99');
  });

  it('debe propagar cambios para fraccion (usa setRfcEmpresa)', () => {
    component.enCambioDeCampo('fraccion', 'X1');
    expect(mockStore.setRfcEmpresa).toHaveBeenCalledWith('X1');
  });

  it('debe propagar cambios para cantidad', () => {
    component.enCambioDeCampo('cantidad', '10');
    expect(mockStore.setCantidad).toHaveBeenCalledWith('10');
  });

  it('debe propagar cambios para valor', () => {
    component.enCambioDeCampo('valor', '5000');
    expect(mockStore.setValor).toHaveBeenCalledWith('5000');
  });

  it('debe propagar cambios para importacion', () => {
    component.enCambioDeCampo('importacion', '8708.40.99');
    expect(mockStore.setImportacion).toHaveBeenCalledWith('8708.40.99');
  });

  it('no debe fallar con un campo desconocido', () => {
    expect(() => component.enCambioDeCampo('otro', 'x')).not.toThrow();
  });

  it('debe suscribirse a los campos y mapear el estado local', () => {
    component.suscribirseAFields();
    const estado = {
      fraccion: 'ABC',
      cantidad: '2',
      fraccionArancelaria: '1111.11.11',
      importacion: '2222.22.22',
      valor: '999',
      datos: [{ fraccionArancelaria: 'x' }],
    };
    mockQuery.__emit(estado);
    expect(component.tramiteState).toEqual(estado);
    expect(component.fraccion).toBe('ABC');
    expect(component.cantidad).toBe('2');
    expect(component.fraccionArancelaria).toBe('1111.11.11');
    expect(component.importacion).toBe('2222.22.22');
    expect(component.valor).toBe('999');
    expect(component.datos).toEqual([{ fraccionArancelaria: 'x' }]);
  });

  it('debe obtener datos del servicio y setear el formulario desde el store', () => {
    const spyInitForm = jest.spyOn(component, 'inicializarFormularioDesdeAlmacen');
    component.getDatos();
    expect(mockService.getDatos).toHaveBeenCalled();
    expect(mockStore.setInfoRegistro).toHaveBeenCalledWith({
      seleccionaLaModalidad: 'MOD-A',
      folio: 'F-123',
      ano: '2025',
    });
    expect(spyInitForm).toHaveBeenCalled();
  });

  it('debe actualizar datosImmex y datosImportacion al suscribirse', () => {
    component.suscribirseADatosImmex();
    const payload = {
      datosImmex: [{ fraccionArancelaria: 'A' }],
      datosImportacion: [{ fraccionArancelaria: 'B' }],
    };
    mockQuery.__emit(payload);
    expect(component.datosImmex).toEqual(payload.datosImmex);
    expect(component.datosImportacion).toEqual(payload.datosImportacion);
  });

  it('debe inicializar el formulario desde el almacén con valores y controles deshabilitados', () => {
    component.tramiteState = {
      infoRegistro: {
        seleccionaLaModalidad: 'M1',
        folio: 'F-9',
        ano: '2024',
      },
    } as any;

    component.inicializarFormularioDesdeAlmacen();
    const fg = component.formularioInfoRegistro;
    expect(fg.get('seleccionaLaModalidad')?.value).toBe('M1');
    expect(fg.get('folio')?.value).toBe('F-9');
    expect(fg.get('ano')?.value).toBe('2024');
    expect(fg.get('seleccionaLaModalidad')?.disabled).toBe(true);
    expect(fg.get('folio')?.disabled).toBe(true);
    expect(fg.get('ano')?.disabled).toBe(true);
  });

  it('debe inicializar el formulario vacío y deshabilitado', () => {
    component.inicializarFormularioInfoRegistro();
    const fg = component.formularioInfoRegistro;
    expect(fg.get('seleccionaLaModalidad')?.value).toBe('');
    expect(fg.get('folio')?.value).toBe('');
    expect(fg.get('ano')?.value).toBe('');
    expect(fg.get('seleccionaLaModalidad')?.disabled).toBe(true);
    expect(fg.get('folio')?.disabled).toBe(true);
    expect(fg.get('ano')?.disabled).toBe(true);
  });

  it('debe eliminar un registro de datosImmex cuando existe el índice', () => {
    component.datosImmex = [
      { fraccionArancelaria: 'X' } as any,
      { fraccionArancelaria: 'Y' } as any,
    ];
    component.domiciliosSeleccionados = [{ fraccionArancelaria: 'Y' } as any];

    component.eliminarServiciosGrid();

    expect(mockStore.setDatosImmex).toHaveBeenCalledWith([{ fraccionArancelaria: 'X' }]);
    expect(component.domiciliosSeleccionados).toEqual([]);
  });

  it('no debe modificar nada si no se encuentra el índice en eliminarServiciosGrid', () => {
    component.datosImmex = [{ fraccionArancelaria: 'X' } as any];
    component.domiciliosSeleccionados = [{ fraccionArancelaria: 'NO' } as any];

    component.eliminarServiciosGrid();

    expect(mockStore.setDatosImmex).not.toHaveBeenCalled();
  });

  it('debe eliminar un registro de datosImportacion cuando existe el índice', () => {
    component.datosImportacion = [
      { fraccionArancelaria: 'A' } as any,
      { fraccionArancelaria: 'B' } as any,
    ];
    component.domiciliosSeleccionados = [{ fraccionArancelaria: 'A' } as any];

    component.eliminarImportacion();

    expect(mockStore.setDatosImportacion).toHaveBeenCalledWith([{ fraccionArancelaria: 'B' }]);
    expect(component.domiciliosSeleccionados).toEqual([]);
  });

  it('no debe modificar nada si no se encuentra el índice en eliminarImportacion', () => {
    component.datosImportacion = [{ fraccionArancelaria: 'A' } as any];
    component.domiciliosSeleccionados = [{ fraccionArancelaria: 'Z' } as any];

    component.eliminarImportacion();

    expect(mockStore.setDatosImportacion).not.toHaveBeenCalled();
  });

  it('debe mostrar alerta si la fracción arancelaria ya existe (rama duplicado)', () => {
    component.datosImmex = [{ fraccionArancelaria: '1111.11.11' } as any];
    component.fraccionArancelaria = '1111.11.11';

    const spyActivar = jest.spyOn(component, 'activarModal');
    component.actualizaGridEmpresasNacionales();

    expect(component.mensajeDeAlerta).toContain('ya existe');
    expect(spyActivar).toHaveBeenCalled();
    expect(mockStore.setDatosImmex).not.toHaveBeenCalled();
  });

  it('debe agregar una nueva fracción cuando no existe (rama feliz)', () => {
    component.datosImmex = [{ fraccionArancelaria: 'AAA' } as any];
    component.fraccionArancelaria = 'BBB';

    component.actualizaGridEmpresasNacionales();

    expect(mockStore.setDatosImmex).toHaveBeenCalled();
    expect(component.fraccionArancelaria).toBe('');
  });

  it('debe alertar cuando no hay selección (domiciliosSeleccionados vacío)', () => {
    component.domiciliosSeleccionados = [];
    const spyActivar = jest.spyOn(component, 'activarModal');

    component.agregarImportacion();

    expect(component.mensajeDeAlerta).toContain('Debe seleccionar');
    expect(spyActivar).toHaveBeenCalled();
    expect(mockStore.setDatosImportacion).not.toHaveBeenCalled();
  });

  it('debe alertar cuando la fracción seleccionada coincide con importacion (rama inválida 3R´s)', () => {
    component.domiciliosSeleccionados = [{ fraccionArancelaria: '3333.33.33', fraccion: 'F', descripcionComercial: 'D' } as any];
    component.importacion = '3333.33.33';

    const spyActivar = jest.spyOn(component, 'activarModal');
    component.agregarImportacion();

    expect(component.mensajeDeAlerta).toContain('no es válida');
    expect(spyActivar).toHaveBeenCalled();
    expect(component.importacion).toBe('');
    expect(mockStore.setDatosImportacion).not.toHaveBeenCalled();
  });

  it('debe agregar importación cuando hay selección y es válida (rama feliz)', () => {
    component.domiciliosSeleccionados = [
      {
        fraccion: 'F1',
        fraccionArancelaria: '1111.11.11',
        descripcionComercial: 'Desc',
        anexoII: 'A2',
        tipo: 'T',
        umt: 'U',
        categoria: 'C',
        valorMensual: '10',
        valorAnual: '120',
        volumenrMensual: '5',
        volumenAnual: '60',
      } as any,
    ];
    component.importacion = '2222.22.22';

    component.agregarImportacion();

    expect(mockStore.setDatosImportacion).toHaveBeenCalled();
    expect(component.importacion).toBe('');
  });

  it('debe actualizar domiciliosSeleccionados correctamente', () => {
    const fila = { fraccionArancelaria: 'X' } as any;
    component.seleccionarDomicilios(fila);
    expect(component.domiciliosSeleccionados).toEqual([fila]);
  });

  it('debe limpiar las suscripciones en ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('debe ejecutar el ciclo de vida con detectChanges sin errores', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('debe procesar datos del hijo y llamar setAduanaDeIngresoSeleccion', () => {
    (mockStore as any).setAduanaDeIngresoSeleccion = jest.fn();
    component['tramite80206Store'].setAduanaDeIngresoSeleccion = (mockStore as any).setAduanaDeIngresoSeleccion;
    component.procesarDatosDelHijo({ id: 77 } as any);
    expect((mockStore as any).setAduanaDeIngresoSeleccion).toHaveBeenCalledWith('77');
  });
});
