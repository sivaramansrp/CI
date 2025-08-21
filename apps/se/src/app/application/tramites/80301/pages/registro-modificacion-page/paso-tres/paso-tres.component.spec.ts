import { PasoTresComponent } from './paso-tres.component';
import { Router } from '@angular/router';
import { TramiteFolioService } from '@ng-mf/data-access-user';
import { TramiteStore } from '@ng-mf/data-access-user';
import { of, throwError } from 'rxjs';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let routerMock: jest.Mocked<Router>;
  let tramiteFolioServiceMock: jest.Mocked<TramiteFolioService>;
  let tramiteStoreMock: jest.Mocked<TramiteStore>;

  beforeEach(() => {
    routerMock = {
      navigate: jest.fn(),
    } as any;

    tramiteFolioServiceMock = {
      obtenerTramite: jest.fn(),
    } as any;

    tramiteStoreMock = {
      establecerTramite: jest.fn(()=>of()),
    } as any;

    component = new PasoTresComponent(
      routerMock,
      tramiteFolioServiceMock,
      tramiteStoreMock
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('obtenerTipoPersona', () => {
    it('should set tipoPersona', () => {
      component.obtenerTipoPersona(2);
      expect(component.tipoPersona).toBe(2);
    });
  });

  describe('obtieneFirma', () => {
    it('should call establecerTramite and navigate when firma is provided', () => {
      const tramiteData = { data: { id: 1 } };
      tramiteFolioServiceMock.obtenerTramite.mockReturnValue(of());
      const firma = 'firma123';
      component.obtieneFirma(firma);
      expect(tramiteFolioServiceMock.obtenerTramite).toHaveBeenCalledWith(19);
    });

    it('should not call obtenerTramite if firma is empty', () => {
      component.obtieneFirma('');
      expect(tramiteFolioServiceMock.obtenerTramite).not.toHaveBeenCalled();
    });

    it('should handle error from obtenerTramite', () => {
      tramiteFolioServiceMock.obtenerTramite.mockReturnValue(throwError(() => new Error('error')));
      jest.spyOn(console, 'error').mockImplementation(() => {});
      component.obtieneFirma('firma123');
      expect(routerMock.navigate).not.toHaveBeenCalled();
      expect(tramiteStoreMock.establecerTramite).not.toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete destroyed$', () => {
      const completeSpy = jest.spyOn<any, any>(component['destroyed$'], 'complete');
      const nextSpy = jest.spyOn<any, any>(component['destroyed$'], 'next');
      component.ngOnDestroy();
      expect(nextSpy).toHaveBeenCalledWith(true);
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});