import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { ReprestantanteComponent } from './represtantante.component';
import { Tramite260605Store } from '../../../../estados/tramites/tramite260605.store';
import { Tramite260605Query } from '../../../../estados/queries/tramite260605.query';
import { ModificatNoticeService } from '../../services/modificat-notice.service';

describe('ReprestantanteComponent', () => {
  let componente: ReprestantanteComponent;
  let tramite260605QueryMock: any;
  let tramite260605StoreMock: any;
  let modificatNoticeServiceMock: any;

  beforeEach(() => {
    tramite260605QueryMock = {
      selectSolicitud$: of({
        rfc: 'ABC123456789',
        nombre: 'Juan',
        apellidoPaterno: 'Pérez',
        apellidoMaterno: 'Gómez',
        numeroDPmiso: '',
        cstumbresAtuales: [],
        aduanasDisponibles: [],
        aduanasSeleccionadas: [],
        cantidadSolicitada: 0,
      }),
    };

    tramite260605StoreMock = {
      setRfc: jest.fn(),
      setNombre: jest.fn(),
      setApellidoPaterno: jest.fn(),
      setApellidoMaterno: jest.fn(),
    };

    modificatNoticeServiceMock = {
      ObtenerReprestantanteData: jest.fn().mockReturnValue(
        of({
          nombre: 'Juan',
          apellidoPaterno: 'Pérez',
          apellidoMaterno: 'Gómez',
        })
      ),
    };

    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: Tramite260605Store, useValue: tramite260605StoreMock },
        { provide: Tramite260605Query, useValue: tramite260605QueryMock },
        { provide: ModificatNoticeService, useValue: modificatNoticeServiceMock },
      ],
    });

    const fb = TestBed.inject(FormBuilder);
    const tramite260605Store = TestBed.inject(Tramite260605Store);
    const tramite260605Query = TestBed.inject(Tramite260605Query);
    const modificatNoticeService = TestBed.inject(ModificatNoticeService);

    componente = new ReprestantanteComponent(
      fb,
      tramite260605Store,
      tramite260605Query,
      modificatNoticeService
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar el formulario y suscribirse a tramite260605Query', () => {
    componente.ngOnInit();

    expect(componente.solicitudState).toEqual({
      rfc: 'ABC123456789',
      nombre: 'Juan',
      apellidoPaterno: 'Pérez',
      apellidoMaterno: 'Gómez',
      numeroDPmiso: '',
      cstumbresAtuales: [],
      aduanasDisponibles: [],
      aduanasSeleccionadas: [],
      cantidadSolicitada: 0,
    });

    expect(componente.represtantante.value).toEqual({
      rfc: 'ABC123456789',
      nombre: 'Juan',
      apellidoPaterno: 'Pérez',
      apellidoMaterno: 'Gómez',
    });

    expect(componente.represtantante.get('nombre')?.disabled).toBe(true);
    expect(componente.represtantante.get('apellidoPaterno')?.disabled).toBe(true);
    expect(componente.represtantante.get('apellidoMaterno')?.disabled).toBe(true);
  });

  it('debería llamar a ObtenerReprestantanteData y actualizar los valores del formulario', () => {
    componente.ngOnInit();
    componente.obteneraduanasDisponiblesdatos();

    expect(modificatNoticeServiceMock.ObtenerReprestantanteData).toHaveBeenCalled();
    expect(componente.represtantante.value).toEqual({
      rfc: 'ABC123456789',
      nombre: 'Juan',
      apellidoPaterno: 'Pérez',
      apellidoMaterno: 'Gómez',
    });
  });

  it('debería llamar al método correcto en Tramite260605Store cuando se llama a setValoresStore', () => {
    componente.ngOnInit();
    componente.setValoresStore(componente.represtantante, 'rfc', 'setRfc');
    expect(tramite260605StoreMock.setRfc).toHaveBeenCalledWith('ABC123456789');
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(componente['destroyNotifier$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(
      componente['destroyNotifier$'],
      'complete'
    );

    componente.ngOnDestroy();

    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});
