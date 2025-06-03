import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { FechaDeImportacionComponent } from './fecha-de-importacion.component';
import { Tramite630103Store } from '../../estados/tramite630103.store';
import { Tramite630103Query } from '../../estados/tramite630103.query';
import { of } from 'rxjs';

describe('FechaDeImportacionComponent', () => {
  let componente: FechaDeImportacionComponent;
  let fixture: ComponentFixture<FechaDeImportacionComponent>;
  let storeMock: jest.Mocked<Tramite630103Store>;
  let queryMock: jest.Mocked<Tramite630103Query>;

  beforeEach(async () => {
    storeMock = {
      setTramite630103State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630103Store>;

    queryMock = {
      selectTramite630103State$: of({
        campo: 'valor',
      }),
    } as unknown as jest.Mocked<Tramite630103Query>;

    await TestBed.configureTestingModule({
      imports: [FechaDeImportacionComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Tramite630103Store, useValue: storeMock },
        { provide: Tramite630103Query, useValue: queryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FechaDeImportacionComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar el formulario en ngOnInit', () => {
    const inicializarFormularioSpy = jest.spyOn(componente, 'inicializarFormulario');
    const obtenerValorStoreSpy = jest.spyOn(componente, 'getValorStore');

    componente.ngOnInit();

    expect(inicializarFormularioSpy).toHaveBeenCalled();
    expect(obtenerValorStoreSpy).toHaveBeenCalled();
  });

  it('debería inicializar el formulario con valores predeterminados', () => {
    componente.inicializarFormulario();
    expect(componente.FechaDeImportacionTemporalFormulario).toBeTruthy();
  });

  it('debería obtener el estado actual del store', () => {
    componente.getValorStore();
    expect(componente.estadoSeleccionado).toEqual({ campo: 'valor' });
  });

  it('debería actualizar el store cuando establecerCambioDeValor es llamado', () => {
    const eventoMock = { campo: 'campoPrueba', valor: 'valorPrueba' };

    componente.establecerCambioDeValor(eventoMock);

    expect(storeMock.setTramite630103State).toHaveBeenCalledWith('campoPrueba', 'valorPrueba');
  });

  it('debería limpiar las suscripciones al destruir el componente', () => {
    const destroyedSpy = jest.spyOn((componente as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((componente as any).destroyed$, 'complete');

    componente.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('debería deshabilitar el formulario si esFormularioSoloLectura es true', () => {
    componente.esFormularioSoloLectura = true;
    componente.inicializarFormulario();
    const disableSpy = jest.spyOn(componente.FechaDeImportacionTemporalFormulario, 'disable');
    componente.guardarDatosFormulario();
    expect(disableSpy).toHaveBeenCalled();
  });

  it('debería habilitar el formulario si esFormularioSoloLectura es false', () => {
    componente.esFormularioSoloLectura = false;
    componente.inicializarFormulario();
    const enableSpy = jest.spyOn(componente.FechaDeImportacionTemporalFormulario, 'enable');
    componente.guardarDatosFormulario();
    expect(enableSpy).toHaveBeenCalled();
  });

  it('debería actualizar los campos como desactivados si esFormularioSoloLectura es true', () => {
    componente.formularioFechaDeImportacion = [
      { id: 'campo1', desactivado: false } as any,
      { id: 'campo2', desactivado: false } as any,
    ];
    componente.esFormularioSoloLectura = true;
    componente.inicializarEstadoFormulario();
    expect(componente.formularioFechaDeImportacion.every(c => c.desactivado)).toBe(true);
  });

  it('debería actualizar los campos como activados si esFormularioSoloLectura es false', () => {
    componente.formularioFechaDeImportacion = [
      { id: 'campo1', desactivado: true } as any,
      { id: 'campo2', desactivado: true } as any,
    ];
    componente.esFormularioSoloLectura = false;
    componente.inicializarEstadoFormulario();
    expect(componente.formularioFechaDeImportacion.every(c => !c.desactivado)).toBe(true);
  });
});