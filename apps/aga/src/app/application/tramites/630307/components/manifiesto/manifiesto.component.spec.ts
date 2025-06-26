import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { ManifiestoComponent } from './manifiesto.component';
import { Tramite630307Store } from '../../estados/tramite630307.store';
import { Tramite630307Query } from '../../estados/tramite630307.query';

describe('ManifiestoComponent', () => {
  let componente: ManifiestoComponent;
  let fixture: ComponentFixture<ManifiestoComponent>;
  let storeMock: jest.Mocked<Tramite630307Store>;
  let queryMock: jest.Mocked<Tramite630307Query>;

  beforeEach(async () => {
    storeMock = {
      setTramite630307State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630307Store>;

    queryMock = {
      selectTramite630307State$: of({
        declaracion: 'Declaración de prueba',
      }),
    } as unknown as jest.Mocked<Tramite630307Query>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, ManifiestoComponent],
      providers: [
        { provide: Tramite630307Store, useValue: storeMock },
        { provide: Tramite630307Query, useValue: queryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManifiestoComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar el formulario con valores predeterminados', () => {
    expect(componente.manifiestoFormulario.value).toEqual({
      declaracion: 'Declaración de prueba',
    });
  });

  it('debería actualizar la declaración en el formulario y el store cuando se llama a setValorStore', () => {
    const nuevoValor = 'Nueva declaración';
    componente.manifiestoFormulario.patchValue({ declaracion: nuevoValor });

    componente.setValorStore(componente.manifiestoFormulario, 'declaracion');

    expect(storeMock.setTramite630307State).toHaveBeenCalledWith(
      'declaracion',
      nuevoValor
    );
  });

  it('debería obtener el estado del store y establecer estadoSeleccionado', () => {
    componente.getValorStore();
    expect(componente.estadoSeleccionado).toEqual({
      declaracion: 'Declaración de prueba',
    });
  });

  it('debería limpiar las suscripciones al destruir el componente', () => {
    const destroyedSpy = jest.spyOn(componente['destroyed$'], 'next');
    const completeSpy = jest.spyOn(componente['destroyed$'], 'complete');

    componente.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('debería deshabilitar el formulario si esFormularioSoloLectura es true', () => {
    componente.esFormularioSoloLectura = true;
    componente.manifiestoFormulario.enable();
    componente.guardarDatosFormulario();
    expect(componente.manifiestoFormulario.disabled).toBe(true);
  });

  it('debería habilitar el formulario si esFormularioSoloLectura es false', () => {
    componente.esFormularioSoloLectura = false;
    componente.manifiestoFormulario.disable();
    componente.guardarDatosFormulario();
    expect(componente.manifiestoFormulario.enabled).toBe(true);
  });

  it('debería llamar a guardarDatosFormulario si esFormularioSoloLectura es true', () => {
    const guardarSpy = jest.spyOn(componente, 'guardarDatosFormulario');
    componente.esFormularioSoloLectura = true;
    componente.inicializarEstadoFormulario();
    expect(guardarSpy).toHaveBeenCalled();
  });

  it('debería llamar a inizializarFormulario si esFormularioSoloLectura es false', () => {
    const initSpy = jest.spyOn(componente, 'inizializarFormulario');
    componente.esFormularioSoloLectura = false;
    componente.inicializarEstadoFormulario();
    expect(initSpy).toHaveBeenCalled();
  });
});
