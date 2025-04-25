import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { ManifiestoComponent } from './manifiesto.component';
import { Tramite630303Store } from '../../estados/tramite630303.store';
import { Tramite630303Query } from '../../estados/tramite630303.query';

describe('ManifiestoComponent', () => {
  let componente: ManifiestoComponent;
  let fixture: ComponentFixture<ManifiestoComponent>;
  let mockStore: jest.Mocked<Tramite630303Store>;
  let mockQuery: jest.Mocked<Tramite630303Query>;

  beforeEach(async () => {
    mockStore = {
      setTramite630303State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630303Store>;

    mockQuery = {
      selectTramite630303State$: of({
        declaracion: 'Declaración de prueba',
      }),
    } as unknown as jest.Mocked<Tramite630303Query>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, ManifiestoComponent],
      providers: [
        { provide: Tramite630303Store, useValue: mockStore },
        { provide: Tramite630303Query, useValue: mockQuery },
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

  it('debería actualizar la declaración en el formulario y en el store cuando se invoque setValorStore', () => {
    const nuevoValor = 'Nueva declaración';
    componente.manifiestoFormulario.patchValue({ declaracion: nuevoValor });

    componente.setValorStore(componente.manifiestoFormulario, 'declaracion');

    expect(mockStore.setTramite630303State).toHaveBeenCalledWith('declaracion', nuevoValor);
  });

  it('debería obtener el estado del store y establecer estadoSeleccionado', () => {
    componente.getValorStore();
    expect(componente.estadoSeleccionado).toEqual({
      declaracion: 'Declaración de prueba',
    });
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(componente['destroyed$'], 'next');
    const completeSpy = jest.spyOn(componente['destroyed$'], 'complete');

    componente.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});