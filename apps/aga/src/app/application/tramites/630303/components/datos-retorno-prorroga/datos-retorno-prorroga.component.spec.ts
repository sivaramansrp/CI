import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { DatosRetornoProrrogaComponent } from './datos-retorno-prorroga.component';
import { Tramite630303Store } from '../../estados/tramite630303.store';
import { Tramite630303Query } from '../../estados/tramite630303.query';
import { of, Subject } from 'rxjs';

describe('DatosRetornoProrrogaComponent', () => {
  let componente: DatosRetornoProrrogaComponent;
  let fixture: ComponentFixture<DatosRetornoProrrogaComponent>;
  let mockStore: jest.Mocked<Tramite630303Store>;
  let mockQuery: jest.Mocked<Tramite630303Query>;

  beforeEach(async () => {
    mockStore = {
      setTramite630303State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630303Store>;

    mockQuery = {
      selectTramite630303State$: of({
        campo: 'valor',
      }),
    } as unknown as jest.Mocked<Tramite630303Query>;

    await TestBed.configureTestingModule({
      imports: [DatosRetornoProrrogaComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Tramite630303Store, useValue: mockStore },
        { provide: Tramite630303Query, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosRetornoProrrogaComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar el formulario en ngOnInit', () => {
    const INICIALIZAR_FORMULARIO_SPY = jest.spyOn(componente, 'inicializarFormulario');
    const GET_VALOR_STORE_SPY = jest.spyOn(componente, 'getValorStore');

    componente.ngOnInit();

    expect(INICIALIZAR_FORMULARIO_SPY).toHaveBeenCalled();
    expect(GET_VALOR_STORE_SPY).toHaveBeenCalled();
  });

  it('debería inicializar el formulario con valores predeterminados', () => {
    componente.inicializarFormulario();
    expect(componente.datosImportacionRetornoProrrogaGeneralFormulario).toBeTruthy();
  });

  it('debería obtener el estado actual del store', () => {
    componente.getValorStore();
    expect(componente.estadoSeleccionado).toEqual({ campo: 'valor' });
  });

  it('debería actualizar el store cuando se invoque establecerCambioDeValor', () => {
    const MOCK_EVENT = { campo: 'campoPrueba', valor: 'valorPrueba' };

    componente.establecerCambioDeValor(MOCK_EVENT);

    expect(mockStore.setTramite630303State).toHaveBeenCalledWith('campoPrueba', 'valorPrueba');
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const DESTROYED_SPY = jest.spyOn((componente as any).destroyed$, 'next');
    const COMPLETE_SPY = jest.spyOn((componente as any).destroyed$, 'complete');

    componente.ngOnDestroy();

    expect(DESTROYED_SPY).toHaveBeenCalled();
    expect(COMPLETE_SPY).toHaveBeenCalled();
  });
});