import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CertificadoOrigenComponent } from './certificado-origen.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite110212Store } from '../../../../estados/tramites/tramite110212.store';
import { Tramite110212Query } from '../../../../estados/queries/tramite110212.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { of } from 'rxjs';
import { ValidacionPosterioriService } from '../../service/validacion-posteriori.service';
import { DisponiblesTabla, SeleccionadasTabla } from '../../models/validacion-posteriori.model';
import { Modal } from 'bootstrap';

describe('CertificadoOrigenComponent', () => {
  let component: CertificadoOrigenComponent;
  let fixture: ComponentFixture<CertificadoOrigenComponent>;
  let validacionPosterioriService: any;
  let tramiteQueryMock: any;
  let validacionesServiceMock: any;
  let mercanciaSeleccionadasTablaDatos: SeleccionadasTabla;
  let disponiblesTabla: DisponiblesTabla;

  let tramiteStoreMock: any;


  beforeEach(async () => {
    validacionPosterioriService = {
      obtenerTratado: jest.fn().mockReturnValue(of({ datos: [{ id: 1, nombre: 'Tratado 1' }] })),
      obtenerPais: jest.fn().mockReturnValue(of({ datos: [{ id: 1, nombre: 'País 1' }] })),
      obtenerMercanciasDisponibles: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Mercancía Disponible' }])),
      obtenerMercanciasSeleccionadas: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Mercancía Seleccionada' }])),
    };
    tramiteStoreMock = {
      setGrupoTratadoFechaFinalInput: jest.fn(),
      setFecha: jest.fn(),
      setGrupoTratadoFechaInicialInput: jest.fn(),


    };
    tramiteQueryMock = {
      selectSolicitud$: of({
        tercerOperador: true,
        grupoOperador: { nombre: 'Operador 1' },
        grupoDeDomicilio: { pais: 'País 1' },
        grupoTratado: { tratado: 'Tratado 1' },
        formularioMercancia: { fraccionMercanciaArancelaria: '1234' },
      }),
    };
    mercanciaSeleccionadasTablaDatos =
    {
      "id": 0,
      "fraccionArancelaria": "08888888",
      "cantidad": "100.00",
      "unidadMedida": "Caja",
      "valorMercancia": "100.00",
      "tipoFactura": "Manual",
      "numFactura": "1122232",
      "complementoDescripcion": "CAJA ROJA GRANDE",
      "fechaFactura": "2015-03-01"
    };
    disponiblesTabla = {
      "fraccionArancelaria": "40021901",
      "nombreTecnico": "Poli(butadieno-estireno), con un contenido reaccionado de butadieno superior o igual al 90% pero inferior o igual al 97% y10% a 3% respectivamente, de estireno.",
      "nombreComercial": "Patitos de hule",
      "numeroRegistroProductos": "254023028953",
      "fechaVencimiento": "2023-07-05",
      "fechaExpedicion": "2023-07-05"
    }

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CertificadoOrigenComponent],
      providers: [
        FormBuilder,
        { provide: ValidacionPosterioriService, useValue: validacionPosterioriService },
        { provide: Tramite110212Store, useValue: tramiteStoreMock },
        { provide: Tramite110212Query, useValue: tramiteQueryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificadoOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formularioCertificado on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formularioCertificado).toBeDefined();
    expect(component.formularioCertificado.get('tercerOperador')?.value).toBe(true);
  });

  it('should call cargarTratado and set optionsTratado', () => {
    component.cargarTratado();
    expect(validacionPosterioriService.obtenerTratado).toHaveBeenCalled();
    expect(component.optionsTratado).toEqual([{ id: 1, nombre: 'Tratado 1' }]);
  });

  it('should call cargarPais and set optionsPais and optionsTipoFactura', () => {
    component.cargarPais();
    expect(validacionPosterioriService.obtenerPais).toHaveBeenCalled();
    expect(component.optionsPais).toEqual([{ id: 1, nombre: 'País 1' }]);
    expect(component.optionsTipoFactura).toEqual([{ id: 1, nombre: 'País 1' }]);
  });

  it('should call cargarMercanciasDisponibles and set mercanciaDisponsiblesTablaDatos', () => {
    component.cargarMercanciasDisponibles();
    expect(validacionPosterioriService.obtenerMercanciasDisponibles).toHaveBeenCalled();
    expect(component.mercanciaDisponsiblesTablaDatos).toEqual([{ id: 1, nombre: 'Mercancía Disponible' }]);
  });

  it('should call cargarMercanciasSeleccionadas and set mercanciaSeleccionadasTablaDatos', () => {
    component.cargarMercanciasSeleccionadas();
    expect(validacionPosterioriService.obtenerMercanciasSeleccionadas).toHaveBeenCalled();
    expect(component.mercanciaSeleccionadasTablaDatos).toEqual([{ id: 1, nombre: 'Mercancía Seleccionada' }]);
  });

  it('should handle seleccionDeFilas and set mercanciaSeleccionadasFila', () => {
    const mockFila = { id: 1, nombre: 'Mercancía Seleccionada' };
    component.seleccionDeFilas(mockFila as any);
    expect(component.mercanciaSeleccionadasFila).toEqual(mockFila);
  });

  it('should handle eliminar and remove selected row from mercanciaSeleccionadasTablaDatos', () => {
    component.mercanciaSeleccionadasTablaDatos = [mercanciaSeleccionadasTablaDatos];
    component.mercanciaSeleccionadasFila = { id: 1, nombre: 'Mercancía Seleccionada' } as any;
    component.eliminar();
    expect(component.mercanciaSeleccionadasTablaDatos).toEqual([mercanciaSeleccionadasTablaDatos]);
    expect(component.mercanciaSeleccionadasFila).toBeNull();
  });

  it('should handle alSeleccionarArchivo and set nombreArchivo', () => {
    const mockEvent = {
      target: {
        files: [{ name: 'archivo.txt' }],
      },
    } as unknown as Event;
    component.alSeleccionarArchivo(mockEvent);
    expect(component.nombreArchivo).toBe('archivo.txt');
  });

  it('should call cerrarModal and close the modal', () => {
    const closeModalMock = { nativeElement: { click: jest.fn() } };
    component.closeModal = closeModalMock as any;
    component.cerrarModal();
    expect(closeModalMock.nativeElement.click).toHaveBeenCalled();
  });

  it('should call cambioFechaInicial and update the store', () => {
    const spySetValoresStore = jest.spyOn(component, 'setValoresStore');
    component.cambioFechaInicial('2023-01-01');
    expect(spySetValoresStore).toHaveBeenCalledWith(component.grupoTratado, 'fechaInicial', 'setGrupoTratadoFechaFinalInput');
  });

  it('should call cambioFechaFinal and update the store', () => {
    const spySetValoresStore = jest.spyOn(component, 'setValoresStore');
    component.cambioFechaFinal('2023-12-31');
    fixture.detectChanges();
    expect(spySetValoresStore).toHaveBeenCalledWith(component.grupoTratado, 'fechaFinal', 'setGrupoTratadoFechaInicialInput');
  });

  it('should call cambioFechaFactura and update the store', () => {
    const spySetValoresStore = jest.spyOn(component, 'setValoresStore');
    component.cambioFechaFactura('2023-06-15');
    expect(spySetValoresStore).toHaveBeenCalledWith(component.formularioMercancia, 'fecha', 'setFecha');
  });

  it('should handle disponiblesSeleccionDeFilas and show modalBuscar', () => {
    const modalElement = fixture.debugElement.nativeElement.querySelector('#modalBuscar');
    component.modalBuscar = { nativeElement: modalElement };
    component.soloLectura = false;
    const clickSpy = jest.spyOn(Modal.prototype, 'show');
    component.disponiblesSeleccionDeFilas(disponiblesTabla);
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should handle cargaArchivo and show modalArchivo', () => {
    const modalElement = fixture.debugElement.nativeElement.querySelector('#modalArchivo');
    component.modalArchivo = { nativeElement: modalElement };
    const clickSpy = jest.spyOn(Modal.prototype, 'show');
    component.cargaArchivo();
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should clean up observables on ngOnDestroy', () => {
    const spyDestroyNotifier = jest.spyOn(component.destroyNotifier$, 'next');
    const spyDestroyComplete = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(spyDestroyNotifier).toHaveBeenCalled();
    expect(spyDestroyComplete).toHaveBeenCalled();
  });

  it('should disable all forms when soloLectura is true', () => {
    component.soloLectura = true;
    component.inicializarEstadoFormulario();
    expect(component.formularioCertificado.disabled).toBe(true);
    expect(component.formularioMercancia.disabled).toBe(true);
    expect(component.formularioArchivo.disabled).toBe(true);
  });

  it('should enable all forms when soloLectura is false', () => {
    component.soloLectura = false;
    component.inicializarEstadoFormulario();
    expect(component.formularioCertificado.enabled).toBe(true);
    expect(component.formularioMercancia.enabled).toBe(true);
    expect(component.formularioArchivo.enabled).toBe(true);
  });

  it('should disable form elements on onClick', () => {
    component.onClick();
    expect(component.estaDeshabilitado).toBe(true);
  });

  it('should call cerrarModal when enviar is called', () => {
    const cerrarModalSpy = jest.spyOn(component, 'cerrarModal');
    component.enviar();
    expect(cerrarModalSpy).toHaveBeenCalled();
  });

});