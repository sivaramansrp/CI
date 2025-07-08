import { FirmarSolicitudComponent } from './firmar-solicitud.component';
import { Router } from '@angular/router';
import { TramiteFolioService } from '@ng-mf/data-access-user';
import { TramiteCofeprisStore } from '../../../../estados/tramite.store';
import { of, throwError } from 'rxjs';

describe('FirmarSolicitudComponent', () => {
  let component: FirmarSolicitudComponent;
  let routerMock: any;
  let tramiteFolioServiceMock: any;
  let tramiteCofeprisStoreMock: any;

  beforeEach(() => {
    routerMock = { navigate: jest.fn() };
    tramiteFolioServiceMock = { obtenerTramite: jest.fn() };
    tramiteCofeprisStoreMock = { establecerTramite: jest.fn() };

    component = new FirmarSolicitudComponent(
      routerMock,
      tramiteFolioServiceMock,
      tramiteCofeprisStoreMock
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call tramiteFolioService.obtenerTramite and establecerTramite and navigate when obtieneFirma is called with a valid signature', () => {
    const tramiteData = { data: { id: 1, name: 'test' } };
    tramiteFolioServiceMock.obtenerTramite.mockReturnValue(of(tramiteData));
    const firma = 'firma123';

    component.obtieneFirma(firma);

    expect(tramiteFolioServiceMock.obtenerTramite).toHaveBeenCalledWith(19);
    expect(tramiteCofeprisStoreMock.establecerTramite).toHaveBeenCalledWith(tramiteData.data, firma);
    expect(routerMock.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('should not call tramiteFolioService.obtenerTramite if signature is empty', () => {
    component.obtieneFirma('');
    expect(tramiteFolioServiceMock.obtenerTramite).not.toHaveBeenCalled();
    expect(tramiteCofeprisStoreMock.establecerTramite).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should handle error in obtieneFirma observable', () => {
    tramiteFolioServiceMock.obtenerTramite.mockReturnValue(throwError(() => new Error('error')));
    const firma = 'firma123';

    // No error should be thrown, just handled internally
    expect(() => component.obtieneFirma(firma)).not.toThrow();
    expect(tramiteFolioServiceMock.obtenerTramite).toHaveBeenCalledWith(19);
  });

  it('should complete destruirNotificador$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn<any, any>(component['destruirNotificador$'], 'next');
    const completeSpy = jest.spyOn<any, any>(component['destruirNotificador$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});