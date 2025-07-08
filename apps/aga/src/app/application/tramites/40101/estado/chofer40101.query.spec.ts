import { TestBed } from '@angular/core/testing';
import { Chofer40101Query } from './chofer40101.query';
import { Chofer40101Store } from './chofer40101.store';
import { Choferesnacionales40101State } from './chofer40101.store';
import { of } from 'rxjs';

describe('Chofer40101Query', () => {
  let query: Chofer40101Query;
  let store: Chofer40101Store;

  const initialState: Choferesnacionales40101State = {
    datosDelChoferNacionalAlta: [
      { nombre: 'Juan', apellidoPaterno: 'Pérez', apellidoMaterno: 'García', curp: 'ABCD123456HDFLRS09' }
    ],
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    datosDelChoferNacionalModification: [],
    datosDelChoferNacionalRetirada: [],
    
    datosDelChoferExtranjerosAlta: [],
    datosDelChoferExtranjerosModification: [],
    datosDelChoferExtranjerosRetirada: []
    // ...otros campos del estado según definición...
  } as any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Chofer40101Query, Chofer40101Store]
    });
    store = TestBed.inject(Chofer40101Store);
    query = TestBed.inject(Chofer40101Query);
    store.update(() => initialState);
  });

  it('should be created', () => {
    expect(query).toBeTruthy();
  });

  it('should select the full solicitud state', (done) => {

    query.selectSolicitud$.subscribe(state => {
      expect(state).toEqual(initialState);
      done();
    });
  });

  it('should select the full seccion state', (done) => {
    query.selectSeccionState$.subscribe(state => {
      expect(state).toEqual(initialState);
      done();
    });
  });

  it('should select datosDelChoferNacionalAlta', (done) => {
    query.getdatosDelChoferNacional$.subscribe(lista => {
      expect(lista).toEqual(initialState.datosDelChoferNacionalAlta);
      done();
    });
  });
});