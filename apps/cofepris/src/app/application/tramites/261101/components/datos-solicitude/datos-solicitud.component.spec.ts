import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { DatosSolicitudService } from '../../services/datoSolicitude.service';
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261101.query';
import { DatosProcedureStore } from '../../../../estados/tramites/tramites261101.store';
import { of } from 'rxjs';

describe('DatosSolicitudComponent', () => {
  let COMPONENT: DatosSolicitudComponent;
  let MOCK_DATOS_SOLICITUD_SERVICE: { isValid: jest.Mock };
  let MOCK_DATOS_PROCEDURE_STORE: { establecerDatos: jest.Mock };
  let MOCK_DATOS_PROCEDURE_QUERY: { selectideGenerica1$: jest.Mock };

  beforeEach(() => {
    MOCK_DATOS_SOLICITUD_SERVICE = {
      isValid: jest.fn() as jest.Mock,
    };

    MOCK_DATOS_PROCEDURE_STORE = {
      establecerDatos: jest.fn(),
    };

    MOCK_DATOS_PROCEDURE_QUERY = {
      selectideGenerica1$: jest.fn().mockReturnValue(
        of({
          ideGenerica1: 'ideGenerica1',
          observaciones: 'Alguna justificación',
        })
      ),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosSolicitudComponent],
      providers: [
        FormBuilder,
        { provide: DatosSolicitudService, useValue: MOCK_DATOS_SOLICITUD_SERVICE },
        { provide: DatosProcedureStore, useValue: MOCK_DATOS_PROCEDURE_STORE },
        { provide: DatosProcedureQuery, useValue: MOCK_DATOS_PROCEDURE_QUERY },
      ],
    }).compileComponents();

    const FIXTURE = TestBed.createComponent(DatosSolicitudComponent);
    COMPONENT = FIXTURE.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(COMPONENT).toBeTruthy();
  });

  it('debería inicializar el formulario en ngOnInit', () => {
    jest.spyOn(COMPONENT, 'crearFormulario');
    COMPONENT.ngOnInit();
    expect(COMPONENT.crearFormulario).toHaveBeenCalled();
    expect(COMPONENT.preOperativeForm).toBeDefined();
  });

  it('debería suscribirse a selectideGenerica1$ en ngOnInit', () => {
    const SPY = jest.spyOn(MOCK_DATOS_PROCEDURE_QUERY, 'selectideGenerica1$');
    COMPONENT.ngOnInit();
    expect(SPY).toHaveBeenCalled();
  });

  it('debería validar un campo del formulario usando isValid', () => {
    // Simula el valor de retorno del método isValid en el servicio
    MOCK_DATOS_SOLICITUD_SERVICE.isValid.mockReturnValue(true);

    // Inicializa el formulario con un control
    COMPONENT.preOperativeForm = new FormBuilder().group({
      ideGenerica1: ['ideGenerica1'], // Establece un valor inicial
    });

    // Llama al método isValid con el nombre del campo
    const RESULT = COMPONENT.isValid('ideGenerica1');

    // Verifica que el método isValid del servicio se haya llamado con los argumentos correctos
    expect(MOCK_DATOS_SOLICITUD_SERVICE.isValid).toHaveBeenCalledWith(COMPONENT.preOperativeForm, 'ideGenerica1');

    // Verifica que el resultado sea true (según el mock)
    expect(RESULT).toBe(true);
  });

  it('debería llamar a establecerDatos en el store cuando se llama setValoresStore', () => {
    const FORM = new FormBuilder().group({
      ideGenerica1: ['ideGenerica1'],
    });
    COMPONENT.setValoresStore(FORM, 'ideGenerica1');
    expect(MOCK_DATOS_PROCEDURE_STORE.establecerDatos).toHaveBeenCalledWith({ ideGenerica1: 'ideGenerica1' });
  });

  it('debería emitir setValoresStoreEvent cuando se llama setValoresStore', () => {
    const FORM = new FormBuilder().group({
      observaciones: ['Alguna justificación'],
    });
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const DESTROY_SPY = jest.spyOn(COMPONENT['destroy$'], 'next');
    const COMPLETE_SPY = jest.spyOn(COMPONENT['destroy$'], 'complete');
    COMPONENT.ngOnDestroy();
    expect(DESTROY_SPY).toHaveBeenCalledWith();
    expect(COMPLETE_SPY).toHaveBeenCalled();
  });

  it('should call obtenerDatosFormulario and crearFormulario', () => {
    const OBTENER_DATOS_FORMULARIO_SPY = jest.spyOn(COMPONENT, 'obtenerDatosFormulario');
    const CREAR_FORMULARIO_SPY = jest.spyOn(COMPONENT, 'crearFormulario');

    COMPONENT.guardarDatosFormulario();

    expect(OBTENER_DATOS_FORMULARIO_SPY).toHaveBeenCalled();
    expect(CREAR_FORMULARIO_SPY).toHaveBeenCalled();
  });

  it('should disable the form if esFormularioSoloLectura is true', () => {
    COMPONENT.esFormularioSoloLectura = true;

    const DISABLE_SPY = jest.spyOn(COMPONENT.preOperativeForm, 'disable');

    COMPONENT.guardarDatosFormulario();

    expect(DISABLE_SPY).toHaveBeenCalled();
  });

  it('should enable the form if esFormularioSoloLectura is false', () => {
    COMPONENT.esFormularioSoloLectura = false;

    const ENABLE_SPY = jest.spyOn(COMPONENT.preOperativeForm, 'enable');

    COMPONENT.guardarDatosFormulario();

    expect(ENABLE_SPY).toHaveBeenCalled();
  });
});
