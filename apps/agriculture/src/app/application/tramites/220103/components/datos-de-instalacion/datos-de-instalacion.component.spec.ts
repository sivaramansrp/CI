import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeInstalacionComponent } from './datos-de-instalacion.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Tramite220103Query } from '../../estados/queries/tramites220103.query';
import { Tramite220103Store } from '../../estados/tramites/tramites220103.store';
import { CAMPOS_FORMULARIO_DATOS_DE_INSTALACION } from '../../constantes/sanidad-acuicola-importacion.enum';

describe('DatosDeInstalacionComponent', () => {
  let component: DatosDeInstalacionComponent;
  let fixture: ComponentFixture<DatosDeInstalacionComponent>;
  let mockQuery: jest.Mocked<Tramite220103Query>;
  let mockStore: jest.Mocked<Tramite220103Store>;

  beforeEach(async () => {
    mockQuery = {
      selectTramite220103State$: of({
        campo1: 'valor1',
        campo2: 'valor2',
      }),
    } as unknown as jest.Mocked<Tramite220103Query>;

    mockStore = {
      setTramite220103State: jest.fn(),
    } as unknown as jest.Mocked<Tramite220103Store>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,DatosDeInstalacionComponent],
      providers: [
        FormBuilder,
        { provide: Tramite220103Query, useValue: mockQuery },
        { provide: Tramite220103Store, useValue: mockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeInstalacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el estado seleccionado en ngOnInit', () => {
    component.ngOnInit();

    expect(component.estadoSeleccionado).toEqual({
      campo1: 'valor1',
      campo2: 'valor2',
    });
  });

  it('debería establecer un cambio de valor en el estado del trámite', () => {
    const mockEvent = { campo: 'campo1', valor: 'nuevoValor' };
    component.establecerCambioDeValor(mockEvent);

    expect(mockStore.setTramite220103State).toHaveBeenCalledWith('campo1', 'nuevoValor');
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['notificadorDestruccion$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['notificadorDestruccion$'], 'complete');

    component.ngOnDestroy();

    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });

  it('debería inicializar el formulario con los campos de configuración', () => {
    expect(component.configuracionFormularioDatosDeInstalacion).toEqual(CAMPOS_FORMULARIO_DATOS_DE_INSTALACION);
    expect(component.formularioDatosDeInstalacion).toBeDefined();
  });
});