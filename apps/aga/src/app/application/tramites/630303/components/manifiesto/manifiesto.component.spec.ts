import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { ManifiestoComponent } from './manifiesto.component';
import { Tramite630303Store } from '../../estados/tramite630303.store';
import { Tramite630303Query } from '../../estados/tramite630303.query';

describe('ManifiestoComponent', () => {
  let COMPONENTE: ManifiestoComponent;
  let FIXTURE: ComponentFixture<ManifiestoComponent>;
  let MOCK_STORE: jest.Mocked<Tramite630303Store>;
  let MOCK_QUERY: jest.Mocked<Tramite630303Query>;

  beforeEach(async () => {
    MOCK_STORE = {
      setTramite630303State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630303Store>;

    MOCK_QUERY = {
      selectTramite630303State$: of({
        declaracion: 'Declaración de prueba',
      }),
    } as unknown as jest.Mocked<Tramite630303Query>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, ManifiestoComponent],
      providers: [
        { provide: Tramite630303Store, useValue: MOCK_STORE },
        { provide: Tramite630303Query, useValue: MOCK_QUERY },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    FIXTURE = TestBed.createComponent(ManifiestoComponent);
    COMPONENTE = FIXTURE.componentInstance;
    FIXTURE.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(COMPONENTE).toBeTruthy();
  });

  it('debería inicializar el formulario con valores predeterminados', () => {
    expect(COMPONENTE.manifiestoFormulario.value).toEqual({
      declaracion: 'Declaración de prueba',
    });
  });

  it('debería actualizar la declaración en el formulario y en el store cuando se invoque setValorStore', () => {
    const NUEVO_VALOR = 'Nueva declaración';
    COMPONENTE.manifiestoFormulario.patchValue({ declaracion: NUEVO_VALOR });

    COMPONENTE.setValorStore(COMPONENTE.manifiestoFormulario, 'declaracion');

    expect(MOCK_STORE.setTramite630303State).toHaveBeenCalledWith('declaracion', NUEVO_VALOR);
  });

  it('debería obtener el estado del store y establecer estadoSeleccionado', () => {
    COMPONENTE.getValorStore();
    expect(COMPONENTE.estadoSeleccionado).toEqual({
      declaracion: 'Declaración de prueba',
    });
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const DESTROYED_SPY = jest.spyOn(COMPONENTE['destroyed$'], 'next');
    const COMPLETE_SPY = jest.spyOn(COMPONENTE['destroyed$'], 'complete');

    COMPONENTE.ngOnDestroy();

    expect(DESTROYED_SPY).toHaveBeenCalled();
    expect(COMPLETE_SPY).toHaveBeenCalled();
  });
});