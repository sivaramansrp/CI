import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { FirmarSolicitudComponent } from './firmar-solicitud.component';
import { FirmaElectronicaComponent, TramiteFolioService } from '@ng-mf/data-access-user';
import { TramiteCofeprisStore } from '../../../../estados/tramite.store';
import { ToastrModule } from 'ngx-toastr';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FirmarSolicitudComponent', () => {
  let component: FirmarSolicitudComponent;
  let tramiteFolioServiceMock: Partial<TramiteFolioService>;
  let tramiteCofeprisStoreMock: Partial<TramiteCofeprisStore>;
  let routerMock: Partial<Router>;

  beforeEach(() => {
    tramiteFolioServiceMock = {
      obtenerTramite: jest.fn().mockReturnValue(of({ data: { id: 123, name: 'Test Tramite' } })),
    };

    tramiteCofeprisStoreMock = {
      establecerTramite: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [FirmarSolicitudComponent],
      imports: [FirmaElectronicaComponent,ToastrModule.forRoot()],
      providers: [
        { provide: TramiteFolioService, useValue: tramiteFolioServiceMock },
        { provide: TramiteCofeprisStore, useValue: tramiteCofeprisStoreMock },
        { provide: Router, useValue: routerMock }        
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    const fixture = TestBed.createComponent(FirmarSolicitudComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
    component.ngOnDestroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerTramite and navigate on obtieneFirma when FIRMA is provided', () => {
    const firma = 'valid-signature';

    component.obtieneFirma(firma);

    expect(tramiteFolioServiceMock.obtenerTramite).toHaveBeenCalledWith(19);
    expect(tramiteCofeprisStoreMock.establecerTramite).toHaveBeenCalledWith(
      { id: 123, name: 'Test Tramite' }, 
      firma
    );
    expect(routerMock.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('should handle error in obtieneFirma if obtenerTramite fails', () => {
    const firma = 'valid-signature';

    (tramiteFolioServiceMock.obtenerTramite as jest.Mock).mockReturnValue(throwError(() => new Error('Test Error')));

    component.obtieneFirma(firma);

    expect(tramiteFolioServiceMock.obtenerTramite).toHaveBeenCalledWith(19);
    expect(tramiteCofeprisStoreMock.establecerTramite).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should not call obtenerTramite if FIRMA is empty in obtieneFirma', () => {
    component.obtieneFirma('');

    expect(tramiteFolioServiceMock.obtenerTramite).not.toHaveBeenCalled();
    expect(tramiteCofeprisStoreMock.establecerTramite).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should unsubscribe destruirNotificador$ in ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destruirNotificador$'], 'next');
    const completeSpy = jest.spyOn(component['destruirNotificador$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalledTimes(1);
    expect(completeSpy).toHaveBeenCalledTimes(1);
  });
});