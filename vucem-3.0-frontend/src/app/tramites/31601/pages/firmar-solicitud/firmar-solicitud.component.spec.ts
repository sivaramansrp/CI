import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { FirmarSolicitudComponent } from './firmar-solicitud.component';
import { Router } from '@angular/router';
import { ServiciosExtraordinariosService } from '../../../../core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';
import { TramiteStore } from '../../../../estados/tramite.store';

fdescribe('FirmarSolicitudComponent', () => {
  let component: FirmarSolicitudComponent;
  let fixture: ComponentFixture<FirmarSolicitudComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockServiciosExtraordinariosService: jasmine.SpyObj<ServiciosExtraordinariosService>;
  let mockTramiteStore: jasmine.SpyObj<TramiteStore>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockServiciosExtraordinariosService = jasmine.createSpyObj(
      'ServiciosExtraordinariosService',
      ['obtenerTramite']
    );
    mockTramiteStore = jasmine.createSpyObj('TramiteStore', [
      'establecerTramite',
    ]);

    await TestBed.configureTestingModule({
      declarations: [FirmarSolicitudComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        {
          provide: ServiciosExtraordinariosService,
          useValue: mockServiciosExtraordinariosService,
        },
        { provide: TramiteStore, useValue: mockTramiteStore },
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
    mockServiciosExtraordinariosService.obtenerTramite.and.returnValue(
      of(mockTramite)
    );

    component.obtieneFirma('mockFirma');

    expect(
      mockServiciosExtraordinariosService.obtenerTramite
    ).toHaveBeenCalledWith(19);
    expect(mockTramiteStore.establecerTramite).toHaveBeenCalledWith(
      'mockData',
      'mockFirma'
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      'servicios-extraordinarios/acuse',
    ]);
  });

  it('should handle error when obtaining tramite fails', () => {
    mockServiciosExtraordinariosService.obtenerTramite.and.returnValue(
      throwError('error')
    );

    component.obtieneFirma('mockFirma');

    expect(
      mockServiciosExtraordinariosService.obtenerTramite
    ).toHaveBeenCalledWith(19);
    expect(mockTramiteStore.establecerTramite).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should not call obtenerTramite if firma is empty', () => {
    component.obtieneFirma('');

    expect(
      mockServiciosExtraordinariosService.obtenerTramite
    ).not.toHaveBeenCalled();
    expect(mockTramiteStore.establecerTramite).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
