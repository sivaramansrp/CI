import { TestBed } from '@angular/core/testing';
import { PagoDeDerechosContenedoraComponent } from './pago-de-derechos-contenedora.component';
import { Tramite260104Store } from '../../estados/stores/tramite260104.store';
import { PagoDerechosFormState } from '../../../../shared/models/terceros-relacionados.model';

describe('PagoDeDerechosContenedoraComponent', () => {
  let component: PagoDeDerechosContenedoraComponent;
  let tramiteStore: Tramite260104Store;

  beforeEach(() => {
    const tramiteStoreMock = {
      getValue: jest.fn(() => ({
        pagoDerechos: {claveReferencia: 'test',
        cadenaDependencia: 'test',
        estado: 'test',
        llavePago: 'test',
        fechaPago: 'test',
        importePago: 'test',
        banco:'test'} as PagoDerechosFormState,
      })),
      updatePagoDerechos: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        PagoDeDerechosContenedoraComponent,
        { provide: Tramite260104Store, useValue: tramiteStoreMock },
      ],
    });

    component = TestBed.inject(PagoDeDerechosContenedoraComponent);
    tramiteStore = TestBed.inject(Tramite260104Store);
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar pagoDerechos desde tramiteStore', () => {
    expect(tramiteStore.getValue).toHaveBeenCalled();
    expect(component.pagoDerechos).toEqual({
      claveReferencia: 'test',
      cadenaDependencia: 'test',
      estado: 'test',
      llavePago: 'test',
      fechaPago: 'test',
      importePago: 'test',
      banco:'test'
    });
  });

  it('debe llamar a updatePagoDerechos en tramiteStore cuando se llama updatePagoDerechos', () => {
    const newPagoDerechos: PagoDerechosFormState = {claveReferencia: 'test',
      cadenaDependencia: 'test',
      estado: 'test',
      llavePago: 'test',
      fechaPago: 'test',
      importePago: 'test',
      banco:'test'};
    component.updatePagoDerechos(newPagoDerechos);

    expect(tramiteStore.updatePagoDerechos).toHaveBeenCalledWith(newPagoDerechos);
  });
});
