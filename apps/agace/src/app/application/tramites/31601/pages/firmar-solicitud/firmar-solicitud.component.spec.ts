// /* eslint-disable @typescript-eslint/naming-convention */
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { of, throwError } from 'rxjs';
// import { FirmarSolicitudComponent } from './firmar-solicitud.component';
// import { Router } from '@angular/router';
// import { TramiteFolioService, TramiteFolioStore } from '@libs/shared/data-access-user/src';

// fdescribe('FirmarSolicitudComponent', () => {
//   let component: FirmarSolicitudComponent;
//   let fixture: ComponentFixture<FirmarSolicitudComponent>;
//   let mockRouter: any;
//   let mockTramiteFolioService: any;
//   let mockTramiteFolioStore: any;
//   // let mockRouter: jasmine.SpyObj<Router>;
//   // let mockTramiteFolioService: jasmine.SpyObj<TramiteFolioService>;
//   // let mockTramiteFolioStore: jasmine.SpyObj<TramiteFolioStore>;

//   beforeEach(async () => {
//     mockRouter = jasmine.createSpyObj('Router', ['navigate']);
//     mockTramiteFolioService = jasmine.createSpyObj(
//       'TramiteFolioService',
//       ['obtenerTramite']
//     );
//     mockTramiteFolioStore = jasmine.createSpyObj('TramiteFolioStore', [
//       'establecerTramite',
//     ]);

//     await TestBed.configureTestingModule({
//       declarations: [FirmarSolicitudComponent],
//       providers: [
//         { provide: Router, useValue: mockRouter },
//         {
//           provide: TramiteFolioService,
//           useValue: mockTramiteFolioService,
//         },
//         { provide: TramiteFolioStore, useValue: mockTramiteFolioStore },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(FirmarSolicitudComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should navigate to acuse page on successful firma', () => {
//     const mockTramite = {
//       id: 1,
//       descripcion: 'desc',
//       codigo: 'code',
//       data: 'mockData',
//     };
//     mockTramiteFolioService.obtenerTramite.and.returnValue(
//       of(mockTramite)
//     );

//     component.obtieneFirma('mockFirma');

//     expect(
//       mockTramiteFolioService.obtenerTramite
//     ).toHaveBeenCalledWith(19);
//     expect(mockTramiteFolioStore.establecerTramite).toHaveBeenCalledWith(
//       'mockData',
//       'mockFirma'
//     );
//     expect(mockRouter.navigate).toHaveBeenCalledWith([
//       'servicios-extraordinarios/acuse',
//     ]);
//   });

//   it('should handle error when obtaining tramite fails', () => {
//     mockTramiteFolioService.obtenerTramite.and.returnValue(
//       throwError('error')
//     );

//     component.obtieneFirma('mockFirma');

//     expect(
//       mockTramiteFolioService.obtenerTramite
//     ).toHaveBeenCalledWith(19);
//     expect(mockTramiteFolioStore.establecerTramite).not.toHaveBeenCalled();
//     expect(mockRouter.navigate).not.toHaveBeenCalled();
//   });

//   it('should not call obtenerTramite if firma is empty', () => {
//     component.obtieneFirma('');

//     expect(
//       mockTramiteFolioService.obtenerTramite
//     ).not.toHaveBeenCalled();
//     expect(mockTramiteFolioStore.establecerTramite).not.toHaveBeenCalled();
//     expect(mockRouter.navigate).not.toHaveBeenCalled();
//   });
// });


/* eslint-disable @typescript-eslint/naming-convention */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { FirmarSolicitudComponent } from './firmar-solicitud.component';
import { Router } from '@angular/router';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { TramiteAgaceStore } from '../../../../estados/tramite.store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { ToastrModule } from 'ngx-toastr';

fdescribe('FirmarSolicitudComponent', () => {
  let component: FirmarSolicitudComponent;
  let fixture: ComponentFixture<FirmarSolicitudComponent>;
  let mockRouter: any;
  let mockServiciosPantallaService: any;
  let mockTramiteAgaceStore: any;

  beforeEach(async () => {
    mockRouter = { navigate: jest.fn() };
   mockServiciosPantallaService = { obtenerTramite: jest.fn() };
    mockTramiteAgaceStore = { establecerTramite: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FirmaElectronicaComponent,ToastrModule.forRoot()],
      declarations: [FirmarSolicitudComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ServiciosPantallaService, useValue: mockServiciosPantallaService },
        { provide: TramiteAgaceStore, useValue: mockTramiteAgaceStore },
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
    mockServiciosPantallaService.obtenerTramite.mockReturnValue(of(mockTramite));

    component.obtieneFirma('mockFirma');

    expect(mockServiciosPantallaService.obtenerTramite).toHaveBeenCalledWith(19);
    expect(mockTramiteAgaceStore.establecerTramite).toHaveBeenCalledWith(
      'mockData',
      'mockFirma'
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      'servicios-extraordinarios/acuse',
    ]);
  });

  it('should handle error when obtaining tramite fails', () => {
    mockServiciosPantallaService.obtenerTramite.mockReturnValue(
      throwError(() => 'error')
    );

    component.obtieneFirma('mockFirma');

    expect(mockServiciosPantallaService.obtenerTramite).toHaveBeenCalledWith(19);
    expect(mockTramiteAgaceStore.establecerTramite).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should not call obtenerTramite if firma is empty', () => {
    component.obtieneFirma('');

    expect(mockServiciosPantallaService.obtenerTramite).not.toHaveBeenCalled();
    expect(mockTramiteAgaceStore.establecerTramite).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});