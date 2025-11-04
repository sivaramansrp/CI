import { TestBed } from '@angular/core/testing';
import { Tramite130113Store, createInitialState, Tramite130113State } from './tramites130113.store';
import { PartidasDeLaMercanciaModelo } from '../../../../shared/models/partidas-de-la-mercancia.model';

describe('Tramite130113Store', () => {
  let store: Tramite130113Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Tramite130113Store],
    });
    store = TestBed.inject(Tramite130113Store);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should have initial state', () => {
    const initialState = createInitialState();
    expect(store.getValue()).toEqual(initialState);
  });

  it('should update estado with partial state - solicitud', () => {
    const partialState: Partial<Tramite130113State> = {
      solicitud: 'Test Solicitud'
    };

    store.actualizarEstado(partialState);
    expect(store.getValue().solicitud).toBe('Test Solicitud');
  });

  it('should update estado with partial state - producto', () => {
    const partialState: Partial<Tramite130113State> = {
      producto: 'Test Producto'
    };

    store.actualizarEstado(partialState);
    expect(store.getValue().producto).toBe('Test Producto');
  });

  it('should update estado with partial state - descripcion', () => {
    const partialState: Partial<Tramite130113State> = {
      descripcion: 'Test Descripcion'
    };

    store.actualizarEstado(partialState);
    expect(store.getValue().descripcion).toBe('Test Descripcion');
  });

  it('should update estado with partial state - fraccion', () => {
    const partialState: Partial<Tramite130113State> = {
      fraccion: 'Test Fraccion'
    };

    store.actualizarEstado(partialState);
    expect(store.getValue().fraccion).toBe('Test Fraccion');
  });

  it('should update estado with partial state - cantidad', () => {
    const partialState: Partial<Tramite130113State> = {
      cantidad: '100'
    };

    store.actualizarEstado(partialState);
    expect(store.getValue().cantidad).toBe('100');
  });

  it('should update estado with partial state - valorPartidaUSD', () => {
    const partialState: Partial<Tramite130113State> = {
      valorPartidaUSD: 500
    };

    store.actualizarEstado(partialState);
    expect(store.getValue().valorPartidaUSD).toBe(500);
  });

  it('should update estado with partial state - mostrarTabla', () => {
    const partialState: Partial<Tramite130113State> = {
      mostrarTabla: true
    };

    store.actualizarEstado(partialState);
    expect(store.getValue().mostrarTabla).toBe(true);
  });

  it('should update estado with partial state - filaSeleccionada', () => {
    const fila: PartidasDeLaMercanciaModelo = {
      id: '1',
      cantidad: '10',
      unidadDeMedida: 'kg',
      fraccionFrancelaria: '1234',
      descripcion: 'Test',
      precioUnitarioUSD: '100',
      totalUSD: '1000'
    };

    const partialState: Partial<Tramite130113State> = {
      filaSeleccionada: [fila]
    };

    store.actualizarEstado(partialState);
    expect(store.getValue().filaSeleccionada).toEqual([fila]);
  });

  it('should update estado with multiple properties', () => {
    const partialState: Partial<Tramite130113State> = {
      solicitud: 'Updated Solicitud',
      producto: 'Updated Producto',
      mostrarTabla: true,
      cantidad: '200'
    };

    store.actualizarEstado(partialState);
    
    expect(store.getValue().solicitud).toBe('Updated Solicitud');
    expect(store.getValue().producto).toBe('Updated Producto');
    expect(store.getValue().mostrarTabla).toBe(true);
    expect(store.getValue().cantidad).toBe('200');
    expect(store.getValue().descripcion).toBe(''); // Should remain unchanged
  });

  it('should preserve existing state when updating partial state', () => {
    store.actualizarEstado({ solicitud: 'First Update' });
    store.actualizarEstado({ producto: 'Second Update' });
    expect(store.getValue().solicitud).toBe('First Update');
    expect(store.getValue().producto).toBe('Second Update');
  });

  it('should create initial state correctly', () => {
    const initialState = createInitialState();
    
    expect(initialState.filaSeleccionada).toEqual([]);
    expect(initialState.mostrarTabla).toBe(false);
    expect(initialState.solicitud).toBe('');
    expect(initialState.fraccion).toBe('');
    expect(initialState.defaultSelect).toBe('Inicial');
    expect(initialState.producto).toBe('');
    expect(initialState.descripcion).toBe('');
    expect(initialState.cantidad).toBe('');
    expect(initialState.valorPartidaUSD).toBe(0);
    expect(initialState.unidadMedida).toBe('');
    expect(initialState.defaultProducto).toBe('Nuevo');
    expect(initialState.regimen).toBe('');
    expect(initialState.clasificacion).toBe('');
  });
});