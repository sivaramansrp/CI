/* eslint-disable @typescript-eslint/naming-convention */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { FirmarSolicitudComponent } from './firmar-solicitud.component';
import { Router } from '@angular/router';
import { TramiteFolioService, TramiteFolioStore } from '@libs/shared/data-access-user/src';

fdescribe('FirmarSolicitudComponent', () => {
  let component: FirmarSolicitudComponent;
  let fixture: ComponentFixture<FirmarSolicitudComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockTramiteFolioService: jasmine.SpyObj<TramiteFolioService>;
  let mockTramiteFolioStore: jasmine.SpyObj<TramiteFolioStore>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockTramiteFolioService = jasmine.createSpyObj(
      'TramiteFolioService',
      ['obtenerTramite']
    );
    mockTramiteFolioStore = jasmine.createSpyObj('TramiteFolioStore', [
      'establecerTramite',
    ]);

    await TestBed.configureTestingModule({
      declarations: [FirmarSolicitudComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        {
          provide: TramiteFolioService,
          useValue: mockTramiteFolioService,
        },
        { provide: TramiteFolioStore, useValue: mockTramiteFolioStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FirmarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to acuse page on successful firma', () => {
    const mockTramite = {
      id: 1,
      descripcion: 'desc',
      codigo: 'code',
      data: 'mockData',
    };
    mockTramiteFolioService.obtenerTramite.and.returnValue(
      of(mockTramite)
    );

    component.obtieneFirma('mockFirma');

    expect(
      mockTramiteFolioService.obtenerTramite
    ).toHaveBeenCalledWith(19);
    expect(mockTramiteFolioStore.establecerTramite).toHaveBeenCalledWith(
      'mockData',
      'mockFirma'
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      'servicios-extraordinarios/acuse',
    ]);
  });

  it('should handle error when obtaining tramite fails', () => {
    mockTramiteFolioService.obtenerTramite.and.returnValue(
      throwError('error')
    );

    component.obtieneFirma('mockFirma');

    expect(
      mockTramiteFolioService.obtenerTramite
    ).toHaveBeenCalledWith(19);
    expect(mockTramiteFolioStore.establecerTramite).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should not call obtenerTramite if firma is empty', () => {
    component.obtieneFirma('');

    expect(
      mockTramiteFolioService.obtenerTramite
    ).not.toHaveBeenCalled();
    expect(mockTramiteFolioStore.establecerTramite).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
