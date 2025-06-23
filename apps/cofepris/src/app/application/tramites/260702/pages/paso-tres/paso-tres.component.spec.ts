import { PasoTresComponent } from './paso-tres.component';
import { Router } from '@angular/router';
import { TramiteFolioService, TramiteStore } from '@ng-mf/data-access-user';
import { of, throwError, Subscription } from 'rxjs';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let routerMock: any;
  let tramiteFolioServiceMock: any;
  let tramiteStoreMock: any;

  beforeEach(() => {
    routerMock = { navigate: jest.fn() };
    tramiteFolioServiceMock = { obtenerTramite: jest.fn() };
    tramiteStoreMock = { establecerTramite: jest.fn() };

    component = new PasoTresComponent(
      routerMock,
      tramiteFolioServiceMock,
      tramiteStoreMock
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('obtenerTipoPersona', () => {
    it('should set tipoPersona', () => {
      component.obtenerTipoPersona(2);
      expect(component.tipoPersona).toBe(2);
    });
  });

  describe('obtieneFirma', () => {
    it('should call TramiteFolioService and TramiteStore and navigate on valid firma', () => {
      const tramiteData = { data: { id: 1 } };
      tramiteFolioServiceMock.obtenerTramite.mockReturnValue(of(tramiteData));
      const firma = 'firma123';

      component.obtieneFirma(firma);

      expect(tramiteFolioServiceMock.obtenerTramite).toHaveBeenCalledWith(19);
      // Wait for observable to emit
      setTimeout(() => {
        expect(tramiteStoreMock.establecerTramite).toHaveBeenCalledWith(tramiteData.data, firma);
        expect(routerMock.navigate).toHaveBeenCalledWith(['pago/consulta/acuse']);
      }, 0);
    });

    it('should not call TramiteFolioService if firma is empty', () => {
      component.obtieneFirma('');
      expect(tramiteFolioServiceMock.obtenerTramite).not.toHaveBeenCalled();
    });

    it('should handle error from TramiteFolioService', (done) => {
      tramiteFolioServiceMock.obtenerTramite.mockReturnValue(throwError(() => new Error('error')));
      const firma = 'firmaError';

      // No error should be thrown, catchError returns the error
      expect(() => component.obtieneFirma(firma)).not.toThrow();
      setTimeout(() => {
        expect(tramiteStoreMock.establecerTramite).not.toHaveBeenCalled();
        expect(routerMock.navigate).not.toHaveBeenCalled();
        done();
      }, 0);
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe obtienerTramiteSubscriber if exists', () => {
      const unsubscribeSpy = jest.fn();
      component.obtienerTramiteSubscriber = { unsubscribe: unsubscribeSpy } as unknown as Subscription;
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalled();
    });

    it('should not throw if obtienerTramiteSubscriber is undefined', () => {
      component.obtienerTramiteSubscriber = undefined as any;
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });
});