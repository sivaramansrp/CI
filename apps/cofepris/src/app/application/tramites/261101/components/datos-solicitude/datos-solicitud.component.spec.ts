import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { DatosSolicitudService } from '../../services/datoSolicitude.service'
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261101.query';
import { DatosProcedureStore } from '../../../../estados/tramites/tramites261101.store';
import { of } from 'rxjs';

describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let mockDatosSolicitudService: { isValid: jest.Mock };
  let mockDatosProcedureStore: { establecerDatos: jest.Mock };
  let mockDatosProcedureQuery: { selectideGenerica1$: jest.Mock };

  beforeEach(() => {
    mockDatosSolicitudService = {
      isValid: jest.fn() as jest.Mock,
    };

    mockDatosProcedureStore = {
      establecerDatos: jest.fn(),
    };

    mockDatosProcedureQuery = {
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
        { provide: DatosSolicitudService, useValue: mockDatosSolicitudService },
        { provide: DatosProcedureStore, useValue: mockDatosProcedureStore },
        { provide: DatosProcedureQuery, useValue: mockDatosProcedureQuery },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(DatosSolicitudComponent);
    component = fixture.componentInstance;
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
    const spy = jest.spyOn(mockDatosProcedureQuery, 'selectideGenerica1$');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('debería validar un campo del formulario usando isValid', () => {
    // Simula el valor de retorno del método isValid en el servicio
    mockDatosSolicitudService.isValid.mockReturnValue(true);

    // Inicializa el formulario con un control
    component.preOperativeForm = new FormBuilder().group({
      ideGenerica1: ['ideGenerica1'], // Establece un valor inicial
    });

    // Llama al método isValid con el nombre del campo
    const result = component.isValid('ideGenerica1');

    // Verifica que el método isValid del servicio se haya llamado con los argumentos correctos
    expect(mockDatosSolicitudService.isValid).toHaveBeenCalledWith(component.preOperativeForm, 'ideGenerica1');

    // Verifica que el resultado sea true (según el mock)
    expect(result).toBe(true);
  });

  it('debería llamar a establecerDatos en el store cuando se llama setValoresStore', () => {
    const form = new FormBuilder().group({
      ideGenerica1: ['ideGenerica1'],
    });
    component.setValoresStore(form, 'ideGenerica1');
    expect(mockDatosProcedureStore.establecerDatos).toHaveBeenCalledWith({ ideGenerica1: 'ideGenerica1' });
  });

  it('debería emitir setValoresStoreEvent cuando se llama setValoresStore', () => {
    const form = new FormBuilder().group({
      observaciones: ['Alguna justificación'],
    });
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalledWith();
    expect(completeSpy).toHaveBeenCalled();
  });
});
