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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pagoDerechos from tramiteStore', () => {
    expect(tramiteStore.getValue).toHaveBeenCalled();
    expect(component.pagoDerechos).toEqual({ field1: 'value1', field2: 'value2' });
  });

  it('should call updatePagoDerechos on tramiteStore when updatePagoDerechos is called', () => {
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
