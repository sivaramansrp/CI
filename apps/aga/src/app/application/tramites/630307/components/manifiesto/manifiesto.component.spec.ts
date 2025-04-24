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

    expect(storeMock.setTramite630307State).toHaveBeenCalledWith('declaracion', nuevoValor);
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
});