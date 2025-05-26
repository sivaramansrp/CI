import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DatosMercanciaComponent } from './datos-mercancia.component';
import { Tramite630303Store } from '../../estados/tramite630303.store';
import { Tramite630303Query } from '../../estados/tramite630303.query';
import { of } from 'rxjs';

describe('DatosMercanciaComponent', () => {
  let COMPONENTE: DatosMercanciaComponent;
  let FIXTURE: ComponentFixture<DatosMercanciaComponent>;
  let MOCK_STORE: jest.Mocked<Tramite630303Store>;
  let MOCK_QUERY: jest.Mocked<Tramite630303Query>;

  beforeEach(async () => {
    MOCK_STORE = {
      setTramite630303State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630303Store>;

    MOCK_QUERY = {
      selectTramite630303State$: of({
        campo: 'valor',
      }),
    } as unknown as jest.Mocked<Tramite630303Query>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosMercanciaComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Tramite630303Store, useValue: MOCK_STORE },
        { provide: Tramite630303Query, useValue: MOCK_QUERY },
      ],
    }).compileComponents();

    FIXTURE = TestBed.createComponent(DatosMercanciaComponent);
    COMPONENTE = FIXTURE.componentInstance;
    FIXTURE.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(COMPONENTE).toBeTruthy();
  });

  it('debería inicializar el formulario en ngOnInit', () => {
    const INICIALIZAR_FORMULARIO_SPY = jest.spyOn(COMPONENTE, 'inicializarFormulario');
    const GET_VALOR_STORE_SPY = jest.spyOn(COMPONENTE, 'getValorStore');

    COMPONENTE.ngOnInit();

    expect(INICIALIZAR_FORMULARIO_SPY).toHaveBeenCalled();
    expect(GET_VALOR_STORE_SPY).toHaveBeenCalled();
  });

  it('debería inicializar el formulario con valores predeterminados', () => {
    COMPONENTE.inicializarFormulario();
    expect(COMPONENTE.datosMercancia).toBeTruthy();
  });

  it('debería obtener el estado actual del store', () => {
    COMPONENTE.getValorStore();
    expect(COMPONENTE.estadoSeleccionado).toEqual({ campo: 'valor' });
  });

  it('debería actualizar el store cuando se invoque establecerCambioDeValor', () => {
    const MOCK_EVENT = { campo: 'campoPrueba', valor: 'valorPrueba' };

    COMPONENTE.establecerCambioDeValor(MOCK_EVENT);

    expect(MOCK_STORE.setTramite630303State).toHaveBeenCalledWith('campoPrueba', 'valorPrueba');
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const DESTROYED_SPY = jest.spyOn((COMPONENTE as any).destroyed$, 'next');
    const COMPLETE_SPY = jest.spyOn((COMPONENTE as any).destroyed$, 'complete');

    COMPONENTE.ngOnDestroy();

    expect(DESTROYED_SPY).toHaveBeenCalled();
    expect(COMPLETE_SPY).toHaveBeenCalled();
  });
});