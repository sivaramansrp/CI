import { TestBed } from '@angular/core/testing';
import { Tramite130113Query } from './tramite130113.query';
import { Tramite130113Store, createInitialState } from '../tramites/tramites130113.store';

describe('Tramite130113Query', () => {
  let query: Tramite130113Query;
  let store: Tramite130113Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Tramite130113Query, Tramite130113Store],
    });
    query = TestBed.inject(Tramite130113Query);
    store = TestBed.inject(Tramite130113Store);
  });

  it('should be created', () => {
    expect(query).toBeTruthy();
  });

  it('should select initial state', () => {
    const initialState = createInitialState();
    query.selectSolicitud$.subscribe((state) => {
      expect(state).toEqual(initialState);
    });
  });

  it('should select mostrarTabla state', () => {
    query.mostrarTabla$.subscribe((mostrarTabla) => {
      expect(mostrarTabla).toBe(false);
    });
  });

  it('should select filaSeleccionada state', () => {
    query.filaSeleccionada$.subscribe((filaSeleccionada) => {
      expect(filaSeleccionada).toEqual([]);
    });
  });

  it('should select solicitud state', () => {
    query.solicitud$.subscribe((solicitud) => {
      expect(solicitud).toBe('');
    });
  });

  it('should select fraccion state', () => {
    query.fraccion$.subscribe((fraccion) => {
      expect(fraccion).toBe('');
    });
  });

  it('should select producto state', () => {
    query.producto$.subscribe((producto) => {
      expect(producto).toBe('');
    });
  });

  it('should select descripcionPartidasDeLaMercancia state', () => {
    query.descripcionPartidasDeLaMercancia$.subscribe((descripcion: string) => {
      expect(descripcion).toBe('');
    });
  });

  it('should select cantidadPartidasDeLaMercancia state', () => {
    query.cantidadPartidasDeLaMercancia$.subscribe((cantidad: string) => {
      expect(cantidad).toBe('');
    });
  });

  it('should select valorPartidaUSDPartidasDeLaMercancia state', () => {
    query.valorPartidaUSDPartidasDeLaMercancia$.subscribe((valorPartidaUSD: number) => {
      expect(valorPartidaUSD).toBe(0);
    });
  });

  it('should select unidadMedida state', () => {
    query.unidadMedida$.subscribe((unidadMedida: string) => {
      expect(unidadMedida).toBe('');
    });
  });

  it('should select defaultSelect state', () => {
    query.defaultSelect$.subscribe((defaultSelect: string) => {
      expect(defaultSelect).toBe('Inicial');
    });
  });

  it('should select defaultProducto state', () => {
    query.defaultProducto$.subscribe((defaultProducto: string) => {
      expect(defaultProducto).toBe('Nuevo');
    });
  });

  it('should select regimen state', () => {
    query.regimen$.subscribe((regimen: string) => {
      expect(regimen).toBe('');
    });
  });

  it('should select clasificacion state', () => {
    query.clasificacion$.subscribe((clasificacion: string) => {
      expect(clasificacion).toBe('');
    });
  });

  it('should select bloque state', () => {
    query.bloque$.subscribe((bloque: string) => {
      expect(bloque).toBe('');
    });
  });

  it('should select entidad state', () => {
    query.entidad$.subscribe((entidad: string) => {
      expect(entidad).toBe('');
    });
  });

  it('should select representacion state', () => {
    query.representacion$.subscribe((representacion: string) => {
      expect(representacion).toBe('');
    });
  });

  it('should select mercanciaState state', () => {
    query.mercanciaState$.subscribe((mercanciaState: any) => {
      expect(mercanciaState.producto).toBe('');
      expect(mercanciaState.descripcion).toBe('');
      expect(mercanciaState.fraccion).toBe('');
      expect(mercanciaState.cantidad).toBe('');
      expect(mercanciaState.valorPartidaUSD).toBe(0);
      expect(mercanciaState.unidadMedida).toBe('');
      expect(mercanciaState.defaultProducto).toBe('Nuevo');
    });
  });

  it('should update store and query should reflect changes', () => {
    const newState = {
      ...createInitialState(),
      solicitud: 'Test Solicitud',
      producto: 'Test Producto',
      descripcion: 'Test Descripcion',
      mostrarTabla: true
    };

    store.update(newState);

    query.selectSolicitud$.subscribe((state) => {
      expect(state.solicitud).toBe('Test Solicitud');
      expect(state.producto).toBe('Test Producto');
      expect(state.descripcion).toBe('Test Descripcion');
      expect(state.mostrarTabla).toBe(true);
    });
  });
});