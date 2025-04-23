import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PagoDeDerechosContenedoraComponent } from './pago-de-derechos-contenedora.component';
import { Tramite240121Query } from '../../estados/tramite240121Query.query';
import { Tramite240121Store } from '../../estados/tramite240121Store.store';

describe('PagoDeDerechosContenedoraComponent (Jest)', () => {
  let component: PagoDeDerechosContenedoraComponent;

  const mockTramiteQuery = {
    getPagoDerechos$: of({
      claveReferencia: '12345',
      monto: 5000,
      estado: 'Pendiente',
      cadenaDependencia: 'SAT001',
      banco: 'BBVA',
      llavePago: 'XYZ123',
      fechaPago: '2024-01-15',
      importePago: '5000',
    }),
  };

  const mockTramiteStore = {
    updatePagoDerechosFormState: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Tramite240121Query, useValue: mockTramiteQuery },
        { provide: Tramite240121Store, useValue: mockTramiteStore },
      ],
    });

    component = new PagoDeDerechosContenedoraComponent(
      mockTramiteQuery as any,
      mockTramiteStore as any
    );
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with data from getPagoDerechos$', () => {
    component.ngOnInit();
    expect(component.pagoDerechoFormState).toEqual({
      claveReferencia: '12345',
      monto: 5000,
      estado: 'Pendiente',
      cadenaDependencia: 'SAT001',
      banco: 'BBVA',
      llavePago: 'XYZ123',
      fechaPago: '2024-01-15',
      importePago: '5000',
    });
  });

  it('should call updatePagoDerechos() with provided data', () => {
    const mockData = {
      claveReferencia: '12345',
      monto: 5000,
      estado: 'Pendiente',
      cadenaDependencia: 'SAT001',
      banco: 'BBVA',
      llavePago: 'XYZ123',
      fechaPago: '2024-01-15',
      importePago: '5000',
    };

    component.updatePagoDerechos(mockData);
    expect(mockTramiteStore.updatePagoDerechosFormState).toHaveBeenCalledWith(mockData);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['unsubscribe$'], 'next');
    const completeSpy = jest.spyOn(component['unsubscribe$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
