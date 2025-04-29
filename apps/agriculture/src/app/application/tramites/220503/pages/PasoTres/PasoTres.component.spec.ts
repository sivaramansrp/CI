import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PasoTresComponent } from './PasoTres.component';
import { TramiteFolioService } from '@libs/shared/data-access-user/src';
import { TramiteAgriState } from '../../../../estados/tramites/tramite220503.store';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let router: jest.Mocked<Router>;
  let tramiteFolioService: jest.Mocked<TramiteFolioService>;
  let tramiteStore: jest.Mocked<TramiteAgriState>;

  beforeEach(() => {
    const routerMock = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    const tramiteFolioServiceMock = {
      obtenerTramite: jest.fn(),
    } as unknown as jest.Mocked<TramiteFolioService>;

    const tramiteStoreMock = {
      establecerTramite: jest.fn(),
    } as unknown as jest.Mocked<TramiteAgriState>;

    TestBed.configureTestingModule({
      providers: [
        PasoTresComponent,
        { provide: Router, useValue: routerMock },
        { provide: TramiteFolioService, useValue: tramiteFolioServiceMock },
        { provide: TramiteAgriState, useValue: tramiteStoreMock },
      ],
    });

    component = TestBed.inject(PasoTresComponent);
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    tramiteFolioService = TestBed.inject(
      TramiteFolioService
    ) as jest.Mocked<TramiteFolioService>;
    tramiteStore = TestBed.inject(
      TramiteAgriState
    ) as jest.Mocked<TramiteAgriState>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set tipoPersona when obtenerTipoPersona is called', () => {
    component.obtenerTipoPersona(1);
    expect(component.tipoPersona).toBe(1);
  });

  it('should call tramiteStore.establecerTramite and navigate when obtieneFirma is called with a valid signature', () => {
    const mockTramite = { data: { id: 1 } };
    tramiteFolioService.obtenerTramite = jest
      .fn()
      .mockReturnValue(of(mockTramite));

    component.obtieneFirma('valid-signature');

    expect(tramiteFolioService.obtenerTramite).toHaveBeenCalledWith(19);
    expect(tramiteStore.establecerTramite).toHaveBeenCalledWith(
      mockTramite.data,
      'valid-signature'
    );
    expect(router.navigate).toHaveBeenCalledWith([
      'servicios-extraordinarios/acuse',
    ]);
  });

  it('should handle error when obtieneFirma is called and obtenerTramite fails', () => {
    tramiteFolioService.obtenerTramite.mockReturnValue(
      throwError(() => new Error('Error'))
    );

    component.obtieneFirma('valid-signature');

    expect(tramiteFolioService.obtenerTramite).toHaveBeenCalledWith(19);
    expect(tramiteStore.establecerTramite).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should complete destroy$ when ngOnDestroy is called', () => {
    const destroySpy = jest
      .spyOn(component['destroy$'], 'next')
      .mockImplementation();
    const completeSpy = jest
      .spyOn(component['destroy$'], 'complete')
      .mockImplementation();

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
