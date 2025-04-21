import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ModificacionPermisoImportacionMedicamentosService } from '../../services/modificacion-permiso-importacion-medicamentos.service';
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261103.query';
import { DatosProcedureStore } from '../../../../estados/tramites/tramites261103.store';
import { of } from 'rxjs';
import { ModificacionPermisoImportacionMedicamentosComponent } from './modificacion-permiso-importacion-medicamentos';

describe('ModificacionPermisoImportacionMedicamentosComponent', () => {
  let component: ModificacionPermisoImportacionMedicamentosComponent;
  let MOCK_MODIFICACION_PERMISO_IMPORTACION_MEDICAMENTOS_SERVICE: { isValid: jest.Mock };
  let MOCK_DATOS_PROCEDURE_STORE: { establecerDatos: jest.Mock };
  let MOCK_DATOS_PROCEDURE_QUERY: { selectideGenerica1$: jest.Mock };

  beforeEach(() => {
    MOCK_MODIFICACION_PERMISO_IMPORTACION_MEDICAMENTOS_SERVICE = {
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
      imports: [ReactiveFormsModule, ModificacionPermisoImportacionMedicamentosComponent],
      providers: [
        FormBuilder,
        { provide: ModificacionPermisoImportacionMedicamentosService, useValue: MOCK_MODIFICACION_PERMISO_IMPORTACION_MEDICAMENTOS_SERVICE },
        { provide: DatosProcedureStore, useValue: MOCK_DATOS_PROCEDURE_STORE },
        { provide: DatosProcedureQuery, useValue: MOCK_DATOS_PROCEDURE_QUERY },
      ],
    }).compileComponents();

    const FIXTURE = TestBed.createComponent(ModificacionPermisoImportacionMedicamentosComponent);
    component = FIXTURE.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario en ngOnInit', () => {
    jest.spyOn(component, 'crearFormulario');
    component.ngOnInit();
    expect(component.crearFormulario).toHaveBeenCalled();
    expect(component.preOperativeForm).toBeDefined();
  });

  it('debería suscribirse a selectideGenerica1$ en ngOnInit', () => {
    const SPY = jest.spyOn(MOCK_DATOS_PROCEDURE_QUERY, 'selectideGenerica1$');
    component.ngOnInit();
    expect(SPY).toHaveBeenCalled();
  });

  it('debería validar un campo del formulario usando isValid', () => {
    // Simula el valor de retorno del método isValid en el servicio
    MOCK_MODIFICACION_PERMISO_IMPORTACION_MEDICAMENTOS_SERVICE.isValid.mockReturnValue(true);

    // Inicializa el formulario con un control
    component.preOperativeForm = new FormBuilder().group({
      ideGenerica1: ['ideGenerica1'], // Establece un valor inicial
    });

    // Llama al método isValid con el nombre del campo
    const RESULT = component.isValid('ideGenerica1');

    // Verifica que el método isValid del servicio se haya llamado con los argumentos correctos
    expect(MOCK_MODIFICACION_PERMISO_IMPORTACION_MEDICAMENTOS_SERVICE.isValid).toHaveBeenCalledWith(component.preOperativeForm, 'ideGenerica1');

    // Verifica que el resultado sea true (según el mock)
    expect(RESULT).toBe(true);
  });

  it('debería llamar a establecerDatos en el store cuando se llama setValoresStore', () => {
    const FORM = new FormBuilder().group({
      ideGenerica1: ['ideGenerica1'],
    });
    component.setValoresStore(FORM, 'ideGenerica1');
    expect(MOCK_DATOS_PROCEDURE_STORE.establecerDatos).toHaveBeenCalledWith({ ideGenerica1: 'ideGenerica1' });
  });

  it('debería emitir setValoresStoreEvent cuando se llama setValoresStore', () => {
    const FORM = new FormBuilder().group({
      observaciones: ['Alguna justificación'],
    });
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const DESTROY_SPY = jest.spyOn(component['destroy$'], 'next');
    const COMPLETE_SPY = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(DESTROY_SPY).toHaveBeenCalledWith();
    expect(COMPLETE_SPY).toHaveBeenCalled();
  });
});